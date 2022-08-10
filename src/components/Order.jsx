import React, { useContext } from 'react';
import planetsContext from '../context/myContext';

function Order() {
  const { filterColumn,
    order,
    setOrder,
    orderClicked,
    setOrderClicked,
  } = useContext(planetsContext);

  const handleColumn = ({ value }) => {
    setOrder({ order: { ...order.order, column: value } });
  };

  const handleSort = ({ id }) => {
    setOrder({ order: { ...order.order, sort: id } });
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        setOrderClicked(orderClicked + 1);
      } }
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
