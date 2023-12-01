// import styles from '@/app/ui/login/login.module.css';
// //import { authenticate } from '../lib/actions';
// import { redirect } from 'next/navigation';
// import { auth } from '../auth';
import LoginForm from '../ui/login/loginForm/loginForm';

export default function LoginPage() {
  // const user = await auth();
  // if (user) {
  //   redirect('/main');
  // }
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
      </div>
    </main>
  );
}
