const pessoas = [
  {
    name: 'Tiago',
    idade: 38,
    altura: 187,
  },
  {
    name: 'Viviane',
    idade: 37,
    altura: 168,
  },
  {
    name: 'Toão',
    idade: 51,
    altura: 185,
  },
  {
    name: 'Maria',
    idade: 50,
    altura: 178,
  },
];

const filtrar = (condicoes) => {
  const arr = [];
  condicoes.forEach((cond) => {
    if (cond.tipo === 'texto') {
      arr.push((i) => i.name.includes(`${cond.valor}`));
    } else if (cond.condicao === 'maior') {
      arr.push((i) => i[cond.param] > cond.valor);
    } else if (cond.condicao === 'menor') {
      arr.push((i) => i[cond.param] < cond.valor);
    } else if (cond.condicao === 'igual') {
      arr.push((i) => i[cond.param] === cond.valor);
    }
  });
  let lista = [...pessoas];
  while (arr.length > 0) {
    lista = lista.filter(arr.pop());
  }
  return lista;
};

const cond = [
  {
    tipo: 'texto',
    param: '',
    valor: 'T',
  },
  {
    tipo: 'numero',
    param: 'idade',
    condicao: 'menor',
    valor: 56,
  },
];

const res = filtrar(cond);

console.log(res);

// [x]criar um estado para o filtro em vigor
// [x]---ver se chega no estado
// [x]criar componente que olha para o estado filtro
// [x]---ele deve ter a lista escolhida e um botão com um x
// [x]ao clicar no botão apagar o filtro em vigor
// [x]--- deve apagar devolver a filtered planets a lista completa de planetas
// []--- deve re renderizar a tabela
