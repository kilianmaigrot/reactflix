import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

export const login = (postData: object): Promise<AxiosResponse<object>> => axios.post('/login', postData)
  .then((response) => response)
  .catch((error) => Promise.reject(error));

export const register = (postData: object): Promise<AxiosResponse<object>> => axios
  .post('/users/register', postData)
  .then((response) => response)
  .catch((error) => Promise.reject(error));

export const verifyToken = async () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (!token) { return false; }
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const response = await axios.get('/login/verifyToken', headers);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const updateLanguage = async (postData: object): Promise<AxiosResponse | object> => {
  const tokenVerified = await verifyToken();
  if (tokenVerified) {
    const response = await axios.patch<{ message: string }>('/users/updateLanguage', postData);
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

export const updateUser = async (postData:UpdateUserPayload): Promise<AxiosResponse | object> => {
  const loginReturn = await login({ email: postData.email, password: postData.password });
  const tokenVerified: boolean = await verifyToken();
  
  if (tokenVerified && loginReturn.status === 200) {
    const response = await axios.patch('/users/updateUser', postData);
    return response;
  }
  return undefined;
};

export const updatePassword = async (postData: { idUser: string, oldPassword: string, newPassword: string, email: string }): Promise<AxiosResponse | object> => {
  const loginReturn = await login({ email: postData.email, password: postData.oldPassword });
  const tokenVerified: boolean = await verifyToken();

  if (tokenVerified && loginReturn.status === 200) {
    const response = await axios.patch('/users/updatePassword', postData);
    return response;
  }
  return undefined;
};
