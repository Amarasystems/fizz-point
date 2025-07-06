"use client";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
import Footer from "../components/global/Footer";
import DrinkSwitcher from "../components/brand/ImageSwitcher";
import Info from "../components/brand/Info";
import Navbar from "../components/global/Navbar";

export default function page() {
  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar />
        <DrinkSwitcher />
        <Info />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
