import Layout from "../components/Layout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>

    <h3>Role: {user?.role}</h3>

    {user?.role === "donor" && (
      <h2>Donor Dashboard</h2>
    )}

    {user?.role === "hospital" && (
      <h2>Hospital Dashboard</h2>
    )}

    {user?.role === "organisation" && (
      <h2>Organisation Dashboard</h2>
    )}

    {user?.role === "admin" && (
      <h2>Admin Dashboard</h2>
    )}
  </Layout>
);
}

export default Dashboard;