import { isNonEmptyString } from "../../../helpers";

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
      {userDetailsError && <p> {userDetailsError} </p>}
      <table className="table">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              {isNonEmptyString(userDetailsData?.forename)
                ? `${userDetailsData?.forename}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              {isNonEmptyString(userDetailsData?.surname)
                ? `${userDetailsData?.surname}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Bio</td>
            <td>
              {" "}
              {isNonEmptyString(userDetailsData?.bio)
                ? `${userDetailsData?.bio}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Email Id</td>
            <td>
              {" "}
              {isNonEmptyString(userDetailsData?.email)
                ? `${userDetailsData?.email}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
              {isNonEmptyString(userDetailsData?.gender)
                ? `${userDetailsData?.gender}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Age</td>
            <td>
              {" "}
              {isNonEmptyString(userDetailsData?.age)
                ? `${userDetailsData?.age}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Contant No.</td>
            <td>
              {" "}
              {isNonEmptyString(userDetailsData?.mobile)
                ? `${userDetailsData?.mobile}`
                : ""}
            </td>
          </tr>
          <tr>
            <td>Main User Type</td>
            <td>
              {" "}
              {isNonEmptyString(userDetailsData?.main_user_type)
                ? `${userDetailsData?.main_user_type}`
                : ""}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="addrssess my-4">
        <h4>
          <span>
            <i class="fa fa-check"></i>
          </span>{" "}
          Primary Address
        </h4>
        <div class="card">
          <div class="card-body">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Street:</th>
                  <td colspan="2">84 Wrexham Rd</td>
                </tr>
                <tr>
                  <th scope="row">City:</th>
                  <td>Framingham Earl</td>
                </tr>
                <tr>
                  <th scope="row">Phone number:</th>
                  <td>838 5552 4383</td>
                </tr>
                <tr>
                  <th scope="row">Zip code:</th>
                  <td>HR6 6WU</td>
                </tr>
                <tr>
                  <th scope="row">Country calling code:</th>
                  <td>+44</td>
                </tr>
                <tr>
                  <th scope="row">Country:</th>
                  <td>United Kingdom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="addrssess my-4">
        <h4>Secondary Address</h4>
        <div class="card">
          <div class="card-body">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Street:</th>
                  <td colspan="2">84 Wrexham Rd</td>
                </tr>
                <tr>
                  <th scope="row">City:</th>
                  <td>Framingham Earl</td>
                </tr>
                <tr>
                  <th scope="row">Phone number:</th>
                  <td>838 5552 4383</td>
                </tr>
                <tr>
                  <th scope="row">Zip code:</th>
                  <td>HR6 6WU</td>
                </tr>
                <tr>
                  <th scope="row">Country calling code:</th>
                  <td>+44</td>
                </tr>
                <tr>
                  <th scope="row">Country:</th>
                  <td>United Kingdom</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Street:</th>
                  <td colspan="2">84 Wrexham Rd</td>
                </tr>
                <tr>
                  <th scope="row">City:</th>
                  <td>Framingham Earl</td>
                </tr>
                <tr>
                  <th scope="row">Phone number:</th>
                  <td>838 5552 4383</td>
                </tr>
                <tr>
                  <th scope="row">Zip code:</th>
                  <td>HR6 6WU</td>
                </tr>
                <tr>
                  <th scope="row">Country calling code:</th>
                  <td>+44</td>
                </tr>
                <tr>
                  <th scope="row">Country:</th>
                  <td>United Kingdom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
