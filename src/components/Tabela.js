import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import SWContext from '../context/SWContext';

function Tabela() {
  const { planets } = useContext(SWContext);

  return (
    <Table striped bordered hover variant="dark" size="sm" responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Gravity</th>
          <th>Orbital Period</th>
          <th>Pupulation</th>
          <th>Residents</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Terrain</th>
          <th>Url</th>
          <th>Films</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((element, index) => (
          <tr key={ index }>
            <td>{element.name}</td>
            <td>{element.climate}</td>
            <td>{element.diameter}</td>
            <td>{element.edited}</td>
            <td>{element.gravity}</td>
            <td>{element.orbital_period}</td>
            <td>{element.population}</td>
            <td>{element.residents}</td>
            <td>{element.rotation_period}</td>
            <td>{element.surface_water}</td>
            <td>{element.terrain}</td>
            <td>{element.url}</td>
            <td>{element.films}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
Tabela.defaultProps = {
  planets: [],
};
export default Tabela;
