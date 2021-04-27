import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchAPI } from '../services/fetchAPI';
import filterDataByNumericValues from '../core/filterDataByNumericValues';
import { firstSelector, secondSelector } from '../constants/index';
import StarWarsContext from './StarWarsContext';
import testData from '../testData';

export default class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: true,
      filteredData: testData.results,
      columnSelector: firstSelector,
      secondSelector,
      filters: {
        filterByName: { name: '' },
        filterByNumericValues: [{ column: '', comparison: '', value: 0 }],
        col: '',
        comp: '',
        val: 0,
      },
      lateData: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  handleInputs(e, col = '', comp = '', val = '') {
    e.preventDefault();
    console.log('entrou no handleInputs');
    const {
      filters: { filterByName, filterByNumericValues },
    } = this.state;

    this.setState((state) => ({
      ...state,
      filters: {
        filterByName,
        filterByNumericValues,
        col,
        comp,
        val,
      },
    }));
  }

  async getData() {
    const arr = [];
    const planets = fetchAPI();
    await planets
      .then((response) => response.json())
      .then((result) => arr.push(result.results));
    this.setState({ data: arr[0], fetching: false });
  }

  filterByQuery(query) {
    const {
      filters: { filterByNumericValues, col, comp, val },
    } = this.state;
    this.setState((state) => ({
      ...state,
      filters: { filterByName: { name: query }, filterByNumericValues, col, comp, val },
    }));
  }

  filterByNumerics(filterData, col = '', comp = '', val = '') {
    const {
      filters: { filterByName, filterByNumericValues },
    } = this.state;

    const newFilter = { column: col, comparison: comp, value: val };
    const newFilterByNumericValues = [...filterByNumericValues, newFilter];
    const lateData = filterData;
    const newData = filterDataByNumericValues(filterData, newFilterByNumericValues);
    this.setState((state) => ({
      ...state,
      filteredData: newData,
      filters: {
        filterByName,
        filterByNumericValues: [
          ...filterByNumericValues, { column: col, comparison: comp, value: val }],
        column: '',
        comparison: '',
        value: 0,
      },
      lateData,
    }));

    this.filterColumn(col);
  }

  filterColumn(col) {
    const { columnSelector } = this.state;
    console.log('entrou no filterColumn, columnSelector: ', columnSelector);
    console.log('spread operator: ', [
      // ...firstSelector,
      ...columnSelector.slice(0, columnSelector.indexOf(col) - 1),
      ...columnSelector.slice(columnSelector.indexOf(col), columnSelector.length - 1),
    ]);
    this.setState((state) => ({
      ...state,
      // filteredData,
      columnSelector: [
        // ...firstSelector,
        ...columnSelector.slice(0, columnSelector.indexOf(col)),
        ...columnSelector.slice(columnSelector.indexOf(col) + 1),
      ],
    }));
  }

  removeFilterByNumericValues(index) {
    const { data,
      filters: { filterByNumericValues, filterByName, col, comp, val,
        lateData } } = this.state;

    console.log('entrou no removeFilterByNumericValues');
    this.setState((state) => ({
      ...state,
      filteredData: data,
      filters: {
        filterByName,
        col,
        comp,
        val,
        filterByNumericValues: [
          ...filterByNumericValues.slice(0, index),
          ...filterByNumericValues.slice(index + 1),
        ],
      },
      lateData,
    }));
  }

  render() {
    const context = {
      ...this.state,
      getData: () => this.getData(),
      handleInputs: (e, col, comp, val) => this.handleInputs(e, col, comp, val),
      filterByQuery: (query) => this.filterByQuery(query),
      filterByNumerics:
        (e, col, comp, val) => this.filterByNumerics(e, col, comp, val),
      filterData: (filteredData) => this.filterData(filteredData),
      removeFilterByNumericValues: (index) => this.removeFilterByNumericValues(index),
    };

    const { children } = this.props;

    return (
      <StarWarsContext.Provider value={ context }>
        {children}
      </StarWarsContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
