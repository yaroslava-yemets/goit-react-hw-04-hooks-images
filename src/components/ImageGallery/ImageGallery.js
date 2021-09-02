import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../../components/Loader';
import Button from '../Button';
import picturesApi from '../../services/picturesApi';
import './ImageGallery.css';


class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
    openModal: PropTypes.func,
  };

  state = {
    pictures: [],
    error: null,
    page: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
      if(prevProps.query !== this.props.query) {
        this.setState({status: 'pending', pictures: [], page: 1});
        await this.getPicturesAfterNewSearch();
        this.autoScroll();
      }
      if(prevState.page !== this.state.page && this.state.page > 1) {
        this.setState({status: 'pending-ready'});
        await this.getPicturesFromNextPage();
        this.autoScroll();
      }
  };
  
  getPicturesAfterNewSearch = async () => {
     await picturesApi(this.props.query, this.state.page)
      .then(pictures => {
        this.setState({pictures: pictures.hits, status: 'resolved'});
      })
      .catch(error => this.setState({error, status: 'rejected'}));
  };

  getPicturesFromNextPage = async () => {
    await picturesApi(this.props.query, this.state.page)
      .then(pictures => {
          const picturesArray = pictures.hits;
          this.setState((prevState) => ({pictures: [...prevState.pictures, ...picturesArray], status: 'resolved'}));
      })
      .catch(error => this.setState({error, status: 'rejected'}));
  };

  autoScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleLoadMore = () => {
      this.setState((prevState) =>{
          return {page: prevState.page + 1}
      })
  };

  render() {
      const {status, pictures, error} = this.state;

      if(status === 'idle') {
          return <div className="Warning">Write down the word to start searching for pictures</div>
      }

      if(status === 'pending') {
          return <Loader />
      }

      if(status === 'pending-ready') {
        return (
          <>
            <ul className="ImageGallery">
                <ImageGalleryItem pictures={pictures} onClick={this.props.onClick}/>
            </ul>
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
                <ImageGalleryItem pictures={pictures} onClick={this.props.onClick}/>
            </ul>

            {pictures.length > 0 
                ? <Button onClick={this.handleLoadMore} /> 
                : <div className="Warning">You have to write down right word for search</div>}
            </>
        )
      }

  }
};

export default ImageGallery;