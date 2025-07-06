import { useLanguage } from "../../ChangeLanguegeProvider";

const Welcome = () => {
  const { language } = useLanguage();

  return (
    <div className="flex justify-center items-center my-[50px] max-md:text-[36px] text-[48px] font-bold text-white">
      {language === "mn" ? "Тавтай морил" : "Welcome"}
    </div>
  );
};

export default Welcome;
