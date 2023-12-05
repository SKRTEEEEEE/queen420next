import { auth } from '@/app/auth';
import { fetchArticle } from '@/app/lib/data';
import ArticleContent from '@/app/ui/agora/blog/articleContent';
import Comentary from '@/app/ui/agora/blog/comentary';
import LikeArticle from '@/app/ui/agora/blog/likeArticle';
import LikeComments from '@/app/ui/agora/blog/likeComments';
import RepostArticle from '@/app/ui/agora/blog/repostArticle';
// import SeeComments from '@/app/ui/agora/blog/seeComments';
import Image from 'next/image';
import Link from 'next/link';
// import { AiFillLike } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { FaUserNinja } from 'react-icons/fa';
// import { addLikeComment } from '@/app/lib/actions';

const SingleArticlePage = async ({ params }) => {
  const { id } = params;
  const article = await fetchArticle(id);
  //Filtramos los comentarios asociados a este articulo
  const comments = article.comments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordenar por fecha de creación, de más reciente a más antiguo
    .slice(0, 4); // Limitar a 4 comentarios

  const user = await auth();

  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(
      'es-ES',
      options
    );
    return formattedDate;
  }

  return (
    <div className="flex">
      <div className="xl:flex-col flex-wrap w-screen">
        <div className="xl:flex sm:h-screen">
          <div className="w-full sm:w-2/4 gap-2 w-10 ">
            <div className="bg-red-800 botom-0 md:px-8 text-white ">
              <h1 className="text-3xl font-bold ">{article.title}</h1>
              <div className="flex items-center ">
                <img
                  src="ruta/imagen-autor.jpg"
                  alt="Autor"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span>{article.author}</span>
                <LikeArticle article={article} userId={user.id} />

                {/* //En el futuro hacer que solo pueda hacer repost el usuario que sea isStore, sino que no aparezca */}
                <RepostArticle
                  article={article}
                  userId={user.id}
                  username={user.username}
                />
                <p className="flex gap-2 w-25">
                  <BsCalendarDate /> {formatDate(article.createdAt)}
                </p>
              </div>
            </div>
            <Comentary articleId={id} user={user} />
            {/* Mostrar los comentarios */}
            {comments.map((comment) => (
              <div key={comment._id}>
                {/* Mostrar el contenido del comentario, autor, etc. */}

                <p>{comment.content}</p>
                <div className="flex justify-around">
                  <LikeComments comment={comment} userId={user.id} />
                  {/* Hay que hacer que solo se pueda ir al agora del author si este es Store o Eliminar esta parte */}
                  <Link
                    href={user.isStore ? `/main/agora/${comment.author}` : ``}
                    className="flex gap-2 w-20"
                  >
                    <FaUserNinja />
                    {comment.author}
                  </Link>

                  <p className="flex gap-2 w-25">
                    <BsCalendarDate /> {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-800 w-screen p-8 sm:h-screen flex">
            <ArticleContent content={article.content} />
          </div>
        </div>
        <div className="xl:fixed w-max h-40 bottom-0 left-0">
          <Image
            src={article.img || '/noproduct.jpg'}
            alt=""
            width={480}
            height={120}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;
