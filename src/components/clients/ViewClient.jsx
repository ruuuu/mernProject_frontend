import React, { useEffect, useState } from 'react';
import axios from 'axios';


// компонент
const ViewClient = () => {

  const [ client, setClient ] = useState({}); // завели перем состояния client



  useEffect(() => {

    axios.get('http://localhost:5000/api/client/${_id}')
      .then(response => {
        console.log('response ', response);
        setClient(response.data); // устаналвиваем обновленное значение в перем clients
      })

  }, client );



  return (
    <div> 
       <table>
        <thead>
          <td>ФИО</td>
          <td>Дата покупки</td>
          <td>Первое посещение</td>
          <td>Последнее посещение</td>
          <td>Телефон</td>
          <td>Срок действия абонемента</td>
          <td>Статус</td>
          <td>Тренер</td> 
        </thead>
        
       {  
        <tr key={client._id}>
          <td> {client.fio} </td>
          <td> {client.dateBuy} </td>
          <td> {client.firstCame} </td>
          <td> {client.lastCame} </td>
          <td> {client.phone} </td>
          <td> {client.srok} </td>
          <td> {client.status} </td>
          <td> {client.trenerId} </td>
        </tr> 
        }
      </table> 
    </div>
  );
};

export default ViewClient;