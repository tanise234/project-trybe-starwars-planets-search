// import React from 'react';
import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/myContext';
import getData from '../services/getData';

function Table() {
  const {
    data,
    setData,
    filterByName,
    filteredData,
    setFilteredData,
  } = useContext(planetsContext);

  useEffect(() => {
    const fetchAPI = async () => {
      const get = await getData();
      setData(get);
      setFilteredData(get);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (filterByName.length > 0) {
      return setFilteredData(data.filter(
        ({ name }) => name.toLowerCase().includes(filterByName.toLowerCase()),
      ));
    }
    return setFilteredData(data);
  }, [filterByName]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>SurfaceWater</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((planet, index) => (
              <tr key={ index }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
