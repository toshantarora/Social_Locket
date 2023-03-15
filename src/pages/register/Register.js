import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/images/logo-login.png";
import LoginImage from "../../assets/images/logo-login.webp";
import Emaillogo from "../../assets/images/emai-icon.png";
import LeftSidebar from "../../components/leftSideBar/LeftSideBar";

const Register = () => {
  return (
    <section className="main main-register">
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
                  alt="login logo"
                  className="img-fluid"
                  width="200"
                  height="92"
                />
              </picture>
              <h3>Create an Account</h3>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin.
              </p>
              <form>
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="common-form">
                      <div className="btn-group reader-writer">
                        <input
                          type="radio"
                          className="btn-check"
                          name="reader"
                          id="writer"
                          autoComplete="off"
                          defaultChecked
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="writer"
                        >
                          Writer
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="reader"
                          id="reader"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="reader"
                        >
                          Reader
                        </label>
                      </div>
                      {/* {errormsg ? (
                        <div className="alert alert-danger" role="alert">
                          {errormsg}
                        </div>
                      ) : (
                        ""
                      )} */}

                      <div className="mb-4">
                        <div className="form-floating">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            // value={userData.email}
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

                      {/* <div className="or"><span>or</span></div>
                                    <div className="register-mobile" >
                                        <PhoneInput
                                            className="form-control"
                                            id="floatingInput"
                                            name="mobile"
                                            dropdownstyle={{ height: '200px', width: '480px' }}
                                            defaultCountry={country}
                                            value={phone}
                                            onChange={setPhone} />
                                        <label htmlFor="floatingInput">Enter your mobile no.</label>
                                        <span><img src={Keyboard} alt="key" width="14" height="16" /></span> </div>
                                    {<span style={{ color: 'red' }}>{(phone === undefined) || (phone && isValidPhoneNumber(phone)) ? '' : 'Enter Valid Number'}</span>} */}
                      <div className="mb-4">
                        <div className="form-floating">
                          <input
                            // type={type}
                            minLength="8"
                            name="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            // value={userData.password}
                            // onChange={validatePassword}
                          />
                          {/* <span onClick={togglePassword}>{icon}</span> */}
                          <label htmlFor="floatingPassword">Password</label>
                        </div>
                        {/* {errorPassword === "" ? null : (
                          <div className="error">{errorPassword}</div>
                        )} */}
                      </div>

                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-common w-100 mb-3"
                          //   onClick={handle_Click}
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className="login-signup">
                        <div className="mb-0">
                          If you have already account!
                          <Link to="/login"> Login</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <LeftSidebar />

          {/* //////////////////photo upload model///////////////// */}

          {/* //////////////////////////xxxxx///////////////////////////////// */}

          <Modal
            // show={isOpen}
            // onHide={closeModal}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <h5 className="modal-title" id="exampleModalLabel">
                Complete Profile
              </h5>
            </Modal.Header>
            <Modal.Body>
              {/* <Form
                email={registerData.email}
                password={registerData.password}
                userid={registerData.userid}
              /> */}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default Register;
