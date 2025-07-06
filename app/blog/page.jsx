import Navbar from "../components/global/Navbar";
import { ChangeLanguegeProvider } from "../ChangeLanguegeProvider";
export default function page() {
  return (
    <ChangeLanguegeProvider>
      <div className="w-full h-full bg-black">
        <Navbar />
        <div className="m-auto max-w-[1440px] mt-[50px] flex justify-center bg-black">
          <div className="max-w-[1350px] w-full">
            <div className="flex justify-around flex-wrap gap-5">
              <div className="flex flex-col w-[500px] px-4">
                <img
                  className="w-[500px] h-auto rounded-[16px]"
                  src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732737166/pepsi/abtcuanedjc243udpfza.jpg"
                  alt=""
                />
                <p className="text-[28px] text-white">
                  💥 PEPSI INTO THE NEW ERA Нээлттэй тоглолтын хөтөлбөр. 🔊 🤫
                  ЭХНИЙ 1000 ХҮНД БЭЛЭГТЭЙ....🤭 💙 Дулаан хувцастай ирээрэй
                  хөөрхнүүдээ. 🤗🧣 📍 Хаана: Үндэсний соёл амралтын хүрээлэн
                  /HAPPY PARK/ 🗓️ Өдөр: 2024 оны 10-р сарын 5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChangeLanguegeProvider>
  );
}
