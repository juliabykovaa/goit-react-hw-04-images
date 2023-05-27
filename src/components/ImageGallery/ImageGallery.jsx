import React, { useState, useEffect, useRef } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery, CommonGalleryDiv } from './ImageGalery.styled';
import Modal from '../Modal/Modal';
import { nanoid } from 'nanoid';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

function ImageGallery({ request }) {
  const [requestedImages, setRequestedImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(request !== '');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const prevRequest = usePrevious(request);
  const prevPage = usePrevious(page);

  useEffect(() => {
    if (prevRequest !== request) {
      setRequestedImages([]);
      setPage(1);
      setIsLoading(request !== '');
      setShowModal(false);
      setSelectedImage(null);
    }

    if (prevRequest !== request || prevPage !== page) {
      if (request !== '' && !isLoading) {
        setIsLoading(true);

        fetch(
          `https://pixabay.com/api/?q=${request}&page=${page}&key=35226644-fa012e2a2ab77872d84abde88&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(data => {
            setRequestedImages(prevRequestedImages => [
              ...prevRequestedImages,
              ...data.hits,
            ]);
            setIsLoading(false);
            setHasMoreImages(data.hits.length > 0);
          });
      }
    }
  }, [request, page, isLoading, prevRequest, prevPage]);

  const openModal = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLoadMoreButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <CommonGalleryDiv>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={selectedImage.webformatURL} alt={selectedImage.tags} />
        </Modal>
      )}

      <Gallery>
        {requestedImages.length > 0 ? (
          requestedImages.map(image => (
            <ImageGalleryItem
              key={nanoid()}
              image={image}
              onOpenModal={() => openModal(image)}
            />
          ))
        ) : (
          <li>No images to display</li>
        )}
      </Gallery>
      {isLoading && <Loader />}

      {requestedImages.length > 0 && hasMoreImages && (
        <Button onLoadMore={handleLoadMoreButtonClick} />
      )}
    </CommonGalleryDiv>
  );
}

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default ImageGallery;
