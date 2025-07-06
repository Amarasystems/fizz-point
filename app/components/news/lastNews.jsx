"use client";
import { useRouter } from "next/navigation";
export default function LastNews() {
  const router = useRouter();

  const handleJump = () => {
    router.push("/blog");
  };

  return (
    <div
      onClick={handleJump}
      className="m-auto max-w-[1440px] mt-[50px] flex justify-center"
    >
      <div className="max-w-[1350px] w-full">
        <div className="max-lg:flex-wrap mb-[80px] justify-between max-lg:max-w-[700px] gap-4 m-[auto] bg-[#1E1E1E] p-10 rounded-[16px] flex">
          <div className="">
            <img src="/img/INTO.png" alt="" />
            <p className="text-[#0125FF] text-[130px] max-lg:text-[80px] max-lg:leading-[50px] leading-[100px] mt-4 font-extrabold">
              NEW
            </p>
            <br />
            <p className="text-[#0125FF] text-[130px] max-lg:text-[80px] max-lg:leading-[50px] leading-[100px] font-extrabold">
              ERA
            </p>
            <p className="text-white text-[48px]">2024.10.05нд</p>
            <p className="text-white text-[24px]">
              үндэсний соёл амралтын хүрээлэнд
              <br /> уулцацгаая
            </p>
          </div>
          <div className="max-w-[700px]">
            <img
              className="w-full h-auto rounded-[16px]"
              src="https://www.foodandwine.com/thmb/F5-JcZelGPyaW0ec-TWLTNwlkGk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pepsi-Name-Secret-Meaning-FT-BLOG1123-f51cf9fb425e4bed87381bd68394e672.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
