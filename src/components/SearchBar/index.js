import React from 'react';
import InputNamePlanet from '../InputNamePlanet';
import SelectNumericValues from '../SelectNumericValues';
import ShowFilterScreen from '../ShowFilterScreen';
import OrderColumn from '../OderColumn';

function SearchBar() {
  return (
    <div>
      <InputNamePlanet />
      <SelectNumericValues />
      <ShowFilterScreen />
      <OrderColumn />
    </div>
  );
}

export default SearchBar;
