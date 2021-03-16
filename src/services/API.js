const getStarWarsPlanets = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/?page=6';
  const { results } = await fetch(endpoint).then((res) => res.json());
  console.log(results);
  return (results);
};

getStarWarsPlanets();

export default getStarWarsPlanets;
