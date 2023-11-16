'use client';

import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  //En el input le decimos que onChange, cambie la url por el querry
  //useDebounceCallback crea un retraso en la peticion al servidor para no crear demasiadas solicitudes
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set('q', e.target.value);
    } else {
      params.delete('q');
    }

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        onChange={handleSearch}
        type="text"
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Search;
