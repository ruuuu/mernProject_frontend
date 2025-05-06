import React, { useEffect, useState } from 'react';
import axios from 'axios';



// компонент
const Clients = () => {

  const [ clients, setClients ] = useState([]); // завели перем состояния clients



  useEffect(() => {

    axios.get('http://localhost:5000/api/clients')
      .then(response => {
        console.log('response ', response);
        setClients(response.data); // устаналвиваем обновленное значение в перем clients
      })

  }, []);



  return (
    <div> 
      { clients.map(elem => (
        <p key={elem.id}> {elem.fio} </p>
      ))}
    </div>
  );
};

export default Clients;