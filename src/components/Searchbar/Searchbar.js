import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.css';

function Searchbar ({onSubmit}) {
  const [query, setQuery] = useState('');

  const handlePictureChange = (evt) => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(query.trim() === '') {
        return toast.info('Write down something to find a picture');
    };

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
            <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
            </button>
            
            <input
                className="SearchForm-input"
                onChange={handlePictureChange}
                type="text"
                name="query"
                value={query}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;