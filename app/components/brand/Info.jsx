import { useLanguage } from "../../ChangeLanguegeProvider";

export default function Info() {
  const { language } = useLanguage();

  const title =
    language === "mn" ? "ПепсиКо Интернешнл " : "A brief introduction";

  const description =
    language === "mn"
      ? "ПэпсиКо Интернэшнл корпораци нь хөнгөн хоол, зууш, ундаа, савласан ус, жүүс үйлдвэрлэлээрээ дэлхийд тэргүүлэгч компаниудын нэг юм. Эдүгээ 210 гаруй улс оронд 290,000 гаруй ажилтантайгаар үйл ажиллагаагаа явуулж байгаа ба Pepsi, Mirinda, 7Up, Mountain Dew зэрэг хийжүүлсэн ундаа, Aquafina цэвэр ус, дэлхийн №1 жүүс болох Tropicana, Lipton Ice Tea, Starbucks Coffee, Lay’s chips зэрэг дэлхий нийтийн өдөр тутмын хэрэглээ болсон 300 гаруй нэр төрлийн хүнсний бүтээгдэхүүнийг үйлдвэрлэж байна."
      : "PepsiCo International Corporation is one of the world's leading companies in the production of snacks, beverages, bottled water, and juices. Currently, it operates in over 210 countries with more than 290,000 employees. PepsiCo produces over 300 globally recognized food and beverage products, including carbonated drinks like Pepsi, Mirinda, 7Up, and Mountain Dew; bottled water such as Aquafina; the world’s number one juice brand, Tropicana; Lipton Ice Tea; Starbucks Coffee; and Lay's chips, all of which have become part of daily life for consumers worldwide.Pepsi Cola is a taste that embodies passion and energy for the new generation. It brings joy and vitality to people around the world, offering a unique style and celebration of life for all ages. Feel the taste, feel your Pepsi.";

  return (
    <div className="max-w-[1440px] flex items-center flex-col m-auto mb-[100px] p-4 text-white">
      <div className="w-[90%]">
        <h2 className="text-[26px] font-semibold">{title}</h2>
        <p className="text-[22px] mb-[50px] ">{description}</p>
      </div>

      <img
        className=" rounded-[10px]"
        src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732738646/pepsi/m5rmmjdkfcrvftvcttor.jpg"
        alt=""
      />
    </div>
  );
}
