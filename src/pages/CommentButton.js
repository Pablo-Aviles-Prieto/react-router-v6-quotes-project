import { Link } from 'react-router-dom';

const CommentButton = () => {
  return (
    <div className='centered'>
      <Link className='btn--flat' to='comments'>
        Load comments
      </Link>
    </div>
  );
};

export default CommentButton;
