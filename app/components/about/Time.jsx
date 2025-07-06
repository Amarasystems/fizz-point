import React, { useState } from "react";
import { years } from "../global/data"; // Assuming this is the correct path
import { useLanguage } from "@/app/ChangeLanguegeProvider";

export default function Time() {
  const [currentStep, setCurrentStep] = useState(0);
  const { language } = useLanguage();

  // Access the correct array based on the current language
  const currentYears = years[language];

  return (
    <div className="text-white max-w-[1440px] mx-auto bg-[#141414] p-8 rounded-xl my-[100px]">
      <ol className="flex items-center justify-between p-10 max-md:p-0 ">
        {currentYears.map((yearData, index) => (
          <div
            key={yearData.year}
            className={`flex flex-col  ${
              index === currentYears.length - 1 ? "w-12" : "w-full"
            }`}
          >
            <h2 className="text-xl font-bold text-start max-sm:text-[15px]">
              {yearData.year}
            </h2>
            <li
              role="button"
              aria-pressed={currentStep >= index}
              tabIndex={0}
              className={`flex items-center cursor-pointer my-5 h-[10px] w-full transition-colors duration-300 ${
                currentStep > index
                  ? "bg-[#1c39b9]"
                  : index === currentYears.length - 1
                  ? "bg-[#141414]"
                  : "bg-white"
              }`}
              onClick={() => setCurrentStep(index)}
              onKeyPress={(e) => e.key === "Enter" && setCurrentStep(index)}
            >
              <div className="w-10 h-10 max-sm:w-6 max-sm:h-6 rounded-full bg-white flex items-center justify-center">
                <span
                  className={`w-4 h-4 rounded-full ${
                    currentStep >= index ? "bg-[#1c39b9]" : "bg-white"
                  }`}
                ></span>
              </div>
            </li>
          </div>
        ))}
      </ol>
      <div className="mt-6 flex justify-around max-md:flex-wrap gap-5">
        <p className="mt-2 w-[50%] text-center max-md:text-start max-md:w-full md:text-left">
          {currentYears[currentStep].text}
        </p>
        <img

          src={currentYears[currentStep].imgSrc}
          alt={`Image for ${currentYears[currentStep].year}`}
          className="mt-4 rounded w-[50%]"
        />
      </div>
    </div>
  );
}
