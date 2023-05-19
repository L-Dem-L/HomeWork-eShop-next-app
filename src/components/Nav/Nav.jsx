import React, { useState } from 'react';
import s from "./Nav.module.scss";
import Link from 'next/link';

const links = [
  { text: 'Products', path: '/products' },
  { text: 'Payment', path: '/payment' },
  { text: 'Delivery', path: '/delivery' },
];

const Nav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <ul className={s.nav}>
        {links.map((link, index) => (
          <li
            key={index}
            className={`${s.nav__item} ${
              activeIndex === index ? s.active : ''
            }`}
          >
            <Link href={link.path} onClick={() => handleLinkClick(index)}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;