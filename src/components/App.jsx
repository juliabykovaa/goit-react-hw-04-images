import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';

function App() {
  const [queryRequest, setQueryRequest] = useState('');

  const handleFormSubmit = queryValue => {
    setQueryRequest(queryValue);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery request={queryRequest} />
    </>
  );
}

export default App;
