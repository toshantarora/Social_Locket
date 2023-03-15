import { in200s } from "../helpers";
import { API } from "./ApiClient";

function login(data) {
  return API.post("login", data)
    .then((response) => {
      console.log("response ***** ", response);
      if (in200s(response.status)) {
        // console.log(response.data);
        return response;
      }

      return null;
    })
    .catch((error) => error.response);
}

// async function postSignIn(data) {
//   // make the api call

//   const response = await API.post("login", data);

//   // the typical ways to die when calling an api
//   if (!response.ok) {
//     return response?.data;
//   }
//   try {
//     return response;
//   } catch {
//     return { kind: "bad-data", data: null };
//   }
// }
export const authService = {
  login,
};
// export async function login(params: {
//   email: string;
//   password: string;
// }): Promise<User> {
//   const response = await redaxios.post("/api/sessions", { session: params });

//   return response.data.data;
// }
