import React, { useContext } from 'react';
import { DataContext } from '../API/DataContext';

const Loading = () => {
  const { stateOn } = useContext(DataContext);
  return stateOn ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : null;
};

export default Loading;
