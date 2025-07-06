"use client";
import { useEffect, useState } from "react";
// import FullscreenOverlayNav from "./FullscreenOverlayNav";
// import { Loyalty } from "./Loyalty";
import { useLanguage } from "../../ChangeLanguegeProvider";
import Login from "./Login";
import axios from "axios";

export default function Navbar({ lottoCount, setLottoCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [history, setHistory] = useState(false);
  const [bell, setBell] = useState(false);
  const [data, setData] = useState([]);
  const [phoneBtn, setPhoneBtn] = useState(false);
  const [pointBtn, setPointBtn] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setVisible((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "mn" ? "en" : "mn"));
  };
  const close = () => {
    setHistory(false);
  };
  const bellIcon = () => {
    setBell(true);
  };
  useEffect(() => {
    const savedBellState = localStorage.getItem("bellState");
    if (savedBellState === "true") {
      setBell(true); 
    }
  }, []);

  useEffect(() => {
    if (bell) {
      localStorage.setItem("bellState", "true");
    } else {
      localStorage.setItem("bellState", "false");
    }
  }, [bell]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Combine full date (year, month, day) with time in 24-hour format
    return `${date
      .toLocaleDateString("en-GB", {
        year: "numeric", // Full year (e.g., 2024)
        month: "2-digit", // Month in 2 digits (e.g., 12 for December)
        day: "2-digit", // Day of the month in 2 digits (e.g., 24)
      })
      .split("/")
      .reverse()
      .join("/")} ${date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    })}`;
  };

  const items =
    language === "mn"
      ? [
          { label: "Нүүр", ariaLabel: "Home", href: "/" },
          { label: "Бидний тухай", ariaLabel: "About Us", href: "/about" },
          { label: "Брэнд", ariaLabel: "Brand", href: "/brand" },
          { label: "Карьер", ariaLabel: "Career", href: "/career" },
          { label: "Мэдээ, мэдээлэл", ariaLabel: "News", href: "/news" },
          { label: "Холбогдох", ariaLabel: "Contact", href: "/contact" },
        ]
      : [
          { label: "Home", ariaLabel: "Home", href: "/" },
          { label: "About Us", ariaLabel: "About Us", href: "/about" },
          { label: "Brand", ariaLabel: "Brand", href: "/brand" },
          { label: "Career", ariaLabel: "Career", href: "/career" },
          { label: "News", ariaLabel: "News", href: "/news" },
          { label: "Contact", ariaLabel: "Contact", href: "/contact" },
        ];

  return (
    <div>
      <div className=" flex justify-center fixed z-10 top-0 bg-[#1E1E1E] h-[70px] w-full">
        <div className="flex fixed z-10  w-full m-auto  max-w-[1440px] h-[70px] justify-between  px-4 items-center text-white">
          <div className="mt-[70px] w-[100px] h-[100px] z-10">
            <img
              src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732096336/pepsi/photos/cyepjp0jjfz3uontdjnt.png"
              alt=""
            />
          </div>
          <div className="flex gap-2">
            <Login
              lottoCount={lottoCount}
              setLottoCount={setLottoCount}
              setBell={setBell}
              phoneBtn={phoneBtn}
              pointBtn={pointBtn}
              setPhoneBtn={setPhoneBtn}
              setPointBtn={setPointBtn}
            />
          </div>
        </div>
      </div>
      {history && (
        <div className="fixed top-0 z-[7] left-0 w-full h-full bg-black bg-opacity-50 p-2 flex justify-center items-center">
          <div className="bg-black p-6 rounded-lg w-full max-h-[500px] mx-2 login-shadow max-w-[500px] overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-white">
                Бэлгийн жагсаалт
              </h2>
              <p
                onClick={close}
                className="bg-blue-500 rounded text-white p-1 cursor-pointer"
              >
                Хаах
              </p>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[60vh] text-white">
              {/* Render gift items dynamically */}
              {data && data.length > 0 ? (
                data
                  .slice() // Create a shallow copy of the array to avoid mutating the original array
                  .reverse() // Reverse the array to show the latest items first
                  .map((item, index) => (
                    <div key={index} className="p-4 border-b">
                      <h3 className="font-medium">Бэлэг: {item.giftName}</h3>
                      <p>Огноо: {formatDate(item.createdAt)}</p>
                    </div>
                  ))
              ) : (
                <p>No gifts found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// <nav className="bg-[#1E1E1E] z-[5] relative mb-[20px] transition-all duration-1000 rounded-br-lg rounded-bl-lg">
//   <div className="flex max-w-[1440px] h-[90px] justify-between mx-auto px-4 items-center text-white">
//     <div className="mt-[100px] w-[100px] h-[100px] z-10">
//       <img
//         src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732096336/pepsi/photos/cyepjp0jjfz3uontdjnt.png"
//         alt=""
//       />
//     </div>
//     {/* <div className="flex lg:gap-[100px] max-md:gap-5 w-[100%]">
//       <div className="max-md:hidden md:flex mx-[10px] justify-between md:font-extrabold md:w-[90%]">
//         {items.map((item, index) => (
//           <a
//             key={index}
//             href={item.href}
//             aria-label={item.ariaLabel}
//             className="hover:text-gray-400 max-lg:text-[12px] text-[18px] transition duration-200"
//           >
//             {item.label}
//           </a>
//         ))}
//       </div>
//     </div> */}
//     <div className="flex gap-2">
//       {/* <Loyalty toggleLanguage={toggleLanguage} language={language} /> */}
//       <div className="hidden  mr-5">
//         {visible && (
//           <button
//             className="hidden max-md:flex menu-btn"
//             onClick={toggleMenu}
//           >
//             <span className="bar bar1"> </span>
//             <span className="bar bar2"> </span>
//             <span className="bar bar3"> </span>
//           </button>
//         )}
//       </div>
//       <Login lottoCount={lottoCount} setLottoCount={setLottoCount} />
//     </div>

//     <FullscreenOverlayNav
//       isOpen={isMenuOpen}
//       toggleMenu={toggleMenu}
//       items={items}
//       toggleLanguage={toggleLanguage}
//       language={language}
//     />
//   </div>
// </nav>
