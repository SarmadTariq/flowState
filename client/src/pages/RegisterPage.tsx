import { useState } from "react";
import { register } from "../services/authAPI";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        if (!email.trim() || !password.trim()) return;
        const response = await register(email, password);
        console.log("Registration response:", response);
    }

    return (
        <div>
            <h2>Register</h2> 
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;