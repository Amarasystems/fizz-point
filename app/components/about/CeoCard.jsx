import { useLanguage } from "../../ChangeLanguegeProvider";
import { personCard1, personCard2 } from "../global/data";

export default function CeoCard() {
  const { language } = useLanguage();

  const persons1 = personCard1[language] || personCard1.mn;
  const persons2 = personCard2[language] || personCard2.mn;

  return (
    <div className="max-w-[1440px] m-auto mb-[50px] rounded-lg bg-[#0125FF]">
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-wrap justify-center">
          {persons1.map((person, index) => (
            <div
              key={`person1-${index}`}
              className="w-[285px] h-[400px] flex flex-col items-center m-2"
            >
              <img
                src={person.img}
                alt={`${person.name}'s avatar`}
                className="bg-black absolute z-[5] w-[180px] h-[180px] rounded-full"
              />
              <div className="w-[285px] h-[350px] flex flex-col items-center justify-center p-4 text-center mt-[100px] bg-white rounded-[12px]">
                <h2 className="font-extrabold text-[24px]">{person.name}</h2>
                <p className="text-[18px]">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center">
          {persons2.map((person, index) => (
            <div
              key={`person2-${index}`}
              className="w-[285px] h-[400px] flex flex-col items-center m-2"
            >
              <img
                src={person.img}
                alt={`${person.name}'s avatar`}
                className="bg-black absolute z-10 w-[180px] h-[180px] rounded-full"
              />
              <div className="w-[285px] h-[350px] flex flex-col items-center justify-center p-4 text-center mt-[100px] bg-white rounded-[12px]">
                <h2 className="font-extrabold text-[24px]">{person.name}</h2>
                <p className="text-[18px]">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
