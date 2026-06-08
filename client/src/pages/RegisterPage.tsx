import { useState } from "react";
import { register } from "../services/authAPI";
import PageContainer from "../components/PageContainer";
import AuthCard from "../components/AuthCard";
import Button from "../components/Button";
import Input from "../components/Input";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        if (!email.trim() || !password.trim()) return;
        await register(email, password);
    }

    return (
    <PageContainer>
        <AuthCard title="Register">

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

            <Button onClick={handleRegister}>
            Register
            </Button>

        </AuthCard>
    </PageContainer>
    );
}

export default RegisterPage;