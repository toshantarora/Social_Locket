/* eslint-disable no-nested-ternary */
// import React from "react";
import usePosts from "../../hooks/query/Posts/usePosts";
import "../../styles/globalStyles.css";
import Posts from "./components/Posts";

const Home = () => {
  const {
    isLoading: postsIsLoading,
    error: postsError,
    data: postsData,
  } = usePosts();
  console.log(postsData);
  return (
    <main id="layoutSidenav_content">
      <div className="post-message">
        <div>
          <h5>
            <strong>Post Something</strong>
          </h5>
        </div>
        <div className="post-something">
          <figure>
            <span />
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
