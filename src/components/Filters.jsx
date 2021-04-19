import React from 'react';
import NameInputFilter from './NameInputFilter';
import NumberInputFilter from './NumberInputFilter';
import OrderInputFilter from './OrderInputFilter';

export default function Filters() {
  return (
    <div>
      <NameInputFilter />
      <NumberInputFilter />
      <OrderInputFilter />
    </div>
  );
}
