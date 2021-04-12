import React, { useState, useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';

function Inputs() {
  const { filters, setFilter,
    parameterList, setParameterList, setOrder } = useContext(DataContext);

  const [columnFilter, setcolumnFilter] = useState(parameterList[0]);
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(null);
  const [activatedFilters, setActivatedFilters] = useState([]);
  const [columnToOrder, setColumnToOrder] = useState('name');
  const [sort, setSort] = useState('ASC');

  function handleChangeInputText(event) {
    setFilter({
      ...filters,
      filterByName: {
        name: event.target.value,
      },
    });
  }

  function handleChange(event, setState) {
    setState(event.target.value);
  }

  function handleClickNumericFilter() {
    const { filterByNumericValues } = filters;
    setFilter({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column: columnFilter,
          comparison,
          value: valueFilter,
        },
      ],
    });
    setParameterList(parameterList.filter(
      (element) => element !== columnFilter,
    ));
    setActivatedFilters([
      ...activatedFilters, { content: `${columnFilter} ${comparison} ${valueFilter}`,
        column: columnFilter },
    ]);
  }

  useEffect(() => {
    setcolumnFilter(parameterList[0]);
  }, [filters, parameterList]);

  useEffect(() => {
    setcolumnFilter(parameterList[0]);
  }, [filters, parameterList]);

  function handleClickAtivatedFilter({ target }) {
    const { filterByNumericValues } = filters;
    setFilter({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter(
        (filter) => filter.column !== target.value,
      ),
    });
    setActivatedFilters(activatedFilters.filter(
      (filter) => filter.column !== target.value,
    ));
    setParameterList([target.value, ...parameterList]);
  }

  function handleRadio({ target }) {
    if (target.checked) {
      setSort(target.value);
    }
  }

  function handleClickOrder() {
    setOrder({
      column: columnToOrder,
      sort,
    });
  }

  function renderInputOrder() {
    return (
      <div>
        Ordenação:
        <div className="select">
          <select
            data-testid="column-sort"
            onChange={ (event) => handleChange(event, setColumnToOrder) }
          >
            {
              ['name', ...parameterList].map(
                (parameter) => (
                  <option key={ parameter } value={ parameter }>
                    {parameter}
                  </option>),
              )
            }
          </select>
        </div>
        <div className="control">
          <label htmlFor="answer" className="radio">
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              name="answer"
              value="ASC"
              onClick={ handleRadio }
            />
            ASC
          </label>
          <label htmlFor="answer" className="radio">
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              name="answer"
              value="DESC"
              onClick={ handleRadio }
            />
            DESC
          </label>
        </div>
        <button
          data-testid="column-sort-button"
          type="button"
          className="button"
          onClick={ handleClickOrder }
        >
          Ordenar
        </button>
      </div>
    );
  }

  function renderActivatedFilter() {
    return (
      <div className="block">
        {activatedFilters.map((filter) => (
          <span key={ filter } className="block">
            <span data-testid="filter" className="tag is-success">
              {filter.content}
              <button
                type="button"
                className="delete is-small"
                value={ filter.column }
                onClick={ handleClickAtivatedFilter }
              >
                X
              </button>
            </span>
          </span>
        ))}
      </div>);
  }

  return (
    <div>
      <div>
        Filtros
        <div>
          <input
            data-testid="name-filter"
            className="input"
            type="text"
            placeholder="Text input"
            onChange={ handleChangeInputText }
          />
        </div>
        <div className="select">
          <select
            data-testid="column-filter"
            onChange={ (event) => handleChange(event, setcolumnFilter) }
            onSelect="teste"
          >
            {parameterList.map(
              (parameter) => (
                <option
                  key={ parameter }
                  value={ parameter }
                >
                  {parameter}
                </option>),
            )}
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ (event) => handleChange(event, setComparison) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </div>
        <input
          data-testid="value-filter"
          className="input"
          type="number"
          placeholder="Digite o valor"
          onChange={ (event) => handleChange(event, setValueFilter) }
        />
        <button
          data-testid="button-filter"
          type="button"
          className="button"
          onClick={ handleClickNumericFilter }
        >
          Add filtro
        </button>
      </div>
      {renderActivatedFilter()}
      {renderInputOrder()}
    </div>
  );
}

export default Inputs;
