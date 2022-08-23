import { useParams, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { HighlightedQuote } from '../components/quotes/HighlightedQuote.js';
import useHttp from '../hooks/use-http.js';
import { getSingleQuote } from '../lib/api.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.js';

 const QuoteDetail = () => {
  const params = useParams();
  // We start the status as pending so it can make the request, and then pass the info
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  // we extract the quoteId from params to pass only that property, if we would pass params.quoteId to the dependency of the useEffect, it would execute the useEffect for every change in the params obj, not only in the quoteId obj.
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  // We want to check for the text property. In case we wouldnt have a loading state, with the '"?" optional chaining operator' we could check if there is a text prop, since we have an id prop always because we pass the paramsID introduced by the user, to the Fn returned from the hook (sendRequest), and that hook, pass it to the getSingleQuote Fn of lib/api.js
  // We dont need it with the loading state we have in the useReducer status property from the useHttp hook. We could just check for !loadedQuote.text
  if (!loadedQuote?.text) {
    return <h1>No quote found!</h1>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <Routes>
        <Route path='' element={<CommentButton />} />
      </Routes> */}
      <Outlet />
    </>
  );
};

export default QuoteDetail