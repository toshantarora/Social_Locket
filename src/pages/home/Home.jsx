// import React from "react";
import usePosts from "../../hooks/query/Posts/usePosts";
import "../../styles/globalStyles.css";

const Home = () => {
  const { data: posts } = usePosts();
  console.log(posts);
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
      <div className="post">
        <ul>
          <li>
            <div className="post-section">
              <div className="user-post">
                <a href="/" className="post-profile">
                  <figure>
                    <span>RJ</span>
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
                  <figcaption>
                    <h5 className="mb-0">Robin Jennie</h5>
                    <span>Nov 08 at 09:59 PM</span>
                  </figcaption>
                </a>
                <div className="price-btn">
                  <button type="button" className="btn btn_price">
                    Buy Post
                  </button>
                </div>
                {/* <div class="flex-shrink-0 dropdown">
                                          <a href="#" class="d-block link-dark text-decoration-none header-profile" data-bs-toggle="dropdown" aria-expanded="false">
                                              <span><i class="fa-solid fa-ellipsis fs-3"></i></span>
                                          </a>
                                          <ul class="dropdown-menu text-small shadow">
                                            <li><a class="dropdown-item" href="#">Edit Post</a></li>
                                            <li><a class="dropdown-item" href="#">Delete</a></li>
                                            <li><a class="dropdown-item" href="#">Unfollow</a></li>
                                          </ul>
                                        </div> */}
              </div>
              <div className="post-image">
                <div className="post-title">
                  <h5>
                    <a href="/">
                      Handpicked, talented Writers Stop sifting through the
                      endless stream of freelancers
                    </a>
                    ...
                  </h5>
                  <a href="/">Read this article</a>
                </div>
                <div className="owl-carousel owl-theme post-slider">
                  <div className="item">
                    <picture>
                      <source
                        srcSet="../../assets/images/post-image.webp"
                        type="image/webp"
                      />
                      <source
                        srcSet="../../assets/images/post-image.png"
                        type="image/png"
                      />
                      <img
                        loading="lazy"
                        src="../../assets/images/post-image.png"
                        data-src="../../assets/images/post-image.png"
                        alt="post"
                        className="img-fluid"
                        width={670}
                        height={440}
                      />
                    </picture>
                  </div>
                  <div className="item">
                    <picture>
                      <source
                        srcSet="../../assets/images/post-image.webp"
                        type="image/webp"
                      />
                      <source
                        srcSet="../../assets/images/post-image.png"
                        type="image/png"
                      />
                      <img
                        loading="lazy"
                        src="../../assets/images/post-image.png"
                        data-src="../../assets/images/post-image.png"
                        alt="post"
                        className="img-fluid"
                        width={670}
                        height={440}
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="like-comment-count">
                <button type="button">
                  <span className="like-count">
                    <a href="/" className="like-button">
                      <i className="fa-solid fa-thumbs-up" />{" "}
                    </a>
                    <span>36k Likes</span>
                  </span>
                </button>
                <button type="button">
                  <span className="comment-count">
                    <i className="fa fa-message" />
                    {/* <img src="../../assets/images/comment-icon.png" alt="comment" width="20" height="18"> */}{" "}
                    <span>12k Comments</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="comment-section">
              <div className="comment-posted">
                <figure>
                  <span>DR</span>
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
                      width={55}
                      height={55}
                    />
                  </picture>
                </figure>
                <figcaption>
                  <h6>
                    <strong>Dorenshie Ree</strong>
                  </h6>
                  <p>
                    Create a blog brief using our hassle-free, guided flow. Get
                    a preliminary quote and estimated delivery...
                    <a href="/">See More</a>
                  </p>
                </figcaption>
              </div>
              <div className="share-comment">
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
                <span>
                  <input
                    type="text"
                    name=""
                    placeholder="Write your comment...."
                  />
                  <button type="button">
                    <img
                      src="../../assets/images/share-icon.png"
                      alt="share"
                      width={24}
                      height={24}
                    />
                  </button>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
