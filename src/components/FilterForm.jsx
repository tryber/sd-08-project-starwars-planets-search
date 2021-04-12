import React from 'react';
import NameInput from './NameInput';
import NumericValues from './NumericValues';
import OrderInput from './OrderInput';

export default function FilterForm() {
  return (
    <form>
      <NameInput />
      <NumericValues />
      <OrderInput />
    </form>
  );
}
