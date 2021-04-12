const INITIAL_STATE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: '',
    sort: '',
  },
};

const variavel = { ...INITIAL_STATE };
// console.log(variavel);

const variavelB = { ...variavel, filterByName: { name: 'schappo' } };

console.log(variavelB);
