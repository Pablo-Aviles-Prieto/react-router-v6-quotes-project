import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = lazy(() => import('./pages/NewQuote.js'));
const QuoteDetail = lazy(() => import('./pages/QuoteDetail.js'));
const NotFound = lazy(() => import('./pages/NotFound.js'));
const AllQuotes = lazy(() => import('./pages/AllQuotes.js'));
const Comments = lazy(() => import('./components/comments/Comments.js'));
const CommentButton = lazy(() => import('./pages/CommentButton.js'));

const App = () => {
  // In the nested routes for the quotes/:quoteId, we create an index element that is the button, that only be will displayed when we are in the index of that path, if it changes to the comments nested URL for example, the button component wont be rendered.
  // Also, we can implement this creating a nested route with the same path, so it only will be rendered in that path, when it changes, it wont since its not in the father component, its a children component for that exact path.
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Navigate to='/quotes' replace />} />
          <Route path='/quotes' element={<AllQuotes />} />
          <Route path='/quotes/:quoteId/*' element={<QuoteDetail />}>
            <Route index element={<CommentButton />} />
            {/* <Route path='/quotes/:quoteId' element={<CommentButton />} /> */}
            <Route path='comments' element={<Comments />} />
          </Route>
          <Route path='/new-quote' element={<NewQuote />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
