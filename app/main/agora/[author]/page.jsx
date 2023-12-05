// import { auth } from '@/app/auth';
import { fetchArticlesReposted, fetchArticlesbyAuthor } from '@/app/lib/data';
import Categories from '@/app/ui/agora/blog/categories';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import { GrAddCircle } from 'react-icons/gr';

const AgoraAuthor = async ({ params, searchParams }) => {
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const cat = searchParams?.cat || '';
  const { author } = params;
  const authorCapital = author.toUpperCase();
  // const user = await auth();
  // const userId = user.id;
  // console.log(userId);
  // const { countReposted, articlesReposted } =
  const { countReposted, articlesReposted } = await fetchArticlesReposted(
    author,
    cat,
    q,
    page
  );
  const { countAuthor, articlesAuthor } = await fetchArticlesbyAuthor(
    author,
    cat,
    q,
    page
  );
  console.log(countReposted, articlesReposted);
  const count = countAuthor;
  +countReposted;
  const articles = [...articlesAuthor, ...articlesReposted];
  return (
    <div className="flex h-screen sm:p-4 bg-white ">
      <div className="mx-auto max-w-7xl sm:p-4 md:px-4 lg:px-8">
        <div className="md:py-8 sm:py-0">
          <div className="mx-auto md:justify-between max-w flex lg:mx-0">
            <div className="justify-items-start flex-col max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 ">
                {authorCapital} blog
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                This will be a user blog personalizated text.
              </p>
            </div>
            <div>
              <Link
                href="/main/agora/addArticle"
                className="sm:flex items-center sm:gap-24"
              >
                <p className="text-fuchsia-800">Add new article:</p>
                <GrAddCircle size={30} color="black" />
              </Link>
              <div className="h-18 md:pt-10 md:flex gap-8 ">
                <p className="text-fuchsia-300 ">Show me articles about: </p>
                <Categories searchParams={searchParams} />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-6 sm:mt-2 sm:p-4 p-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  {/* <time dateTime={post.createdAt} className="text-gray-500">
              {post.updatedAt}
            </time>*/}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/main/agora/${post.author}/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="md:mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.summary}
                  </p>
                </div>
                <div className="relative mt-6 flex items-center gap-x-4">
                  {/* <img
              src={post.author.imageUrl}
              alt=""
              className="h-10 w-10 rounded-full bg-gray-50"
            /> */}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">{post.author}</p>
                    {/* <p className="text-gray-600">{post.author.role}</p> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="md:py-2">
          <Pagination count={count} ITEMS_PAGE={3} />
        </div>
        <Search placeholder={'Search by tittle'} />
      </div>
    </div>
  );
};

export default AgoraAuthor;
