import { useState } from "react";
import { login } from "../services/authAPI";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthCard from "../components/AuthCard";


function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email.trim() || !password.trim()) return;

    const data = await login(email, password);

    localStorage.setItem("token", data.token);

    navigate("/");
  }

  return (
  <PageContainer>
    <AuthCard title="Login">

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      
      <Button onClick={handleLogin}>
        Login
      </Button>
      
        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
        </AuthCard>
  </PageContainer>
  );
}

export default LoginPage;