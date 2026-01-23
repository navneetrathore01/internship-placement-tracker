import { useState } from "react";
import "../styles/signup.css";


export default function Signup({ setShowSignup }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })

            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Signup failed");
                return;
            }

            alert("Signup successful! Please login.");
            setShowSignup(false); // go back to login
        } catch (err) {
            setError("Server error. Try again.");
        }
    };
    return (
        <div className="signup-container">
            <h2>Create Account</h2>

            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="signup-error">{error}</p>}

                <button type="submit">Sign Up</button>
            </form>

            <div className="signup-footer">
                Already have an account?{" "}
                <button onClick={() => setShowSignup(false)}>
                    Login
                </button>
            </div>
        </div>
    );
}
