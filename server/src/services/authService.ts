import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/connection.js";

export async function register(email: string, password: string) {
  
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (
      email,
      password_hash
    )
    VALUES ($1, $2)
    RETURNING id, email`,
    [email, passwordHash]
  );

  return result.rows[0];
}

export async function login(email: string, password: string) {

  const result = await pool.query(
    `SELECT *
    FROM users
    WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return token;
}