import LoginScreen from './components/screens/LoginScreen';
import EditorScreen from './components/screens/EditorScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import OverviewScreen from './components/screens/OverviewScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import React, { useState, useEffect } from 'react';

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem('user');
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', auth);
  }, [auth]);

  const logout = () => setAuth(false);

  return (
    <Router>
      <Routes>
        {!auth && (
          <>
            <Route path="/login" element={<LoginScreen authenticate={() => setAuth(true)} />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
          </>
        )}

        {auth && (
          <>
            <Route path="/profile" element={<ProfileScreen logout={logout} />} />
            <Route path="/editor" element={<EditorScreen logout={logout} />} />
            <Route path="/overview" element={<OverviewScreen />} />
          </>
        )}
        <Route path="*" element={<Navigate to={auth ? '/editor' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
