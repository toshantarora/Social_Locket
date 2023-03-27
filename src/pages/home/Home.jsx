/* eslint-disable no-nested-ternary */
// import React from "react";
import usePosts from "../../hooks/query/Posts/usePosts";
import "../../styles/globalStyles.css";
import {
  getUserFullName,
  getUserProfileImage,
  hasUserDetails,
} from "../../utils/Storage";
import Posts from "./components/Posts";
import { getInitials } from "../../helpers";

const Home = () => {
  const {
    isLoading: postsIsLoading,
    error: postsError,
    data: postsData,
  } = usePosts();

  const userProfilePic = getUserProfileImage();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);
  const hasUserData = hasUserDetails();
  // console.log(postsData);
  return (
    <main id="layoutSidenav_content">
      <div className="post-message" hidden={!hasUserData}>
        <div>
          <h5>
            <strong>Post Something</strong>
          </h5>
        </div>
        <div className="post-something">
          <figure>
            <span className="text-uppercase text-white" hidden={userProfilePic}>
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
                width={50}
                height={50}
              />
            </picture>
          </figure>
          <div>
            <input
              type="text"
              name=""
              placeholder="Whats? your creative mind"
            />
            <a href="/">
              <i className="fa-solid fa-pen" />
            </a>
          </div>
        </div>
      </div>
      {postsError
        ? "Something went wrong!"
        : postsIsLoading
        ? "loading"
        : postsData.map((post) => <Posts post={post} key={post.id} />)}
      {/* <Posts /> */}
    </main>
  );
};

export default Home;
