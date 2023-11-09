import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/users/users.module.css';
import Image from 'next/image';
import Link from 'next/link';

const UsersPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search the user" />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New User</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.users}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Jhon Dee
              </div>
            </td>
            <td>jhon@gmail.com</td>
            <td>12/09/2023</td>
            <td>Admin</td>
            <td>
              <Link href="/dashboard/users/test">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <Link href="#">
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
