import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import ChuckNorris from "./components/ChuckNorris";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState(null);

  async function handleLogin(username, password) {
    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();
      if (response.ok && data.uuid) {
        setResponse(data);
        setToken(data.uuid);
        setIsAuthenticated(true);
        setAuthError("");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setToken("");
    setUser({ username: "", password: "" });
    setAuthError("");
  }

  return (
    <div style={styles.container}>
      {!token && (
        <LoginForm
          username={user.username}
          password={user.password}
          // isAuthenticated={isAuthenticated}
          authError={authError}
          onUsernameChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
          onPasswordChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}

      {token && <ChuckNorris token={token} onLogout={handleLogout} />}
    </div>
  );
}

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f7fafc",
  },
};
