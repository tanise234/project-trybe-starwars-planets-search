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
      return setFilteredData(data.filter(
        ({ name }) => name.toLowerCase().includes(nameTyped.toLowerCase()),
      ));
    }
    return setFilteredData(data);
  };

  const filterByNumber = () => {
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      let newfiltered = filteredData;
      switch (comparison) {
      case 'maior que':
        newfiltered = filteredData.filter(
          (planet) => Number(planet[column]) > Number(value),
        );
        break;
      case 'menor que':
        newfiltered = filteredData.filter(
          (planet) => Number(planet[column]) < Number(value),
        );
        break;
      case 'igual a':
        newfiltered = filteredData.filter(
          (planet) => Number(planet[column]) === Number(value),
        );
        break;
      default:
        break;
      }
      setFilteredData(newfiltered);
    });
  };

  // ao iniciar
  useEffect(() => {
    const fetchAPI = async () => {
      const get = await getData();
      setData(get);
      setFilteredData(get);
    };
    fetchAPI();
  }, []);

  // ao aplicar um filtro
  useEffect(() => {
    filterByName();
    if (filterByNumericValues.length > 0) {
      filterByNumber();
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
