/* eslint-disable react/no-unescaped-entities */
import LogoImage from "../../assets/images/logo-login.png";
import LoginImage from "../../assets/images/logo-login.webp";
import LeftSidebar from "../../components/leftSideBar/LeftSideBar";
import Emaillogo from "../../assets/images/emai-icon.png";

const ForgotPassword = () => {
  return (
    <section className="main main-login">
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-lg-6 m-auto">
            <div className="login mob main-right mx-4">
              <picture>
                <source srcSet={LoginImage} type="image/webp" />
                <source srcSet={LogoImage} type="image/png" />
                <img
                  loading="lazy"
                  src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  srcSet="assets/images/logo.png"
                  alt="login-logo"
                  className="img-fluid"
                  width="220"
                  height="92"
                />
              </picture>
              <h3>Recover your password</h3>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin.
              </p>
              {/* {message ? (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Password Reset Link Sent Successfully in your Email
                </p>
              ) : (
                ""
              )} */}
              <form>
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="common-form">
                      <div className="mb-4">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="test@gmail.com"
                            name="email"
                            // value={email}
                            // onChange={validateEmail}
                          />
                          <span>
                            <img
                              src={Emaillogo}
                              alt="email"
                              width="16"
                              height="16"
                            />
                          </span>
                          <label htmlFor="floatingInput">Email ID</label>
                        </div>
                        {/* <div className="error">{emailError}</div> */}
                      </div>

                      <div className="mt-3">
                        {/* data-bs-toggle="modal" data-bs-target="#changepass" */}
                        <button
                          type="button"
                          className="btn btn-common w-100 mb-3"
                          //   onClick={handleClick_1}
                        >
                          Recover Password
                        </button>
                      </div>
                      <div className="login-signup">
                        <div>
                          Don't have an Account yet?{" "}
                          <a href="./Register">Sign Up</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <LeftSidebar />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
