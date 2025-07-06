import ChageLanguage from "./ChageLanguage";
import LoyaltyBtn from "./LoyaltyBtn";
import ChageLanguageForNav from "./ChageLanguageForNav";

function Loyalty({ toggleLanguage, language }) {
  return (
    <div className="flex  md:font-extrabold max-lg:text-[14px] lg:gap-5 gap-2 max-md:hidden">
      <LoyaltyBtn language={language} />
      <ChageLanguageForNav
        toggleLanguage={toggleLanguage}
        language={language}
      />
    </div>
  );
}

function Loyalt2({ toggleLanguage, language }) {
  return (
    <div className="flex lg:gap-5 gap-5 text-[26px] font-semibold">
      <LoyaltyBtn toggleLanguage={toggleLanguage} language={language} />
      <ChageLanguage toggleLanguage={toggleLanguage} language={language} />
    </div>
  );
}

export { Loyalty, Loyalt2 };
