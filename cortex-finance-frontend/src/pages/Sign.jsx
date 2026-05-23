import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Here you will connect Supabase / Firebase later
    console.log("Signup data:", { email, password });

    alert("Signup successful!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.button}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    background: "white",
    width: 320,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};