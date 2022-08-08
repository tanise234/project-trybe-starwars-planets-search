import React, { useContext } from 'react';
import planetsContext from '../context/myContext';

function Order() {
  const { filterColumn,
    order,
    setOrder,
    orderBy,
    filteredData,
  } = useContext(planetsContext);

  const handleColumn = ({ value }) => {
    setOrder({ order: { ...order.order, column: value } });
  };
  const handleSort = ({ id }) => {
    setOrder({ order: { ...order.order, sort: id } });
    console.log('batatinha', filteredData);
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
      <div onChange={ ({ target }) => handleSort(target) }>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="ASC-DESC"
            id="ASC"
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="ASC-DESC"
            id="DESC"
            data-testid="column-sort-input-desc"
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
