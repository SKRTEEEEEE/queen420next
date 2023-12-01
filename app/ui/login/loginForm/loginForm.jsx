'use client';

import { authenticate } from '@/app/lib/actions';
import styles from './loginForm.module.css';
// import { useFormState } from 'react-dom';
import { useState } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// const router = useRouter();

const LoginForm = () => {
  const [err, setErr] = useState();
  const handleLogin = async (formData) => {
    const data = await authenticate(formData);

    console.log(data);
    data?.error && setErr(data?.error);
  };

  return (
    <form action={handleLogin} className={styles.form}>
      <h1>Login</h1>

      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />

      <button>
        <Link href="/main">Login</Link>
      </button>

      {err && err}
    </form>
  );
};

export default LoginForm;
