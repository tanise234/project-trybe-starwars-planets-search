// import testData from './testData';

const getData = () => {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets';
  const data = fetch(endPoint)
    .then((response) => response.json())
    .then((response) => response.results)
    .then((response) => response.map(({ residents, ...otherKeys }) => otherKeys))
    .catch((error) => error);

  // const data = testData;
  // return data.results.map(({ residents, ...otherKeys }) => otherKeys);
  return data;
};

export default getData;
