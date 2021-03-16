export default () => (
  fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((resp) => resp.json())
    .then(({ results }) => results)
    .catch(console.log)
);
