import React from "react";
import s from "./Header.module.scss";
import Link from "next/link";
import Search from "@/components/Search/Search";
import Nav from "@/components/Nav/Nav";
import Order from "@/components/Order/Order";

const header = ({ props }) => {
  return (
    <>
      <header className={s.header}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-2">
              <Link className={s.header__logo} href="/">
                eShop
              </Link>
            </div>
            <div className="col-5">
              <Search props={props} />
            </div>
            <div className="col-4">
              <Nav />
            </div>
            <div className="col-1">
              <Order />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default header;
