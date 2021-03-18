import React from 'react';
import starWarsImage from '../images/starWars.png';

function StarWarsImage() {
  return (
    <img
      src={ starWarsImage }
      alt="star-Wars"
      className="star-Wars-Image"
    />
  );
}

export default StarWarsImage;
