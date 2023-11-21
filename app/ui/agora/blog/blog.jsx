import { fetchArticles } from '@/app/lib/data';
import Link from 'next/link';
import Search from '../../dashboard/search/search';
import Pagination from '../../dashboard/pagination/pagination';
import Categories from './categories';

export default async function Blog({ searchParams }) {
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const cat = searchParams?.cat || '';
  const { count, articles } = await fetchArticles(cat, q, page);

  return (
    <div className="flex h-screen sm:p-4 bg-white ">
      <div className="mx-auto max-w-7xl sm:p-4 md:px-4 lg:px-8">
        <div className="md:py-8 sm:py-0">
          <div className="mx-auto md:justify-between max-w flex lg:mx-0">
            <div className="justify-items-start flex-col max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 ">
                From the blog
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
            </div>
            <div className="h-18 md:pt-10 md:flex gap-8 ">
              <p className="text-fuchsia-300 ">Show me articles about: </p>
              <Categories searchParams={searchParams} />
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
                    <p className="font-semibold text-gray-900">
                      <Link href={`/main/agora/${post.author}`}>
                        <span className="absolute inset-0" />
                        {post.author}
                      </Link>
                    </p>
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
}
