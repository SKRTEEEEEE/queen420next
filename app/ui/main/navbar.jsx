import { menuItems } from './data-navItems';

import { auth } from '@/app/auth';
import Image from 'next/image';
import MenuLink from '../dashboard/sidebar/menuLink/menuLink';
//"flex items-center text-sm hover:text-purple-500"
export default async function Navbar() {
  const user = await auth();

  return (
    // <header className="sm:px-4 sm:px-10 bg-purple-900 xl:h-16 text-white sm:py-2 ms:flex ms:justify-center ms:items-center">
    //   <nav className="md:container mx-auto sm:flex ms:flex-col md:justify-between">
    //     <div className="flex gap-4 items-center text-lg font-bold">
    //       Welkome{' '}
    //       <Image
    //         className="rounded-full border-4 border-blue-500 hover:border-pink-500 transition-transform transform hover:scale-110 duration-300 sm:transparent"
    //         src={user.img || '/noavatar.png'}
    //         width="50"
    //         height="50"
    //         alt=""
    //       />
    //       {user?.username}
    //     </div>
    //     <ul className="flex flex-wrap xl:gap-2 xl:space-x-4">
    //       {menuItems.map((list) => (
    //         <li key={list.title}>
    //           <ul className="flex w-full h-max xl:space-x-4">
    //             {list.list.map((item) => (
    //               <MenuLink item={item} key={item.title} />
    //             ))}
    //           </ul>
    //         </li>
    //       ))}
    //     </ul>
    //   </nav>
    // </header>
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
