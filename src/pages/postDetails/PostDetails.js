/* eslint-disable react/jsx-no-useless-fragment */
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import OwlCarousel from "react-owl-carousel";
import usePostsById from "../../hooks/query/Posts/usePostsById";
import ShareCommentImage from "../../assets/images/share-icon.png";
import { getUserProfileImage, getUserFullName } from "../../utils/Storage";
import { getInitials } from "../../helpers";
import "../../styles/globalStyles.css";

const PostDetails = () => {
  const { id } = useParams();
  const {
    isLoading: postsDetailsLoading,
    error: postsDetailsError,
    data: postsDetailsData,
  } = usePostsById(id);
  const userProfilePic = getUserProfileImage();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);
  console.log(postsDetailsLoading, postsDetailsError, postsDetailsData);
  return (
    <>
      {postsDetailsData
        ? postsDetailsData.map((item, idx) => (
            <main id="layoutSidenav_content">
              <div key={idx} className="post">
                <ul>
                  <li>
                    <div className="post-section">
                      <div className="user-post">
                        {/* <a href="/" className="post-profile">
                          <figure>
                            {isNonEmptyString(props?.post?.profile_image) ? (
                              <picture>
                                <source
                                  srcSet={props?.post?.profile_image}
                                  type="image/webp"
                                />
                                <source
                                  srcSet={props?.post?.profile_image}
                                  type="image/png"
                                />
                                <img
                                  loading="lazy"
                                  src={props?.post?.profile_image}
                                  data-src={props?.post?.profile_image}
                                  alt="user-img"
                                  className="img-fluid"
                                  width={50}
                                  height={50}
                                />
                              </picture>
                            ) : (
                              <span>
                                {isNonEmptyString(props?.post?.forename) &&
                                isNonEmptyString(props?.post?.surname)
                                  ? getInitials(
                                      `${props?.post?.forename}  ${props?.post?.surname}`,
                                    )
                                  : ""}
                              </span>
                            )}
                          </figure>
                          <figcaption>
                            <h5 className="mb-0">
                              {isNonEmptyString(props?.post?.forename) &&
                              isNonEmptyString(props?.post?.surname)
                                ? `${props?.post?.forename}  ${props?.post?.surname}`
                                : "User"}
                            </h5>
                            <span>
                              {isNonEmptyString(props?.post?.created)
                                ? formatDate(props?.post?.created)
                                : ""}
                            </span>
                          </figcaption>
                        </a> */}
                        <div className="price-btn">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                          >
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
                          <h2>{item?.title}</h2>

                          <div>{parse(item?.description)}</div>

                          {/* {props?.post?.description.length > MAX_LENGTH ? (
                    <div>
                      {`${parse(props?.post?.description).substring(
                        0,
                        MAX_LENGTH,
                      )}...`}
                      <a href="/">Read more</a>
                    </div>
                  ) : (
                    <p>{parse(props?.post?.description)}</p>
                  )} */}
                          {/* <Link to={`/postDetails/${props?.post?.id}`}>
                            Read this article
                          </Link> */}
                        </div>
                        <div className="owl-carousel owl-theme post-slider">
                          {/* <div className="item">
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
                  </div> */}
                          {item?.images !== null ? (
                            <OwlCarousel
                              items={1}
                              margin={8}
                              autoplay
                              className="owl-carousel owl-theme post-slider"
                              loop
                            >
                              {Array.isArray(item?.images) ? (
                                item?.images?.array?.forEach((vimage) => {
                                  <div className="item">
                                    <picture>
                                      <source
                                        srcSet={vimage}
                                        type="image/webp"
                                      />
                                      <source
                                        srcSet={vimage}
                                        type="image/png"
                                      />
                                      <img
                                        loading="lazy"
                                        srcSet={vimage}
                                        alt="post"
                                        className="img-fluid"
                                        width="670"
                                        height="440"
                                      />
                                    </picture>
                                  </div>;
                                })
                              ) : (
                                <div className="item">
                                  <picture>
                                    <source
                                      srcSet={item?.images}
                                      type="image/webp"
                                    />
                                    <source
                                      srcSet={item?.images}
                                      type="image/png"
                                    />
                                    <img
                                      loading="lazy"
                                      srcSet={item?.images}
                                      alt="post"
                                      className="img-fluid"
                                      width="670"
                                      height="440"
                                    />
                                  </picture>
                                </div>
                              )}
                            </OwlCarousel>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="like-comment-count">
                        <button type="button">
                          <span className="like-count">
                            {/* <a href="/" className="like-button"> */}
                            <i className="fa-solid fa-thumbs-up" /> {/* </a> */}
                            {/* <span>36k Likes</span> */}
                            <span>
                              {item?.total_likes == null
                                ? 0
                                : item?.total_likes}{" "}
                              Likes
                            </span>
                          </span>
                        </button>
                        <button type="button">
                          <span className="comment-count">
                            <i className="fa fa-message" />
                            {/* <img src="../../assets/images/comment-icon.png" alt="comment" width="20" height="18"> */}{" "}
                            {/* <span>12k Comments</span> */}
                            {item?.total_comments == null ? (
                              "Be First to Comment"
                            ) : (
                              <span>{item?.total_comments} Comments</span>
                            )}
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
                            Create a blog brief using our hassle-free, guided
                            flow. Get a preliminary quote and estimated
                            delivery...
                            <a href="/">See More</a>
                          </p>
                        </figcaption>
                      </div>
                      <div className="share-comment">
                        <figure>
                          <span
                            className="text-uppercase  text-white"
                            hidden={userProfilePic}
                          >
                            {userProfileText}
                          </span>
                          <picture>
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
                        <span>
                          <input
                            type="text"
                            name=""
                            placeholder="Write your comment...."
                          />
                          <button type="button">
                            <img
                              src={ShareCommentImage}
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
          ))
        : null}
    </>
  );
};

export default PostDetails;
