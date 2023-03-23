/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import YupPassword from "yup-password";
import LogoImage from "../../assets/images/logo-login.png";
import LoginImage from "../../assets/images/logo-login.webp";
import Emaillogo from "../../assets/images/emai-icon.png";
import LeftSidebar from "../../components/leftSideBar/LeftSideBar";
import { AuthContext } from "../../context/authContext";
import ModalComponent from "../../components/modalComponent/ModalComponent";
import UserDetailForm from "./components/UserDetailForm";
// import { isNumber } from "../../helpers";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

YupPassword(yup);
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const schema = yup.object({
  email: yup.string().email().required(),

  password: yup
    .string()
    .password()
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special",
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const value = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const passwordValue = watch("password");
  const emailValue = watch("email");

  const onSubmit = async () => {
    // value?.register(data);
    setModalShow(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

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
                      {value?.auth?.message ? (
                        <div className="alert alert-danger" role="alert">
                          {value?.auth?.message}
                        </div>
                      ) : null}

                      <div className="mb-4">
                        <div className="form-floating">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            {...register("email")}
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
                        {errors?.email?.message ? (
                          <div className="alert alert-danger" role="alert">
                            {errors?.email?.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="form-floating">
                          <input
                            minLength="8"
                            name="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            {...register("password")}
                            type={passwordShown ? "text" : "password"}
                          />
                          {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                          <span
                            role="button"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordShown ? eye : eyeSlash}
                          </span>
                          <label htmlFor="floatingPassword">Password</label>
                        </div>
                        {errors?.password?.message ? (
                          <div className="alert alert-danger" role="alert">
                            {errors?.password?.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-common w-100 mb-3"
                          onClick={handleSubmit(onSubmit)}
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

          <ModalComponent
            show={modalShow}
            onHide={() => setModalShow(false)}
            heading="Complete Profile"
            size="xl"
          >
            <UserDetailForm
              passwordValue={passwordValue}
              emailValue={emailValue}
            />
          </ModalComponent>
          {/* <Modal
            show={isOpen}
            onHide={closeModal}
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
              <Form
                email={registerData.email}
                password={registerData.password}
                userid={registerData.userid}
              />
            </Modal.Body>
          </Modal> */}
        </div>
      </div>
    </section>
  );
};

export default Register;
