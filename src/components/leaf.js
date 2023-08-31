/*import React, {useState, useEffect} from "react";

import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const App = () => {
    const [samplingPlaces, setSamplingPlaces] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/');
            const data = await response.json();
            setSamplingPlaces(data);
          } catch (error) {
            console.error('Error fetching sampling places:', error);
          }
        };
        fetchData();
  }, []);

  const renderMarkers = () => {
    return samplingPlaces.map((place) => (
      <Marker
        key={place._id}
        position={[place.coordinate_x, place.coordinate_y]}
      >
        <Popup>{place.name_place}</Popup>
      </Marker>
    ));
  };

export default Place;*/
