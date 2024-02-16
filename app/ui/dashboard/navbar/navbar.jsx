'use client';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from 'react-icons/md';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-bgSoft md:p-2 h-18 md:w-4/5 rounded-md flex items-center justify-between">
      <div className="text-textSoftfont-bold text-transform-capitalize">
        {pathname.split('/').pop()}
      </div>
      <div className="flex md:w-3/5 md:gap-6 items-center md:gap-4 ">
        <div className="flex md:gap-6 items-center bg-fuchsia-700 bg-opacity-10 px-4 rounded-md">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-text outline-none"
          />
        </div>
        <div className="flex md:gap-4">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <Link href="/main">
            <MdPublic size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
