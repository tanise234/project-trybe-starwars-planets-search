import React, { useContext } from 'react';
import planetsContext from '../context/myContext';

function Order() {
  const { filterColumn,
    filteredData,
    setFilteredData,
  } = useContext(planetsContext);
  const neg1 = -1;

  const formOrder = { order: { column: 'population', sort: 'ASC' } };

  const handleColumn = ({ value }) => {
    formOrder.order.column = value;
    console.log(formOrder);
  };
  const handleSort = ({ id }) => {
    formOrder.order.sort = id;
    console.log(formOrder);
  };

  const orderBy = (event) => {
    event.preventDefault();
    const { column, sort } = formOrder.order;
    if (sort === 'ASC') {
      const newArray = (filteredData.sort(
        (a, b) => (Number(a[column]) > Number(b[column]) ? 1 : neg1),
      ));
      console.log('console do order', newArray);
      setFilteredData(newArray);
    } if (sort === 'DESC') {
      const newArray = (filteredData.sort(
        (a, b) => (Number(b[column]) > Number(a[column]) ? 1 : neg1),
      ));
      console.log('console do order', newArray);
      setFilteredData(newArray);
    }
  };

  return (
    <form
      onSubmit={ (event) => orderBy(event) }
    >
      <h3>Order</h3>
      <select
        name="column-sort"
        id="column-sort"
        data-testid="column-sort"
        onChange={ ({ target }) => handleColumn(target) }
      >
        {
          filterColumn.map((filter) => (
            <option
              key={ filter }
              value={ filter }
            >
              {filter}
            </option>))
        }
      </select>
      <div>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="ASC-DESC"
            id="ASC"
            data-testid="column-sort-input-asc"
            onClick={ ({ target }) => handleSort(target) }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="ASC-DESC"
            id="DESC"
            data-testid="column-sort-input-desc"
            onClick={ ({ target }) => handleSort(target) }
          />
          Descendente
        </label>
      </div>

      <button
        type="submit"
        data-testid="column-sort-button"
      >
        Order

      </button>
    </form>
  );
}

export default Order;
