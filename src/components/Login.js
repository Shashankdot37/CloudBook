import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/alerts/AlertContext";

const Login = () => {
    const {showAlert} = useContext(AlertContext);
    const navigate = useNavigate();
    const [credential, setCredential] = useState({email:"", password:""})
    const onChange =(e)=>
    {
        e.preventDefault();
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>
    {
        e.preventDefault();
            const response = await fetch(`http://localhost:5000/auth/login`, {
              method: "POST",
              body: JSON.stringify({email:credential.email,password:credential.password}),
              headers: {
                "Content-Type": "application/json"
              },
            });
            const json = await response.json()
            if(json.success)
            {
                //Save the auth-token and redirect
                localStorage.setItem('token',json.authtoken);
                showAlert("Login Successful","success");
                navigate("/")
            }
            else
            {
              showAlert("Invalid Credentials","danger");
            }
          
    }
  return (
    <div className="container" id="login-main">
      <h2 className="my-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credential.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
