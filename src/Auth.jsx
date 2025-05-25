import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Auth.css";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const getFakeEmail = (name) => {
    return `${name.toLowerCase().replace(/\s+/g, '')}@myapp.com`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fakeEmail = getFakeEmail(name);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, fakeEmail, password);
        alert("Registered successfully!");
      } else {
        await signInWithEmailAndPassword(auth, fakeEmail, password);
        alert("Logged in successfully!");
        window.location.href = "/home";
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        <p>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
