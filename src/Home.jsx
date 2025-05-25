// src/Home.jsx
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import './Home.css'; 

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
    <div className="home-container">
      <ChatBox />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Home;
