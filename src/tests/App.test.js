import React from 'react';
import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
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
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    act(() => {
      render(<App />)
    });
  });

  afterEach(() => {
    cleanup();
  })
  test('Testar getData', async () => {

    const inputName = screen.getByTestId('name-filter');
    const planets = screen.getAllByTestId('planets');
    userEvent.type(inputName, "n");
    const row = screen.getAllByRole('row');
    expect(row).toHaveLength(9);
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Tatooine');

    // const inputColumn = screen.getByTestId('column-filter');
    // const inputValue = screen.getByTestId('value-filter');
    // const btnAdd = screen.getByTestId('button-filter');
    // userEvent.selectOptions(inputColumn, ['rotation_period']);
    // userEvent.type(inputValue, '23');
    // userEvent.click(btnAdd);

    // const btnAdd = screen.getByTestId('button-filter');
    // userEvent.click(btnAdd);
    // userEvent.click(btnAdd);
    // expect(await screen.findAllByTestId('filter')).toHaveLength(2);

    userEvent.click(screen.getByTestId('button-remove-filters'));
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);


  });
});

