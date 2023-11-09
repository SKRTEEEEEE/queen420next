import styles from '@/app/ui/login/login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <h1>LogIn</h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>START</button>
      </form>
    </div>
  );
};

export default Login;
