import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { StyleThemeProvider } from './context/styleContext';
import * as AxiosS from './services/axios.service';

import Index from './pages/Index/index';
import Inscription from './pages/Inscription/index';
import Login from './pages/Login/index';
import UserPage from './pages/UserPage/index';
import Logout from './pages/Logout/index';
import MoviesList from './pages/MoviesList/index';
import CreateMovie from './pages/CreateMovie/index';

import PrivateRoutes from './utils/PrivateRoutes';
import PublicOnlyRoutes from './utils/PublicOnlyRoutes';
import AdminRoutes from './utils/AdminRoutes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  
  const handleLogin: (param: boolean) => void = (param) => {
    setIsAuthenticated(param);
  };

  useEffect(() => { 
    const verifyToken = async () => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      const response = await AxiosS.verifyToken(token);
      setIsAuthenticated(response);
    };
    verifyToken().catch(() => null);    
  }, []);

  if (isAuthenticated !== undefined) {
    return (
      <UserProvider>
        <StyleThemeProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Index />} />

              <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>                
                <Route path='/user' element={<UserPage />} />
                <Route path='/moviesList' element={<MoviesList />} />
                <Route path='/moviesList/:messageTop' element={<MoviesList />} />
                <Route element={<AdminRoutes />}>
                  <Route path='/createMovie' element={<CreateMovie />} />
                </Route>
              </Route>

              <Route element={<PublicOnlyRoutes isAuthenticated={isAuthenticated} />}>
                <Route path='/login/' element={<Login onLogin={handleLogin} />} />
                <Route path='/login/:messageTop' element={<Login onLogin={handleLogin} />} />
                <Route path='/inscription' element={<Inscription />} />
              </Route>

              <Route path='/logout' element={<Logout />} />
            </Routes>
          </Router>
        </StyleThemeProvider>
      </UserProvider>
    );
  }
}

export default App;
