import React, { useContext, useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Context } from '../context';

const NumericFilterInputs = () => {
  const SELECT_COLUMNS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { filterObject } = useContext(Context);

  const [newFilter, setNewFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  return (
    <section className="p-2 mb-3">
      <select
        data-testid="column-filter"
        className="browser-default custom-select mb-2"
        value={ newFilter.column }
        onChange={ ({ target }) => {
          setNewFilter({
            ...newFilter,
            column: target.value,
          });
        } }
      >
        { filterObject
          ? SELECT_COLUMNS.map((column) => {
            if (
              filterObject.filters.filterByNumericValues
                .map((filter) => filter.column).includes(column)
            ) return null;
            return (
              <option key={ column } value={ column }>{ column }</option>
            );
          })
          : <p>Loading</p> }
      </select>
      <select
        data-testid="comparison-filter"
        className="browser-default custom-select mb-2"
        value={ newFilter.comparison }
        onChange={ ({ target }) => {
          setNewFilter({
            ...newFilter,
            comparison: target.value,
          });
        } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <InputGroup className="mb-2">
        <FormControl
          data-testid="value-filter"
          placeholder="Number"
          aria-describedby="basic-addon1"
          value={ newFilter.value }
          onChange={ ({ target }) => {
            setNewFilter({
              ...newFilter,
              value: target.value,
            });
          } }
        />
      </InputGroup>
      <Button
        data-testid="button-filter"
        disabled={ !newFilter.column
        || !newFilter.comparison
        || !newFilter.value }
        variant="secondary"
        size="sm"
        block
        onClick={ () => {
          setNewFilter((prevState) => {
            filterObject.handleFilterByNumericValues(prevState);
            return {
              column: '',
              comparison: '',
              value: '',
            };
          });
        } }
      >
        Apply filters
      </Button>
    </section>
  );
};

export default NumericFilterInputs;
