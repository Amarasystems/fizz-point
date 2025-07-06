"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoyaltyBtn = ({ language }) => {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => {
      router.push("/loyalty");
      setAnimate(false);
    }, 600);
  };

  return (
    <div>
      <button
        className={`button ${animate ? "animate" : ""}`}
        onClick={handleClick}
        aria-live="polite"
      >
        {language === "mn" ? "Лояалти" : "Loyalty"}
      </button>
    </div>
  );
};

export default LoyaltyBtn;
