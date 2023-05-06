// import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { getInitials, isNonEmptyString } from "../../../helpers";
import { useContext, useRef, useState } from "react";
import ModalComponent from "../../../components/modalComponent/ModalComponent";
import ConnectionList from "./ConnectionList";
import useConnectedUsers from "../../../hooks/query/AllUserProfile/useAllConnectedUsersList";
import { userService } from "../../../services/UserService";
import { AuthContext } from "../../../context/authContext";
import { useQueryClient } from "react-query";
import { API } from "../../../services/ApiClient";
import Message from "../message/Message";
import BannerImage from "../../../assets/images/profile-banner.jpg";
const CoverProfileDetails = ({ userDetailsData, currentUserId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const ProfileInputRef = useRef(null);

  const [isModalOpen, setIsModal] = useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const {
    isLoading: isConnectedUserListLoading,
    error: connectedUserListError,
    data: connectedUserListData,
  } = useConnectedUsers(currentUserId);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(userDetailsData);

  const handleDeleteUserMembers = async (item) => {
    try {
      await userService.deleteUserMembers({
        userId: auth?.userId,
        data: {
          id: item?.id,
          user_id: item?.user_id,
          users_members_id: item?.users_members_id,
        },
      });
      await queryClient.invalidateQueries(["connect-user"]);
    } catch (error) {}
  };

  const onConnectClick = async (e) => {
    e.preventDefault();

    if (auth?.userId) {
      const connectPayload = {
        user_id: auth?.userId,
        users_members_id: userDetailsData?.id,
      };
      // mutate(connectPayload);
      try {
        const res = await API.post("users-members", connectPayload);
        await queryClient.invalidateQueries(["connect-user"]);
      } catch (error) {}
    } else {
      navigate("/login");
    }
  };

  const followButton = () => {
    let followUser = connectedUserListData?.find(
      (row) => row?.users_members_id === userDetailsData?.id
    );

    return !!!followUser ? (
      <button
        type="button"
        className="btn btn-common btn-follow px-3 "
        onClick={onConnectClick}
        // disabled={
        //   isConnectLoading ||
        //   connectedUserListData.filter(
        //     (user) => user.users_members_id === user.id
        //   )
        // }
      >
        Add
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-common unfollow-btn px-3 "
        onClick={(e) => handleDeleteUserMembers(followUser)}
        // disabled={
        //   isConnectLoading ||
        //   connectedUserListData.filter(
        //     (user) => user.users_members_id === user.id
        //   )
        // }
      >
        Remove
      </button>
    );
  };
  const openMessagePopup = (user) => {
    console.log({ user });
    setIsModal(false);
    setSelectedUser(user);
    setIsMessageBoxOpen(true);
  };
  const handleFileOpenClick = (type) => {
    type === "profile"
      ? ProfileInputRef.current.click()
      : fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
      if (file) {
        alert("Please select an image file.");
      }
    }
  };

  const handleProfileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedProfileImage(file);
    } else {
      setSelectedProfileImage(null);
      if (file) {
        alert("Please select an image file.");
      }
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    fileInputRef.current.value = "";
  };
  console.log({ selectedImage });
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
        accept="image/*"
        onClick={() => {
          fileInputRef.current.value = "";
        }}
      />
      <input
        type="file"
        ref={ProfileInputRef}
        style={{ display: "none" }}
        onChange={handleProfileInputChange}
        accept="image/*"
        onClick={() => {
          ProfileInputRef.current.value = "";
        }}
      />
      <div
        className="cover-photo"
        style={{
          backgroundImage: selectedImage
            ? `url(${URL.createObjectURL(selectedImage)})`
            : `url(${
                userDetailsData?.banner != null
                  ? userDetailsData?.banner
                  : BannerImage
              })`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {currentUserId === userDetailsData?.id ? (
          <span onClick={handleFileOpenClick}>
            <i class="fa-solid fa-camera"></i>
          </span>
        ) : null}
      </div>
      <div className="edit-profile">
        <figure>
          {userDetailsData?.profile_image === null && !selectedProfileImage ? (
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
                srcSet={
                  selectedProfileImage
                    ? URL.createObjectURL(selectedProfileImage)
                    : userDetailsData?.profile_image
                }
                type="image/webp"
              />
              <source
                srcSet={
                  selectedProfileImage
                    ? URL.createObjectURL(selectedProfileImage)
                    : userDetailsData?.profile_image
                }
                type="image/png"
              />
              <img
                loading="lazy"
                src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                data-src={
                  selectedProfileImage
                    ? URL.createObjectURL(selectedProfileImage)
                    : userDetailsData?.profile_image
                }
                alt="user-img"
                className="img-fluid"
                width={120}
                height={120}
              />
            </picture>
          )}
        </figure>

        {currentUserId === userDetailsData?.id ? (
          <i
            className="fa fa-camera change-img"
            onClick={() => handleFileOpenClick("profile")}
          />
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
              {/* <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
              >
                <i class="fa-regular fa-message"></i> Message
              </button> */}
            </div>
          ) : null}
          {currentUserId !== userDetailsData?.id ? (
            <div className="edit-btn">
              {/* <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
                // onClick={() => setIsModal(!isModalOpen)}
              >
                Add
              </button> */}
              {followButton()}
              <button
                type="button"
                className="btn btn-common btn-follow px-3 "
                // style={{ display: 'none' }}
                onClick={() => {
                  setIsMessageBoxOpen((prev) => !prev);
                  setSelectedUser(userDetailsData);
                }}
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
        heading="Contacts"
        size="xs"
      >
        <ConnectionList
          userId={currentUserId}
          handleClose={() => setIsModal(false)}
          handleDeleteUserMembers={handleDeleteUserMembers}
          openMessagePopup={openMessagePopup}
        />
      </ModalComponent>

      {isMessageBoxOpen && (
        <Message
          handleClose={() => {
            setIsMessageBoxOpen(false);
            setSelectedUser(userDetailsData);
          }}
          currentUser={selectedUser}
        />
      )}
    </>
  );
};

export default CoverProfileDetails;
