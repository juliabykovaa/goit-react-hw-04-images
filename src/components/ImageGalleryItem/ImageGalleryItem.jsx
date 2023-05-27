import React from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';

function ImageGalleryItem({ image, onOpenModal }) {
  return (
    <GalleryItem onClick={onOpenModal}>
      <img src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
}

export default ImageGalleryItem;
