import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>

      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          borderRight: "1px solid gray",
          padding: "20px",
        }}
      >
        <Sidebar />
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
       <Navbar />

        <div style={{ padding: "20px" }}>
         {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;