import Link from 'next/link';
import { menuItems } from './data-navItems';
import { MdAttachMoney, MdDashboard, MdShoppingBag } from 'react-icons/md';
import { auth } from '@/app/auth';
import Image from 'next/image';

export default async function Navbar() {
  const user = await auth();

  return (
    <header className="bg-purple-900 text-white py-4 ms:flex ms:justify-center ms:items-center">
      <nav className="md:container md:mx-auto md:flex ms:flex-col justify-between">
        <div className="flex gap-4 items-center text-lg font-bold">
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
        <ul className="flex gap-2 space-x-4">
          {menuItems.map((item) => (
            <li key={item.title} className="flex items-center">
              <Link
                className="flex items-center text-sm hover:text-purple-500"
                href={item.path}
              >
                <>
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  <span>{item.title}</span>
                </>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
