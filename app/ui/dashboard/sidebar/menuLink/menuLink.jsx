'use client';

import Link from 'next/link';
//import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`flex items-center w-full gap-10 margin-5 0 rounded-sm ${
        pathname === item.path && 'bg-blue-800'
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
