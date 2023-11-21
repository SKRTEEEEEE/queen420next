import { fetchArticle } from '@/app/lib/data';
import ArticleContent from '@/app/ui/agora/blog/articleContent';
import Comentary from '@/app/ui/agora/blog/comentary';
import Image from 'next/image';

const SingleArticlePage = async ({ params }) => {
  const { id } = params;
  const article = await fetchArticle(id);

  return (
    <div className="flex">
      {/* Sección 1: Título, Autor e Imagen */}
      <div className="xl:flex-col flex-wrap w-screen">
        <div className="xl:flex sm:h-screen">
          <div className="w-full sm:w-2/4 justify-center ">
            <div className="bg-red-800 botom-0 md:px-8 text-white ">
              <h1 className="text-3xl font-bold ">{article.title}</h1>
              <div className="flex items-center ">
                <img
                  src="ruta/imagen-autor.jpg"
                  alt="Autor"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span>{article.author}</span>
              </div>
              {/* Puedes agregar estilos futuristas aquí */}
            </div>
            <Comentary />
          </div>

          {/* Sección 2: Texto del artículo */}
          <div className="bg-yellow-800 w-screen p-8 sm:h-screen flex">
            <ArticleContent content={article.content} />
            {/* Puedes agregar estilos futuristas aquí */}
          </div>
        </div>

        {/* Imagen como "footer" en la parte inferior izquierda */}
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

      {/* Sección 4: Comentarios */}
    </div>
  );
};

export default SingleArticlePage;
