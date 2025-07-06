"use client";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
import Cv from "../components/career/Cv";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";

export default function page() {
  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar />
        <Cv />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
