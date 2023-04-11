import { isNonEmptyString } from '../../../helpers';

const UserBio = ({
  userDetailsData,
  isUserDetailsLoading,
  userDetailsError,
}) => {
  if (isUserDetailsLoading) {
    return (
      <div>
        <p>...Loading</p>
      </div>
    );
  }
  return (
    <div className="profile-bio">
      {userDetailsError && (
        <p>
          {' '}
          {userDetailsError}
          {' '}
        </p>
      )}
      <table className="table">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              {isNonEmptyString(userDetailsData?.forename)
                ? `${userDetailsData?.forename}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              {isNonEmptyString(userDetailsData?.surname)
                ? `${userDetailsData?.surname}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Bio</td>
            <td>
              {' '}
              {isNonEmptyString(userDetailsData?.bio)
                ? `${userDetailsData?.bio}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Email Id</td>
            <td>
              {' '}
              {isNonEmptyString(userDetailsData?.email)
                ? `${userDetailsData?.email}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
              {isNonEmptyString(userDetailsData?.gender)
                ? `${userDetailsData?.gender}`
                : ''}
            </td>
          </tr>
          {/* <tr>
            <td>Age</td>
            <td>
              {' '}
              {isNonEmptyString(userDetailsData?.age)
                ? `${userDetailsData?.age}`
                : ''}
            </td>
          </tr> */}
          <tr>
            <td>Contant No.</td>
            <td>
              {' '}
              {isNonEmptyString(userDetailsData?.mobile)
                ? `${userDetailsData?.mobile}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Main User Type</td>
            <td>
              {' '}
              {isNonEmptyString(userDetailsData?.main_user_type)
                ? `${userDetailsData?.main_user_type}`
                : ''}
            </td>
          </tr>
          {/* <tr>
            <td>Country</td>
            <td>
              {' '}
              {isNonEmptyString(userDetailsData?.country)
                ? `${userDetailsData?.country}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {isNonEmptyString(userDetailsData?.address)
                ? `${userDetailsData?.address}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>City</td>
            <td>
              {isNonEmptyString(userDetailsData?.city)
                ? `${userDetailsData?.city}`
                : ''}
            </td>
          </tr>
          <tr>
            <td>Postal Code</td>
            <td>
              {isNonEmptyString(userDetailsData?.postal_code)
                ? `${userDetailsData?.postal_code}`
                : ''}
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default UserBio;
