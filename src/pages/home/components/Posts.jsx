/* eslint-disable react/no-danger */
import OwlCarousel from "react-owl-carousel";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  formatDate,
  getInitials,
  isNonEmptyString,
  isNumber,
  parseStringArray,
  removeWhitespaces,
} from "../../../helpers";
import { API } from "../../../services/ApiClient";
import { AuthContext } from "../../../context/authContext";
import Comments from "./Comments";

const MAX_LENGTH = 150;

const Posts = (props) => {
  const postId = props?.post?.id ? props?.post?.id.toString() : "";
  const userId = props?.post?.user_id ? props?.post?.user_id.toString() : "";
  const { auth } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  // user_id
  const userTitle = props?.post?.title ? props?.post?.title : "";
  const titleLink = postId.concat("_", userTitle);
  const FullName =
    isNonEmptyString(props?.post?.forename) &&
    isNonEmptyString(props?.post?.surname)
      ? `${props?.post?.forename}  ${props?.post?.surname}`
      : "";
  const userProfileUrl = FullName.concat("_", userId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { data: PostLikes } = useQuery(["likes", props?.post?.id], () =>
  //   API.get(`post-likes/${props?.post?.id}`).then((res) => {
  //     return res.data;
  //   }),
  // );
  // // const [likes] = PostLikes;
  // const { data } = useQuery(["post-likes"], () =>
  //   API.get(`post-likes`).then((res) => {
  //     return res.data.result;
  //   }),
  // );
  // const [likes] = PostLikes;
  // useEffect(() => {
  //   if (PostLikes) {
  //     const userLiked = likes.some(
  //       (like) =>
  //         like.post_id === auth.userId && like.post_id === props?.post.id,
  //     );
  //     setIsLiked(userLiked);
  //   }
  // }, [likes, auth.userId, props?.post?.id]);
  // console.log("isLiked----------------", isLiked, data);
  // // console.log(PostLikes, "PostLikes");
  // // const { isLoading, error, data } = useQuery(["post-likes"], () =>
  // //   API.get(`post-likes`).then((res) => {
  // //     return res.data.result;
  // //   }),
  // // );
  // // console.log({ isLoading, error, data });

  // // const mutation = useMutation(
  // //   (liked) => {
  // //     console.log(liked);
  // //     if (liked) return API.delete(`post-likes/${props?.post.id}`);
  // //     return API.post("post-likes", { postId: post.id });
  // //   },
  // //   {
  // //     onSuccess: () => {
  // //       // Invalidate and refetch
  // //       queryClient.invalidateQueries(["likes"]);
  // //     },
  // //   },
  // // );

  // // const deleteMutation = useMutation(
  // //   (postId) => {
  // //     return API.delete(`posts/${postId}`);
  // //   },
  // //   {
  // //     onSuccess: () => {
  // //       // Invalidate and refetch
  // //       queryClient.invalidateQueries(["posts"]);
  // //     },
  // //   },
  // // );
  // console.log("like", auth?.userId);
  // const handleLike = () => {
  //   console.log("like", auth?.userId);
  //   // const isLiked = data.filter((item) => item?.user_id === auth?.userId);
  //   // console.log(isLiked);

  //   // const isLiked = props?.post?.id.includes(props?.post?.id);
  //   // console.log("isLiked", isLiked);
  //   // mutation.mutate(data.includes(currentUser.id));
  // };

  // // /posts/:id/comments

  // const mutation = useMutation(
  //   (liked) => {
  //     console.log(liked);
  //     // if (liked) return API.delete(`post-likes/${props?.post.id}`);
  //     return API.post("post-likes", { postId: post.id });
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["likes"]);
  //     },
  //   },
  // );
  // const { data: PostLikes } = useQuery(["likes", props?.post?.id], () =>
  //   API.get(`post-likes/${props?.post?.id}`).then((res) => {
  //     return res.data.result;
  //   }),
  // );
  const { data } = useQuery(["post-likes"], () =>
    API.get(`post-likes`).then((res) => {
      return res.data.result;
    })
  );
  console.log("data", data);
  // console.log("PostLikes", PostLikes);
  const { mutate: likePost, isLoading: isLikePostLoading } = useMutation(
    async (payload) => {
      console.log("payload", payload);
      // if (payload.newIsLiked)
      return API.post("post-likes", {
        user_id: payload?.user_id,
        post_id: payload?.post_id,
        likes: "1",
      });
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(["posts"]);
          queryClient.invalidateQueries(["post-likes"]);
        }
      },
    }
  );

  useEffect(() => {
    const userLiked =
      data &&
      data.some(
        (like) =>
          like.user_id === auth?.userId && like.post_id === props?.post?.id
      );
    console.log("userLiked", userLiked);
    setIsLiked(userLiked);
  }, [data, auth.userId, props.post.id, props?.post?.total_likes]);
  console.log("isLiked---", isLiked);
  console.log("isLikePostLoading", isLikePostLoading);
  console.log("auth?.userId", auth?.userId);

  const { mutate: disLikePost } = useMutation(
    async (payload) => {
      console.log("payload", payload);
      return API.delete(`post-likes/${payload?.post_id}`, {
        data: {
          user_id: payload?.user_id,
          post_id: payload?.post_id,
        },
      });
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(["posts"]);
          queryClient.invalidateQueries(["post-likes"]);
        }
      },
    }
  );
  const handleLike = (postId) => {
    console.log("props?.postId", postId);
    // const userLiked =
    //   data &&
    //   data.some(
    //     (like) => like.user_id === auth?.userId && like.post_id === props?.post?.id,
    //   );

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    const payloadData = {
      user_id: auth?.userId,
      post_id: postId,
      // likes: "1",
      // newIsLiked,
    };
    if (newIsLiked) {
      likePost(payloadData);
    } else if (newIsLiked === false) {
      disLikePost(payloadData);
    }
    // setIsLiked(!isLiked);
  };
  const onCommentsClick = () => {
    navigate(`postDetails/${removeWhitespaces(titleLink)}`);
  };

  return (
    <div className="post">
      <ul>
        <li>
          <div className="post-section">
            <div className="user-post">
              <Link
                to={`/profile/${removeWhitespaces(userProfileUrl)}`}
                className="post-profile"
              >
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
                            `${props?.post?.forename}  ${props?.post?.surname}`
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
              </Link>
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
                        MAX_LENGTH
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
                  to={`postDetails/${removeWhitespaces(titleLink)}`}
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
                    dots={false}
                    loop
                  >
                    {props?.post?.images &&
                      parseStringArray(props?.post?.images)?.map(
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
                        )
                      )}
                  </OwlCarousel>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="like-comment-count">
              <button onClick={() => handleLike(props?.post?.id)} type="button">
                <span className="like-count">
                  {/* <a href="/" className="like-button"> */}
                  <i className="fa-solid fa-thumbs-up" /> {/* </a> */}
                  {/* <span>36k Likes</span> */}
                  <span>
                    {props?.post.total_likes == null
                      ? 0
                      : props?.post.total_likes}{" "}
                    {isLiked ? "Unlike" : "Likes"}
                  </span>
                </span>
              </button>
              <button
                type="button"
                // disabled={!isNumber(auth?.userId)}
                onClick={onCommentsClick}
              >
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
          {commentOpen && <Comments postId={props?.post?.id} />}
        </li>
      </ul>
    </div>
  );
};

export default Posts;
