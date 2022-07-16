import React, { useContext } from 'react';
import planetsContext from '../context/myContext';
import Filters from './Filters';

function Header() {
  const { setNameTyped } = useContext(planetsContext);

  return (
    <header>
      <h1>Starwars planets</h1>
      <input
        type="text"
        placeholder="name"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => setNameTyped(value) }
      />
      <Filters />
    </header>
  );
}

export default Header;
