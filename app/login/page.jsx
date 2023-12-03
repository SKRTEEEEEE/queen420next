import LoginForm from '../ui/login/loginForm/loginForm';
// import { signIn } from '@/app/auth';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
        {/* <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button>Login with GOOOOOOOOGLE</button>
        </form> */}
      </div>
    </main>
  );
}
