//真假值優化(參照setting頁)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { navDataLink, navDataBtn } from "./nav-data";
import { IconContext } from "react-icons";
import { Link as LinkS } from "react-scroll";
import { HashLink } from "react-router-hash-link";

const NavLink = ({ route, title, links, hashlink }) => {
  return (
    <>
      <li>
        <LinkS
          className={links + ` fs-7 nav-link`}
          to={route}
          spy={true}
          offset={-80}
        >
          {title}
        </LinkS>
        <HashLink className={hashlink + ` fs-7 nav-link`} to={`/#` + route}>
          {title}
        </HashLink>
      </li>
    </>
  );
};
const NavButton = ({ route, title }) => {
  return (
    <>
      <li>
        <Link className="nav-link px-2" to={route}>
          <button
            type="button"
            className="btn btn-outline-raccoon rounded-pill fs-8 nav-btn"
          >
            {title}
          </button>
        </Link>
      </li>
    </>
  );
};
const OffLink = ({ route, title, close, links, hashlink }) => {
  return (
    <>
      <li className="sidebar-link nav-item w-100">
        <LinkS
          className={
            links + ` nav-link py-3 d-flex align-items-center nopadding-top`
          }
          to={route}
          spy={true}
          offset={-80}
          onClick={close}
        >
          <h6 className="off-link m-0 w-100 text-center">{title}</h6>
        </LinkS>
        <HashLink
          className={hashlink + ` nav-link py-3 d-flex align-items-center`}
          to={`/#` + route}
          onClick={close}
        >
          <h6 className="off-link m-0 w-100 text-center">{title}</h6>
        </HashLink>
      </li>
    </>
  );
};
const OffButton = ({ route, title, icon, close }) => {
  return (
    <>
      <li className="offbtn nav-item">
        <Link
          className="nav-link d-flex flex-column align-items-center py-5"
          to={route}
          onClick={close}
        >
          <h6 className="off-link">{title}</h6>
          <IconContext.Provider value={{ size: "2rem" }}>
            {icon}
          </IconContext.Provider>
        </Link>
      </li>
    </>
  );
};
const NavBrand = () => {
  return (
    <>
      <img
        className="nav-logo d-inline-block d-none d-md-block"
        src="../../brand_logo.png"
        title="小浣熊代購趣"
        alt="小浣熊代購趣"
      />
      <img
        className="nav-logo d-inline-block d-block d-md-none"
        src="../../brand_logo_small.png"
        title="小浣熊代購趣"
        alt="小浣熊代購趣"
      />
      <div className=" nav-brand-title d-none d-md-block">小浣熊日本代購</div>
    </>
  );
};

const Navbar = (info) => {
  const [open, setOpen] = useState("");
  const openHandler = () => {
    setOpen("");
  };
  const links = info.info ? "" : "d-none";
  const hashlink = info.info ? "d-none" : "";

  return (
    <>
      <div className={open}>
        <aside className="off-canvas position-fixed">
          <div className="off-content">
            <nav className="d-flex flex-column h-100">
              <Link
                className="close-icon d-flex align-items-center justify-content-end p-3 w-100 "
                onClick={() => {
                  setOpen("");
                }}
              >
                <IconContext.Provider value={{ size: "2.5rem" }}>
                  <IoClose />
                </IconContext.Provider>
              </Link>
              <ul className="nav d-flex flex-column align-items-center h-auto">
                {navDataLink.map((item, index) => (
                  <OffLink
                    route={item.path}
                    title={item.title}
                    close={openHandler}
                    links={links}
                    hashlink={hashlink}
                    key={index}
                  />
                ))}
              </ul>
              <ul className="nav d-flex mt-auto">
                {navDataBtn
                  .slice(0)
                  .reverse()
                  .map((item, index) => (
                    <OffButton
                      route={item.path}
                      title={item.title}
                      icon={item.icon}
                      key={index}
                      close={openHandler}
                    />
                  ))}
              </ul>
            </nav>
          </div>
        </aside>
        <div className="position-fixed top-0 start-50 translate-middle-x navbar-layout">
          <nav className="navbar nav-bar sticky-top d-flex">
            <LinkS
              className={links + ` navbar-brand nav-brand-layout`}
              to="index"
              offset={-80}
            >
              <NavBrand />
            </LinkS>
            <HashLink
              className={hashlink + ` navbar-brand nav-brand-layout`}
              to="/"
            >
              <NavBrand />
            </HashLink>
            <div className="d-none d-lg-block">
              <div className="d-flex align-items-center">
                <ul className="nav">
                  {navDataLink.map((item, index) => (
                    <NavLink
                      route={item.path}
                      title={item.title}
                      links={links}
                      hashlink={hashlink}
                      key={index}
                    />
                  ))}
                </ul>
                <ul className="nav ps-5">
                  {navDataBtn.map((item, index) => (
                    <NavButton
                      route={item.path}
                      title={item.title}
                      key={index}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="d-lg-none">
              <Link
                className="nav-link bar-icon px-3 d-flex align-items-center"
                onClick={() => {
                  setOpen("off-toggle");
                }}
              >
                <FaBars size={"1.75rem"} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
