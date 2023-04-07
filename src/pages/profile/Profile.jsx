import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getAfterUnderScoreValue, isNonEmptyArray } from "../../helpers";
import useUsersById from "../../hooks/query/AllUserProfile/useUserById";
import useUserPosts from "../../hooks/query/AllUserProfile/useUserPostById";
import CoverProfileDetails from "./components/CoverProfileDetails";
import Tabs from "../../components/tabs/Tabs";
import UserBio from "./components/UserDetailBio";
import UserPosts from "./components/UserPosts";

const Profile = () => {
  const params = useParams();
  const id = getAfterUnderScoreValue(params);
  const { auth } = useContext(AuthContext);

  const {
    isLoading: isUserDetailsLoading,
    error: userDetailsError,
    data: userDetailsData,
  } = useUsersById(id);
  const { data: usersPost } = useUserPosts(id);

  const tabs = [
    {
      title: "Bio",
      content: (
        <UserBio
          userDetailsData={userDetailsData}
          isUserDetailsLoading={isUserDetailsLoading}
          userDetailsError={userDetailsError}
        />
      ),
    },
    {
      title: "Post",
      content: (
        <UserPosts usersPost={usersPost} />
      ),
    },
  ];
  return (
    <main id="layoutSidenav_content">
      <div className="box-shadow">
        <div className="profile">
          <div className="cover-profile">
            <CoverProfileDetails
              currentUserId={auth?.userId}
              userDetailsData={userDetailsData}
            />
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>
    </main>
  );
};

export default Profile;
