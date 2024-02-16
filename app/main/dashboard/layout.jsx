import Navbar from '../../ui/dashboard/navbar/navbar';
import Sidebar from '../../ui/dashboard/sidebar/sidebar';
import Footer from '../../ui/dashboard/footer/footer';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
//import { isAdminAuth } from '@/app/lib/utils';

const Layout = async ({ children }) => {
  const user = await auth();
  //console.log(user.isAdmin);
  if (!user.isAdmin) {
    redirect('/main');
  }
  return (
    <div className="flex h-screen  w-full">
      <div
        className="flex 
      w-1/5
      bg-bgSoft min-h-screen"
      >
        <Sidebar />
      </div>
      <div className="w-4/5 flex flex-col min-h-screen">
        <Navbar />

        {children}

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
