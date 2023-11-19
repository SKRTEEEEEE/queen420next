import Image from 'next/image';
//import styles from './sidebar.module.css';
import { menuItems } from './data-menuItems';
import MenuLink from './menuLink/menuLink';
import { MdLogout } from 'react-icons/md';
import { auth, signOut } from '@/app/auth';

const Sidebar = async () => {
  const user = await auth();
  //console.log(session);
  return (
    <div className="h-screen fixed w-1/5 items-center justify-center p-4 bg-gray-800 rounded-md">
      <div className="flex flex-row items-center justify-center mb-4">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full object-cover"
            src={user.img || '/noavatar.png'}
            width="80"
            height="80"
            alt=""
          />
        </div>
        <div className="text-white text-center ml-4">
          <span className="font-semibold text-lg block">{user.username}</span>
          <span className="text-sm block">Administrator</span>
        </div>
      </div>

      <ul className="list-none items-center  grid text-white">
        {menuItems.map((cat) => (
          <li key={cat.title} className="mb-1">
            <span className="font-bold text-xs mb-1">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        className="items-center mt-4"
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="py-4 sm:py-0 flex items-center justify-center cursor-pointer rounded-md border-none text-white w-full bg-blue-500 hover:bg-blue-700 ">
          <MdLogout className="text-xl" />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
