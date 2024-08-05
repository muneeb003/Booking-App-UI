import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.detaile });

      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  const { loading, error, dispatch } = useContext(AuthContext);

  return (
    <div className="login">
      <div className="lcontainer">
        <input
          type="text"
          id="username"
          className="lInput"
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          className="lInput"
          onChange={handleChange}
          placeholder="Password"
        />
        <button disabled={loading} onClick={handleClick} className="loginBtn">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
