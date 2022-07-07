import React from 'react';
import './App.scss';
import BreweryList from './components/BreweryList/BreweryList';
import { GiTexas } from 'react-icons/gi';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {' '}
          Austin Texas Breweries <GiTexas />
        </p>
      </header>
      <div className="App-body">
        <BreweryList />
      </div>
    </div>
  );
}

export default App;
