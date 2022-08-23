import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList.js';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId, isAddingComment]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // We wrap with useCallback since we are passing this Fn to the children NewCommentForm, and is a depedency of the useEffect in that component. We use it to avoid infinite loops, since it could happen that this Fn is recreated everytime this component recreates, and would execute the useEffect of the children.
  // In case we would like to keep the form open to write more comments (since we close with the false state we set here), we could use another diff state or we could even fetch the data again.
  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false);
  }, [setIsAddingComment]);

  // Since we want to output the LoadingSpinner component in front of the form, we wont render it in a if block with just the div and the LoadingSpinner. We set a dynamic variable depending on the status state from the useReducer of useHttp hook.
  let comments;

  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>No comments were added yet!</p>;
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
