import React from 'react';
import { getLoginStatus, getUserData } from '../../store/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../components/common/logo/logo';
import UserSvg from '../../components/common/SVGs/UserSvg';
import HeaderLink from '../../components/ui/headerLink/';

const ContentMyAccount = () => {
  const isLogin = useSelector(getLoginStatus());
  const userData = useSelector(getUserData());

  return (
    <>
      {isLogin ? (
        <Link to="/account" className="head-link__content--link">
          {userData?.firstName}
        </Link>
      ) : (
        <Link to="/auth/register/" className="head-link__content--link">
          Register
        </Link>
      )}
      {' | '}
      {isLogin ? (
        <Link to="/auth/logout" className="head-link__content--link">
          Logout
        </Link>
      ) : (
        <Link to="/auth/login" className="head-link__content--link">
          Login
        </Link>
      )}
    </>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <div className="links-box">
        <HeaderLink svg={<UserSvg />} header={'My account'} content={<ContentMyAccount />} />
      </div>
    </header>
  );
};
export default Header;
