import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';
import getData from '../services/getData';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameTyped, setNameTyped] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      const get = await getData();
      setData(get);
      setFilteredData(get);
    };
    fetchAPI();
  }, []);

  const contextValue = {
    data,
    setData,
    nameTyped,
    setNameTyped,
    filteredData,
    setFilteredData,
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
