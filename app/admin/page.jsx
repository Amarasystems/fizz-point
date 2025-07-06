"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // ✅ Import axios

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/employee/login`,
        {
          email,
          password,
        }
      );
      if (response.data.title === "Success") {
        const { token, expires_in } = response.data.response;
        localStorage.setItem("token", token);
        localStorage.setItem("token_expiry", expires_in);
        router.push("/dashboard/lottery");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/survey`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  };

  return (
    <div className="flex justify-center items-center bg-black w-full h-screen">
      <div className="p-6 border border-gray-300 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">Admin Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[300px] border border-black h-[40px] rounded-md px-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px] border border-black h-[40px] rounded-md px-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-[300px] h-[40px] bg-blue-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <div className="text-red-600 mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
