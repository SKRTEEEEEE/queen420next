import { redirect } from 'next/navigation';
import { auth } from '../auth';

export default async function LoginLayout({ children }) {
  const user = await auth();
  if (user) {
    redirect('/main');
  }
  return <>{children}</>;
}
