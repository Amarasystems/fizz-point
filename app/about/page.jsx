"use client";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
import CeoCard from "../components/about/CeoCard";
import Introduction from "../components/about/Introduction";
import Time from "../components/about/Time";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";

export default function page() {
  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar />
        <Introduction />
        <CeoCard />
        <Time />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
