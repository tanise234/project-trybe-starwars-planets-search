import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import Header from './components/Header';
import Filters from './components/Filters';
import Order from './components/Order';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Provider>
        <Header />
        <Filters />
        <Order />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
