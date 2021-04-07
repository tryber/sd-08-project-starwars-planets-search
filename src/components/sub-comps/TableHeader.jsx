import React from 'react';

const TableHeader = () => {
  const texts = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL',
  ];

  return (
    <thead>
      <tr>
        {texts.map((text) => <th key={ text }>{text}</th>)}
      </tr>
    </thead>
  );
};

export default TableHeader;
