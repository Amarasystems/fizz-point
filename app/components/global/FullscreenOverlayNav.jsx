import { Loyalt2 } from "./Loyalty";

const FullscreenOverlayNav = ({
  isOpen,
  toggleMenu,
  items,
  toggleLanguage,
  language,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 z-10 md:hidden transition-all duration-500 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex justify-end relative">
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          className={`x-btn absolute mt-7 mr-3  ${isOpen ? "active" : ""}`}
        >
          <span className="bar1 bar"></span>
          <span className="bar2 bar"></span>
        </button>
      </div>
      <div className="flex justify-center h-full gap-5 flex-col  items-center">
        <div className="flex flex-col items-center justify-center text-white">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              aria-label={item.ariaLabel}
              className="my-2  font-semibold text-[26px] hover:text-gray-400 transition duration-200"
              onClick={toggleMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
        <Loyalt2 toggleLanguage={toggleLanguage} language={language} />
      </div>
    </div>
  );
};

export default FullscreenOverlayNav;
