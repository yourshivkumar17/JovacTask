import React from 'react';

export default function CardWrapper({ children, title }) {
  const wrapperStyle = {
    backgroundColor: '#202024',
    border: '2px solid #00ffcc',
    borderRadius: '8px',
    padding: '20px',
    margin: '15px 0',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    fontFamily: 'sans-serif'
  };

  const titleStyle = {
    color: '#00ffcc',
    marginTop: 0,
    borderBottom: '1px solid #29292e',
    paddingBottom: '10px',
    marginBottom: '15px'
  };

  return (
    <div style={wrapperStyle}>
      {title && <h3 style={titleStyle}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}