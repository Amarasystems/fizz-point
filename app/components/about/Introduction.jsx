import { useState } from "react";
import { useLanguage } from "@/app/ChangeLanguegeProvider";
import { plan } from "../global/data"; 

export default function Introduction() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { language } = useLanguage();
  const currentPlan = plan[language];
  
  const introText = {
    mn: `
      2008 оны есдүгээр сард АНУ-ын ПэпсиКо Интернэшнл Монголын “Жи Эн
      Бевережис” компанитай хамтын ажиллагаагаа эхлүүлснээр бид дэлхийд
      алдартай брэндүүдийг эх орондоо үйлдвэрлэж, дотоодын үнээр
      хэрэглэгчиддээ хүргэх боломж бүрдсэн юм. Манай компани одоогийн
      байдлаар Pepsi, Lipton Ice Tea, Mountain Dew, Sting, 7Up, Mirinda
      гэсэн зургаан брэндийн бүтээгдэхүүнийг 11 нэр төрөл, дөрвөн төрлийн
      савлагаатайгаар үйлдвэрлэж, Улаанбаатар хотын 9 дүүрэг, 21 аймгийн
      300 гаруй сумын 10,000 гаруй харилцагчид амжилттай худалдаалж байна.
      Мөн POSTMIX машинд зориулсан 20 летрийн савлагаатай 4 төрлийн BIB
      сиропыг ПэпсиКо Интернэшнл корпорацийн тусгайлсан жор, технологийн
      дагуу Монгол улсын стандарт, эрүүл ахуйн шаардлагад нийцүүлэн
      үйлдвэрлэдэг.
    `,
    en: `
      In September 2008, PepsiCo International began its partnership with "GN Beverages" in Mongolia, enabling us to produce world-renowned brands locally and offer them to consumers at domestic prices. Currently, our company manufactures products under six brands: Pepsi, Lipton Ice Tea, Mountain Dew, Sting, 7Up, and Mirinda, in 11 product varieties and four packaging formats. These products are successfully distributed to over 10,000 customers across all nine districts of Ulaanbaatar and more than 300 soums (towns) in 21 provinces. We also produce four types of 20-liter BIB syrups for POSTMIX machines, which are made according to the special recipes and technology of PepsiCo International, in compliance with Mongolian standards and hygiene requirements.
    `,
  };

  return (
    <div className="my-[100px] max-w-[1440px] mx-auto p-6 gap-4">
      <div className="flex flex-col px-5 gap-4 mb-6">
        <div className="flex gap-3">
          {currentPlan.map((item, index) => (
            <p
              key={index}
              onClick={() => setSelectedIndex(index)}
              role="button" // Accessibility improvement
              className={`cursor-pointer underline-offset-4 max-sm:text-[12px] font-bold transition-colors duration-300 ${
                selectedIndex === index
                  ? "text-white underline decoration-[#0E0E96]"
                  : "text-white"
              }`}
              style={{ textDecorationThickness: "4px" }}
            >
              {item.title}
            </p>
          ))}
        </div>
        <p className="text-white">{currentPlan[selectedIndex].text}</p>
      </div>
      <div className="flex justify-between px-5 max-lg:flex-col">
        <div className="w-[45%] text-white max-lg:w-full">
          <p className="font-extrabold text-[18px] mb-4">
            {language === "mn" ? "Товч танилцуулга" : "Introduction"}
          </p>
          <p className="mb-4">
            {language === "mn" ? introText.mn : introText.en}
          </p>
        </div>
        <div className="w-[45%] max-lg:w-full items-center flex justify-center">
          <img
            src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1731694086/pepsi/photos/uwidps3fwt2qro36qzkl.png"
            alt="Pepsi Image"
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
