import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends Component {
  static propTypes = {
    modalPicture: PropTypes.object,
    onClose: PropTypes.func,
  };

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  };

  handleKeyDown = (e) => {
    if(e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if(e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const {modalPicture} = this.props;
    return (
        <div className="Overlay" onClick={this.handleOverlayClick}>
            <div className="Modal">
                <img className="Modal__Picture" src={modalPicture.largeImageURL} alt={modalPicture.tags} />
            </div>
        </div>
    )
  }
}

export default Modal;