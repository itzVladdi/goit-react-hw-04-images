import PropTypes from 'prop-types';

import { useState } from 'react';

import css from './Searchbar.module.css';

export function Searchbar({ handleSubmit }) {
  const [search, setSearch] = useState('');

  function handleChange(event) {
    const { value } = event.target;
    setSearch(value);
  }
  function onSubmitForm(event) {
    event.preventDefault();
    handleSubmit(search);
    setSearch('');
  }
  return (
    <header className={css.Searchbar} onSubmit={onSubmitForm}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          value={search}
          name="search"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
