import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Beers from './components/beers/beers'

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>BreweryDB Beers App powered by React<img src={logo} className="App-logo" alt="logo" /></h1>
        </header>
        <Beers />
      </div>
    );
  }
  
}

export default App;
