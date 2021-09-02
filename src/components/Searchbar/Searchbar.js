import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.css';

class Searchbar extends Component {
  static defaultProps = {};

  static propTypes = {
      onSubmit: PropTypes.func,
  };

  state = {
    query: '',
  };

  handlePictureChange = (evt) => {
    this.setState({query: evt.currentTarget.value.toLowerCase()});
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if(this.state.query.trim() === '') {
        return toast.info('Write down something to find a picture');
    };

    this.props.onSubmit(this.state.query);
    this.setState({query: ''});
  };

  render() {
    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>
                
                <input
                    className="SearchForm-input"
                    onChange={this.handlePictureChange}
                    type="text"
                    name="query"
                    value={this.state.query}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
  }
}

export default Searchbar;