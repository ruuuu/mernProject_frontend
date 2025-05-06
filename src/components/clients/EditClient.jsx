import React, { useEffect, useState } from 'react';
import axios from 'axios';


// компонент
const EditClient = () => {

  //const [ clients, setClients ] = useState([]); // завели перем состояния clients



  // useEffect(() => {

  //   axios.get('http://localhost:5000/api/clients')
  //     .then(response => {
  //       console.log('response ', response);
  //       setClients(response.data); // устаналвиваем обновленное значение в перем clients
  //     })

  // }, []);



  return (
    <div> 
      Редактирование клиента
    </div>
  );
};

export default EditClient;