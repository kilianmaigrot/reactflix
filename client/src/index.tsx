import React, {
  FC, StrictMode, useState, useEffect,
} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Index from './pages/Index/index';
import Inscription from './pages/Inscription/index';
import Login from './pages/Login/index';
import UserPage from './pages/UserPage/index';
import Logout from './pages/Logout/index';
import { UserProvider } from './context/user-context';
import { StyleThemeProvider } from './context/style-context';
import PrivateRoutes from './utils/PrivateRoutes';
import PublicOnlyRoutes from './utils/PublicOnlyRoutes';
import * as AxiosS from './services/axios.service';

const root:any = createRoot(document.getElementById('root'));

const App: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin: (param: boolean) => void = (param) => {
    setIsAuthenticated(param);
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await AxiosS.verifyToken();
        setIsAuthenticated(response === 200);
      } catch (error) {
        console.error(error);
      }
    };
    return void verifyToken();
  }, []);

  return (
    <StrictMode>
      <UserProvider>
        <StyleThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />

              <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
                <Route path="/user" element={<UserPage />} />
              </Route>

              <Route element={<PublicOnlyRoutes isAuthenticated={isAuthenticated} />}>
                <Route path="/login/" element={<Login onLogin={handleLogin} />} />
                <Route path="/login/:errorLogin" element={<Login onLogin={handleLogin} />} />
                <Route path="/inscription" element={<Inscription />} />
              </Route>

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </StyleThemeProvider>
      </UserProvider>
    </StrictMode>
  );
};

root.render(<App />);