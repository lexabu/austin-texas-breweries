import React from 'react';
import './BreweryCard.scss';

type Props = {
  brewery: {
    name: string;
    type: string;
    address: string;
    URL: string;
  };
};

function BreweryCard({ brewery }: Props) {
  const { name, type, address, URL } = brewery;
  return (
    <div className="brewery-card">
      <h2> {name} </h2>
      <h2> {type} </h2>
      <h2> {address} </h2>
      <h2> {URL} </h2>
    </div>
  );
}

export default BreweryCard;
