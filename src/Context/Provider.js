import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Contexto';

const ProviderPlanet = ({ children }) => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetas, setPlanetas] = useState([]);
  const [filtroPlaneta, setFiltroPlaneta] = useState([]);
  const [procurarNome, setProcurarNome] = useState('');
  const [options, setOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [tamanho, setTamanho] = useState(['maior que', 'menor que', 'igual a']);
  const [filtros, setFiltros] = useState({
    column: 'population', // options
    comparison: 'maior que', // tamanho
    value: '10000',
  });
  const [tabela, setTabela] = useState([]);

  useEffect(() => {
    async function fechtData() {
      const { results } = await fetch(url).then((res) => res.json());
      setPlanetas(results);
      setFiltroPlaneta(results);
    }
    fechtData();
  }, []);

  useEffect(() => {
    const filtroNome = planetas
      .filter((planeta) => planeta.name.includes((procurarNome)));
    setFiltroPlaneta(filtroNome);
  }, [procurarNome]);

  const filtro = (e) => {
    const attribute = e.target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setFiltros({ ...filtros, column: e.target.value });
    } else if (attribute === 'comparison-filter') {
      setFiltros({ ...filtros, comparison: e.target.value });
    } else {
      setFiltros({ ...filtros, value: e.target.value });
    }
  };

  const filtroValor = ({ column, comparison, value }) => {
    const novoFiltro = planetas.filter((planeta) => {
      const optionValor = Number(planeta[column]);
      const valueToCompare = Number(value);
      if (comparison === 'menor que') {
        return optionValor < valueToCompare;
      }
      if (comparison === 'maior que') {
        return optionValor > valueToCompare;
      }
      return optionValor === valueToCompare;
    });
    setFiltroPlaneta(novoFiltro);
  };

  const handleClick = () => {
    const copyOptions = [...options];
    const optionSelecionada = filtros.column;
    const indexOption = copyOptions.indexOf(optionSelecionada);
    copyOptions.splice(indexOption, 1);
    setOptions(copyOptions);
    filtroValor(filtros);
    setTabela([...tabela, filtros]);
  };

  const handleDelet = ({ target }) => {
    const remove = tabela.filter((item) => item.column !== target.column);
    console.log(remove);
    setTabela(remove);
  };

  const data = {
    procurarNome,
    setProcurarNome,
    filtroPlaneta,
    options,
    tamanho,
    setTamanho,
    filtro,
    handleClick,
    handleDelet,
    tabela,
    filtros,
  };

  return (
    <Context.Provider value={ data }>
      { children }
    </Context.Provider>
  );
};

ProviderPlanet.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default ProviderPlanet;
