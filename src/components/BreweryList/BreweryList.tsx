import React from 'react';
import { useQuery } from 'react-query';

import './BreweryList.scss';
import BreweryCard from '../BreweryCard/BreweryCard';
const axios = require('axios').default;

const getBreweries = async () => {
  const { data } = await axios.get(`/api/getBreweries`);
  return data;
};

function formatAddress(street: string, city: string, state: string, postal_code: string) {
  postal_code = postal_code.slice(0, 5);
  if (street === null) {
    return `${city}, ${state}, ${postal_code}`;
  } else {
    return `${street}, ${city}, ${state}, ${postal_code}`;
  }
}

function BreweryList() {
  const { data } = useQuery(
    'getBreweries',
    () => {
      return getBreweries();
    },
    {
      retry: false,
    },
  );

  if (data?.length) {
    return (
      <div className="brewery-list">
        {data.map(
          (
            breweryInfo: {
              name: string;
              brewery_type:
                | 'micro'
                | 'regional'
                | 'brewpub'
                | 'large'
                | 'planning'
                | 'contract'
                | 'proprietor'
                | 'closed';
              street: string;
              city: string;
              state: string;
              postal_code: string;
              website_url: string;
              latitude: string;
              longitude: string;
              phone: number;
            },
            index: number,
          ) => {
            const brewery = {
              name: breweryInfo.name,
              type: breweryInfo.brewery_type,
              address: formatAddress(
                breweryInfo.street,
                breweryInfo.city,
                breweryInfo.state,
                breweryInfo.postal_code,
              ),
              URL: breweryInfo.website_url,
              lat: parseFloat(breweryInfo.latitude) || 0,
              lng: parseFloat(breweryInfo.longitude) || 0,
              phone: breweryInfo.phone,
            };
            return <BreweryCard brewery={brewery} key={index + 1000} />;
          },
        )}
      </div>
    );
  } else {
    return null;
  }
}
export default BreweryList;
