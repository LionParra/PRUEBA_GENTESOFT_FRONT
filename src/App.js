import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Components/home/home';
import Carros from './Components/carros/carros';
import Motos from './Components/motos/motos';
import {AiFillCar} from 'react-icons/ai'

function App() {

  return (
    <div className="app">
      
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-brand btn"> <Link to='/' className="nav-link active"> <AiFillCar className='mx-2' /> Administracion de Vehiculos</Link></button> 
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/carros">Ver Carros</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/motos">Ver Motos</Link>
                  </li>
                </ul>
              </div>
            </div>
        </nav>

        <Routes>
          <Route path='/motos' Component={Motos}></Route>
          <Route path='/carros' Component={Carros}></Route>
          <Route path='/' Component={Home}></Route>
        </Routes>
       

      </Router>

      

    </div>
  );
}

export default App;
