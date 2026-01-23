import { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";


function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        }}
      >
        {loggedIn ? (
          <Dashboard />
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </div>
    </div>
  );


}

export default App;
