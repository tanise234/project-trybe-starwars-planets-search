import React from 'react';
import { render, screen, waitFor, cleanup, act, fireEvent } from '@testing-library/react';
import App from '../App';
import testData from "../../cypress/mocks/testData";
import userEvent from '@testing-library/user-event';


describe('Testar os componentes', () => {
  test('Testar Filters', async () => {
    render(<App />);
    const title = screen.getByText(/Starwars planets/i);
    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnAdd = screen.getByTestId('button-filter');
    const btnDeleteAll = screen.getByTestId('button-remove-filters');
    const allInputs = [title, inputColumn, inputComparison, inputValue, btnAdd, btnDeleteAll];

    allInputs.forEach((input) => expect(input).toBeInTheDocument());
  });
  test('Testar Header', () => {
    render(<App />);
    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName,'vin');
    expect(inputName).toHaveValue('vin');

  });
  test('Testar Table', () => {
    render(<App />);
    const linkElement = screen.getByText(/Starwars planets/i);
    expect(linkElement).toBeInTheDocument();
  });
});
describe('Testar o contexto', () => {
  test('Testar myProvider', () => {
    render(<App />);
    const linkElement = screen.getByText(/Starwars planets/i);
    expect(linkElement).toBeInTheDocument();
  });
});
describe('Testar as funções', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    await act(async () => {
      render(<App />);
    });
  });

  afterEach(() => {
    cleanup();
  })
  test('Testar getData', async () => {
    const planets = screen.getAllByTestId('planets');
    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toHaveValue('');
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders[0]).toBeInTheDocument();
    expect(tableHeaders).toHaveLength(13);
    const row = screen.getAllByRole('row');
    expect(row).toHaveLength(11);
    expect(planets).toHaveLength(10);

    userEvent.type(inputName, "n");
    expect(planets[0]).toHaveTextContent('Tatooine');
    expect(screen.getAllByTestId('planets')[3]).toHaveTextContent('Bespin');
    userEvent.type(inputName, "d");
    expect(screen.getAllByTestId('planets')[0]).toHaveTextContent('Endor');

    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    userEvent.selectOptions(inputColumn, ['rotation_period']);
    userEvent.selectOptions(inputComparison, ['maior que']);
    userEvent.type(inputValue, '23');
    expect(inputColumn).toHaveValue('rotation_period');
    expect(inputComparison).toHaveValue('maior que');
    expect(inputValue).toHaveValue(23);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);

    const btnAdd = screen.getByTestId('button-filter');
    // const form = screen.getByTestId('form-filter');
    // userEvent.click(btnAdd);
    // fireEvent.submit(form);

    const filterPopulation = screen.findByText(/population maior que 0/i);
    // userEvent.click(btnAdd);
    const filterOrbital_period  = screen.findByText(/orbital_period  maior que 0/i);
    // expect(filterPopulation).toBeInTheDocument();


    // const btnAdd = screen.getByTestId('button-filter');
    // userEvent.click(btnAdd);
    // userEvent.click(btnAdd);
    // expect(screen.getAllByTestId('filter')).toHaveLength(2);

    userEvent.click(screen.getByTestId('button-remove-filters'));
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);


  });
});

