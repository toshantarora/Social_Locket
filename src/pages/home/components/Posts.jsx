/* eslint-disable react/no-danger */
import OwlCarousel from "react-owl-carousel";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import {
  formatDate,
  getInitials,
  isNonEmptyString,
  parseStringArray,
} from "../../../helpers";
import ShareCommentImage from "../../../assets/images/share-icon.png";
import { getUserFullName, getUserProfileImage } from "../../../utils/Storage";

const MAX_LENGTH = 60;

const Posts = (props) => {
  const userProfilePic = getUserProfileImage();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);

  return (
    <div className="post">
      <ul>
        <li>
          <div className="post-section">
            <div className="user-post">
              <a href="/" className="post-profile">
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
              </a>
              <div className="price-btn">
                <button type="button" className="btn btn-outline-success">
                  Buy This Post
                </button>
              </div>
            </div>
            <div className="post-image">
              <div className="post-title">
                <h5>
                  <a href="/">{props?.post?.title}</a>
                </h5>

                {props?.post?.description.length > MAX_LENGTH ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${props?.post?.description.substring(
                        0,
                        MAX_LENGTH,
                      )}...`,
                    }}
                  />
                ) : (
                  <p>
                    {props?.post?.description
                      ? parse(props?.post?.description)
                      : ""}
                  </p>
                )}
                <Link
                  to={`postDetails/${props?.post?.title}`}
                  state={{ id: props?.post?.id }}
                >
                  Read this article
                </Link>
              </div>
              <div className="owl-carousel owl-theme post-slider">
                {props?.post.images !== null ? (
                  <OwlCarousel
                    items={1}
                    margin={8}
                    autoplay
                    className="owl-carousel owl-theme post-slider"
                    loop
                  >
                    {parseStringArray(props?.post.images).map(
                      (imgItem, idx) => (
                        <div key={idx} className="item">
                          <picture>
                            <source srcSet={imgItem} type="image/webp" />
                            <source srcSet={imgItem} type="image/png" />
                            <img
                              loading="lazy"
                              srcSet={imgItem}
                              alt="post"
                              className="img-fluid"
                              width="670"
                              height="440"
                            />
                          </picture>
                        </div>
                      ),
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
                    {props?.post.total_likes == null
                      ? 0
                      : props?.post.total_likes}{" "}
                    Likes
                  </span>
                </span>
              </button>
              <button type="button">
                <span className="comment-count">
                  <i className="fa fa-message" />
                  {/* <img src="../../assets/images/comment-icon.png" alt="comment" width="20" height="18"> */}{" "}
                  {/* <span>12k Comments</span> */}
                  {props?.post?.total_comments == null ? (
                    "Be First to Comment"
                  ) : (
                    <span>{props?.post?.total_comments} Comments</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="comment-section" style={{ display: "none" }}>
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
                  Create a blog brief using our hassle-free, guided flow. Get a
                  preliminary quote and estimated delivery...
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
  );
};

export default Posts;
