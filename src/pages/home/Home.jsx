/* eslint-disable no-nested-ternary */
// import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePosts from "../../hooks/query/Posts/usePosts";
import "../../styles/globalStyles.css";
import {
  getUserFullName,
  getUserProfileImage,
  hasUserDetails,
} from "../../utils/Storage";
import Posts from "./components/Posts";
import { getInitials } from "../../helpers";
// import useAllUserProfile from "../../hooks/query/AllUserProfile/useAllUserProfile";

const Home = () => {
  const {
    isLoading: postsIsLoading,
    error: postsError,
    data: postsData,
  } = usePosts();

  // const {
  //   // isLoading: allUserIsLoading,
  //   // error: allUserError,
  //   data: allUserData,
  // } = useAllUserProfile();
  const [postTitle, setPostTitle] = useState("");
  const userProfilePic = getUserProfileImage();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);
  const hasUserData = hasUserDetails();
  // console.log(postTitle);

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
            <span className="text-uppercase" hidden={userProfilePic}>
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
              name="title"
              placeholder="Whats? your creative mind"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <Link to="/create-post" state={{ title: postTitle }}>
              <i className="fa-solid fa-pen" />
            </Link>
          </div>
        </div>
      </div>

      {postsError
        ? "Something went wrong!"
        : postsIsLoading
        ? "loading"
        : postsData
        ? postsData.map((post) => <Posts post={post} key={post.id} />)
        : null}
      <div className="bottom-right">
        <Link to="/create-post">
          <i className="fa-sharp fa-solid fa-plus" />
        </Link>
      </div>
    </main>
  );
};

export default Home;
