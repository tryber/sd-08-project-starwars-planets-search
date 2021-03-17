import React from 'react';

export default function FilterValue(props) {
  const { state, setState } = props;

  return (
    <label htmlFor="value">
      <input
        type="number"
        name="value"
        data-testid="value-filter"
      />
    </label>
  );
}
