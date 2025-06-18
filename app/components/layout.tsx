import React from 'react';
import Navbar from './navbar';
import { Outlet } from 'react-router';

const Layout: React.FC = () => {
    return (
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      );
    };

export default Layout;