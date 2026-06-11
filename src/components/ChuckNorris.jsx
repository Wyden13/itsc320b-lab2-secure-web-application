import { useEffect, useState } from "react";

export default function ChuckNorris({ token, onLogout }) {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getFact() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3333/fact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFact();
  }, [token]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Chuck Norris Fact</h2>

        {loading && (
          <div style={styles.spinnerWrapper}>
            <div style={styles.spinner} />
          </div>
        )}

        {!loading && fact && <p style={styles.fact}>{fact}</p>}

        <div style={styles.actions}>
          <button onClick={getFact} style={styles.refreshButton}>
            New Fact
          </button>
          <button onClick={onLogout} style={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "480px",
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
  spinnerWrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem 0",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #0070f3",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  fact: {
    fontSize: "1rem",
    color: "#444",
    lineHeight: "1.6",
    textAlign: "center",
    margin: 0,
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginTop: "0.5rem",
  },
  refreshButton: {
    padding: "0.5rem 1.25rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "0.5rem 1.25rem",
    backgroundColor: "#fff",
    color: "#c00",
    border: "1px solid #c00",
    borderRadius: "4px",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
};
