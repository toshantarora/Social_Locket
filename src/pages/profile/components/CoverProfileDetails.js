// import React from "react";

import { Link } from "react-router-dom";
import { getInitials, isNonEmptyString } from "../../../helpers";
import { useState } from "react";
import ModalComponent from "../../../components/modalComponent/ModalComponent";
import ConnectionList from "./ConnectionList";

const CoverProfileDetails = ({ userDetailsData, currentUserId }) => {
  const [isModalOpen, setIsModal] = useState(false);

  return (
    <>
      <div
        className="cover-photo"
        style={{
          backgroundImage: `url(${
            userDetailsData?.banner != null ? userDetailsData?.banner : ""
          })`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {currentUserId === userDetailsData?.id ? (
          <span>
            <i class="fa-solid fa-camera"></i>
          </span>
        ) : null}
      </div>
      <div className="edit-profile">
        <figure>
          {userDetailsData?.profile_image === null ? (
            <span className="text-uppercase">
              {isNonEmptyString(userDetailsData?.forename) &&
              isNonEmptyString(userDetailsData?.surname)
                ? getInitials(
                    `${userDetailsData?.forename}  ${userDetailsData?.surname}`
                  )
                : ""}
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

        {currentUserId === userDetailsData?.id ? (
          <i className="fa fa-camera change-img" />
        ) : null}

        <figcaption>
          <div>
            <h4 className="mb-0 mt-2">
              {userDetailsData &&
              isNonEmptyString(userDetailsData?.forename) &&
              isNonEmptyString(userDetailsData?.surname)
                ? `${userDetailsData?.forename}  ${userDetailsData?.surname}`
                : ""}

              {currentUserId === userDetailsData?.id ? (
                <Link
                  to="/setting"
                  state={userDetailsData || null}
                  className=""
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                </Link>
              ) : null}
            </h4>
            <p className="mb-0">
              {isNonEmptyString(userDetailsData?.bio)
                ? `${userDetailsData?.bio}`
                : ""}
            </p>
          </div>
          <div
            className="post-count justify-content-center"
            style={{ display: "none" }}
          >
            <div className="post">
              <strong>121</strong>
              <span>Posts</span>
            </div>
            <div className="follower">
              <strong>123</strong>
              <span>Followers</span>
            </div>
            <div className="following">
              <strong>134</strong>
              <span>Following</span>
            </div>
          </div>
          {currentUserId === userDetailsData?.id ? (
            <div className="edit-btn">
              <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
                onClick={() => setIsModal(!isModalOpen)}
              >
                <i class="fa-regular fa-user"></i> Connections
              </button>
              <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
              >
                <i class="fa-regular fa-message"></i> Message
              </button>
            </div>
          ) : null}

          {currentUserId !== userDetailsData?.id ? (
            <div className="edit-btn">
              <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
                //onClick={() => setIsModal(!isModalOpen)}
              >
                Follow
              </button>
              <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
              >
                Message
              </button>
            </div>
          ) : null}
        </figcaption>
      </div>
      <ModalComponent
        show={isModalOpen}
        onHide={() => setIsModal(false)}
        heading="Connected User"
        size="xs"
      >
        <ConnectionList userId={currentUserId}></ConnectionList>
      </ModalComponent>
    </>
  );
};

export default CoverProfileDetails;
