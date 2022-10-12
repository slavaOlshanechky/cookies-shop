import React from 'react';
import { useHistory } from 'react-router-dom';
import './_index.scss';

const Logo = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className="logo" onClick={handleClick}>
      <img src="/client/public/logo/logo.png" alt="logo" className="logo__image" />
      <h1 className="logo__company-name">
        <span className="logo__company-name--cookies">Kate&apos;s Ginger Cookies</span>
      </h1>
      <span className="logo__company-name--store">The Confectionery Store</span>
    </div>
  );
};

export default Logo;
