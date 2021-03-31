import React from 'react';
import GetRequestApi from '../service/requestApi';

export default function Table() {
  return (
    <div>
      <h1>Table</h1>
      { console.log(GetRequestApi())}
    </div>
  );
}
