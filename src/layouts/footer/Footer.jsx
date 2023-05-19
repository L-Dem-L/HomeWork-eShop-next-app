import React from 'react';
import s from "./Footer.module.scss";

const Footer = () => {
  const data = new Date();
  return (
    <>
      <footer className={s.footer}>
        <h1 className={s.footer__text}>Zefir Front-end {data.getFullYear()}</h1>
      </footer>
    </>
  )
}

export default Footer;