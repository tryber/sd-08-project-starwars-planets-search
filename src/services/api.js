// const getPlanetsStarWars = () => (
//   fetch('https://swapi-trybe.herokuapp.com/api/planets/')
//     .then((response) => (
//       response.json()
//         // .then((json) => (response.ok ? console.log(json) : Promise.reject(json)))
//         .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
//     ))
// );

// const getPlanetsStarWars = async () => {
//   const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
//   const JsonResult = await result.json();
//   return JsonResult;
// };

const getPlanetsStarWars = async () => {
  const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json());
  return results;
};

export default getPlanetsStarWars;
