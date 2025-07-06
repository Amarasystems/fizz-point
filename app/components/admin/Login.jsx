"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setEmail("");
      setPassword("");
      router.push("/adminDashboard");
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  const refreshAccessToken = async () => {
    const response = await fetch("/api/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Failed to refresh token");
      router.push("/"); // Redirect to login if refresh fails
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col text-center gap-1">
        <h1 className="text-[32px]">Login</h1>
        <form className="flex flex-col w-[300px]" onSubmit={handleSubmit}>
          <input
            className="border-[2px] border-black rounded-md mb-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="border-[2px] border-black rounded-md mb-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="bg-[#0125FF] text-white rounded-md" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
