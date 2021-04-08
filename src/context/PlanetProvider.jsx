import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextStar from './ContextStar';

function PlanetProvider({ children }) {
  const [planets, setplanets] = useState([]);
  const [restoreplanets, setrestoreplanets] = useState([]);
  const [filteredplanets, setfilteredplanets] = useState([]);
  const [name, setname] = useState('');
  const [bynumbers, setbynumbers] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '',
    },
  );
  const [filtroAtivo, setfiltroAtivo] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  useEffect(() => {
    const getList = async () => {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((res) => res.json())
        .then(async ({ results }) => {
        // console.log(results);
          setplanets(results);
        });
    };
    getList();
  }, []);
  useEffect(() => {
    let Planetslist = planets;
    Planetslist = planets.filter((planet) => planet.name.includes((name)));
    setfilteredplanets(Planetslist);
  }, [planets, name]);

  const onfilterByName = (e) => {
    setname(e.target.value);
  };

  return (
    <ContextStar.Provider
      value={ {
        planets,
        setplanets,
        bynumbers,
        setbynumbers,
        name,
        setname,
        onfilterByName,
        filteredplanets,
        setfilteredplanets,
        filtroAtivo,
        setfiltroAtivo,
        restoreplanets,
        setrestoreplanets,
      } }
    >
      { children }
    </ContextStar.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};
export default PlanetProvider;
