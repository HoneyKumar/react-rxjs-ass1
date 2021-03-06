import React from 'react';
import Header from './components/Header';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Autocomplete from './components/Autocomplete';
import {
  BrowserRouter as Router,Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Header />

      
      <Switch>
        <Route exact path="/home" component={Home} />
         
        <Route path="/about-us" component ={About}/>
        <Route path="/login" component ={Login}/>
        <Route path="/autocomplete" component ={Autocomplete}/> 
      </Switch>
    </div>
  </Router>    
  );
}

export default App;
