export default function getData() {
  const res = fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((result) => result.json())
    .then((data) => data.results);
  return res;
}
