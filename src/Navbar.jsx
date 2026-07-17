import React from 'react';

export default function Navbar({ brandName = 'DevSpace', links = [], theme = 'dark' }) {
  const isDark = theme === 'dark';
  
  const navStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    fontFamily: 'sans-serif',
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const brandStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: isDark ? '#00ffcc' : '#333333',
  };

  const listStyles = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '20px',
  };

  const linkStyles = {
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    color: isDark ? '#cccccc' : '#666666',
    transition: 'color 0.2s',
  };

  return (
    <nav style={navStyles}>
      <div>
        <a href="/" style={brandStyles}>{brandName}</a>
      </div>
      <ul style={listStyles}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} style={linkStyles}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}