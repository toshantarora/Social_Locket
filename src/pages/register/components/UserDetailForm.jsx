/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "react-avatar-edit";
import { Dialog } from "primereact/dialog";
import { Multiselect } from "multiselect-react-dropdown";
import { useMutation, useQueryClient } from "react-query";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/authContext";
import UserImage from "../../../assets/images/user-img.png";
import { postsService } from "../../../services/ImageUploadApi";
import { API } from "../../../services/ApiClient";
import { CountriesList } from "../../../constants/Countries";
// import UserWebImage from "../../../assets/images/user-img.webp";
// import CoverPhoto from "../../../assets/images/cover-photo.jpg";

const options = ["buyer", "seller", "reader", "writter"];
const UserDetailForm = (props) => {
  // const value = useContext(AuthContext);
  const [dialogs, setDialogs] = useState(false);
  const [imageCrop, setImageCrop] = useState(false);
  const [storeImage, setStoreImage] = useState([]);
  const [image, setImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const profileImageShow = storeImage.map((item) => item.imageCrop);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const {
    // refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onClose = () => {
    setImageCrop(null);
  };
  const onCrop = (view) => {
    setImageCrop(view);
  };

  // console.log(value);
  const saveCropImage = async () => {
    setStoreImage([...storeImage, { imageCrop }]);
    setDialogs(false);
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "social_locket");
      formData.append("cloud_name", "dzs0eyrnl");
      const response = await postsService.uploadProfile(formData);
      setProfileImage(response?.url);
      //   return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  console.log("passsowed---------------", props);
  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      // eslint-disable-next-line no-param-reassign
      elem.target.value = "";
    }
    setImage(elem.target.files[0]);
    // console.log(elem.target.files[0]);
  };

  const userMutation = useMutation(
    (user) => {
      return API.post("/register", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["register"]);
      },
    },
  );

  const onSave = async (data) => {
    const userData = {
      email: props?.emailValue,
      forename: data?.forename,
      surname: data.surname,
      mobile: data?.mobile,
      password: props?.passwordValue,
      bio: data?.bio,
      privacy_policy: "yes",
      user_session_id: "",
      title: data.gender === "male" ? "mr" : "Mrs",
      gender: data.gender,
      profile_image: profileImage,
      banner: "no banner upload",
      dob: data?.dob,
      stakeholder: data.stakeholder,
      main_user_type: "seller",
      seller: "0",
      buyer: "",
      finance: "",
      legal: "",
      status: "",
      agent: "",
      other: "",
      accountant: "",
      unit_number: "Some Unit Number",
      street_number: "Some St Number",
      address_line_1: data?.addressLine1,
      address_line_2: data?.addressLine2,
      city: data?.city,
      region: "",
      postal_code: data?.postalCode,
      country_id: data?.country,
      address_type: "Personal",
      // nick_name: "Albania",
    };
    console.log(userData);
    // e.preventDefault();
    userMutation.mutate(userData);
    // navigate("/", { replace: true });
    // setOpenUpdate(false);
    // setCover(null);
    // setProfile(null);
  };

  return (
    <div
      id="complete_profile"
      tabIndex="-1"
      aria-labelledby="complete_profileModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div>
            <div className="user-profile complete-profile">
              <figure>
                <img
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "-0.3rem",
                    // border: "4px solid grey"
                  }}
                  onClick={() => setDialogs(true)}
                  src={profileImageShow.length ? profileImageShow : UserImage}
                  alt=""
                />{" "}
                <i
                  className="fa fa-camera change-img"
                  onClick={() => setDialogs(true)}
                />
                <Dialog
                  visible={dialogs}
                  header={() => (
                    <p htmlFor="" className="text-2xl font-semibold textColor">
                      Update Profile
                    </p>
                  )}
                  onHide={() => setDialogs(false)}
                >
                  <div className="confirmation-content flex flex-column align-items-center">
                    <Avatar
                      width={500}
                      height={400}
                      onCrop={onCrop}
                      onClose={onClose}
                      //   src={src}
                      onBeforeFileLoad={onBeforeFileLoad}
                      shadingColor="#474649"
                      backgroundColor="#474649"
                    />
                    <div className="flex flex-column align-items-center mt-5 w-12">
                      <div className="flex justify-content-around w-12 mt-4">
                        <button
                          type="button"
                          onClick={saveCropImage}
                          // label='Save'
                          icon="pi pi-check"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog>
                {/* <div className="card flex justify-content-center">
                  <Button
                    label="Show"
                    icon="pi pi-external-link"
                    onClick={() => setVisible(true)}
                  />
                  <Dialog
                    header="Header"
                    visible={visible}
                    style={{ width: "50vw" }}
                    onHide={() => setVisible(false)}
                  >
                    <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </Dialog>
                </div> */}
                {/* <input
                  type="file"
                  accept="/image/*"
                  style={{ display: "none" }}
                  //   onClick={() => setImagecrop(true)}
                  onChange={(e) => {
                    const file = e.target.value[0];
                    if (file && file.type.substring(0, 5) === "image") {
                      setImage(file);
                    } else {
                      setImage(null);
                    }
                  }}
                  {...register("file")}
                /> */}
              </figure>
            </div>

            <form className="row g-3 mt-4">
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="forename"
                    placeholder="Lettie Creator"
                    name="forename"
                    {...register("forename")}
                  />
                  <label htmlFor="forename" className="form-label">
                    First Name
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    placeholder="Christen Creator"
                    name="surname"
                    {...register("surname")}
                  />
                  <label htmlFor="surname" className="form-label">
                    Last Name
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="bio"
                    placeholder="Content Creator"
                    name="bio"
                    {...register("bio")}
                  />
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="test@gmail.com"
                    defaultValue={props?.emailValue}
                    {...register("email", {
                      //   required: "Required",
                    })}
                    disabled
                  />
                  <label htmlFor="email">Email ID</label>
                </div>
                {errors?.email?.message ? (
                  <div style={{ color: "red" }}>{errors?.email?.message}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    {...register("gender")}
                    className="form-select"
                    id="gender"
                    aria-label="Floating label select example"
                  >
                    <option selected="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label htmlFor="floatingInput">Gender</label>
                </div>
                {errors?.gender?.message ? (
                  <div style={{ color: "red" }}>{errors?.gender?.message}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    placeholder="Address 1"
                    {...register("dob")}
                  />
                  <label htmlFor="dob" className="form-label">
                    D.O.B
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="+92 9887673456"
                    {...register("mobile")}
                  />
                  <label htmlFor="mobile" className="form-label">
                    Contact Number
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <Controller
                  control={control}
                  name="stakeholder"
                  render={({ field: { value, onChange } }) => (
                    <Multiselect
                      options={options}
                      isObject={false}
                      showCheckbox
                      hidePlaceholder
                      closeOnSelect={false}
                      onSelect={onChange}
                      onRemove={onChange}
                      selectedValues={value}
                      placeholder="Stakeholder"
                      //   className="form-select"
                    />
                  )}
                />
                <div className="form-floating mb-3">
                  {/* <select
                className="form-select"
                id="stakeholder"
                multiple
                aria-label="Floating label select example"
                {...register("stakeholder")}
              >
                <option selected="">Buyer</option>
                <option value={1}>Seller</option>
                <option value={2}>Reader</option>
                <option value={3}>Writter</option>
              </select> */}
                  {/* <label htmlFor="stakeholder">Stakeholder Type</label> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="country"
                    aria-label="Floating label select example"
                    {...register("country")}
                  >
                    {CountriesList?.length &&
                      CountriesList.map((item, idx) => (
                        <option key={idx} value={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="country">Country</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine1"
                    name="addressLine1"
                    placeholder="Address 1"
                    {...register("addressLine1")}
                  />
                  <label htmlFor="addressLine1" className="form-label">
                    Address 1
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine2"
                    placeholder="Address 2"
                    name="addressLine2"
                    {...register("addressLine2")}
                  />
                  <label htmlFor="addressLine2" className="form-label">
                    Address 2
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Birmingham"
                    name="city"
                    {...register("city")}
                  />
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="postal_code"
                    placeholder="Birmingham"
                    name="postal_code"
                    {...register("postal_code")}
                  />
                  <label htmlFor="postal_code" className="form-label">
                    Postal Code
                  </label>
                </div>
              </div>
            </form>
          </div>
          <br />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-common"
              onClick={handleSubmit(onSave)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailForm;
