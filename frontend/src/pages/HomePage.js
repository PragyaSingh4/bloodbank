import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div>
      <h1>Blood Bank Management System</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default HomePage;