export const biggerThen = (planetsData, keyToFilter, amount) => planetsData
  .filter((planet) => {
    const valueFromColumn = +planet[keyToFilter];
    const valueFromInput = +amount;
    return valueFromColumn > valueFromInput;
  });

export const lessThan = (planetsData, keyToFilter, amount) => planetsData
  .filter((planet) => {
    const valueFromColumn = +planet[keyToFilter];
    const valueFromInput = +amount;
    return valueFromColumn < valueFromInput;
  });

export const equalTo = (planetsData, keyToFilter, amount) => planetsData
  .filter((planet) => {
    const valueFromColumn = +planet[keyToFilter];
    const valueFromInput = +amount;
    return valueFromColumn === valueFromInput;
  });

export const createCondition = (planetsData) => ({
  maior_que: (keyToFilter, amount) => biggerThen(planetsData, keyToFilter, amount),
  menor_que: (keyToFilter, amount) => lessThan(planetsData, keyToFilter, amount),
  igual_a: (keyToFilter, amount) => equalTo(planetsData, keyToFilter, amount),
});
