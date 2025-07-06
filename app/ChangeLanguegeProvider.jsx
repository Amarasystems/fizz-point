"use client";
import { useState, createContext, useContext } from "react";

const LanguageContext = createContext();

export function ChangeLanguegeProvider({ children }) {
  const [language, setLanguage] = useState("mn");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook for easier access to the context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
