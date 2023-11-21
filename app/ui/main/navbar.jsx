import { menuItems } from './data-navItems';
import { auth } from '@/app/auth';
import Image from 'next/image';
import MenuLink from '../dashboard/sidebar/menuLink/menuLink';
export default async function Navbar() {
  const user = await auth();

  return (
    <header className=" flex sm:space-x-20 md:space-x-10 justify-center items-center bg-red-600">
      {' '}
      <div className="xl:flex sm:basis-1/5 sm:items-center">
        Welkome{' '}
        <Image
          className="rounded-full border-4 border-blue-500 hover:border-pink-500 transition-transform transform hover:scale-110 duration-300"
          src={user.img || '/noavatar.png'}
          width="50"
          height="50"
          alt=""
        />
        {user?.username}
      </div>
      <div className="flex-wrap sm:basis-4/5 bg-yellow-300">
        <ul>
          {menuItems.map((list) => (
            <li key={list.title}>
              <ul className="flex flex-wrap sm:space-x-2  bg-green-600">
                {list.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
