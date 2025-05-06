
import './App.css';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Clients from './components/clients/Clients.jsx';
import ViewClient from './components/clients/ViewClient.jsx';
import EditClient from './components/clients/EditClient.jsx';


// НАЧАЛО ОТСЮДА 
//  роутинг (подклчили Router), при переходе на /viewClient, запустится компонент <ViewClient /> 
function App() {

  return (
    <div className="App">
      <Router> 
        <Header />
          <Routes>
             <Route path="/viewClient" element={<ViewClient />} /> 
             <Route path="/editClient" element={<EditClient />} />
             <Route path="/" element={<Clients />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
