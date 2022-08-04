import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/myContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    filterColumn,
    formData,
    setFormData,
    filterInputs,
    setFilterInputs,
  } = useContext(planetsContext);

  const handleColumn = ({ target }) => {
    console.log(target.value);
    setFilterInputs({ ...filterInputs, column: target.value });
  };
  const handleComparison = ({ target }) => {
    console.log(target.value);
    setFilterInputs({ ...filterInputs, comparison: target.value });
  };
  const handleValue = ({ target }) => {
    console.log(target.value);
    setFilterInputs({ ...filterInputs, value: target.value });
  };

  useEffect(() => {
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
  }, [filterByNumericValues]);

  const handleSubmit = (event) => {
    console.log(filterInputs);
    console.log(filterByNumericValues);
    event.preventDefault();
    setFormData(filterInputs);
  };

  useEffect(() => {
    if (formData !== null) {
      setFilterByNumericValues(
        [...filterByNumericValues,
          formData],
      );
    }
  }, [formData]);

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
        data-testid="form-filter"
        onSubmit={ handleSubmit }
      >
        <select
          name="column filter"
          id="column filter"
          data-testid="column-filter"
          onChange={ (event) => handleColumn(event) }
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
          name="comparison filter"
          id="comparison filter"
          data-testid="comparison-filter"
          onChange={ (event) => handleComparison(event) }

        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          defaultValue="0"
          data-testid="value-filter"
          onChange={ (event) => handleValue(event) }

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
