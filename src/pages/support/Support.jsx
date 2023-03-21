import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useMutation, useQueryClient } from "react-query";
import { userService } from "../../services/UserService";

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  mobile: yup.string().required(),
});
const Support = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const queryClient = useQueryClient();

  const { mutate: supportRequest, isLoading: isSupportRequestLoading } =
    useMutation(
      async (payload) => {
        const res = await userService.supportRequest(payload);

        if (res.success || res.ok) {
          return res;
        }

        // if (
        //   res?.data?.success === false &&
        //   isNonEmptyString(res?.data?.message)
        // ) {
        //   showSnackbar({ message: res?.data?.message });
        // }
        return null;
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["payload"]);
        },
      },
    );

  const onSave = (data, e) => {
    e.preventDefault();
    supportRequest(data);
    e.target.reset();
    reset("", {
      keepValues: false,
    });
  };

  return (
    <main id="layoutSidenav_content">
      <div className="box-shadow">
        <div className="support py-3">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-center mb-4">Support</h2>
              <form className="form" onSubmit={handleSubmit(onSave)}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    {...register("email")}
                  />
                  <label htmlFor="email">Email</label>
                  {errors?.email?.message && (
                    <div className="error">{errors?.email?.message}</div>
                  )}
                </div>

                <div className="row g-3">
                  <div className="register-mobile col-md-6">
                    <Controller
                      name="mobile"
                      control={control}
                      rules={{
                        validate: (value) => isValidPhoneNumber(value),
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          value={value}
                          onChange={onChange}
                          defaultCountry="TH"
                          className="form-control"
                          //   dropdownstyle={{ height: "200px", width: "480px" }}
                          id="mobile"
                        />
                      )}
                    />
                    <label htmlFor="mobile">Enter your mobile no.</label>
                    {/* <span><img src={Keyboard} alt="key" width="14" height="16" /></span> </div> */}
                    {errors?.mobile?.message && (
                      <div className="error">{errors?.mobile?.message}</div>
                    )}
                  </div>

                  <div className="form-floating col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="name"
                      {...register("name")}
                    />
                    <label htmlFor="name">Name</label>
                    {errors?.name?.message && (
                      <div className="error">{errors?.name?.message}</div>
                    )}
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="description"
                    style={{ height: 150 }}
                    {...register("description")}
                  />
                  <label htmlFor="description">Enquiry</label>
                  {errors?.description?.message && (
                    <div className="error">{errors?.description?.message}</div>
                  )}
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-common"
                    disabled={isSupportRequestLoading}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
