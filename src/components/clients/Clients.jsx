import React, { useEffect, useState } from 'react';
import axios from 'axios';



// компонент
const Clients = () => {

  const [ clients, setClients ] = useState([]); // хук,  завели перем состояния clients компонета



  useEffect(() => { // хук

    axios.get('http://localhost:5000/api/clients')
      .then(response => {
        console.log('response ', response);
        setClients(response.data); // устаналвиваем обновленное значение в перем clients
      })

  }, clients, []); //  при первичном ренере отправится запрос на сервер, при изменении clients, запутсится переданный колбэк и перерисуется компонент



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
        
        { clients.map(elem => (
            <tr key={elem.id}>
              <td> {elem.fio} </td>
              <td> {elem.dateBuy} </td>
              <td> {elem.firstCame} </td>
              <td> {elem.lastCame} </td>
              <td> {elem.phone} </td>
              <td> {elem.srok} </td>
              <td> {elem.status} </td>
              <td> {elem.trenerId} </td>
            </tr> 
        ))}
        
      </table> 
    </div>
  );
};

export default Clients;