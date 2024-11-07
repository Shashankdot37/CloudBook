import React, { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/alerts/AlertContext";

const Signup = () => {
  const {showAlert} = useContext(AlertContext)
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ name:"", email: "", password: "", cpassword:"" });
  const onChange = (e) => {
    e.preventDefault();
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/auth/createUser`, {
      method: "POST",
      body: JSON.stringify({
        name:credential.name,
        email: credential.email,
        password: credential.password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth-token and redirect
      localStorage.setItem("token", json.authtoken);
      showAlert("Account Created Successfully","success");
      navigate("/login");
    } else {
      showAlert("Invalid Credentials","danger");
    }
  };
  return (
    <div className="container" id="signup-main">
      <h2 className="my-3">Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="signup-info">
          (The fields with * on title is must required.) 
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Name*
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            required
            placeholder="Name must be atleast 6 characters long"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address*
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="example@email.com"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password*
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            placeholder="Password must be atleast 8 characters long"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password*
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={credential.password<8||credential.cpassword<8||credential.name<6||credential.password===credential.cpassword}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
