import { createContext, useMemo, useState } from 'react';
// import { useHistory, useLocation } from "react-router-dom";
import { isNonEmptyString } from '../helpers';
import { authService } from '../services/AuthApi';
import { userService } from '../services/UserService';
import {
  getUserId,
  loadString,
  remove,
  save,
  saveString,
} from '../utils/Storage';

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [auth, setAuth] = useState(() => {
    const user = loadString('userDetails');
    const savedToken = loadString('accessToken');

    if (savedToken) {
      try {
        const userDetails = JSON.parse(user);
        const { email, id } = userDetails;
        return {
          token: savedToken,
          isAuthenticated: true,
          message: '',
          userEmail: email,
          userId: id,
        };
      } catch (error) {
        console.log(error);
        return {
          token: '',
          isAuthenticated: false,
          message: '',
          userEmail: '',
          userId: '',
        };
      }
    }
    return {
      token: '',
      isAuthenticated: false,
      message: '',
      userEmail: '',
      userId: '',
    };
  });

  const login = async (data) => {
    setLoading(true);

    const response = await authService.login(data);
    console.log(response?.data);
    if (
      response
      && response?.data
      && isNonEmptyString(response?.data?.accessToken)
    ) {
      saveString('accessToken', response.data.accessToken);

      if (response.data.user_id) {
        const userProfile = await userService.getUserProfile(
          response.data.user_id,
        );
        if (userProfile) {
          save('userDetails', userProfile);
        } else {
          remove('userDetails', userProfile);
        }
      }

      setAuth({
        token: response?.data?.accessToken,
        isAuthenticated: true,
        message: '',
        userEmail: '',
        userId: response?.data?.user_id,
      });
    } else {
      setAuth({
        token: '',
        isAuthenticated: false,
        message: response?.data?.message,
        userEmail: '',
        userId: '',
      });
      remove('accessToken');
    }
    setLoading(false);
    return response;
  };

  const register = async (data) => {
    setLoading(true);

    const response = await authService.register(data);
    console.log('responseeee---', response?.data);
    if (
      response
      && response?.data
      && isNonEmptyString(response?.data?.accessToken)
    ) {
      saveString('accessToken', response.data.accessToken);

      if (response.data.user_id) {
        const userProfile = await userService.getUserProfile(
          response.data.user_id,
        );
        if (userProfile) {
          save('userDetails', userProfile);
        } else {
          remove('userDetails', userProfile);
        }
      }

      setAuth({
        token: response?.data?.accessToken,
        isAuthenticated: true,
        message: response?.data?.message,
        userEmail: data?.email,
        userId: response?.data?.user_id,
      });
    } else {
      setAuth({
        token: '',
        isAuthenticated: false,
        message: response?.data?.message,
        userEmail: '',
        userId: '',
      });
      remove('accessToken');
    }
    setLoading(false);
    return response;
  };

  const logout = async () => {
    setAuth({
      token: '',
      isAuthenticated: false,
      message: '',
      userEmail: '',
      userId: '',
    });
    remove('accessToken');
    remove('userDetails');
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
