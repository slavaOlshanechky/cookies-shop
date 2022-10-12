import React from 'react';
import FacebookSvg from '../../components/common/SVGs/FacebookSvg';
import InstagramSvg from '../../components/common/SVGs/InstagramSvg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__part1">
        <h1 className="footer__h1">Contact us</h1>
        <h2 className="footer__h2">+972539344335</h2>
        <h3 className="footer__h3">info@ginger.cakes.com</h3>
        <div className="footer__address">
          <p className="footer__p">HaMaapilim St. 8 office 4</p>
          <p className="footer__p">Holon</p>
          <p className="footer__p">Israel</p>
        </div>
      </div>
      <div className="footer__part2">
        <h1 className="footer__h1">Contact with socials</h1>
        <div className="footer__social-icons">
          <FacebookSvg />
          <InstagramSvg />
        </div>
        <h1 className="footer__h1">
          <span className="cookies">Kate&apos;s Ginger Cookies</span>
        </h1>
        <p className="footer__p">Copyright &copy; 2022</p>
      </div>
    </div>
  );
};

export default Footer;
