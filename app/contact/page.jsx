"use client";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
import Main from "../components/contact/Main";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";

export default function page() {
  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar />
        <Main />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
