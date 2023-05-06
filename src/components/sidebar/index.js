import { NavLink, useLocation, useParams } from "react-router-dom";
import "../../styles/globalStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeadset,
  faLink,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import {
  getUserBio,
  getUserFullName,
  getUserProfileImage,
  hasUserDetails,
} from "../../utils/Storage";
import {
  formatOnlyDate,
  getIdValue,
  getInitials,
  isNonEmptyArray,
  isNumber,
  parseStringArray,
  removeWhitespaces,
  // parseStringArray,
} from "../../helpers";
import { AuthContext } from "../../context/authContext";
import usePostsById from "../../hooks/query/Posts/usePostsById";
// import { useQueryClient } from 'react-query';

const SideBar = () => {
  const userProfilePic = getUserProfileImage();
  const userBIO = getUserBio();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);
  const hasUserData = hasUserDetails();
  const { auth } = useContext(AuthContext);
  const userId = auth?.userId ? auth?.userId.toString() : "";
  const userProfileUrl = UserFullName ? UserFullName.concat("_", userId) : "";
  const { state } = useLocation();
  const params = useParams();
  const id = getIdValue(params);

  const { data: postsDetailsData } = usePostsById(state?.id ? state?.id : id);
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
      <div className="user-profile" hidden={!hasUserData}>
        <NavLink to={`/profile/${removeWhitespaces(userProfileUrl)}`}>
          <figure>
            <span hidden={userProfilePic} className="text-uppercase">
              {userProfileText}
            </span>
            <picture hidden={!userProfilePic}>
              <source srcSet={userProfilePic} type="image/webp" />
              <source srcSet={userProfilePic} type="image/png" />
              <img
                loading="lazy"
                src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                data-src={userProfilePic}
                alt="user-img"
                className="img-fluid"
                width={70}
                height={70}
              />
            </picture>
          </figure>
          <figcaption>
            <h5 className="mb-0">{UserFullName}</h5>
            <p className="mb-0">{userBIO}</p>
          </figcaption>
        </NavLink>
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
      {isNumber(id) && isNonEmptyArray(postsDetailsData) ? (
        postsDetailsData.map((item, idx) => {
          return (
            <div key={idx} className="post-details-list py-3">
              <ul className="d-flex flex-column">
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>Address</h5>
                  <span>{item?.location ? item?.location : ""}</span>
                </li>
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>Type</h5>
                  <span>{item?.type ? item?.type : ""}</span>
                </li>
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>Pages</h5>
                  <span>{item?.pages ? item?.pages : ""}</span>
                </li>
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>Price</h5>
                  <span>{item?.price ? `$${item?.price}` : ""}</span>
                </li>
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>Available</h5>
                  <span>
                    {item?.created ? formatOnlyDate(item?.created) : ""}
                  </span>
                </li>
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>keywords</h5>
                  <span>
                    {item?.keywords
                      ? parseStringArray(item?.keywords).map((tag) => (
                          <span className="badge bg-primary me-1">{tag}</span>
                        ))
                      : ""}
                  </span>
                </li>
                <li className="d-flex flex-column border-bottom py-3 px-2">
                  <h5>Status</h5>
                  <span>{item?.status ? item?.status : "Available"}</span>
                </li>
              </ul>
            </div>
          );
        })
      ) : (
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
            <NavLink activeclassname="active" to="/support">
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
      )}

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
