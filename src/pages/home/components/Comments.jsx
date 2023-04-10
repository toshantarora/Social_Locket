import React, { useContext } from 'react';
import ShareCommentImage from '../../../assets/images/share-icon.png';
import { getUserFullName, getUserProfileImage } from '../../../utils/Storage';
import usePostCommentsById from '../../../hooks/query/Posts/usePostCommentsById';
import { getInitials, isNonEmptyArray, isNonEmptyString } from '../../../helpers';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../../../services/ApiClient';
import { AuthContext } from '../../../context/authContext';

const MAX_LENGTH = 50;
const Comments = ({ postId }) => {
  console.log(postId);
  const {auth} = useContext(AuthContext);
  const userProfilePic = getUserProfileImage();
  const UserFullName = getUserFullName();
  const userProfileText = getInitials(UserFullName);
  const { data: commentsData, error, isLoading } = usePostCommentsById(postId);

    const {
      register,
      handleSubmit,
      setValue,
    } = useForm();

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newComment) => {
        return API.post('post-comments', newComment);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(['comments-id']);
        },
      }
    );
   
    const onSubmit = async (data, event) => {
      event.preventDefault();
       console.log(data);
       const commentPayload = {
         user_id: auth?.userId,
         post_id: postId,
         comment: data.comment,
       };
      mutation.mutate(commentPayload);
      setValue('comment', '');
    };

    if(error)
    {
      return <div>Something went wrong</div>;
    }
    if (isLoading)
    {
      return <div>Loading...</div>;
    }
      return (
        <div className="comment-section">
          {
          isNonEmptyArray(commentsData)
            ? commentsData?.map((comment, idx) => (
                <div key={idx} className="comment-posted">
                  <figure>
                    {comment?.profile_image !== null ? (
                      <picture>
                        <source
                          srcSet={comment?.profile_image}
                          type="image/webp"
                        />
                        <source
                          srcSet={comment?.profile_image}
                          type="image/png"
                        />
                        <img
                          loading="lazy"
                          src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                          data-src={comment.profile_image}
                          alt="user-img"
                          className="img-fluid"
                          width={55}
                          height={55}
                        />
                      </picture>
                    ) : (
                      <span>
                        {' '}
                        {isNonEmptyString(comment?.forename) &&
                        isNonEmptyString(comment?.surname)
                          ? getInitials(
                              `${comment?.forename}  ${comment?.surname}`
                            )
                          : ''}
                      </span>
                    )}
                  </figure>
                  <figcaption>
                    <h6>
                      <strong>
                        {isNonEmptyString(comment?.forename) &&
                        isNonEmptyString(comment?.surname)
                          ? `${comment?.forename}  ${comment?.surname}`
                          : 'User'}
                      </strong>
                    </h6>
                    {isNonEmptyString(comment?.comment) ? (
                      <p>
                        {`${comment?.comment.substring(0, MAX_LENGTH)}...`}

                        <a href="/">See More</a>
                      </p>
                    ) : (
                      'No comment'
                    )}
                  </figcaption>
                </div>
              ))
            : ''}
          <div className="share-comment">
            <figure>
              {userProfilePic !== null ? (
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
              ) : (
                <span className="text-uppercase  text-white">
                  {userProfileText}
                </span>
              )}
            </figure>
            <span>
              <input
                type="text"
                name="comment"
                {...register('comment')}
                placeholder="Write your comment...."
              />
              <button type="button" onClick={handleSubmit(onSubmit)}>
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
      );
};

export default Comments;
