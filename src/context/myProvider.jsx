import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';
import getData from '../services/getData';

function Provider({ children }) {
  const neg1 = -1;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameTyped, setNameTyped] = useState('');
  const [formData, setFormData] = useState(null);
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    [],
  );
  const [filterInputs, setFilterInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filterColumn, setfilterColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({ order: { column: 'population', sort: 'ASC' } });

  const filterByName = () => {
    if (nameTyped.length > 0) {
      return data.filter(
        ({ name }) => name.toLowerCase().includes(nameTyped.toLowerCase()),
      );
    }
    return data;
  };

  const filterByNumber = (newData) => newData.filter((planet) => filterByNumericValues
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

  const orderBy = (event) => {
    event.preventDefault();
    const { column, sort } = order.order;
    if (sort === 'ASC') {
      setFilteredData(filteredData.sort(
        (a, b) => (Number(a[column]) - Number(b[column])),
      ));
      console.log(filteredData.sort(
        (a, b) => (a[column] > b[column] ? 1 : neg1),
      ));
    } if (sort === 'DESC') {
      setFilteredData(filteredData.sort(
        (a, b) => (Number(b[column]) - Number(a[column])),
      ));
      console.log(filteredData.sort(
        (a, b) => (b[column] > a[column] ? 1 : neg1),
      ));
    }
  };

  // ao iniciar
  useEffect(() => {
    const fetchAPI = async () => {
      const get = await getData();
      setData(get);
      setFilteredData(get.sort((a, b) => (a.name > b.name ? 1 : neg1)));
    };
    fetchAPI();
  }, []);

  // ao aplicar um filtro
  useEffect(() => {
    setFilteredData(filterByName());
    if (filterByNumericValues.length > 0) {
      setFilteredData(filterByNumber(
        filterByName(),
      ));
    }
  }, [nameTyped, filterByNumericValues]);

  const contextValue = {
    data,
    setData,
    nameTyped,
    setNameTyped,
    formData,
    setFormData,
    filteredData,
    setFilteredData,
    filterByNumericValues,
    setFilterByNumericValues,
    filterInputs,
    setFilterInputs,
    filterColumn,
    setfilterColumn,
    order,
    setOrder,
    orderBy,
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
