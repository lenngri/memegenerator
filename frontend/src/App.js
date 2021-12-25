import LoginScreen from "./components/screens/LoginScreen";
import Editor from "./components/screens/Editor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import OverviewScreen from "./components/screens/OverviewScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import React, { useState, useEffect } from "react";

function App() {
  fetch("/users")
    .then((response) => response.text())
    .then((data) => console.log({ data }));

  const [auth, setAuth] = useState(null);
  const hello = "hello";
  const print = () => console.log("hello");

  useEffect(() => {
    let user = localStorage.getItem("user");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", auth);
  }, [auth]);

  return (
    <Router>
      <Routes>
        {!auth && (
          <>
            <Route
              path="/loginscreen"
              element={<LoginScreen authenticate={() => setAuth(true)} />}
            />
            <Route path="/registerscreen" element={<RegisterScreen />} />

            <Route
              path="/forgotpasswordscreen"
              element={<ForgotPasswordScreen />}
            />
          </>
        )}

        {auth && (
          <>
            <Route
              path="/profilescreen"
              element={<ProfileScreen logout={() => setAuth(false)} />}
            />
            <Route path="/editor" element={<Editor />} />
            <Route path="/overviewscreen" element={<OverviewScreen />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={auth ? "/editor" : "/loginscreen"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
