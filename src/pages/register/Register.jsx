import "./register.css";
import { userInputs } from "../../FormInputs.js";
import React, { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [info, setInfo] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dell9wsjl/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };
      await axios.post("/auth/register", newUser);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className="mainC">
        <h1>Enter your Details</h1>

        {userInputs.map((input) => (
          <div className="formInput" key={input.id}>
            <label htmlFor="">{input.label}</label>
            <input
              className="input"
              onChange={handleChange}
              type={input.type}
              placeholder={input.placeholder}
              id={input.id}
            />
          </div>
        ))}
        <div className="formInput img">
          <label htmlFor="file">
            Image: <MdDriveFolderUpload />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <button className="btn" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
