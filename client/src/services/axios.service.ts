import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

interface UpdateInfoType {
  message: string;
}

interface ErrorResponse {
  status: number;
  data: string;
  statusText: string;
  headers: object;
  config: AxiosRequestConfig;
}

interface User {
  id_user: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  user_language: string;
}

interface LoginSuccessResponse {
  token: string;
  userInfos: User;
}

interface ApiError {
  message: string;
}

const handleErrors = <T>(error: AxiosError<T>): AxiosResponse<ErrorResponse, any> | ErrorResponse => {
  if (error.response) {
    return error.response;
  } if (error.request) {
    return {
      status: 500,
      data: 'No response received',
      statusText: '',
      headers: {},
      config: error.config,
    };
  }
  return {
    status: 500,
    data: error.message,
    statusText: '',
    headers: {},
    config: error.config,
  };
};

// Fix 1: Specified AxiosError<ApiError> as a type constraint
// Fix 2: Updated response type to AxiosResponse<LoginSuccessResponse, string>
export const login = (postData: object): Promise<AxiosResponse<LoginSuccessResponse, string>> => axios
  .post<LoginSuccessResponse, AxiosResponse<LoginSuccessResponse>, object>('/login', postData)
  .then((response: AxiosResponse<LoginSuccessResponse, string>) => response)
  .catch((error: AxiosError<ApiError>) => {
    throw handleErrors(error);
  });

// Fix 3: Updated response type to AxiosResponse<number, string>
// Fix 4: Replace any with AxiosError<ApiError>
export const register = (postData: object): Promise<AxiosResponse<number, string>> => axios
  .post('/users/register', postData)
  .then((response: AxiosResponse<number, string>) => response)
  .catch((error: AxiosError<ApiError>) => {
    throw handleErrors(error);
  });

// Fix 5: Updated response type to AxiosResponse<User, string>
export const verifyToken = (): Promise<number> => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const headers: AxiosRequestConfig = { headers: { Authorization: `Bearer ${token}` } };
    return axios
      .get('/login/verifyToken', headers)
      .then((response: AxiosResponse<User, string>): number => response.status)
      .catch((error: AxiosError): number => handleErrors(error).status);
  };


// Fix 6: Typed 'postData' and 'error'
export const updateLanguage = async (postData: object): Promise<UpdateInfoType> => {
  try {
    const tokenStatus = await verifyToken();
    if (tokenStatus === 200) {
      const response = await axios.patch('/users/updateLanguage', postData);
      return { message: response.data.message };
    }
    throw new Error('Token verification failed');
  } catch (error: any) {
    throw handleErrors(error);
  }
};

// Fix 7: Typed 'postData' and 'error'
export const updateUser = async (postData: object): Promise<UpdateInfoType> => {
  try {
    const loginReturn = await login({
      email: postData['email'],
      password: postData['password']
    } as object);
    const tokenStatus = await verifyToken();

    if (tokenStatus === 200 && loginReturn.status === 200) {
      const response = await axios.patch('/users/updateUser', postData);
      return { message: response.data.message };
    }
    throw new Error('Token verification or login failed');
  } catch (error: any) {
    throw handleErrors(error);
  }
};

// Fix 8: Typed 'postData' and 'error'
export const updatePassword = async (postData: object): Promise<UpdateInfoType> => {
  try {
    const loginPostData = {
      email: postData['email'],
      password: postData['oldPassword'],
    };

    const loginReturn = await login(loginPostData as object);
    const tokenStatus = await verifyToken();

    if (tokenStatus === 200 && loginReturn.status === 200) {
      const response = await axios.patch('/users/updatePassword', postData);
      return { message: response.data.message };
    }
    throw new Error('Token verification or login failed');
  } catch (error) {
    throw handleErrors(error);
  }
};
