import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState(['Terra', 'Marte', 'Jupiter']);
  const [filterByName, setFilterByName] = useState('');

  const contextValue = {
    data,
    setData,
    filterByName,
    setFilterByName,
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
