import LoginScreen from "./components/screens/LoginScreen";
import Editor from "./components/screens/Editor";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <nav>
  <Link to="/Login">Login</Link>
  <Link to="/Home">Home</Link>
  <Link to="/ErrorPage">Error</Link>
</nav> */}

      <Routes>
        <Route path="/Editor" element={<Editor />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
