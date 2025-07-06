"use client";
import { useState } from "react";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
import Navbar from "../components/global/Navbar";
import LastNews from "../components/news/lastNews";
import PostsList from "../components/news/PostsList";
import Search from "../components/news/Search";
import Footer from "../components/global/Footer";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar />
        <LastNews />
        <Search setSearchTerm={setSearchTerm} />
        <PostsList searchTerm={searchTerm} />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
