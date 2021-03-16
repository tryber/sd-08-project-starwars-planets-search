export function objetosEmComum(ARRAY) {
  const inicioDaContagemDeItens = 0;
  let maiorArray = [];
  if (ARRAY.length === 1) {
    return ARRAY[0];
  }
  for (let i = inicioDaContagemDeItens; i < ARRAY.length; i += 1) {
    if (ARRAY[i].length > maiorArray.length) {
      maiorArray = ARRAY[i];
    }
  }
  return maiorArray;
}
// essa primeira parte pegou o maior array dentro do arrayzao e pos numa variavel

export function objetosEmComum2(ARRAY) {
  const arr = [...ARRAY];
  const inicioDaContagemDeItens = 0;
  const maiorArray = objetosEmComum(ARRAY);
  for (let i = inicioDaContagemDeItens; i < arr.length; i += 1) {
    if (arr[i] === maiorArray) {
      arr.splice(i, 1);
    }
  }
  // essa segunda parte removeu o maior array de dentro do arrayzao...
  return arr;
}

export function objetosEmComum3(ARRAY) {
  const inicioDaContagemDeItens = 0;
  const ARRAYY = objetosEmComum2(ARRAY);
  const maiorArray = objetosEmComum(ARRAY);
  const arrFinal = [];
  for (let i = inicioDaContagemDeItens; i < maiorArray.length; i += 1) {
    for (let l = inicioDaContagemDeItens; l < ARRAYY.length; l += 1) {
      for (let j = inicioDaContagemDeItens; j < ARRAYY[l].length; j += 1) {
        if (JSON.stringify(maiorArray[i]) === JSON.stringify(ARRAY[l][j])
         && ARRAYY[l][j] !== undefined) {
          arrFinal.push(ARRAYY[l][j]);
        }
      }
    }
  }

  return arrFinal;
}

export function objetosEmComum4(ARRAY) {
  if (ARRAY.length === 1) {
    return ARRAY[0];
  }
  const inicioDaContagemDeItens = 0;
  const arrFinal = objetosEmComum3(ARRAY);
  const ARRAYY = objetosEmComum2(ARRAY);
  const organizado = [];
  for (let i = inicioDaContagemDeItens; i < arrFinal.length; i += 1) {
    organizado.push(JSON.stringify(arrFinal[i]));
  }
  organizado.sort();
  const arrDeSaida = [];
  let count = 1;
  for (let i = inicioDaContagemDeItens; i < organizado.length; i += 1) {
    if (organizado[i] === organizado[i + 1]) {
      count += 1;
      if (count === ARRAYY.length) {
        arrDeSaida.push(JSON.parse(organizado[i]));
        count = 1;
      }
    } else if (ARRAYY.length === 1) {
      arrDeSaida.push(JSON.parse(organizado[i]));
    }
  }
  for (let i = 0; i < ARRAYY.length; i += 0) {
    if (ARRAYY[i] === []) {
      return ARRAYY[i];
    }
  }

  return arrDeSaida;
}
