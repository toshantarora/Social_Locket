/* eslint-disable react/jsx-no-useless-fragment */
import { useLocation, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import OwlCarousel from 'react-owl-carousel';
import usePostsById from '../../hooks/query/Posts/usePostsById';
import ShareCommentImage from '../../assets/images/share-icon.png';
import { getUserProfileImage, getUserFullName } from '../../utils/Storage';
import {
  formatDate,
  getIdValue,
  getInitials,
  isNonEmptyArray,
  isNonEmptyString,
  parseStringArray,
} from '../../helpers';
import '../../styles/globalStyles.css';
import Comments from '../home/components/Comments';
import { useState } from 'react';

const PostDetails = () => {
  const params = useParams();
   const [commentOpen, setCommentOpen] = useState(true);
  const id = getIdValue(params);
   const {
     state
   } = useLocation();
   console.log("state", state, params)
  const {
    isLoading: postsDetailsLoading,
    error: postsDetailsError,
    data: postsDetailsData,
  } = usePostsById(id);
  const userProfilePic = getUserProfileImage();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);
  console.log(postsDetailsLoading, postsDetailsError);
  return (
    <>
      {isNonEmptyArray(postsDetailsData)
        ? postsDetailsData.map((item, idx) => (
          <main id="layoutSidenav_content">
            <div key={idx} className="post">
              <ul>
                <li>
                  <div className="post-section">
                    <div className="user-post">
                      <a href="/" className="post-profile">
                        <figure>
                          {isNonEmptyString(item?.profile_image) ? (
                            <picture>
                              <source
                                srcSet={item?.profile_image}
                                type="image/webp"
                              />
                              <source
                                srcSet={item?.profile_image}
                                type="image/png"
                              />
                              <img
                                loading="lazy"
                                src={item?.profile_image}
                                data-src={item?.profile_image}
                                alt="user-img"
                                className="img-fluid"
                                width={50}
                                height={50}
                              />
                            </picture>
                          ) : (
                            <span>
                              {isNonEmptyString(item?.forename)
                                && isNonEmptyString(item?.surname)
                                ? getInitials(
                                  `${item?.forename}  ${item?.surname}`,
                                )
                                : ''}
                            </span>
                          )}
                        </figure>
                        <figcaption>
                          <h5 className="mb-0">
                            {isNonEmptyString(item?.forename)
                              && isNonEmptyString(item?.surname)
                              ? `${item?.forename}  ${item?.surname}`
                              : ''}
                          </h5>
                          <span>
                            {isNonEmptyString(item?.created)
                              ? formatDate(item?.created)
                              : ''}
                          </span>
                        </figcaption>
                      </a>
                      <div className="price-btn">
                        <button
                          type="button"
                          className="btn btn-outline-success"
                        >
                          {item?.price ? `$ ${item.price}` : ''}
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
                      </div>
                      <div className="owl-carousel owl-theme post-slider">
                        {item?.images !== null ? (
                          <OwlCarousel
                            items={1}
                            margin={8}
                            autoplay
                            className="owl-carousel owl-theme post-slider"
                            loop
                          >
                            {parseStringArray(item.images).map(
                              (imgItem, idx) => (
                                <div key={idx} className="item">
                                  <picture>
                                    <source
                                      srcSet={imgItem}
                                      type="image/webp"
                                    />
                                    <source
                                      srcSet={imgItem}
                                      type="image/png"
                                    />
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
                          ''
                        )}
                      </div>
                      <div>{parse(item?.description)}</div>
                    </div>
                    <div className="like-comment-count">
                      <button type="button">
                        <span className="like-count">
                          {/* <a href="/" className="like-button"> */}
                          <i className="fa-solid fa-thumbs-up" />
                          {' '}
                          {/* </a> */}
                          {/* <span>36k Likes</span> */}
                          <span>
                            {item?.total_likes == null
                              ? 0
                              : item?.total_likes}
                            {' '}
                            Likes
                          </span>
                        </span>
                      </button>
                      <button type="button" onClick={() => setCommentOpen(!commentOpen)}>
                        <span className="comment-count">
                          <i className="fa fa-message" />
                          {/* <img src="../../assets/images/comment-icon.png" alt="comment" width="20" height="18"> */}
                          {' '}
                          {/* <span>12k Comments</span> */}
                          {item?.total_comments == null ? (
                            'Be First to Comment'
                          ) : (
                            <span>
                              {item?.total_comments}
                              {' '}
                              Comments
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                 {commentOpen && < Comments postId = {id} />}
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
