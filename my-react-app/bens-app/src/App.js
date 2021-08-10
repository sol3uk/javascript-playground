import React from "react";
import { Route, Switch } from 'react-router-dom';
import Counter from "./components/Counter";
import FindGame from "./components/FindGame";
import TicTacToe from "./components/TicTacToe";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

function App() {
  return (    
  <div className="App">            
  <Navigation />
    <Switch>                
       <Route path='/find-game' component={FindGame}/>  
       <Route path='/tic-tac-toe' component={TicTacToe}/>               
       <Route path='/counter' component={Counter}/>               
       <Route path='/' component={Home}/>            
    </Switch>
  </div>
);
  
}

export default App;
