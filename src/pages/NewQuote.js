import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import QuoteForm from '../components/quotes/QuoteForm.js';
import useHttp from '../hooks/use-http.js';
import { addQuote } from '../lib/api.js';

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  // Instead of redirecting with the navigate Fn provided by useNavigate hook, we check for changes in the status state and redirect when is completed (is completed when the fetch succeded or had an error).
  // navigate wont change, but we have to add it as dependency (it wont change since its provided by a hook).
  useEffect(() => {
    // We could add here extra logic for handling errors.
    if (status === 'completed') {
      navigate('/quotes');
    }
  }, [status, navigate]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  // We want to set isLoading to true only when the status state is 'pending', so it can render the LoadingSpinner in that component if its true.
  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
