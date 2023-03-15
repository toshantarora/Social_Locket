// import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/globalStyles.css";
import Header from "../components/header";
import SideBar from "../components/sidebar";

const Layout = () => {
  return (
    <>
      <div className="dashboard nav-fixed">
        <Header />
        <section>
          <div className="container">
            <div className="" id="layoutSidenav">
              <SideBar />
              <Outlet />
            </div>
          </div>
        </section>
      </div>
      {/* Bottom right-side-sticky */}
      <div className="bottom-right">
        <a href="/">
          <i className="fa-sharp fa-solid fa-plus" />
        </a>
      </div>
      {/* Bottom right-side-sticky */}
      {/* Mobile bottom bar */}
      <div className="mobile-bottom">
        <div className="container">
          <ul>
            <li className="active">
              <a href="/">
                <i className="fa-sharp fa-solid fa-house" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-magnifying-glass" />
                <span>Search</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa fa-gear" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fa-solid fa-user" />
                <span>User</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Layout;
