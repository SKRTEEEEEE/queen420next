import Navbar from '../../ui/dashboard/navbar/navbar';
import Sidebar from '../../ui/dashboard/sidebar/sidebar';
//import styles from '../../ui/dashboard/dashboard.module.css';
import Footer from '../../ui/dashboard/footer/footer';

const Layout = ({ children }) => {
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
