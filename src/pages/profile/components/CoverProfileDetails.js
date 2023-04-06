// import React from "react";

import { Link } from 'react-router-dom';
import { getInitials, isNonEmptyString } from '../../../helpers';

const CoverProfileDetails = ({ userDetailsData, currentUserId }) => {
  return (
    <>
      <div
        className="cover-photo"
        style={{
          backgroundImage: `url(${
            userDetailsData?.banner != null ? userDetailsData?.banner : ''
          })`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <span>
          <i className="fa fa-camera" />
        </span>
      </div>
      <div className="edit-profile">
        <figure>
          {userDetailsData?.profile_image === null ? (
            <span className="text-uppercase">
              {isNonEmptyString(userDetailsData?.forename)
              && isNonEmptyString(userDetailsData?.surname)
                ? getInitials(
                  `${userDetailsData?.forename}  ${userDetailsData?.surname}`,
                )
                : ''}
            </span>
          ) : (
            <picture>
              <source
                srcSet={userDetailsData?.profile_image}
                type="image/webp"
              />
              <source
                srcSet={userDetailsData?.profile_image}
                type="image/png"
              />
              <img
                loading="lazy"
                src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                data-src={userDetailsData?.profile_image}
                alt="user-img"
                className="img-fluid"
                width={120}
                height={120}
              />
            </picture>
          )}
        </figure>
        <i className="fa fa-camera change-img" />
        <figcaption>
          <div>
            <h4 className="mb-0 mt-2">
              {userDetailsData
              && isNonEmptyString(userDetailsData?.forename)
              && isNonEmptyString(userDetailsData?.surname)
                ? `${userDetailsData?.forename}  ${userDetailsData?.surname}`
                : ''}
            </h4>
            <p className="mb-0">
              {isNonEmptyString(userDetailsData?.bio)
                ? `${userDetailsData?.bio}`
                : ''}
            </p>
            {/* <p className="mb-0">Birmingham, UK</p> */}
          </div>
          <div className="post-count justify-content-center">
            <div className="post">
              <strong>121</strong>
              <span>Posts</span>
            </div>
            {/* <div className="follower">
              <strong>123</strong>
              <span>Followers</span>
            </div>
            <div className="following">
              <strong>134</strong>
              <span>Following</span>
            </div> */}
          </div>
          <div className="edit-btn">
            {currentUserId === userDetailsData?.id ? (
              <Link
                to="/setting"
                state={userDetailsData || null}
                className="btn btn-common px-3"
              >
                Edit profile
              </Link>
            ) : null}
            <button
              type="button"
              className="btn btn-common btn-follow px-3 "
              style={{ display: 'none' }}
            >
              Follow
            </button>
            <button
              type="button"
              className="btn btn-common btn-follow px-3 "
              style={{ display: 'none' }}
            >
              Message
            </button>
          </div>
        </figcaption>
      </div>
    </>
  );
};

export default CoverProfileDetails;
