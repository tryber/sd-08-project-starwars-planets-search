import { useState, useEffect } from 'react';

const useFetchPlanets = () => {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchPlanets = async () => {
      setIsFetching(true);
      const resPage1 = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results: planetsPage1 } = await resPage1.json();
      setPlanets(planetsPage1);
      setIsFetching(false);
    };

    fetchPlanets();
  }, []);

  return { planets, isFetching };
};

export default useFetchPlanets;
