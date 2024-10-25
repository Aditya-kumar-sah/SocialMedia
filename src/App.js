import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? navigate("/") : <Login />}</Route>
        <Route path="/register">
          {user ? navigate("/") : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? navigate("/") : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
