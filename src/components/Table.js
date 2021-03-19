import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Table.css';

function Table() {
  const { dataFiltered, isLoading } = useContext(PlanetsContext);

  return (isLoading ? 'Loading...'
    : (
      <table>
        <thead>
          <tr>
            { dataFiltered[0]
            && Object.keys(dataFiltered[0]).map((head, index) => (
              <th key={ index }>{ head.toUpperCase() }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { dataFiltered[0] && dataFiltered.map((infos) => (
            <tr key={ infos.name }>
              { Object.values(infos).map((info, idx) => {
                if (idx === 0) {
                  return (<td data-testid="planet-name" key={ idx }>{ info }</td>);
                }
                return <td key={ idx }>{ info }</td>;
              }) }
            </tr>
          )) }
        </tbody>
      </table>
    ));
}

export default Table;
