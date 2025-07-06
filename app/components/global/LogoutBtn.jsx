"use client"
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry")
    router.push("/admin");
  };
  return (
    <button
      onClick={handleLogout}
      className=" bg-red-600 text-white py-2 px-4 rounded-md"
    >
      Log Out
    </button>
  );
}
