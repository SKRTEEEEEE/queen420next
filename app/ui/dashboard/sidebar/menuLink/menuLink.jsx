'use client';

import Link from 'next/link';
//import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  // console.log(pathname, item.path);
  // console.log(item.path);

  return (
    <Link
      href={item.path}
      className={`flex items-center p-1 gap-10 rounded-sm ${
        pathname === item.path &&
        'bg-fuchsia-200/50 rounded-md border-b-white/10 border-4'
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
