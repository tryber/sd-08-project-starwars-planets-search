import React from 'react';
import yoda from '../images/yoda.png';
import vader from '../images/darth.png';
import '../styles/IconsBackground.css';

function IconsBackground() {
  const buttonYoda = document.getElementById('yoda');
  const buttonVader = document.getElementById('vader');
  const body = document.getElementsByTagName('body')[0];

  const changeBackground = ({ target }) => {
    if (target === buttonYoda) {
      buttonYoda.className = 'selected';
      buttonVader.className = '';
      body.className = '';
    } else if (target === buttonVader) {
      buttonYoda.className = '';
      buttonVader.className = 'selected';
      body.className = 'second-body';
    }
  };

  return (
    <div className="icons-container">
      <button
        type="button"
        onClick={ changeBackground }
      >
        <img
          id="yoda"
          alt="yoda"
          className="selected"
          src={ yoda }
        />
      </button>
      <button
        type="button"
        onClick={ changeBackground }
      >
        <img id="vader" alt="vader" src={ vader } />
      </button>

    </div>
  );
}
export default IconsBackground;
