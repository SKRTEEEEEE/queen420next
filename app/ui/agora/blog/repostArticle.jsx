import { disrepostArticle, repostArticle } from '@/app/lib/actions';
import { BiRepost } from 'react-icons/bi';

//En el futuro hacer que solo pueda hacer repost el usuario que sea isStore, sino que no aparezca

const RepostArticle = ({ article, userId, username }) => {
  // console.log(username);
  const articleId = article._id.toHexString();
  const handleRepostClick = repostArticle.bind(
    null,
    articleId,
    userId,
    username
  );
  const handleDisrepostClick = disrepostArticle.bind(
    null,
    articleId,
    userId,
    username
  );
  console.log(article);
  return (
    <form
      action={
        article.reposts.some(
          (repost) => String(repost.userId) === String(userId)
        )
          ? handleDisrepostClick
          : handleRepostClick
      }
    >
      <button type="submit" className="flex gap-2 w-10">
        <BiRepost
          color={
            article.reposts.some(
              (repost) => String(repost.userId) === String(userId)
            )
              ? 'red'
              : ''
          }
        />
        {article.reposts.length}
      </button>
    </form>
  );
};

export default RepostArticle;
