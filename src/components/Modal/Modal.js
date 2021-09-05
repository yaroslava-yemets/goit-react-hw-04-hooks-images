import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal ({modalPicture, onClose}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return() => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  })

  const handleKeyDown = (e) => {
    if(e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if(e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
        <div className="Modal">
            <img className="Modal__Picture" src={modalPicture.largeImageURL} alt={modalPicture.tags} />
        </div>
    </div>
  );
}

Modal.propTypes = {
  modalPicture: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;