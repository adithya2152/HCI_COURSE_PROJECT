import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import LoadingBar from '../ui/LoadingBar';
import { useLoadingState } from '../../hooks/useLoadingState';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isLoading, loadingProgress } = useLoadingState();
  
  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && <LoadingBar progress={loadingProgress} />}
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;