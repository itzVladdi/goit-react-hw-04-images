import { useState, useEffect } from 'react';

import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { fetchPhoto } from 'services/pixabayApi';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState(null);
  const [modalImgTags, setModalImgTags] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const imagePerPage = 12;

  function handleSubmit(searchQuery) {
    setQuery(searchQuery);
    setPhotos([]);
    setPage(1);
    setError(null);
    setTotalHits(0);
    setIsEmpty(true);
  }

  function handleModal(modalImageURL = null, tags = null) {
    setModalImg(modalImageURL);
    setModalImgTags(tags);
  }

  function onBtnClick() {
    setPage(prevState => prevState + 1);
  }

  useEffect(() => {
    if (query) {
      async function fetchData() {
        try {
          setIsLoading(true);
          const data = await fetchPhoto(query, page);
          setPhotos(prevState => [...prevState, ...data.hits]);
          setTotalHits(data.totalHits);
          setIsEmpty(data.totalHits <= 0);
        } catch (error) {
          setError(error.message);
          alert(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }
  }, [query, page]);
  return (
    <div className={css.App}>
      <Searchbar handleSubmit={handleSubmit} />
      {isEmpty && query && (
        <p style={{ textAlign: 'center' }}>
          Sorry, we couldn't find a match for your request - <b>"{query}"</b>.
        </p>
      )}
      {error && <p style={{ textAlign: 'center' }}>{error}</p>}
      {isLoading && <Loader />}
      {!isEmpty && (
        <ImageGallery>
          {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              handleModal={handleModal}
            />
          ))}
        </ImageGallery>
      )}
      {page < Math.ceil(totalHits / imagePerPage) && (
        <Button onBtnClick={onBtnClick} />
      )}
      {modalImg && (
        <Modal
          modalImg={modalImg}
          modalImgTags={modalImgTags}
          handleModal={handleModal}
        />
      )}
    </div>
  );
}
