import { EnglishFlag1 } from "@/public/imgJS/EnglishFlag";
import { MongoliaFlag1 } from "@/public/imgJS/MongoliaFlag";
import { useState } from "react";

export default function ChageLanguageForNav({ toggleLanguage }) {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "mn" : "en";
    setLanguage(newLanguage);
    toggleLanguage(newLanguage);
  };

  return (
    <div className=" items-center hidden" onClick={handleLanguageChange}>
      {language === "mn" ? (
        <MongoliaFlag1 aria-hidden="true" />
      ) : (
        <EnglishFlag1 aria-hidden="true" />
      )}
      <button
        className="text-white mx-2"
        aria-label={`Switch to ${language === "mn" ? "English" : "Mongolian"}`}
      >
        {language === "mn" ? "EN" : "MN"}
      </button>
    </div>
  );
}
