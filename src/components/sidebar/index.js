// import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/globalStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeadset,
  faLink,
  faGear,
  // faXmark,
  // faBell,
  // faUser,
} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faHeadset, faLink, faGear, faXmark, faBell, faUser } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <aside id="layoutSidenav_nav">
      <div className="mobile-logo mb-3">
        <a href="/" className="logo navbar-brand">
          <picture>
            <source srcSet="../../assets/images/logo.webp" type="image/webp" />
            <source srcSet="../../assets/images/logo.png" type="image/png" />
            <img
              loading="lazy"
              src="../../assets/images/logo.png"
              alt="login logo"
              width={144}
              height={60}
            />
          </picture>
        </a>
        <a href="/">
          <i className="fa-solid fa-xmark" />
        </a>
      </div>
      <div className="user-profile">
        <a href="/">
          <figure>
            <span>LC</span>
            <picture>
              <source
                srcSet="../../assets/images/user-img.webp"
                type="image/webp"
              />
              <source
                srcSet="../../assets/images/user-img.png"
                type="image/png"
              />
              <img
                loading="lazy"
                src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                data-src="../../assets/images/user-img.png"
                alt="user-img"
                className="img-fluid"
                width={70}
                height={70}
              />
            </picture>
          </figure>
          <figcaption>
            <h5 className="mb-0">Lettie Christen</h5>
            <p className="mb-0">Content Creater</p>
          </figcaption>
        </a>
      </div>
      <form
        className="w-100 search-form position-relative mobile-side-form"
        role="search"
      >
        <input
          type="text"
          className="form-control mb-0"
          placeholder="What's are you looking for.."
          aria-label="Search"
        />
        <img
          src="../../assets/images/search-form.png"
          alt="search"
          width={24}
          height={24}
        />
      </form>
      <ul>
        <li>
          <NavLink activeclassname="active" to="/">
            <i className="fa fa-home" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Search">
            <i>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </i>{" "}
            Search
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Support">
            <i>
              <FontAwesomeIcon icon={faHeadset} />
            </i>{" "}
            Support
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Connect">
            <i>
              <FontAwesomeIcon icon={faLink} />
            </i>{" "}
            Connect
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/Setting">
            <i>
              <FontAwesomeIcon icon={faGear} />
            </i>{" "}
            Setting
          </NavLink>
        </li>
      </ul>
      <div className="bell-icon bell-icon-mobile">
        <a href="/">
          <i className="fa-solid fa-bell">
            <span className="badge">2</span>
          </i>
        </a>
        <a href="/">
          <i className="fa-solid fa-user" />
        </a>
      </div>
    </aside>
  );
};

export default SideBar;
