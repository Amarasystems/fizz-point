"use client";

import { useState } from "react";
import { ChangeLanguegeProvider } from "./ChangeLanguegeProvider";
import Navbar from "./components/global/Navbar";
import Spin from "./components/global/Spin";
import Footer from "./components/global/Footer";

export default function page() {
  const [lottoCount, setLottoCount] = useState();

  return (
    <div className="bg-black">
      <ChangeLanguegeProvider>
        <Navbar lottoCount={lottoCount} setLottoCount={setLottoCount} />
        <Spin lottoCount={lottoCount} setLottoCount={setLottoCount} />
        <Footer />
      </ChangeLanguegeProvider>
    </div>
  );
}
