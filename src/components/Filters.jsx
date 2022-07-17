import React, { useContext } from 'react';
import planetsContext from '../context/myContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    filterColumn,
    setfilterColumn,
  } = useContext(planetsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const column = event.target[0].value;
    const comparison = event.target[1].value;
    const { value } = event.target[2];
    setFilterByNumericValues(
      [...filterByNumericValues,
        { column, comparison, value }],
    );
    setfilterColumn(filterColumn.filter((item) => item !== column));
  };

  return (
    <form
      className="filters selectors"
      onSubmit={ handleSubmit }
    >
      <select
        name="column filter"
        id="column filter"
        data-testid="column-filter"
      >
        {
          filterColumn.map(
            (item) => <option value={ item } key={ item }>{item}</option>,
          )
        }
      </select>
      <select
        name="comparison filter"
        id="comparison filter"
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        defaultValue="0"
        data-testid="value-filter"
      />
      <button
        type="submit"
        data-testid="button-filter"
      >
        Add filter

      </button>
    </form>
  );
}

export default Filters;
