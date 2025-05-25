// src/Home.jsx
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect back to login/register page
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Home Page!</h1>
      <ChatBox />
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default Home;
