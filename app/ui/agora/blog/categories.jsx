'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
//import { useDebouncedCallback } from 'use-debounce';

const Categories = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Obten el valor actual de 'cat' desde los parámetros de búsqueda
  const currentCatValue = searchParams.get('cat');

  // Función para manejar cambios en el select
  const handleOptionCat = (event) => {
    const params = new URLSearchParams(searchParams);
    const selectedValue = event.target.value;
    // Actualiza 'cat' en los parámetros de búsqueda
    if (searchParams) {
      params.set('cat', selectedValue);
    }

    // Reemplazar la URL con los nuevos parámetros
    replace(`${pathname}?${params}`);
  };

  return (
    <select
      className="text-fuchsia-700 border-fuchsia-500 border-2 rounded-lg h-8 text-center"
      name="category"
      id="category"
      placeholder="Search by category"
      value={currentCatValue}
      onChange={handleOptionCat}
    >
      <option value="">Everything</option>
      <option value="policy">Policy</option>
      <option value="programming">Programming</option>
      <option value="web3">Web3</option>
      <option value="techs">Techs</option>
    </select>
  );
};

export default Categories;
