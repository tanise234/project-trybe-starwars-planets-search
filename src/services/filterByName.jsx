const filterByName = (data, nameTyped, setFilteredData) => {
  if (nameTyped.length > 0) {
    return setFilteredData(data.filter(
      ({ name }) => name.toLowerCase().includes(nameTyped.toLowerCase()),
    ));
  }
  return setFilteredData(data);
};

export default filterByName;
