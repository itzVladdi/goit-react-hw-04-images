import PropTypes from 'prop-types';

import { useEffect } from 'react';

import css from './Modal.module.css';

export function Modal({ handleModal, modalImg, modalImgTags }) {
  function handleClick(event) {
    if (event.target === event.currentTarget) {
      handleModal();
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        handleModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleModal]);

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={modalImg} alt={modalImgTags} onClick={handleClick} />
      </div>
    </div>
  );
}

Modal.protoTypes = {
  modalImg: PropTypes.string.isRequired,
  modalImgTags: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};
