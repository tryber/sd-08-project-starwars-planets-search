import React, { useContext } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import tableContext from '../context/tableContext';
import NumericForm from './NumericForm';
import ListOfFilters from './ListOfFilters';
import Sort from './Sort';

export default function Filters() {
  const { setFilters, filters } = useContext(tableContext);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setFilters({ ...filters, [name]: { name: value } });
  };

  return (
    <section className="filters">
      <Form inline>
        <FormControl
          name="filterByName"
          size="lg"
          type="text"
          placeholder="Nome do Planeta"
          className="mr-sm-2"
          data-testid="name-filter"
          onChange={ (event) => handleInput(event) }
        />
      </Form>
      <NumericForm />
      <ListOfFilters />
      <Sort />
    </section>
  );
}
