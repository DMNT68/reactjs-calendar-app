import React from 'react';

export const LoadingScreen = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', height: '100vh', width: '100vw', }}>
      <h1 className="mb-5">Please Wait...</h1>
      <div className="dot-windmill"></div>
    </div>
  );
};
