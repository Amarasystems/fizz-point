import { useLanguage } from "@/app/ChangeLanguegeProvider";
import Form from "./Form";

export default function Main() {
  const { language } = useLanguage();
  return (
    <div className="max-w-[1440px] m-auto">
      <div className="flex justify-between max-md:flex-col-reverse gap-5 px-10 mb-[100px] mt-[50px]">
        <div className="w-[60%] max-md:w-full">
          <div>
            <p className="text-white text-[30px]">
              {language === "mn" ? (
                <>
                  <span className="text-[#1443FF]">PepsiCo</span>
                  <span> албан ёсны монгол дахь</span>
                  <br />
                  <span>савлан үйлдвэрлэгч </span>
                  <span className="text-[#1443FF]">Жи Эн Бевережис ХХК</span>
                </>
              ) : (
                <>
                  <span className="text-[#1443FF]">GN Beverages LLC </span>
                  <span>is the authorized bottler of</span>
                  <br />
                  <span className="text-[#1443FF]">PepsiCo International</span>
                  <span> in Mongolia.</span>
                </>
              )}
            </p>
          </div>
          <img src="/img/world.png" alt="" />
          <div className="flex gap-10 justify-center">
            <div className="flex text-white gap-3 ">
              <img className="w-[30px] h-[30px]" src="/img/Phone.png" alt="" />
              <p>7575 0000</p>
            </div>
            <div className="flex text-white gap-3 ">
              <img
                className="w-[30px] h-[30px]"
                src="/img/Location.png"
                alt=""
              />
              <p>
                Хан-Уул, 3-р хороо,Чингисийн өргөн
                <br /> чөлөө-14, Пэпси төв байр /17060/,
                <br /> Ulaanbaatar, Mongolia
              </p>
            </div>
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
}
