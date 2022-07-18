import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';
import getData from '../services/getData';

function Provider({ children }) {
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

  // ao iniciar
  useEffect(() => {
    const fetchAPI = async () => {
      const get = await getData();
      setData(get);
      setFilteredData(get);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    console.log('campo para digitação mudou');
    // filterByName();
    // filterByNumber();
  }, [nameTyped]);

  useEffect(() => {
    console.log('array de filtros mudou');
    // filterByName();
    //   filterByNumber();
  }, [filterByNumericValues]);

  // ao aplicar um filtro
  useEffect(() => {
    setFilteredData(filterByName());
    if (filterByNumericValues.length > 0) {
      setFilteredData(filterByNumber(filterByName()));
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
