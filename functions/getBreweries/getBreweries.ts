import { Handler } from '@netlify/functions';
const axios = require('axios').default;

export const handler: Handler = async (event, context) => {
  try {
    const breweries = await axios.get(
      `https://api.openbrewerydb.org/breweries?per_page=50&by_city=austin&by_state=texas&sort=asc`,
    );
    return {
      statusCode: 200,
      body: JSON.stringify(breweries.data),
    };
  } catch {
    return {
      statusCode: 500,
      body: `GET request failed to gather Austin Breweries from openbrewerydb`,
    };
  }
};
