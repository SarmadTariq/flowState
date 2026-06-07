import { useState } from "react";
import { login } from "../services/authAPI";
import { Link, useNavigate } from "react-router-dom";


function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email.trim() || !password.trim()) return;

    const data = await login(
      email,
      password
    );

    localStorage.setItem(
      "token",
      data.token
    );

    navigate("/");
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;