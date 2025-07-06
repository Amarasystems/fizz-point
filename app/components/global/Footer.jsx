import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const handleRouter = () => {
    router.push("/program");
  };
  return (
    <div className="bg-[#1443FF]">
      <div className="max-w-[1440px] m-auto flex justify-between p-2 gap-2 items-center">
        <div className="w-[50px]">
          <img
            src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732096336/pepsi/photos/cyepjp0jjfz3uontdjnt.png"
            alt=""
          />
        </div>
        <div className="flex gap-[70px] max-md:gap-4">
          <div className="flex text-white gap-2 max-sm:text-[8px] items-center font-bold">
            <p className="max-md:hidden">Санал хүсэлт</p>
            <p className=" cursor-pointer" onClick={handleRouter}>Асуулт, Хариулт</p>
            <p>Лого татах</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="" target="_blank" rel="noopener noreferrer">
              <img
                className="max-sm:w-[15px]"
                src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732098445/pepsi/photos/zjbuu8fbcqlh0nficpc1.png"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.youtube.com/@PepsiMongol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-sm:w-[15px]"
                src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732098445/pepsi/photos/lpbpm9xqdo1vmcp5l4vw.png"
                alt="YouTube"
              />
            </a>
            <a
              href="https://www.instagram.com/pepsimongolia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-sm:w-[15px]"
                src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732098445/pepsi/photos/vfcblmgi6hen0r4ainh3.png"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.facebook.com/PepsiMongolia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="max-sm:w-[15px]"
                src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732098445/pepsi/photos/ewvg2smuqj205mvvl0pv.png"
                alt="Facebook"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
