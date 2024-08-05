import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
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
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Bookings</span>
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
