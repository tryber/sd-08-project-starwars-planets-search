import React, { useContext, useState } from 'react';
import {
  Button,
} from 'react-bootstrap';
import { Context } from '../context';

const SortFilter = () => {
  const { filterObject } = useContext(Context);

  const [newFilter, setNewFilter] = useState({
    column: 'name',
    sort: 'ASC',
  });

  return (
    <section className="p-2 mb-3">
      <select
        data-testid="column-sort"
        className="browser-default custom-select mb-2"
        value={ newFilter.column }
        onChange={ ({ target }) => {
          setNewFilter({
            ...newFilter,
            column: target.value,
          });
        } }
      >
        <option value="name">Name</option>
        <option value="rotation_period">Rotation period</option>
        <option value="orbital_period">Orbital period</option>
        <option value="diameter">Diameter</option>
        <option value="climate">Climate</option>
        <option value="gravity">Gravity</option>
        <option value="terrain">Terrain</option>
        <option value="surface_water">Surface water</option>
        <option value="population">Population</option>
        <option value="residents">Residents</option>
        <option value="films">Films</option>
        <option value="created">Created at</option>
        <option value="edited">Edited at</option>
      </select>
      <div className="form-check">
        <label className="form-check-label" htmlFor="ASC">
          <input
            data-testid="column-sort-input-asc"
            className="form-check-input"
            type="radio"
            name="sort-radio"
            id="ASC"
            defaultChecked
            value="ASC"
            onClick={ ({ target }) => {
              setNewFilter({
                ...newFilter,
                sort: target.value,
              });
            } }
          />
          ASC
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label" htmlFor="DESC">
          <input
            data-testid="column-sort-input-desc"
            className="form-check-input"
            type="radio"
            name="sort-radio"
            id="DESC"
            value="DESC"
            onClick={ (event) => {
              setNewFilter({
                ...newFilter,
                sort: event.target.value,
              });
            } }
          />
          DESC
        </label>
      </div>
      <Button
        data-testid="column-sort-button"
        variant="secondary"
        size="sm"
        block
        onClick={ () => {
          filterObject.handleSort(newFilter);
        } }
      >
        Sort
      </Button>
    </section>
  );
};

export default SortFilter;
