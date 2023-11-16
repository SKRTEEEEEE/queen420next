import styles from '@/app/ui/login/login.module.css';
//import { authenticate } from '../lib/actions';
import LoginForm from '../ui/login/loginForm/loginForm';

const Login = () => {
  return (
    <div className={styles.container}>
      {/* <form action={authenticate} className={styles.form}>
        <h1>LogIn</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>START</button>
      </form> */}
      <LoginForm />
    </div>
  );
};

export default Login;
