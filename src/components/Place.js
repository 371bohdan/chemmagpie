import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import axios from 'axios';

function Place() {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    axios.get('/')
      .then(response => {
        setPlace(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
        <Marker key={place._id} postion={[place.coordinate_x, coordinate_y]}></Marker>
      )
}

export default Place;