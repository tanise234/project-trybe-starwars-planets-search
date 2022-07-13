const getData = () => {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets';
  return fetch(endPoint)
    .then((response) => response.json())
    .then((response) => response.results)
    .then((response) => response.map(({ residents, ...otherKeys }) => otherKeys))
    .catch((error) => error);
};

export default getData;
