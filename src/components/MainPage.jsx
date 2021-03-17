import React, { Component } from 'react';
import PlanetContext from '../contexts/PlanetContext';
import { getPlanetsList } from '../services/PlanetsAPI';
import FilterForm from './FilterForm';
import Table from './Table';

class MainPage extends Component {
  constructor() {
    super();

    this.fetchPlanetsList = this.fetchPlanetsList.bind(this);
    this.sortInicialList = this.sortInicialList.bind(this);
  }

  componentDidMount() {
    this.fetchPlanetsList();
  }

  sortInicialList(list) {
    const NEG = -1;
    const POS = 1;
    list.sort((a, b) => {
      if (a.name < b.name) {
        return NEG;
      }
      if (a.name > b.name) {
        return POS;
      }
      return 0;
    });
    return list;
  }

  async fetchPlanetsList() {
    const { setPlanetsList } = this.context;
    const planetsFromAPI = await getPlanetsList();
    this.sortInicialList(planetsFromAPI);
    setPlanetsList(planetsFromAPI);
  }

  render() {
    return (
      <div>
        <span>Hello, App!</span>
        <FilterForm />
        <Table />
      </div>
    );
  }
}

MainPage.contextType = PlanetContext;

export default MainPage;
