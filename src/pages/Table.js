import React, { useContext } from 'react';
import '../App.css';
import StarWarsContext from '../context/StarWarsContext';

const TablePlanet = () => {
  const { starWars, filters } = useContext(StarWarsContext);
  function tableTitles() {
    if (starWars[0]) {
      delete starWars[0].residents;
      return Object.keys(starWars[0])
        .map((item) => <th key={ item }>{item}</th>);
    }
  }

  const tableBody = () => starWars.filter(({ name }) => name.toLowerCase()
    .includes(filters.filterByName.name.toLowerCase()))
    .map((item, key) => (
      <tr key={ key }>
        {Object.keys(item)
          .filter((index) => index !== 'residents')
          .map((index) => (<td key={ index }>{item[index]}</td>))}
      </tr>
    ));

  return (
    <table>
      <tr>
        {tableTitles()}
      </tr>
      <tbody>
        {tableBody()}
      </tbody>
    </table>
  );
};

export default TablePlanet;
