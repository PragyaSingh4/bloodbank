function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid gray",
      }}
    >
      <h3>Dashboard</h3>

      <div>
        Welcome, {user?.name}
      </div>
    </div>
  );
}

export default Navbar;