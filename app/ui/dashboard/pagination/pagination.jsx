'use client';

//import styles from './pagination.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ ITEMS_PAGE, count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page') || 1;

  const params = new URLSearchParams(searchParams);
  //const ITEMS_PAGE = 2;

  const hasPrev = ITEMS_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEMS_PAGE * (parseInt(page) - 1) + ITEMS_PAGE < count;

  const handleChangePage = (type) => {
    //cambiamos el valor de "params"
    type === 'prev'
      ? params.set('page', parseInt(page) - 1)
      : params.set('page', parseInt(page) + 1);

    replace(`${pathname}?${params}`);
  };

  return (
    <div className=" flex text-fuchsia-700	justify-between">
      <button
        className={`w-40 p-2 px-4 rounded-md cursor-pointerw-40 border-2 border-fuchsia-700 ${
          hasPrev
            ? ''
            : ' bg-opacity-20 cursor-not-allowed rounded-md bg-fuchsia-300 bg-opacity-20 '
        }`}
        disabled={!hasPrev}
        onClick={() => handleChangePage('prev')}
      >
        Previous
      </button>
      <button
        className={`p-2 w-40  px-4 rounded-md cursor-pointer border-fuchsia-700 border-2 w-40${
          hasNext
            ? ''
            : ' cursor-not-allowed rounded-md rounded-md bg-opacity-20 bg-fuchsia-300 '
        }`}
        disabled={!hasNext}
        onClick={() => handleChangePage('next')}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
