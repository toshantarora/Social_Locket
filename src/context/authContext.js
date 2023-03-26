import { createContext, useMemo, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { isNonEmptyString } from "../helpers";
import { authService } from "../services/AuthApi";
import { userService } from "../services/UserService";
import { getUserId, loadString, remove, save, saveString } from "../utils/Storage";

export const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState();
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(false);
//   const [loadingInitial, setLoadingInitial] = useState(true);
//   const history = useHistory();
//   const location = useLocation();

//   useEffect(() => {
//     if (error) setError(null);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   useEffect(() => {
//     usersApi
//       .getCurrentUser()
//       .then((newUser) => setUser(newUser))
//       .catch((_error) => {})
//       .finally(() => setLoadingInitial(false));
//   }, []);

//   function login(email, password) {
//     setLoading(true);

//     sessionsApi
//       .login({ email, password })
//       .then((newUser) => {
//         setUser(newUser);
//         history.push("/");
//       })
//       .catch((newError) => setError(newError))
//       .finally(() => setLoading(false));
//   }

//   function signUp(email, name, password) {
//     setLoading(true);

//     usersApi
//       .signUp({ email, name, password })
//       .then((newUser) => {
//         setUser(newUser);
//         history.push("/");
//       })
//       .catch((newError) => setError(newError))
//       .finally(() => setLoading(false));
//   }

//   function logout() {
//     sessionsApi.logout().then(() => setUser(undefined));
//   }

//   // Make the provider update only when it should
//   const memoedValue = useMemo(
//     () => ({
//       user,
//       loading,
//       error,
//       login,
//       signUp,
//       logout,
//     }),

//     [user, loading, error],
//   );

//   return (
//     <AuthContext.Provider value={memoedValue}>
//     {!loadingInitial && children}
//   </AuthContext.Provider>
//   );
// };

// export default function useAuth() {
//   return useContext(AuthContext);
// }
export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [auth, setAuth] = useState(() => {
    const user = loadString("userDetails");
    const savedToken = loadString("accessToken");

    if (savedToken) {
      try {
        const userDetails = JSON.parse(user);
        const { email, userid } = userDetails;
        return {
          token: savedToken,
          isAuthenticated: true,
          message: "",
          userEmail: email,
          userId: userid,
        };
      } catch (error) {
        console.log(error);
        return {
          token: "",
          isAuthenticated: false,
          message: "",
          userEmail: "",
          userId: "",
        };
      }
    }
    return {
      token: "",
      isAuthenticated: false,
      message: "",
      userEmail: "",
      userId: "",
    };
  });

  const login = async (data) => {
    setLoading(true);

    const response = await authService.login(data);
    console.log(response?.data);
    if (
      response &&
      response?.data &&
      isNonEmptyString(response?.data?.accessToken)
    ) {

      saveString("accessToken", response.data.accessToken);

      if (response.data.user_id) {
        const userProfile = await userService.getUserProfile(response.data.user_id);
        if (userProfile) {
          save("userDetails", userProfile);
        } else {
          remove("userDetails", userProfile);
        }
      }

      setAuth({
        token: response?.data?.accessToken,
        isAuthenticated: true,
        message: "",
        userEmail: "",
        userId: response?.data?.user_id
      });
    } else {
      setAuth({
        token: "",
        isAuthenticated: false,
        message: response?.data?.message,
        userEmail: "",
        userId: "",
      });
      remove("accessToken");
      remove("userDetails", userProfile);
    }
    setLoading(false);
    return response;
  };

  const register = async (data) => {
    setLoading(true);

    const response = await authService.register(data);
    console.log(response?.data);
    if (response && response.data.user_id) {

      if (response.data.user_id) {
        const userProfile = await userService.getUserProfile(response.data.user_id);
        if (userProfile) {
          save("userDetails", userProfile);
        } else {
          remove("userDetails", userProfile);
        }
      }

      saveString("accessToken", response.data.accessToken);

      const userDetails = {
        userEmail: isNonEmptyString(data?.email) ? data?.email : "",
        userId: response?.data?.user_id ? response?.data?.user_id : "",
      };

      save("userDetails", userDetails);
      setAuth({
        token: "",
        isAuthenticated: true,
        message: response?.data?.insertId ? "" : response?.data,
        userEmail: data?.email,
        userId: response?.data?.insertId,
      });
    } else {
      setAuth({
        token: "",
        isAuthenticated: false,
        message: response?.data,
        userEmail: "",
        userId: "",
      });
      remove("accessToken");
    }
    setLoading(false);
    return response;
  };

  const logout = async () => {
    setAuth({
      token: "",
      isAuthenticated: false,
      message: "",
      userEmail: "",
      userId: "",
    });
    remove("accessToken");
    remove("userDetails");
    const userId = getUserId();
    if (userId) {
      const response = await authService.logout(userId);
      if (response) {
        console.log(response);
      }
    }
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      login,
      register,
      logout,
      loading,
    }),
    [auth, setAuth, login, register, logout, loading],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
