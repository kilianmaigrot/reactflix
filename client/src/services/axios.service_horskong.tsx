// Paramétrage Axios dans le cas d'une utilisation de l'app dans Docker avec routes Kong Gateway

import axios, { AxiosResponse } from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001'; // Paramètre app directe
axios.defaults.baseURL = 'http://localhost:8000'; // Paramètre Kong

export const login = (postData: object): Promise<AxiosResponse<object>> => axios
  .post('/loginUser', postData)
  .then((response) => response)
  .catch((error) => Promise.reject(error));

export const register = (postData: object): Promise<AxiosResponse<object>> => axios
  .post('/registerUser', postData)
  .then((response) => response)
  .catch((error) => Promise.reject(error));

export const verifyToken = async (token: string) => {
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.get('/verifyToken', headers);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const updateLanguage = async (postData: object): Promise<object | undefined> => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const tokenVerified = await verifyToken(token);
  if (tokenVerified) {
    const response = await axios.patch<{ message: string }>('/updateUserLanguage', postData);
    return response;
  }
  return undefined;
};

export type UpdateUserPayload = {
  idUser: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

const verifyTokenAndLogin = async (loginData: LoginUserData) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const loginReturn = await login(loginData);
  if (loginReturn.status === 200) {
    const tokenVerified: boolean = await verifyToken(token);
    return (tokenVerified);
  }
  return false;
};

export const updateUser = async (postData: UpdateUserPayload): Promise<object | undefined> => {
  if (await verifyTokenAndLogin({ email: postData.email, password: postData.password })) {
    const response = await axios.patch('/updateUserInfos', postData);
    return response;
  }
  throw new Error('editWrongPassword');
};

export const updatePassword = async (postData: {
  idUser: string;
  oldPassword: string;
  newPassword: string;
  email: string;
}): Promise<object | undefined> => {
  if (await verifyTokenAndLogin({ email: postData.email, password: postData.oldPassword })) {
    const response = await axios.patch('/users/updateUserPassword', postData);
    return response;
  }
  return undefined;
};
