import React from 'react';
import './BreweryList.scss';
import BreweryCard from '../BreweryCard/BreweryCard';

function BreweryList() {
  const breweryExampleData = {
    name: 'Pinthouse Pizza',
    type: 'large',
    address: '100 Lamar Street, Austin, Texas, 78735',
    URL: 'https://pinthouse.com/',
  };
  return (
    <div className="brewery-list">
      <BreweryCard brewery={breweryExampleData} />
      <BreweryCard brewery={breweryExampleData} />
      <BreweryCard brewery={breweryExampleData} />
      <BreweryCard brewery={breweryExampleData} />
    </div>
  );
}

export default BreweryList;
