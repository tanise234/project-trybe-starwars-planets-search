import React, { useContext } from 'react';
import planetsContext from '../context/myContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues } = useContext(planetsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const column = event.target[0].value;
    const comparison = event.target[1].value;
    const { value } = event.target[2];
    setFilterByNumericValues(
      [...filterByNumericValues,
        { column, comparison, value }],
    );
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
