import Stepper from "./Stepper";
import Uploud from "./Uploud";

export default function Cv() {
  return (
    <div className="mx-auto max-w-[1440px] mb-[50px] mt-[60px]">
      <div className="linear rounded-xl gap-10 max-w-[1350px] m-auto h-[440px] max-md:h-[300px] flex flex-col items-center">
        <p className="text-white text-[36px] max-md:text-[24px] mt-[100px]">
          Бидний нэг боломоор байна уу
        </p>
        <Uploud />
        <Stepper />
      </div>
    </div>
  );
}
