import React from 'react';
import { LoadButton } from './Button.styled';

function Button({ onLoadMore }) {
  return (
    <LoadButton type="button" onClick={onLoadMore}>
      Load More
    </LoadButton>
  );
}

export default Button;
