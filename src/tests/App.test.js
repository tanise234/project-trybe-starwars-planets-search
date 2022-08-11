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
    const planets = screen.getAllByTestId('planet-name');
    const inputName = screen.getByTestId('name-filter');
    const btnAdd = screen.getByTestId('button-filter');
    const btnDel = screen.getByTestId('button-remove-filters');

    expect(inputName).toHaveValue('');
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders[0]).toBeInTheDocument();
    expect(tableHeaders).toHaveLength(13);
    const row = screen.getAllByRole('row');
    expect(row).toHaveLength(11);
    expect(planets).toHaveLength(10);

    userEvent.type(inputName, "n");
    expect(planets[0]).toHaveTextContent('Alderaan');
    expect(screen.getAllByTestId('planet-name')[3]).toHaveTextContent('Endor');
    userEvent.type(inputName, "d");
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Endor');

    userEvent.selectOptions(screen.getByTestId('column-filter'), ['rotation_period']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['maior que']);
    userEvent.type(screen.getByTestId('value-filter'), '{backspace} 23');
    expect(screen.getByTestId('column-filter')).toHaveValue('rotation_period');
    expect(screen.getByTestId('comparison-filter')).toHaveValue('maior que');
    expect(screen.getByTestId('value-filter')).toHaveValue(23);
    userEvent.click(btnAdd);
    expect(screen.queryAllByTestId('filter')).toHaveLength(1);

    userEvent.click(btnDel);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
    userEvent.type(screen.getByTestId('name-filter'), '{backspace}{backspace}');
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
    userEvent.selectOptions(screen.getByTestId('column-filter'), ['rotation_period']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
    userEvent.type(screen.getByTestId('value-filter'), '{backspace} {backspace} 24');
    userEvent.click(btnAdd);
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(3);

    userEvent.click(btnDel);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
    userEvent.selectOptions(screen.getByTestId('column-filter'), ['rotation_period']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['menor que']);
    userEvent.click(btnAdd);
    expect(screen.queryAllByTestId('planet-name')).toHaveLength(5);

    userEvent.click(btnAdd);
    expect(screen.getAllByTestId('filter')).toHaveLength(2);
    const filterPopulation = screen.getByText('population menor que 24');
    
    userEvent.click(btnDel);
    expect(filterPopulation).not.toBeInTheDocument();

    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    const btnDelOne = screen.getAllByTestId('button-delete');
    expect(btnDelOne).toHaveLength(2);
    userEvent.click(btnDelOne[0]);
    expect(screen.getAllByTestId('filter')).toHaveLength(1);

    userEvent.click(btnDel);
    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(screen.getByTestId('column-sort-button'));
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant');
    expect(screen.getAllByTestId('planet-name')[9]).toHaveTextContent('Hoth');

    userEvent.selectOptions(screen.getByTestId('column-sort'), ['rotation_period']);
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(screen.getByTestId('column-sort-button'));
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Bespin');
    expect(screen.getAllByTestId('planet-name')[9]).toHaveTextContent('Kamino');

  });
});

