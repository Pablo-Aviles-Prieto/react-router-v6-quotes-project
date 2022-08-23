import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.js';
import useHttp from '../hooks/use-http.js';
import { getAllQuotes } from '../lib/api.js';
import { NoQuotesFound } from '../components/quotes/NoQuotesFound.js';

const AllQuotes = () => {
  // We pass this 2nd argument expected by useHttp to set the status to pending right from the start (since we dont have any data from useEffect, so we cant render the QuoteList because we would pass undefined and would crash the app).
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  // After the loading check, we want to check if there was an error.
  if (error) {
    return <p className='centered focus'>{error}</p>;
  }

  // Last check in case it was completed and we dont have any quote.
  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
