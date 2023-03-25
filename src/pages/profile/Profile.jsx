import { getUserBio, getUserFullName, getUserProfileImage, getUserProfileText } from "../../utils/Storage";

const Profile = () => {
  const userProfilePic = getUserProfileImage();
  const userProfileText = getUserProfileText();
  const userBIO = getUserBio();
  const userFullName = getUserFullName();
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
                <span className="text-uppercase" hidden={userProfilePic}>{userProfileText}</span>
                <picture hidden={!userProfilePic}>
                  <source
                    srcSet={userProfilePic}
                    type="image/webp"
                  />
                  <source
                    srcSet={userProfilePic}
                    type="image/png"
                  />
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
                  <h4 className="mb-0 mt-2">{userFullName}</h4>
                  <p className="mb-0">{userBIO}</p>
                  {/* <p className="mb-0">Birmingham, UK</p> */}
                </div>
                <div className="post-count">
                  <div className="post">
                    <strong>121</strong>
                    <span>Posts</span>
                  </div>
                  <div className="follower">
                    <strong>123</strong>
                    <span>Followers</span>
                  </div>
                  <div className="following">
                    <strong>134</strong>
                    <span>Following</span>
                  </div>
                </div>
                <div className="edit-btn">
                  <a href="setting.html" className="btn btn-common px-3">
                    Edit profile
                  </a>
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
                        <td>Lettie Christen</td>
                      </tr>
                      <tr>
                        <td>Bio</td>
                        <td>Content Creator</td>
                      </tr>
                      <tr>
                        <td>Email Id</td>
                        <td>christen@gmail.com</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>Male</td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>35</td>
                      </tr>
                      <tr>
                        <td>Contant No.</td>
                        <td>+92 9887673456</td>
                      </tr>
                      <tr>
                        <td>Stakeholder Type</td>
                        <td>Reader</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>Birmingham</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>Birmingham</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>Birmingham</td>
                      </tr>
                      <tr>
                        <td>Postal Code</td>
                        <td>12345</td>
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
