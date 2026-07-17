import React from 'react';
import Navbar from './Navbar';

export default function App() {
  const navLinks = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Contact', url: '/contact' }
  ];

  return (
    <div>
      <Navbar 
        brandName="AngaarDev" 
        links={navLinks} 
        theme="dark" 
      />
    </div>
  );
}