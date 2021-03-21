const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getData = async (setData, setIsFetching, setFilteredData) => {
  setIsFetching(true);
  await fetch(URL).then((res) => res.json()
    .then((json) => {
      setData(json.results);
      setFilteredData(json.results);
    })
    .catch((err) => err));
  setIsFetching(false);
};

export default getData;
