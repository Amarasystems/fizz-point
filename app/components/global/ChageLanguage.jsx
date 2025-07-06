import { EnglishFlag } from "@/public/imgJS/EnglishFlag";
import { MongoliaFlag } from "@/public/imgJS/MongoliaFlag";
import { useState } from "react";

export default function ChangeLanguage({ toggleLanguage }) {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "mn" : "en";
    setLanguage(newLanguage);
    toggleLanguage(newLanguage);
  };

  return (
    <div
      onClick={handleLanguageChange}
      className="flex items-center cursor-pointer"
    >
      {language === "mn" ? (
        <MongoliaFlag aria-hidden="true" />
      ) : (
        <EnglishFlag aria-hidden="true" />
      )}
      <span
        className="text-white mx-2"
        aria-label={`Switch to ${language === "mn" ? "English" : "Mongolian"}`}
      >
        {language === "mn" ? "MN" : "EN"}
      </span>
    </div>
  );
}
