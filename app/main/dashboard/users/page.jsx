import { deleteUser } from '@/app/lib/actions';
import { fetchUsers } from '@/app/lib/data';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/users/users.module.css';
import Image from 'next/image';
import Link from 'next/link';

const UsersPage = async ({ searchParams }) => {
  //Recuperamos de searchParams el querry y lo guardamos en q para pasarlo a fetchUsers();
  const q = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
  return (
    <div className="p-2 max-h-screen bg-bgSoft">
      <div className=" flex flex-col md:flex-row items-center justify-between mb-4">
        <Search placeholder="Search the user" />
        <Link href="/main/dashboard/users/add">
          <button className=" p-2 bg-purple-600 text-white rounded-md cursor-pointer">
            Add New User
          </button>
        </Link>
      </div>
      <div className="pl-6 py-4">
        <table className="w-full">
          <thead>
            <tr className="text-xl ">
              <td>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Role</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="py-4 gap-4 flex items-center ">
                    <Image
                      src={user.img || '/noavatar.png'}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10"
                    />
                    {user.username}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.createdAt
                    ? user.createdAt.toString().slice(4, 16)
                    : 'No Info'}
                </td>
                <td>
                  {user.isAdmin ? 'Admin' : user.isStore ? 'Store' : 'Client'}
                </td>
                <td>
                  <Link href={`/main/dashboard/users/${user.id}`}>
                    <button className="w-20 bg-teal-500 text-white rounded-md cursor-pointer">
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
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

export default UsersPage;
