import Image from 'next/image';

import styles from './sidebar.module.css';
import { menuItems } from './data-menuItems';
import MenuLink from './menuLink/menuLink';
import { MdLogout } from 'react-icons/md';
// import { auth, signOut } from '@/app/auth';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          width="50"
          height="50"
          alt=""
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Jhon Dee</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
