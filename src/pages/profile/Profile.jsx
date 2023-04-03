import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  getAfterUnderScoreValue,
  getInitials,
  isNonEmptyString,
} from "../../helpers";
import useUsersById from "../../hooks/query/AllUserProfile/useUserById";
import { getUserProfileImage } from "../../utils/Storage";

const Profile = () => {
  const params = useParams();
  const id = getAfterUnderScoreValue(params);
  const { auth } = useContext(AuthContext);

  const userProfilePic = getUserProfileImage();

  const {
    isLoading: isUserDetailsLoading,
    error: userDetailsError,
    data: userDetailsData,
  } = useUsersById(id);
  console.log(isUserDetailsLoading, userDetailsError, userDetailsData);
  return (
    <main id="layoutSidenav_content">
      <div className="box-shadow">
        <div className="profile">
          <div className="cover-profile">
            <div
              className="cover-photo"
              style={{
                backgroundImage: 'url("assets/images/cover-photo.jpg")',
                backgroundRepeat: "no-repeat",
              }}
            >
              <span>
                <i className="fa fa-camera" />
              </span>
            </div>
            <div className="edit-profile">
              <figure>
                <span className="text-uppercase" hidden={userProfilePic}>
                  {isNonEmptyString(userDetailsData?.forename) &&
                  isNonEmptyString(userDetailsData?.surname)
                    ? getInitials(
                        `${userDetailsData?.forename}  ${userDetailsData?.surname}`,
                      )
                    : ""}
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
                    width={120}
                    height={120}
                  />
                </picture>
              </figure>
              <i className="fa fa-camera change-img" />
              <figcaption>
                <div>
                  <h4 className="mb-0 mt-2">
                    {userDetailsData &&
                    isNonEmptyString(userDetailsData?.forename) &&
                    isNonEmptyString(userDetailsData?.surname)
                      ? `${userDetailsData?.forename}  ${userDetailsData?.surname}`
                      : ""}
                  </h4>
                  <p className="mb-0">
                    {" "}
                    {isNonEmptyString(userDetailsData?.bio)
                      ? `${userDetailsData?.bio}`
                      : ""}
                  </p>
                  {/* <p className="mb-0">Birmingham, UK</p> */}
                </div>
                <div className="post-count">
                  <div className="post">
                    <strong>121</strong>
                    <span>Posts</span>
                  </div>
                  {/* <div className="follower">
                    <strong>123</strong>
                    <span>Followers</span>
                  </div>
                  <div className="following">
                    <strong>134</strong>
                    <span>Following</span>
                  </div> */}
                </div>
                <div className="edit-btn">
                  {auth?.userId === userDetailsData?.id ? (
                    <Link
                      to="/setting"
                      state={userDetailsData || null}
                      className="btn btn-common px-3"
                    >
                      Edit profile
                    </Link>
                  ) : null}

                  <button
                    type="button"
                    className="btn btn-common btn-follow px-3 "
                    style={{ display: "none" }}
                  >
                    Follow
                  </button>
                  <button
                    type="button"
                    className="btn btn-common btn-follow px-3 "
                    style={{ display: "none" }}
                  >
                    Message
                  </button>
                </div>
              </figcaption>
            </div>
          </div>
          <div className="user-bio common-tab">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li>
                <button
                  className="nav-link active"
                  id="nav-bio-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-bio"
                  type="button"
                  role="tab"
                  aria-controls="bio"
                  aria-selected="true"
                >
                  Bio
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  id="nav-post-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-post"
                  type="button"
                  role="tab"
                  aria-controls="post"
                  aria-selected="false"
                >
                  Posts
                </button>
              </li>
            </ul>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-bio"
                role="tabpanel"
                aria-labelledby="bio-tab"
              >
                <div className="profile-bio">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>First Name</td>
                        <td>
                          {isNonEmptyString(userDetailsData?.forename)
                            ? `${userDetailsData?.forename}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>
                          {isNonEmptyString(userDetailsData?.surname)
                            ? `${userDetailsData?.surname}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Bio</td>
                        <td>
                          {" "}
                          {isNonEmptyString(userDetailsData?.bio)
                            ? `${userDetailsData?.bio}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Email Id</td>
                        <td>
                          {" "}
                          {isNonEmptyString(userDetailsData?.email)
                            ? `${userDetailsData?.email}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>
                          {isNonEmptyString(userDetailsData?.gender)
                            ? `${userDetailsData?.gender}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>
                          {" "}
                          {isNonEmptyString(userDetailsData?.age)
                            ? `${userDetailsData?.age}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Contant No.</td>
                        <td>
                          {" "}
                          {isNonEmptyString(userDetailsData?.mobile)
                            ? `${userDetailsData?.mobile}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Main User Type</td>
                        <td>
                          {" "}
                          {isNonEmptyString(userDetailsData?.main_user_type)
                            ? `${userDetailsData?.main_user_type}`
                            : ""}
                        </td>
                      </tr>
                      {/* <tr>
                        <td>Stakeholder Type</td>
                        <td>Reader</td>
                      </tr> */}
                      <tr>
                        <td>Country</td>
                        <td>
                          {" "}
                          {isNonEmptyString(userDetailsData?.country)
                            ? `${userDetailsData?.country}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>
                          {isNonEmptyString(userDetailsData?.address)
                            ? `${userDetailsData?.address}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>
                          {isNonEmptyString(userDetailsData?.city)
                            ? `${userDetailsData?.city}`
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Postal Code</td>
                        <td>
                          {isNonEmptyString(userDetailsData?.postal_code)
                            ? `${userDetailsData?.postal_code}`
                            : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-post"
                role="tabpanel"
                aria-labelledby="post-tab"
              >
                <div className="post-grid">
                  <ul className="box-container three-cols">
                    <li className="box show">
                      <div className="inner">
                        <a
                          href="assets/images/post-image.png"
                          className="glightbox"
                        >
                          <img
                            src="assets/images/post-image.png"
                            alt="post-pic"
                            width=""
                            height=""
                          />
                        </a>
                      </div>
                    </li>
                    <li className="box show">
                      <div className="inner">
                        <a href="assets/images/post1.jpg" className="glightbox">
                          <img
                            src="assets/images/post1.jpg"
                            alt="post"
                            width=""
                            height=""
                          />
                        </a>
                      </div>
                    </li>
                    <li className="box show">
                      <div className="inner">
                        <a href="assets/images/post2.jpg" className="glightbox">
                          <img
                            src="assets/images/post2.jpg"
                            alt="postage"
                            width=""
                            height=""
                          />
                        </a>
                      </div>
                    </li>
                    <li className="box show">
                      <div className="inner">
                        <a href="assets/images/post3.jpg" className="glightbox">
                          <img
                            src="assets/images/post3.jpg"
                            alt="post3"
                            width=""
                            height=""
                          />
                        </a>
                      </div>
                    </li>
                    <li className="box show">
                      <div className="inner">
                        <a href="assets/images/post4.jpg" className="glightbox">
                          <img
                            src="assets/images/post4.jpg"
                            alt="post4"
                            width=""
                            height=""
                          />
                        </a>
                      </div>
                    </li>
                    <li className="box show">
                      <div className="inner">
                        <a href="assets/images/post5.jpg" className="glightbox">
                          <img
                            src="assets/images/post5.jpg"
                            alt="post6"
                            width=""
                            height=""
                          />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
