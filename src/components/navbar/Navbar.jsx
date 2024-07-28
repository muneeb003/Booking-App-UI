import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <span className="logo">Bookings</span>
        <div className="navitems">
          <button>Register</button>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
