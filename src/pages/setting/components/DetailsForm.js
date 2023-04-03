import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useMutation, useQueryClient } from "react-query";
import { isNonEmptyString } from "../../../helpers";
import { API } from "../../../services/ApiClient";

const genderOptions = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "others",
    label: "Others",
  },
];

const schema = yup.object().shape({
  forename: yup.string().required("First Name is required"),
  surname: yup.string().required("Last Name is required"),
});
const DetailsForm = ({ preloadedValues }) => {
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
          dob: preloadedValues?.dob,
        }),
      100,
    );
  }, [preloadedValues]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  const queryClient = useQueryClient();

  const { mutate: updateDetails } = useMutation(
    async (payload) => {
      const res = await API.put(`users/${preloadedValues?.id}`, payload);
      console.log(res);
      //   if (res) {
      //     return res;
      //   }

      if (isNonEmptyString(res?.data?.message)) {
        Swal.fire({
          title: "Success",
          text: res?.data?.message,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            //   navigate("/");
          }
        });
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
  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    updateDetails({
      id: preloadedValues?.id,
      forename: data?.forename,
      surname: data.surname,
      dob: data.dob,
      bio: data?.bio,
      gender: data?.gender?.value,
      mobile: data?.mobile,
    });
  };

  return (
    <div className="details">
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

          {preloadedValues?.gender && (
            <Controller
              name="gender"
              control={control}
              render={({ field, value }) => (
                <Select
                  {...field}
                  options={genderOptions}
                  value={genderOptions.find((c) => c.value === value)}
                  defaultValue={genderOptions.find(
                    (c) => c.value === preloadedValues?.gender,
                  )}
                />
              )}
            />
          )}
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
    </div>
  );
};

export default DetailsForm;
