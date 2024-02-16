// 'use client';

import { addLikeComment, dislikeComment } from '@/app/lib/actions';
import { AiFillLike } from 'react-icons/ai';

const LikeComments = ({ comment, userId }) => {
  // const [liked, setLiked] = useState(!comment.likes.includes(userId))
  const commentId = comment._id.toHexString();
  const handleLikeClick = addLikeComment.bind(null, commentId, userId);
  const handleDislikeClick = dislikeComment.bind(null, commentId, userId);

  return (
    <form
      action={
        comment.likes.includes(userId) ? handleDislikeClick : handleLikeClick
      }
    >
      <button type="submit" className="flex gap-2 w-10">
        <AiFillLike color={comment.likes.includes(userId) ? 'red' : ''} />
        {comment.likes.length}
      </button>
    </form>
  );
};

export default LikeComments;
