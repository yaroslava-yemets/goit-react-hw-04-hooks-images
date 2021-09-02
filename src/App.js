import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';

import './App.css';

class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    pictureQuery: '',
    showModal: false,
    modalPicture: '',
  };

  handleFormSubmit = (pictureQuery) => {
    this.setState({pictureQuery});
  };

  openModal = (modalPicture) => {
    this.setState({
      showModal: true,
      modalPicture,
    })
  } 

  closeModal = () => {
    this.setState({showModal: false})
  };

  render() {
    const { pictureQuery, showModal, modalPicture } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={pictureQuery} onClick={this.openModal}/>
        {showModal && <Modal modalPicture={modalPicture} onClose={this.closeModal}/>}
        <ToastContainer position="top-center" autoClose={2000}/>
      </div>
    )
  }
};

export default App;
