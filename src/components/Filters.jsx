import React from 'react';

function Filters() {
  return (
    <div className="filters selectors">
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
        Filter

      </button>
    </div>
  );
}

export default Filters;
