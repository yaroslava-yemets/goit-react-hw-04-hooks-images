import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../../components/Loader';
import Button from '../Button';
import picturesApi from '../../services/picturesApi';
import './ImageGallery.css';


function ImageGallery ({query, onClick}) {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  // const fetchPictures = (query, page) => {
  //   const fetchedPictures = useCallback(
  //   () => {
  //     callback
  //   },
  //   [query, page]);
  // };

  useEffect(() => {
    
    if(!query) {
      return
    }
    setStatus('pending');
    // setPictures([]);
    // setPage(1);
    picturesApi(query, page)
    .then(pictures => {
      const picturesArray = pictures.hits;
      setPictures(pictures => [...pictures, ...picturesArray]);
      setStatus('resolved');
      autoScroll();
    })
    .catch(error => {
      setError(error);
      setStatus('rejected');
    });        
  }, [query, page]);


  const autoScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleLoadMore = () => {
      setPage(page => page + 1); 
  };

  if(status === 'idle') {
    return <div className="Warning">Write down the word to start searching for pictures</div>
  }

  if(status === 'pending') {
    return (
      <>
        {pictures.length > 12 && <ul className="ImageGallery">
            <ImageGalleryItem pictures={pictures} onClick={onClick}/>
        </ul>}
        <Loader />
      </>
    )
  }

  if(status === 'rejected') {
    return toast.error(error.message)
  }

  if(status === 'resolved') {
    return (
        <>
        <ul className="ImageGallery">
            <ImageGalleryItem pictures={pictures} onClick={onClick}/>
        </ul>

        {pictures.length > 0 
            ? <Button onClick={handleLoadMore} /> 
            : <div className="Warning">You have to write down right word for search</div>}
        </>
    )
  }
};

ImageGallery.propTypes = {
    query: PropTypes.string,
    openModal: PropTypes.func,
};

export default ImageGallery;