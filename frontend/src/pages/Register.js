import "../styles/auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  password: "",
  role: "",
  bloodGroup: "",
  hospitalName: "",
  organisationName: "",
});
const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};
  return (

    <div className="login-page">

      {/* LEFT SECTION */}

      <div className="login-left">

        <h1>Blood Bank</h1>

        <p>
          Join the platform to manage donors,
          blood inventory and hospital requests.
        </p>

      </div>

      {/* RIGHT SECTION */}

      <div className="login-right">

        <form className="auth-form">

  <h2>Create Account</h2>

  <input
    type="text"
    placeholder="Enter Name"
  />

  <input
    type="email"
    placeholder="Enter Email"
  />

  <input
  type="text"
  name="phone"
  placeholder="Enter Phone"
  value={formData.phone}
  onChange={handleChange}
/>

  <input
  type="text"
  name="address"
  placeholder="Enter Address"
  value={formData.address}
  onChange={handleChange}
/>


  <select
  name="role"
  value={formData.role}
  onChange={handleChange}
>

    <option>Select Role</option>

    <option value="donor">
      Donor
    </option>

    <option value="hospital">
      Hospital
    </option>

    <option value="organisation">
      Organisation
    </option>

  </select>

  {/* Donor */}

{formData.role === "donor" && (
  <input
  type="text"
  name="bloodGroup"
  placeholder="Enter Blood Group"
  value={formData.bloodGroup}
  onChange={handleChange}
/>
)}

{/* Hospital */}

{formData.role === "hospital" && (
  <input
  type="text"
  name="hospitalName"
  placeholder="Enter Hospital Name"
  value={formData.hospitalName}
  onChange={handleChange}
/>
)}

{/* Organisation */}

{formData.role === "organisation" && (
  <input
  type="text"
  name="organisationName"
  placeholder="Enter Organisation Name"
  value={formData.organisationName}
  onChange={handleChange}
/>
)}

{/* Website */}

{(formData.role === "hospital" || formData.role === "organisation") && (
  <input
  type="text"
  name="website"
  placeholder="Enter Website"
  value={formData.website}
  onChange={handleChange}
/>
)}

 <input
  type="password"
  name="password"
  placeholder="Enter Password"
  value={formData.password}
  onChange={handleChange}
/>

  <button type="submit">
    Register
  </button>

  <p className="auth-text">
    Already have an account ?
    <Link to="/login"> Login</Link>
  </p>

</form>

      </div>

    </div>
  );
}

export default Register;