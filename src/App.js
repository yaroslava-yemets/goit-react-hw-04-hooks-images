import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import './App.css';

function App () {
  const [pictureQuery, setPictureQeury] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalPicture, setModalPicture] = useState('');

  const handleFormSubmit = (pictureQuery) => {
    setPictureQeury(pictureQuery);
  };

  const openModal = (modalPicture) => {
    setModalPicture(modalPicture);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false)
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={pictureQuery} onClick={openModal}/>
      {showModal && <Modal modalPicture={modalPicture} onClose={closeModal}/>}
      <ToastContainer position="top-center" autoClose={2000}/>
    </div>
  )
};

export default App;
