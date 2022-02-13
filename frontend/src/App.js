import React from 'react';
import LoginScreen from './components/screens/LoginScreen';
import EditorScreen from './components/screens/EditorScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import OverviewScreen from './components/screens/OverviewScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { useStoreState, useStoreRehydrated } from 'easy-peasy';
import PrivateRoute from './components/privateRoute';

function App() {
  const isRehydrated = useStoreRehydrated();
  const isLoggedIn = useStoreState((state) => state.userSession.isLoggedIn);

  if (!isRehydrated) return <p>Loading...</p>;

  console.log("App: ", isLoggedIn)

  return (
    // Router implementation following:
    // Source: https://reactrouter.com/docs/en/v6/getting-started/tutorial#adding-a-no-match-route (11.02.2022)
    <Router>
      <Routes>
          <>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />

            <Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
          </>

        {isLoggedIn && (
          <>
            <Route exact path='/profile' element={<PrivateRoute loggedIn={isLoggedIn}/>}>
              <Route exact path='/profile' element={<ProfileScreen />}/>
            </Route>
            <Route exact path='/editor' element={<PrivateRoute loggedIn={isLoggedIn}/>}>
              <Route path='/editor' element={<EditorScreen />} />
            </Route>
            <Route exact path='/overview/*' element={<PrivateRoute/>}>
              <Route path='/overview/*' element={<OverviewScreen />}/>
            </Route>
            <Route exact path=':paramMemeID' element={<PrivateRoute/>}>
                <Route path=':paramMemeID' element={<OverviewScreen />}/>
            </Route>
          </>
        )}
        <Route path='*' element={<Navigate to={isLoggedIn ? '/editor' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
