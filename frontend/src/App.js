import LoginScreen from "./components/screens/LoginScreen";
import Editor from "./components/screens/Editor";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import SingleViewScreen from "./components/screens/SingleViewScreen";
import OverviewScreen from "./components/screens/OverviewScreen";
import ProfileScreen from "./components/screens/ProfileScreen";

function App() {
  return (
    <Router>
      {/* <nav>
  <Link to="/Login">Login</Link>
  <Link to="/Home">Home</Link>
  <Link to="/ErrorPage">Error</Link>
</nav> */}

      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route exact path="/Editor" element={<Editor />} />
        {/* <Route path="/LoginScreen" element={<LoginScreen />} /> */}
        <Route exact path="/RegisterScreen" element={<RegisterScreen />} />
        <Route
          exact
          path="/ForgotPasswordScreen"
          element={<ForgotPasswordScreen />}
        />
        <Route exact path="/LoginScreen" element={<LoginScreen />} />

        <Route exact path="/SingleViewScreen" element={<SingleViewScreen />} />
        <Route exact path="/OverviewScreen" element={<OverviewScreen />} />
        <Route exact path="/ProfileScreen" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
