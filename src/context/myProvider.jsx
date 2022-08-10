import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';
import getData from '../services/getData';

function Provider({ children }) {
  const neg1 = -1;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameTyped, setNameTyped] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    [],
  );
  const [filterColumn, setfilterColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({ order: { column: 'population', sort: 'ASC' } });
  const [orderClicked, setOrderClicked] = useState(0);

  const filterByName = () => {
    if (nameTyped.length > 0) {
      return data.filter(
        ({ name }) => name.toLowerCase().includes(nameTyped.toLowerCase()),
      );
    }
    return data;
  };

  const filterByNumber = (arrayData) => arrayData.filter((planet) => filterByNumericValues
    .every(({ column, comparison, value }) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return null;
      }
    }));

  const orderBy = (arrayData) => {
    const { column, sort } = order.order;
    if (sort === 'ASC') {
      const unknown = arrayData.filter((planet) => planet[column] === 'unknown');
      const known = arrayData.filter((planet) => planet[column] !== 'unknown');
      const sortedArray = (known.sort(
        (a, b) => (Number(a[column]) > Number(b[column]) ? 1 : neg1),
      ));
      console.log('console do order ASC', [...sortedArray, ...unknown]);
      return ([...sortedArray, ...unknown]);
    } if (sort === 'DESC') {
      const unknown = arrayData.filter((planet) => planet[column] === 'unknown');
      const known = arrayData.filter((planet) => planet[column] !== 'unknown');
      const sortedArray = (known.sort(
        (a, b) => (Number(b[column]) > Number(a[column]) ? 1 : neg1),
      ));
      console.log('console do order DESC', [...sortedArray, ...unknown]);
      return ([...sortedArray, ...unknown]);
    }
  };

  // ao iniciar  -->> tentar tirar esse useEffect - executar uma função normal
  useEffect(() => {
    const fetchAPI = async () => {
      const get = await getData();
      setData(get);
      setFilteredData(get.sort((a, b) => (a.name > b.name ? 1 : neg1)));
    };
    fetchAPI();
  }, []);

  // .sort((a, b) => a.name.localeCompare(b.name));

  // ao aplicar um filtro  -->> tentar tirar esse useEffect - executar uma função normal
  useEffect(() => {
    console.log(orderClicked);
    if (filterByNumericValues.length > 0) {
      setFilteredData(filterByNumber(
        filterByName(),
      ));
    } else {
      setFilteredData(filterByName());
    }
  }, [nameTyped, filterByNumericValues]);

  const contextValue = {
    data,
    setData,
    nameTyped,
    setNameTyped,
    filteredData,
    setFilteredData,
    filterByNumericValues,
    setFilterByNumericValues,
    filterColumn,
    setfilterColumn,
    orderBy,
    order,
    setOrder,
    orderClicked,
    setOrderClicked,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
