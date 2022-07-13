function filterName(data, setData, filterByName) {
  if (filterByName) {
    return setData(
      data.filter((planet) => planet.name.toLowerCase().includes(filterByName)),
    );
  }
}

export default filterName;
