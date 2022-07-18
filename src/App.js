import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import Provider from './context/myProvider';
import Filters from './components/Filters';

function App() {
  return (
    <div>
      <Provider>
        <Header />
        <Filters />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
