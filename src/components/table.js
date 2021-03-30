import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

export default function Table() {
  const { FSWData } = useContext(SWContext);


  const tableHeader = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'films', 'created',
    'edited', 'url'];
console.log(FSWData.length);
  return (

    <table>
      <thead>
        <tr>
          {tableHeader.map((item) => (
            <th key={ item }>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {FSWData.map((Planet,index) => (
          // <tr key={ line.name }>
          //   {tableHeader.map((item) => (
          //     <td
          //       key={ item }
          //       // data-testid={ item === 'name' ? 'planet-name' : '' }
          //     >
          //       {line[item]}
          //     </td>
          //   ))}
          // </tr>
          <tr key={ index }>
<td data-testid="planet-name">{Planet.name}</td>
<td>{Planet.rotation_period}</td>
<td>{Planet.orbital_period}</td>
<td>{Planet.diameter}</td>
<td>{Planet.climate}</td>
<td>{Planet.gravity}</td>
<td>{Planet.terrain}</td>
<td>{Planet.surface_water}</td>
<td>{Planet.population}</td>
<td>{Planet.films}</td>
<td>{Planet.created}</td>
<td>{Planet.edited}</td>
<td>{Planet.url}</td>
</tr> 
        ))}
      </tbody>
    </table>

  );
}
