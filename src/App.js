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
  const [page, setPage] = useState(1);

  const handleFormSubmit = (pictureQuery) => {
    setPictureQeury(pictureQuery);
    setPage(1);
  };

  const openModal = (modalPicture) => {
    setModalPicture(modalPicture);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false)
  };

  const handleLoadMore = () => {
    setPage(page => page + 1); 
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={pictureQuery} 
        onClick={openModal} 
        handleLoadMore={handleLoadMore}
        page={page}
      />
      {showModal && <Modal modalPicture={modalPicture} onClose={closeModal}/>}
      <ToastContainer position="top-center" autoClose={2000}/>
    </div>
  )
};

export default App;
