import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuPlane } from "react-icons/lu";
function Navbar({ type }) {
  const { user } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleClick1 = () => {
    navigate("/register");
  };
  const { dispatch } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
    }
  };
  const style = {
    backgroundColor: "#0071c2",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.1);",
    color: "white",
  };
  return (
    <div className="navbar" style={type === "list" ? style : null}>
      <div className="navbar-container">
        <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Travel</span>
        </Link>

        {user ? (
          <div>
            <span className="user" onClick={() => setShowLogout(!showLogout)}>
              {user.username}
            </span>
            {showLogout && (
              <div className="logout">
                <button className="lgBtn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navitems">
            <button onClick={handleClick1}>Register</button>
            <button onClick={handleClick}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
