// const sorting = (newResults, order) => {
//   const { column, sort } = order;

//   const isNaN = parseInt(newResults[0][column], 10);

//   switch (sort) {
//   case 'ASC':
//     // testa se os valores das colunas a serem ordenadas são numeros ou textos
//     if (!isNaN) {
//       newResults.sort((planet1, planet2) => planet1[column] - planet2[column]);
//       break;
//     } else {
//       newResults.sort((planet1, planet2) => {
//         let count = 0;
//         while (count < planet1[column].length && count < planet2[column].length) {
//           if (planet1[column][count] === planet2[column][count]) {
//             count += 1;
//           } else {
//             // usa os códigos da tabela ASCII para definir se um caractere vem antes ou depois no alfabeto
//             return planet1[column].charCodeAt(count) - planet2[column].charCodeAt(count);
//           }
//         }
//         return 0;
//       });
//     }
//     break;

//   case 'DESC':
//     // testa se os valores das colunas a serem ordenadas são numeros ou textos
//     if (!isNaN) {
//       newResults.sort((planet1, planet2) => planet2[column] - planet1[column]);
//       break;
//     } else {
//       newResults.sort((planet1, planet2) => {
//         let count = 0;
//         while (count < planet1[column].length && count < planet2[column].length) {
//           if (planet1[column][count] === planet2[column][count]) {
//             count += 1;
//           } else {
//             // usa os códigos da tabela ASCII para definir se um caractere vem antes ou depois no alfabeto
//             return planet2[column].charCodeAt(count) - planet1[column].charCodeAt(count);
//           }
//         }
//         return 0;
//       });
//     }
//     break;
//   default:
//     break;
//   }
// };

// export default sorting;

// o código comentado acima faz a mesma função com uma complexidade maior então recorri aos universitários feat. Erick massaki
const ORDER_POSITIVE = 1;
const ORDER_NEGATIVE = -1;

const sorting = (array, order) => [
  ...array.sort((planetA, planetB) => {
    let columnA = parseInt(planetA[order.column], 10)
      ? parseInt(planetA[order.column], 10)
      : planetA[order.column];
    let columnB = parseInt(planetB[order.column], 10)
      ? parseInt(planetB[order.column], 10)
      : planetB[order.column];
    if (columnA === 'unknown') columnA = Infinity;
    if (columnB === 'unknown') columnB = Infinity;
    if (columnA > columnB && order.sort === 'ASC') return ORDER_POSITIVE;
    if (columnA < columnB && order.sort === 'ASC') return ORDER_NEGATIVE;
    if (columnA > columnB && order.sort === 'DESC') return ORDER_NEGATIVE;
    if (columnA < columnB && order.sort === 'DESC') return ORDER_POSITIVE;
    return 0;
  }),
];

export default sorting;
