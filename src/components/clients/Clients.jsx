import React, { useEffect, useState } from 'react';
import axios from 'axios';



// компонент
const Clients = () => {

  const [ clients, setClients ] = useState([]); // хук,  завели перем состояния clients компонета



  useEffect(() => { // хук

    getClients();

  }, []); //  при первичном ренере отправится запрос на сервер, при изменении clients, запутсится переданный колбэк и перерисуется компонент




  const getClients = () => {

    axios.get('http://localhost:5000/api/clients')
      .then(response => {
        console.log('response ', response); 
        setClients(response.data); // устаналвиваем обновленное значение в перем clients [{},{}]
      })
  };



  const deleteClient = (id) => { // id клиента

    axios.delete(`http://localhost:5000/api/clients/${id}`)
      .then(response => {
        console.log('response.data ', response.data);
        getClients(); // получаем обновленный список
      })
  };



  const seeClient = (id) => {

    axios.get(`http://localhost:5000/api/clients/${id}`)
    .then(response => {
      console.log('response.data ', response.data);
      getClients(); // получаем обновленный список
    })
  }



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
          <td>Просмотр</td>
          <td>Изменить</td>
          <td>Удалить</td>
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
              <td><button onClick={seeClient.bind(this, elem._id)}> Просмотр </button></td>
              <td><button > Изменить </button></td>
              <td><button onClick={deleteClient.bind(this, elem._id)}> Удалить </button></td>
            </tr> 
        ))}
        
      </table> 
    </div>
  );
};

export default Clients;