import React from 'react';
import galacticorder from '../assets/galacticorder.svg';
import jediorder from '../assets/jediorder.svg';
import rebelalliance from '../assets/rebelalliance.svg';
import bb8 from '../assets/bb8_1.svg';

export default function Header() {
  return (
    <header>
      <div className="icons-container">
        <img height={ 55 } width={ 55 } src={ galacticorder } alt="test" />
        <img height={ 55 } width={ 55 } src={ jediorder } alt="test" />
        <img height={ 55 } width={ 55 } src={ rebelalliance } alt="test" />
      </div>
      <div className="title-container">
        <h1>Star Wars Planets</h1>
      </div>
      <div className="bb8">
        <img height={ 200 } width={ 200 } src={ bb8 } alt="teste" />
      </div>
    </header>
  );
}
