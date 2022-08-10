import React, { useContext, useState } from 'react';
import planetsContext from '../context/myContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    filterColumn,
  } = useContext(planetsContext);

  const [formData, setFormData] = useState(null);
  const [filterInputs, setFilterInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const updateFilters = () => {
    const firstFilter = filterColumn.find(
      (item) => {
        if (item && filterByNumericValues
          .every((filter) => item !== filter.column)) {
          return item;
        }
        return null;
      },
    );
    setFilterInputs({
      ...filterInputs,
      column: firstFilter,
    });
  };

  const handleChange = ({ target }) => {
    setFilterInputs({ ...filterInputs, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData(filterInputs);
    setFilterByNumericValues(
      [...filterByNumericValues,
        filterInputs],
    );
    updateFilters();
  };

  const handleDelete = (columnToDelete) => {
    setFilterByNumericValues(
      filterByNumericValues.filter(
        (filter) => filter.column !== columnToDelete,
      ),
    );
    updateFilters();
  };

  const handleDeleteAll = () => {
    setFilterByNumericValues([]);
    updateFilters();
  };

  return (
    <div>
      <form
        className="filters selectors"
        data-testid="form-filter"
        onSubmit={ handleSubmit }
      >
        <select
          name="column"
          id="column filter"
          data-testid="column-filter"
          onChange={ (event) => handleChange(event) }
        >
          {
            filterColumn.map(
              (item) => {
                if (filterByNumericValues
                  .some((filter) => item === filter.column)) {
                  return null;
                }
                return (
                  <option
                    value={ item }
                    key={ item }
                    data-testid="column-options"
                  >
                    {item}
                  </option>
                );
              },
            )
          }
        </select>
        <select
          name="comparison"
          id="comparison filter"
          data-testid="comparison-filter"
          onChange={ (event) => handleChange(event) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value"
          defaultValue="0"
          data-testid="value-filter"
          onChange={ (event) => handleChange(event) }
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
              formData !== {}
             && (
               <div
                 key={ filter.column }
                 data-testid="filter"
               >
                 <br />
                 <span>
                   {`${filter.column} ${filter.comparison} ${filter.value} `}
                 </span>
                 <button
                   type="button"
                   data-testid="button-delete"
                   onClick={ () => handleDelete(filter.column) }
                 >
                   Delete
                 </button>
               </div>)
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
