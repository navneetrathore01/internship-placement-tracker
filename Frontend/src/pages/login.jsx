import { useState } from "react";
import "../styles/login.css";
import Signup from "./signup";


export default function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);


  const handleLogin = async () => {
    console.log("LOGIN CLICKED");

    const res = await fetch("https://internship-placement-tracker.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
    } else {
      alert(data.message || "Login failed");
    }
  };
  if (showSignup) {
    return <Signup setShowSignup={setShowSignup} />;
  }


  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
        >
          Login
        </button>

        <p>
          New user?{" "}
          <button onClick={() => setShowSignup(true)}>
            Create account
          </button>
        </p>

      </div>

    </main>
  );
}
