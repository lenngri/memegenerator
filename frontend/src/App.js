import React, { useEffect } from 'react';
import LoginScreen from './components/screens/LoginScreen';
import EditorScreen from './components/screens/EditorScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import OverviewScreen from './components/screens/OverviewScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { useStoreState, useStoreActions } from 'easy-peasy';

function App() {
  const isLoggedIn = useStoreState((state) => state.userSession.isLoggedIn);
  const fetchImgflip = useStoreActions((actions) => actions.fetchImgflip);

  useEffect(() => {
    fetchImgflip();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
          </>
        )}

        {isLoggedIn && (
          <>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/editor" element={<EditorScreen />} />
            <Route path="/overview" element={<OverviewScreen />} />
          </>
        )}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/editor' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
