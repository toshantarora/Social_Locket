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
      <div class="addrssess my-4">
        <h4>Primary Address <span><i class="fa fa-check"></i></span></h4>
        <div class="card">
          <div class="card-body">
          <p class="mb-1"><strong>Street: </strong>  84 Wrexham Rd</p> 
          <p class="mb-1"><strong>City: </strong>  Framingham Earl </p> 
          <p class="mb-1"><strong>Phone number: </strong>  838 5552 4383</p>
          <p class="mb-1"><strong>Zip code: </strong>  HR6 6WU</p>
          <p class="mb-1"><strong>Country calling code: </strong>  +44</p> 
          <p class="mb-1"><strong>Country: </strong>  United Kingdom</p>
          </div>
        </div>
      </div>
      <div class="addrssess my-4">
        <h4>Secondary Address</h4>
        <div class="card">
          <div class="card-body">
          <p class="mb-1"><strong>Street: </strong>  84 Wrexham Rd</p> 
          <p class="mb-1"><strong>City: </strong>  Framingham Earl </p> 
          <p class="mb-1"><strong>Phone number: </strong>  838 5552 4383</p>
          <p class="mb-1"><strong>Zip code: </strong>  HR6 6WU</p>
          <p class="mb-1"><strong>Country calling code: </strong>  +44</p> 
          <p class="mb-1"><strong>Country: </strong>  United Kingdom</p>
          </div>
          <div class="card-body">
          <p class="mb-1"><strong>Street: </strong>  84 Wrexham Rd</p> 
          <p class="mb-1"><strong>City: </strong>  Framingham Earl </p> 
          <p class="mb-1"><strong>Phone number: </strong>  838 5552 4383</p>
          <p class="mb-1"><strong>Zip code: </strong>  HR6 6WU</p>
          <p class="mb-1"><strong>Country calling code: </strong>  +44</p> 
          <p class="mb-1"><strong>Country: </strong>  United Kingdom</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
