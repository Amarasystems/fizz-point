"use client";
import { useState } from "react";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Program from "../components/global/Program";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar />
        <Program />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
