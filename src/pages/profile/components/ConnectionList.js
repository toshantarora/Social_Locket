import React from 'react'
import { Link } from 'react-router-dom';
import { getInitials } from '../../../helpers';
import useConnectedUsers from '../../../hooks/query/AllUserProfile/useAllConnectedUsersList';

const ConnectionList = (props) => {
   
      const {
        isLoading: isConnectedUserListLoading,
        error: connectedUserListError,
        data: connectedUserListData,
      } = useConnectedUsers(props?.userId);
      console.log('connectedUserListData', connectedUserListData);

      if (isConnectedUserListLoading)
      {
        return <p>...Loading</p>
      }
        return (
          <div>
            {connectedUserListError && <p>{connectedUserListError}</p>}
            <ul>
              {connectedUserListData &&
                connectedUserListData.length > 0 ?
                connectedUserListData.map((user) => (
                  <li key={user.id}>
                    <div className="user-post search-user">
                      <div className="post-profile">
                        <figure>
                          <Link
                            to={`/profile/${user.forename}${user.surname}_${user.id}`}>
                            <span hidden={user.profile_image}>
                              {getInitials(`${user.forename} ${user.surname}`)}
                            </span>
                            <picture hidden={!user.profile_image}>
                              <source
                                srcSet={user.profile_image}
                                type="image/webp"
                              />
                              <source
                                srcSet={user.profile_image}
                                type="image/png"
                              />
                              <img
                                loading="lazy"
                                src="assets/images/user-img.png"
                                data-src="assets/images/user-img.png"
                                alt="user-img"
                                className="img-fluid"
                                width={70}
                                height={70}
                              />
                            </picture>
                          </Link>
                        </figure>
                        <figcaption>
                          <h5 className="mb-0">
                            <Link
                              to={`/profile/${user.forename}${user.surname}_${user.id}`}>{`${user.forename} ${user.surname}`}</Link>
                          </h5>
                          <span>{user.bio}</span>
                        </figcaption>
                      </div>
                    </div>
                  </li>
                )): <p>User's not connect yet</p>}
            </ul>
          </div>
        );
}

export default ConnectionList