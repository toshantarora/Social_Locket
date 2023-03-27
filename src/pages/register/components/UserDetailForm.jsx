/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "react-avatar-edit";
import { Dialog } from "primereact/dialog";
import { Multiselect } from "multiselect-react-dropdown";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UserImage from "../../../assets/images/user-img.png";
import { postsService } from "../../../services/ImageUploadApi";
import { API } from "../../../services/ApiClient";
import { userTitles } from "../../../constants/UserTitles";
import { countryService } from "../../../services/CountryService";

const UserDetailForm = (props) => {
  const options = ["buyer", "seller", "reader", "writter"];
  const [countryList, SetCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    id: 1,
    name: "AFGHANISTAN",
    nick_name: "Afghanistan",
    iso3: "AFG",
    phone_code: 93,
  });
  // const value = useContext(AuthContext);
  const [dialogs, setDialogs] = useState(false);
  const [imageCrop, setImageCrop] = useState(false);
  const [storeImage, setStoreImage] = useState([]);
  const [image, setImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const {
    // refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getCounties() {
      const countryData = await countryService.GetCountryCodes();
      SetCountryList(countryData);
    }
    getCounties();
  }, []);

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
        useNavigate("/");
      },
    },
  );

  const onSave = async (data) => {
    let userTypes = "";
    if (data?.main_user_type) {
      userTypes = [...data.main_user_type].join(",");
    }

    const userData = {
      email: props?.emailValue,
      forename: data?.forename,
      surname: data.surname,
      mobile: `+${selectedCountry?.phone_code} ${data?.mobile}`,
      password: props?.passwordValue,
      bio: data?.bio,
      privacy_policy: "yes",
      user_session_id: "",
      title: data?.title,
      gender: data.gender,
      profile_image: profileImage,
      banner: "no banner upload",
      dob: data?.dob,
      main_user_type: userTypes,
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
      address_line_1: "",
      address_line_2: "",
      city: "",
      region: "",
      postal_code: "",
      country_id: selectedCountry?.id,
      address_type: "Personal",
      // nick_name: "Albania",
    };
    // e.preventDefault();
    userMutation.mutate(userData);
    // navigate("/", { replace: true });
    // setOpenUpdate(false);
    // setCover(null);
    // setProfile(null);
  };
  const handleCountryChange = async (event) => {
    const selectedCountryData = countryList.filter(
      (x) => x.id === event.target.value,
    );
    setSelectedCountry(selectedCountryData[0]);
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
                  loading="lazy"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "-0.3rem",
                    // border: "4px solid grey"
                  }}
                  onClick={() => setDialogs(true)}
                  src={imageCrop || UserImage}
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

            <form className="row g-3 mt-4 px-4">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <div
                    className="input-group-prepend"
                    style={{ height: "48px" }}
                  >
                    <select
                      {...register("title")}
                      className="form-select"
                      id="title"
                      style={{
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        height: "48px",
                      }}
                    >
                      {userTitles.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="forename"
                    placeholder="First Name"
                    name="forename"
                    {...register("forename")}
                  />
                </div>
              </div>
              <div className="col-md-4">
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
                <select
                  {...register("gender")}
                  className="form-select"
                  id="gender"
                  style={{
                    height: "48px",
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors?.gender?.message ? (
                  <div style={{ color: "red" }}>{errors?.gender?.message}</div>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="col-md-3">
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
              </div> */}
              {/* <div className="col-md-3 d-none">
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
              </div> */}
              {/* 
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
              </div> */}
              <div className="col-md-5">
                {countryList.length > 0 ? (
                  <div className="input-group mb-3">
                    <div
                      className="input-group-prepend"
                      style={{ height: "48px" }}
                    >
                      <select
                        className="form-select"
                        style={{
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                          height: "48px",
                        }}
                        onChange={(e) => handleCountryChange(e)}
                      >
                        {countryList.map((option) => (
                          <option key={option.id} value={option.id}>
                            {`${option.iso} +${option.phone_code}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Contact Number"
                      {...register("mobile")}
                    />
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="col-md-7">
                <Controller
                  control={control}
                  name="main_user_type"
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
                      placeholder="Select User Type"
                      className="text"
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
