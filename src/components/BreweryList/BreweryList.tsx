import React from 'react';
import { useQuery } from 'react-query';

import './BreweryList.scss';
import BreweryCard from '../BreweryCard/BreweryCard';
import { formatAddress } from '../../utilities';

const axios = require('axios').default;

const getBreweries = async () => {
  const { data } = await axios.get(`/api/getBreweries`);
  return data;
};

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
              street: string | null;
              city: string;
              state: string;
              postal_code: string;
              website_url: string | null;
              latitude: string | null;
              longitude: string | null;
              phone: string | null;
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
              lat: breweryInfo.latitude,
              lng: breweryInfo.longitude,
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
