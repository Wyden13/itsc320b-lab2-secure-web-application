import { useState } from "react";

const PASSWORD_MIN_LENGTH = 6;

function validateUsername(value) {
  if (!value.trim()) return "Username is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address.";
  return "";
}

function validatePassword(value) {
  if (!value) return "Password is required.";
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  return "";
}

export default function LoginForm({
  username,
  password,
  isAuthenticated,
  authError,
  onUsernameChange,
  onPasswordChange,
  onLogin,
  // onLogout,
}) {
  const [errors, setErrors] = useState({ username: "", password: "" });

  function inputValidation(name, value) {
    if (name === "username") return validateUsername(value);
    if (name === "password") return validatePassword(value);
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const usernameError = inputValidation("username", username);
    const passwordError = inputValidation("password", password);
    setErrors({ username: usernameError, password: passwordError });
    if (usernameError || passwordError) return;
    onLogin(username, password);
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h2 style={styles.title}>Login</h2>

        {authError && <p style={styles.authError}>{authError}</p>}

        <div style={styles.field}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onUsernameChange}
            placeholder="Enter your email"
            style={{
              ...styles.input,
              borderColor: errors.username ? "#c00" : "#ccc",
            }}
          />
          {errors.username && <p style={styles.error}>{errors.username}</p>}
        </div>

        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Enter your password"
            style={{
              ...styles.input,
              borderColor: errors.password ? "#c00" : "#ccc",
            }}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
    // minHeight: "100vh",
    // backgroundColor: "#f0f2f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    margin: 0,
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  label: {
    fontSize: "0.875rem",
    color: "#555",
    fontWeight: "600",
  },
  input: {
    padding: "0.5rem 0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.6rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  error: {
    color: "#c00",
    fontSize: "0.8rem",
    margin: 0,
  },
  authError: {
    color: "#c00",
    fontSize: "0.875rem",
    margin: 0,
    textAlign: "center",
    padding: "0.5rem",
    backgroundColor: "#fff0f0",
    borderRadius: "4px",
    border: "1px solid #f5c6cb",
  },
};
