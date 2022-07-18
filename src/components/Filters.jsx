import React, { useContext } from 'react';
import planetsContext from '../context/myContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    filterColumn,
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
  };

  const handleDelete = (columnToDelete) => setFilterByNumericValues(
    filterByNumericValues.filter(
      (filter) => filter.column !== columnToDelete,
    ),
  );

  const handleDeleteAll = () => setFilterByNumericValues([]);

  return (
    <div>
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
              (item) => {
                if (filterByNumericValues
                  .some((filter) => item === filter.column)) {
                  return null;
                }
                return <option value={ item } key={ item }>{item}</option>;
              },
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
      <section>
        {
          filterByNumericValues.map(
            (filter) => (
              <div key={ filter.column } data-testid="filter">
                <br />
                <span>
                  {`${filter.column} ${filter.comparison} ${filter.value} `}
                </span>
                <button
                  type="button"
                  onClick={ () => handleDelete(filter.column) }
                >
                  Delete
                </button>
              </div>
            ),
          )
        }
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleDeleteAll }
        >
          Delete all filters
        </button>
      </section>
    </div>
  );
}

export default Filters;
