"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutBtn from "../global/LogoutBtn";

export default function AdminNavbar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <div className="bg-black">
      <div className="flex justify-between max-md:justify-end items-center h-[60px] px-4 md:px-10 max-w-[1440px] mx-auto text-white">

        {/* Burger Icon */}
        <button
          className="md:hidden  flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links for desktop */}
        <div className="hidden md:flex gap-6">
          <NavLinks />
        </div>

        <div className="hidden md:block">
          <LogoutBtn />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-black text-white px-4 py-4 gap-4">
          <NavLinks />
          <LogoutBtn />
        </div>
      )}
    </div>
  );
}

// Separate links into a component for reuse
function NavLinks() {
  return (
    <>
      <Link className="text-lg" href="/dashboard/users">
        Users
      </Link>
      <Link className="text-lg" href="/dashboard/lottery">
        Lottery
      </Link>
      <Link className="text-lg" href="/dashboard/spinWon">
        SpinWon
      </Link>
      <Link className="text-lg" href="/dashboard/survey">
        Survey
      </Link>
      <Link className="text-lg" href="/dashboard/createSurvey">
        Create survey
      </Link>
      <Link className="text-lg" href="/dashboard/createGift">
        Create gift
      </Link>
    </>
  );
}
