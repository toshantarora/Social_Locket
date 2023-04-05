import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Select from "react-select";
import { AuthContext } from "../../context/authContext";
import {
  getUserBio,
  getUserFullName,
  getUserProfileImage,
} from "../../utils/Storage";
import { getInitials, isNonEmptyString } from "../../helpers";
import useUsersById from "../../hooks/query/AllUserProfile/useUserById";
import DetailsForm from "./components/DetailsForm";
import useSelectedTypesBy from "../../hooks/query/AllUserProfile/useSelectedUserTypes";

const Setting = () => {
  const userProfilePic = getUserProfileImage();
  const userBIO = getUserBio();
  const userFullName = getUserFullName();
  const userProfileText = getInitials(userFullName);
  const value = useContext(AuthContext);
  // const Id = value?.auth?.userId;
  const navigate = useNavigate();
  const logOut = () => {
    value?.logout();
    navigate("/login");
  };
  // console.log(value);
  const {
    isLoading: isUserDetailsLoading,
    error: userDetailsError,
    data: userDetailsData,
  } = useUsersById(value?.auth?.userId);
  const { data: userSelectedTypesData } = useSelectedTypesBy(
    value?.auth?.userId,
  );
  console.log({
    userDetailsError,
    userDetailsData,
    isUserDetailsLoading,
    userSelectedTypesData,
  });

  return (
    <main id="layoutSidenav_content">
      <div className="box-shadow p-0">
        <div className="setting">
          <div className="cover-profile">
            <div
              className="cover-photo"
              style={{
                backgroundImage: 'url("assets/images/cover-photo.jpg")',
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="setting-profile">
              <div className="edit-profile">
                <div className="setting-left">
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
                        width={150}
                        height={150}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <div>
                      <h4 className="mb-0 mt-2 text-center">
                        {isNonEmptyString(userDetailsData?.forename) &&
                        isNonEmptyString(userDetailsData?.surname)
                          ? `${userDetailsData?.forename}  ${userDetailsData?.surname}`
                          : ""}
                      </h4>
                      <p className="mb-0 text-center">{userBIO}</p>
                    </div>
                    <div className="setting-post">
                      <a href="/" className="">
                        <span>Posts</span>
                        <strong>121</strong>
                      </a>
                      {/* <a href="/" className="">
                        <span>Followers</span>
                        <strong>123</strong>
                      </a>
                      <a href="/" className="">
                        <span>Following</span>
                        <strong>134</strong>
                      </a> */}
                    </div>
                  </figcaption>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={logOut}
                    className="btn btn-common w-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="setting-right">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a href="/" className="nav-link active">
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/notifications">
                      Notification
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/privacy">
                      Privacy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/inventory">
                      Inventory
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <DetailsForm
                      preloadedValues={userDetailsData}
                      userSelectedTypesData={userSelectedTypesData}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    ...
                  </div>
                  <div
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Setting;
