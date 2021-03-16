// export default async function fetchAllPlanets(url = 'https://swapi-trybe.herokuapp.com/api/planets/', actualList = []) {
//   const allPlanets = await fetch(url)
//     .then((data) => data.json())
//     .then((data) => {
//       if (data.results) {
//         actualList = [...actualList, ...data.results];
//       }
//       if (data.next) {
//         return fetchAllPlanets(data.next, actualList);
//       }
//       return actualList;
//     });
//   return allPlanets;
// }

export default async function fetchAllPlanets() {
  const allPlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((data) => data.json())
    .then((data) => data.results);
  return allPlanets;
}

export function orderByValue(comparison, planetValue, value) {
  if (comparison === 'igual a') {
    return Number(planetValue) === Number(value);
  }
  if (comparison === 'maior que') {
    return Number(planetValue) > Number(value);
  }
  if (comparison === 'menor que') {
    return Number(planetValue) < Number(value);
  }
}

export function orderByTextOrNumber(a, b, orderColumn, orderType) {
  if (orderType === 'Crescente') {
    if (a[orderColumn] - b[orderColumn]) {
      return Number(a[orderColumn]) - Number(b[orderColumn]);
    }
    return a[orderColumn].localeCompare(b[orderColumn]);
  }
  if (orderType === 'Decrescente') {
    if (a[orderColumn] - b[orderColumn]) {
      return Number(b[orderColumn]) - Number(a[orderColumn]);
    }
    return b[orderColumn].localeCompare(a[orderColumn]);
  }
  return 1;
}
