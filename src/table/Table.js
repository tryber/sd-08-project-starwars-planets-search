import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { loading, newData } = useContext(StarWarsContext);

  const title = ['name', 'rotation_period', 'orbital_period',
    'diameter', 'climate', 'gravity', 'terrain', 'surface_water',
    'population', 'films', 'created', 'edited', 'url'];

  return (
    loading
    && (
      <table border="solid 1px">
        <thead>
          <tr>
            {title.map((item, index) => <th key={ index }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {newData
            .map((tableLine, index) => (
              <tr key={ index }>
                { Object.values(tableLine)
                  .map((item) => <td key={ item }>{item}</td>) }
              </tr>))}
        </tbody>
      </table>
    )
  );
}

export default Table;
