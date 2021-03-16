// const requestServices = async (URL, data = []) => {
//   const getPlanetsResponse = await fetch(URL);
//   const planetsJson = await getPlanetsResponse.json();
//   const result = await planetsJson.results.map((el) => {
//     delete el.residents;
//     return el;
//   });
//   let newArr = [];
//   if (planetsJson.next) {
//     newArr = await requestServices(planetsJson.next, result);
//   } else {
//     newArr = [...result, ...newArr];
//   }
//   return [...newArr, ...data];
// };

const requestServices = async (URL) => {
  const getPlanetsResponse = await fetch(URL);
  const planetsJson = await getPlanetsResponse.json();
  const result = await planetsJson.results.map((el) => {
    delete el.residents;
    return el;
  });

  return result;
};

const getPlanets = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await requestServices(URL);
  return response;
};

export default getPlanets;
