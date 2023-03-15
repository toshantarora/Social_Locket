import { createContext, useMemo, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { isNonEmptyString } from "../helpers";
import { authService } from "../services/AuthApi";
import { loadString, remove, saveString } from "../utils/Storage";

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
    const savedToken = loadString("accessToken");

    if (savedToken) {
      try {
        return {
          token: savedToken,
          isAuthenticated: true,
          message: "",
        };
      } catch (error) {
        console.log(error);
        return {
          token: "",
          isAuthenticated: false,
          message: "",
        };
      }
    }
    return {
      token: "",
      isAuthenticated: false,
      message: "",
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

      setAuth({
        token: response?.data?.accessToken,
        isAuthenticated: true,
        message: "",
      });
    } else {
      setAuth({
        token: "",
        isAuthenticated: false,
        message: response?.data,
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
    });
    remove("accessToken");
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      login,
      logout,
      loading,
    }),
    [auth, setAuth, login, logout, loading],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
