import React from 'react';
import './App.scss';
import BreweryList from './components/BreweryList/BreweryList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Austin Texas Breweries</p>
      </header>
      <div className="App-body">
        <BreweryList />
      </div>
    </div>
  );
}

export default App;
