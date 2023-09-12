import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-[calc(100vh-72px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
