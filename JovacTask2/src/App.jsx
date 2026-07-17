import React from 'react';
import CardWrapper from './CardWrapper';

export default function App() {
  return (
    <div style={{ backgroundColor: '#121214', minHeight: '100vh', padding: '20px' }}>
      <CardWrapper title="User Profile">
        <p>Name: SHIV</p>
        <p>Role: Full Stack Developer</p>
      </CardWrapper>

      <CardWrapper title="Quick Progress Stats">
        <ul>
          <li>Solved: 15 Assignments</li>
          <li>Current Streak: 12 Days</li>
        </ul>
      </CardWrapper>

      <CardWrapper>
        <p>This is an announcement with no title, styled beautifully inside the wrapper.</p>
        <button style={{ backgroundColor: '#00ffcc', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Dismiss
        </button>
      </CardWrapper>
    </div>
  );
}