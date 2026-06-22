import "../styles/auth.css";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    const res = await API.post("/auth/login", formData);

   localStorage.setItem("token", res.data.token);

    localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
    );
    navigate("/dashboard");

    console.log("TOKEN SAVED");
    console.log(localStorage.getItem("token"));
  } catch (error) {
    console.log(error);
  }
  };

  return (

    <div className="login-page">

      {/* LEFT SECTION */}

      <div className="login-left">

        <h1>Blood Bank</h1>

        <p>
          Manage blood inventory, donors,
          hospitals and requests in one place.
        </p>

      </div>

      {/* RIGHT SECTION */}

      <div className="login-right">

        <form className="auth-form" onSubmit={handleSubmit}>

          <h2>Welcome Back</h2>

          <input
             type="email"
             name="email"
             placeholder="Enter Email"
             value={formData.email}
             onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            Login
          </button>

          <p className="auth-text">
            Don't have an account ?
            <Link to="/register"> Register</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;