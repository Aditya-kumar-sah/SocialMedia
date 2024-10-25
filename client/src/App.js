import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger"
import {
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
      <Routes>
        <Route exact path="/" element={<Register />}/>
        <Route path="/login" element={ <Login />}/>
        <Route path="/home" element={ <Home />}/>
        <Route path="/register" element=  {<Register />}/>
        <Route path="/messenger" element={<Messenger />}/>
        <Route path="/profile/:username" element={<Profile />}/>
      </Routes>
  );
}

export default App;
