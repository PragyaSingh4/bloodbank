import "../styles/auth.css";
import { Link } from "react-router-dom";

function Login() {
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

        <form className="auth-form">

          <h2>Welcome Back</h2>

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
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