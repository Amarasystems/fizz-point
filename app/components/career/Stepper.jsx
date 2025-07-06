export default function Stepper() {
  return (
    <div className="max-md:hidden">
      <div className=" flex items-center gap-2 px-8 mt-[20px]">
        <div className="flex gap-2 items-center">
          <div className="border-[2px] border-solid border-[#0125FF] w-[32px] h-[32px] text-center font-bold text-[#1443FF] bg-white rounded-[50px]">
            1
          </div>
          <span className="w-[100px] rounded-md h-[5px] bg-[#A1AEBE]"></span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-[2px] border-solid border-[#0125FF] w-[32px] h-[32px] text-center font-bold text-[#1443FF] bg-white rounded-[50px]">
            2
          </div>
          <span className="w-[100px] rounded-md h-[5px] bg-[#A1AEBE]"></span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-[2px] border-solid border-[#0125FF] w-[32px] h-[32px] text-center font-bold text-[#1443FF] bg-white rounded-[50px]">
            3
          </div>
          <span className="w-[100px] rounded-md h-[5px] bg-[#A1AEBE]"></span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-[2px] border-solid border-[#0125FF] w-[32px] h-[32px] text-center font-bold text-[#1443FF] bg-white rounded-[50px]">
            4
          </div>
          <span className="w-[100px] rounded-md h-[5px] bg-[#A1AEBE]"></span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-[2px] border-solid border-[#0125FF] w-[32px] h-[32px] text-center font-bold text-[#1443FF] bg-white rounded-[50px]">
            5
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-white">Анкет бөглөх</p>
        <p className="text-white">Ярилаганд орох</p>
        <p className="text-white">Чадварын сорилт</p>
        <p className="text-white">Шалгаруулалт</p>
        <p className="text-white">Та чадлаа</p>
      </div>
    </div>
  );
}
