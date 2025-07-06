import { useLanguage } from "@/app/ChangeLanguegeProvider";
import LaazLogo from "./LaazLogo";

export default function Hero() {
  const { language } = useLanguage();
  return (
    <div className="flex justify-evenly mx-auto gap-5 items-center max-md:flex-col max-w-[1440px]">
      {language === "mn" && (
        <img
          className="max-lg:w-[240px] max-md:w-[280px] max-sm:w-[280px] max-sm:h-[130px] w-[280px] h-[150px]"
          src="./img/NewLook.png"
          alt="New Look"
        />
      )}
      {language === "en" && (
        <img
          className="max-lg:w-[240px] max-md:w-[280px] max-sm:w-[280px] max-sm:h-[140px] w-[280px] h-[170px]"
          src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732524398/pepsi/ill7f8ghq9asgiysymnc.png"
          alt="New Look in English"
        />
      )}
      <LaazLogo />
      {language === "mn" && (
        <img
          className="max-lg:w-[240px] max-md:w-[280px] max-sm:w-[280px] max-sm:h-[130px]  w-[280px] h-[150px]"
          src="./img/Perfect.png"
          alt=""
        />
      )}
      {language === "en" && (
        <img
          className="max-lg:w-[240px] max-md:w-[280px] max-sm:w-[280px] max-sm:h-[130px]  w-[280px] h-[150px]"
          src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732524399/pepsi/blbrvtke2umks1ajjtak.png"
          alt="New Look in English"
        />
      )}
    </div>
  );
}

