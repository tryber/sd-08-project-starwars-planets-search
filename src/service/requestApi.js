import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetRequestApi() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((respose) => setData(respose.data));
  }, []);

  return data;
}
