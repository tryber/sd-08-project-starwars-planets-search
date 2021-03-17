import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SWContext from '../context/SWContext';
import './SelectForm.css';

const COMPARISON_OPTIONS = ['maior que', 'menor que', 'igual a'];

function SelectForm() {
  const { filters, setFilters, columns, setColumns } = useContext(SWContext);
  const [filterOptions, setFilterOptions] = useState(
    { column: '', comparison: '', value: 0 },
  );

  const { filterByNumericValues } = filters;
  const { column, comparison, value } = filterOptions;

  function handleChange({ target }) {
    setFilterOptions({
      ...filterOptions,
      [target.name]: target.value,
    });
  }

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          ...filterOptions,
        }],
    });
    setColumns(columns.filter((selectedColumn) => column !== selectedColumn));
  }
  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Opções de filtro:</Form.Label>
          <Form.Control
            name="column"
            data-testid="column-filter"
            value={ column }
            onChange={ handleChange }
            as="select"
            custom
          >
            {columns.map((option, index) => (
              <option key={ index }>{option}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Label>Compare:</Form.Label>
        <Form.Control
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleChange }
          as="select"
          custom
        >
          {COMPARISON_OPTIONS.map((option, index) => (
            <option key={ index }>{option}</option>
          ))}
        </Form.Control>
        <Form.Label>Quantidade:</Form.Label>
        <Form.Control
          name="value"
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ handleChange }
        />
        <Button
          className="Button"
          onClick={ handleClick }
          data-testid="button-filter"
          type="button"
          variant="dark"
        >
          Filtrar
        </Button>
      </Form>
    </div>
  );
}

export default SelectForm;
