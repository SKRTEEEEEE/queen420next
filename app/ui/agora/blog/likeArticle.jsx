// 'use client';

import { addLikeArticle, dislikeArticle } from '@/app/lib/actions';
import { AiFillLike } from 'react-icons/ai';

const LikeArticle = ({ article, userId }) => {
  // const [liked, setLiked] = useState(!article.likes.includes(userId))
  const articleId = article._id.toHexString();
  const handleLikeClick = addLikeArticle.bind(null, articleId, userId);
  const handleDislikeClick = dislikeArticle.bind(null, articleId, userId);

  return (
    <form
      action={
        article.likes.includes(userId) ? handleDislikeClick : handleLikeClick
      }
    >
      <button type="submit" className="flex gap-2 w-10">
        <AiFillLike color={article.likes.includes(userId) ? 'red' : ''} />
        {article.likes.length}
      </button>
    </form>
  );
};

export default LikeArticle;
