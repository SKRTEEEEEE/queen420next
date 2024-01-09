import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '@/app/lib/data';
import { deleteProduct } from '@/app/lib/actions';

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);
  return (
    <div className="p-2 max-h-screen bg-bgSoft">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Search placeholder="Search the product" />
        <Link href="/main/dashboard/products/add">
          <button className=" p-2 bg-purple-600 text-white rounded-md cursor-pointer">
            Add New product
          </button>
        </Link>
      </div>
      <div className="pl-6 py-4">
        <table className="w-full">
          <thead>
            <tr className="text-xl ">
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Created At</td>
              <td>Stock</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="py-4 gap-4 flex items-center ">
                    <Image
                      src={product.img || '/noproduct.jpg'}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10"
                    />
                    {product.title}
                  </div>
                </td>
                <td>{product.desc}</td>
                <td>{product.price}€</td>
                <td>{product.createdAt?.toString().slice(4, 16)}</td>
                <td>{product.stock}</td>
                <td>
                  <Link href={`/main/dashboard/products/${product.id}`}>
                    <button className="w-20 bg-teal-500 text-white rounded-md cursor-pointer">
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="img" value={product.img} />
                    <button className="w-20 bg-red-800 text-white rounded-md cursor-pointer">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination count={count} ITEMS_PAGE={4} />
    </div>
  );
};

export default ProductsPage;
