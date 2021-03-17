import React, { useContext } from 'react';
import Table from '../r-components/Table';
import Header from '../r-components/Header';
import PlanetsContext from '../contextAPI/PlanetsContext';

export default function SearchPlanetPage() {
  const { loadingPlanets } = useContext(PlanetsContext);
  if (loadingPlanets) {
    return (<div>LOADING</div>);
  }
  return (
    <div>
      <Header />
      <Table />
    </div>
  );
}
