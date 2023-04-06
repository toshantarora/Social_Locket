import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { getSelectedValues } from "../../../helpers";
import { API } from "../../../services/ApiClient";
import { AuthContext } from "../../../context/authContext";

const schema = yup.object().shape({
  forename: yup.string().required("First Name is required"),
  surname: yup.string().required("Last Name is required"),
});
const options = [
  "buyer",
  "seller",
  "finance",
  "legal",
  "agent",
  "accountant",
  "other",
];
const DetailsForm = ({ preloadedValues, userSelectedTypesData }) => {
  const [user, setUser] = useState(null);
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit, control, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const UserType = watch("user_type");
  // console.log("preloadedValues", preloadedValues);
  const objectWithOnes = userSelectedTypesData ? userSelectedTypesData[0] : {};

  const selectedOptions = getSelectedValues(objectWithOnes);
  // console.log("selectedOptions---", selectedOptions);

  useEffect(() => {
    // simulate async api call with set timeout
    setTimeout(
      () =>
        setUser({
          forename: preloadedValues?.forename,
          surname: preloadedValues?.surname,
          email: preloadedValues?.email,
          bio: preloadedValues?.bio,
          mobile: preloadedValues?.mobile,
          gender: preloadedValues?.gender,
          city: preloadedValues?.city,
          main_user_type: preloadedValues?.main_user_type,
          user_type: selectedOptions,
          // dob: preloadedValues?.dob,
        }),
      100,
    );
  }, [preloadedValues]);
  // console.log("userSelectedTypesData", userSelectedTypesData);
  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  const queryClient = useQueryClient();
  const updateDetails = useMutation(
    async (payload) => {
      const res = API.put(`users/${preloadedValues?.id}`, payload);
      // console.log(res);
      if (res) {
        return res;
      }

      return null;
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(["users-types"]);
        }
      },
    },
  );

  const updateUserTypes = useMutation(
    async (payload) => {
      const res = await API.put(`user-types/${preloadedValues?.id}`, payload);
      // console.log(res);
      if (res) {
        return res;
      }
      return null;
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(["users"]);
        }
      },
    },
  );

  useEffect(() => {
    if (updateDetails.isSuccess && updateUserTypes.isSuccess) {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  }, [updateDetails.isSuccess, updateUserTypes.isSuccess]);
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const userDetails = {
      id: preloadedValues?.id,
      forename: data?.forename,
      surname: data.surname,
      dob: data.date,
      bio: data?.bio,
      gender: data?.gender,
      mobile: data?.mobile,
      email: data?.email,
      main_user_type: data?.main_user_type,
      seller: UserType && UserType.includes("seller") ? "1" : "0",
      buyer: UserType && UserType.includes("buyer") ? "1" : "0",
      finance: UserType && UserType.includes("finance") ? "1" : "0",
      legal: UserType && UserType.includes("legal") ? "1" : "0",
      status: "",
      agent: UserType && UserType.includes("agent") ? "1" : "0",
      other: UserType && UserType.includes("other") ? "1" : "0",
      accountant: UserType && UserType.includes("accountant") ? "1" : "0",
    };
    const userTypesUpdateData = {
      id: preloadedValues?.id,
      user_id: auth?.userId,
      seller: UserType && UserType.includes("seller") ? "1" : "0",
      buyer: UserType && UserType.includes("buyer") ? "1" : "0",
      finance: UserType && UserType.includes("finance") ? "1" : "0",
      legal: UserType && UserType.includes("legal") ? "1" : "0",
      agent: UserType && UserType.includes("agent") ? "1" : "0",
      other: UserType && UserType.includes("other") ? "1" : "0",
      accountant: UserType && UserType.includes("accountant") ? "1" : "0",
    };
    await updateDetails.mutateAsync(userDetails);
    await updateUserTypes.mutateAsync(userTypesUpdateData);
  };

  return (
    <div className="details">
      <h3 className="mb-4">Update Your Profile</h3>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="forename" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="forename"
            name="forename"
            placeholder="Lettie"
            {...register("forename")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="surname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            placeholder="Christen"
            {...register("surname")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <input
            type="text"
            className="form-control"
            id="bio"
            name="bio"
            placeholder="Content Creator"
            {...register("bio")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="form-control"
            name="gender"
            {...register("gender")}
          >
            <option value=""> Select a gender </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="col-md-6 ">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <Controller
            control={control}
            name="dob"
            render={({ field }) => (
              <DatePicker
                className="form-control"
                placeholderText="Select date of birth"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
        </div>
        <div className="col-md-6 ">
          <label htmlFor="mobile" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            placeholder="+92 9887673456"
            {...register("mobile")}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="lyhxr@example.com"
            disabled
            {...register("email")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            placeholder="Birmingham"
            {...register("city")}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="search_input" className="form-label">
            Select User Types
          </label>
          <Controller
            control={control}
            name="user_type"
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
        </div>
        <div className="mb-2">
          <label htmlFor="main_user_type" className="form-label">
            Select Main User Type
          </label>
          <div className="col-md-12">
            <select
              {...register("main_user_type")}
              className="form-select"
              id="main_user_type"
              name="main_user_type"
              style={{
                height: "48px",
              }}
            >
              <option value="">Select a type</option>
              {UserType
                ? UserType.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))
                : ""}
            </select>
          </div>
        </div>
        <div className="text-end">
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="btn btn-common"
            // disabled={isUpdateDetailsLoading}
          >
            Update
          </button>
        </div>
      </form>
      <hr />
      <h3 className="mb-4">Update Address</h3>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="unit_number" className="form-label">
            Unit Number
          </label>
          <input
            type="text"
            className="form-control"
            id="unit_number"
            name="unit_number"
            placeholder="Unit Number"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="street_number" className="form-label">
            Street Number
          </label>
          <input
            type="text"
            className="form-control"
            id="street_number"
            name="street_number"
            placeholder="Street Number"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="address_line_1" className="form-label">
            Address Line 1
          </label>
          <textarea
            rows={4}
            type="text"
            className="form-control"
            id="address_line_1"
            name="address_line_1"
            placeholder="Address Line 1"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="address_line_2" className="form-label">
            Address Line 1
          </label>
          <textarea
            rows={4}
            type="text"
            className="form-control"
            id="address_line_2"
            name="address_line_2"
            placeholder="Address Line 2"
          />
        </div>
        <div className="col-md-6 ">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            placeholder="City"
          />
        </div>
        <div className="col-md-6 ">
          <label htmlFor="region" className="form-label">
            Region
          </label>
          <input
            type="text"
            className="form-control"
            id="region"
            name="region"
            placeholder="Region"
          />
        </div>
        <div className="text-end">
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="btn btn-common"
            // disabled={isUpdateDetailsLoading}
          >
            Update Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
