import { useState } from "react";
import { drinks } from "../global/data";
import { size } from "../global/data";

const DrinkSwitcher = () => {
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [customDrinkName, setCustomDrinkName] = useState(
    drinks[0]?.size1[0]?.name || "Select a drink"
  );

  const updateCustomDrinkName = (skin) => {
    setCustomDrinkName(skin ? skin.name : "Select a skin");
  };

  const selectDrink = (index) => {
    setCurrentDrinkIndex(index);
    setCurrentSizeIndex(0);
    setCurrentSkinIndex(0);
    const firstSize = drinks[index]?.size1[0];
    setCustomDrinkName(firstSize ? firstSize.name : "Select a drink");
  };

  const selectSize = (index) => {
    setCurrentSizeIndex(index);
    const selectedSize = drinks[currentDrinkIndex][`size${index + 1}`];

    if (selectedSize && selectedSize.length > 0) {
      if (currentSkinIndex >= selectedSize.length) {
        setCurrentSkinIndex(0);
      }
      updateCustomDrinkName(selectedSize[currentSkinIndex]);
    } else {
      setCurrentSkinIndex(-1);
      setCustomDrinkName("Select a skin");
    }
  };

  const selectSkin = (index) => {
    const selectedSize =
      drinks[currentDrinkIndex][`size${currentSizeIndex + 1}`];

    if (selectedSize && index >= 0 && index < selectedSize.length) {
      setCurrentSkinIndex(index);
      updateCustomDrinkName(selectedSize[index]);
    } else {
      console.error("Selected skin index is out of bounds.", {
        currentDrinkIndex,
        currentSizeIndex,
        selectedSize,
        index,
      });
    }
  };

  const currentSizeImages =
    drinks[currentDrinkIndex][`size${currentSizeIndex + 1}`] || [];
  const currentImage = currentSizeImages[currentSkinIndex];

  return (
    <div className="max-w-[1440px] mx-auto mt-[30px] mb-[30px] p-4">
      <div className="flex justify-center drinkSwichBg">
        <div className="flex flex-col md:flex-row justify-between md:gap-2 items-center w-full max-w-[900px] mb-4">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 max-md:justify-center">
              <p className="font-extrabold text-[24px]  bg-white p-2 rounded-[10px]">
                {customDrinkName}
              </p>
            </div>
            <div className="flex gap-5 flex-wrap max-md:justify-center">
              {(() => {
                const buttons = [];
                for (let index = 0; index < currentSizeImages.length; index++) {
                  const skin = currentSizeImages[index];
                  buttons.push(
                    <button
                      key={index}
                      className={`font-semibold p-2 rounded ${
                        currentSkinIndex === index
                          ? "bg-gradient-to-r from-[#1443FF] to-[#001571] text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => selectSkin(index)}
                      aria-label={`Select skin ${skin.name}`}
                    >
                      {skin.name}
                    </button>
                  );
                }
                return buttons;
              })()}
            </div>
            <div className="flex gap-5 max-sm:gap-1 items-end max-md:justify-center">
              {(() => {
                const buttons = [];
                const sizes = drinks[currentDrinkIndex];
                for (const key in sizes) {
                  if (key.startsWith("size") && sizes[key].length > 0) {
                    const sizeIndex = parseInt(key.replace("size", "")) - 1;
                    const sizeData = size[sizeIndex];
                    buttons.push(
                      <button
                        key={sizeIndex}
                        className="font-semibold flex items-center justify-end flex-col p-2 max-sm:p-0  rounded"
                        onClick={() => selectSize(sizeIndex)}
                        aria-label={`Select size ${sizeIndex + 1}`}
                      >
                        {sizeData.img && (
                          <img
                            className={`size rounded ${
                              currentSizeIndex === sizeIndex ? "img-shadow" : ""
                            }`}
                            src={sizeData.img}
                            alt={sizeData.text}
                          />
                        )}
                        <p className="text-white">{sizeData.text}</p>
                      </button>
                    );
                  }
                }
                return buttons;
              })()}
            </div>
          </div>
          <div className="flex flex-col items-center my-4 md:my-0">
            {currentImage && (
              <img
                src={currentImage.img}
                alt={`Image of ${customDrinkName} - Size ${
                  currentSizeIndex + 1
                } Skin ${currentSkinIndex + 1}`}
                className="w-[150px] h-[430px] transition-opacity duration-500"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-center mt-4 flex-wrap">
        {(() => {
          const buttons = [];
          for (let index = 0; index < drinks.length; index++) {
            const drink = drinks[index];
            buttons.push(
              <div key={index} className="flex flex-col items-center ">
                <div
                  onClick={() => selectDrink(index)}
                  className={`font-semibold p-2 flex rounded-[50px] transition-colors duration-300 ${
                    currentDrinkIndex === index
                      ? "bg-gradient-to-r from-[#1443FF] to-[#001571] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <img
                    src={drink.img}
                    alt={`Image of ${drink.name}`}
                    className="w-[40px] h-[40px]"
                  />
                  <button
                    aria-label={`Select drink ${drink.name}`}
                    className="ml-2 text-[12px]"
                  >
                    {drink.name}
                  </button>
                </div>
              </div>
            );
          }
          return buttons;
        })()}
      </div>
    </div>
  );
};

export default DrinkSwitcher;
