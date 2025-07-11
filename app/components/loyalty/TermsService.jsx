
export default function TermsService({
  serviceModal,
  setServiceModal,
  setIsChecked,
  isChecked,
  handleService,
  error,
  setError,
}) {
  return (
    <div>
      {serviceModal && (
        <div className="fixed inset-0  text-white z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 rounded-lg max-w-[800px] w-full max-h-[80vh] overflow-y-auto">
            <p className="text-center font-bold">Үйлчилгээний нөхцөл</p>
            <p className="text-center font-bold mb-2">
              “PEPSI PLUS ЛОЯАЛТИ ХӨТӨЛБӨР”-ИЙН ХЭРЭГЛЭГЧИЙН ГЭРЭЭ
            </p>
            <p>
              Тодорхойлолт: "PEPSI PLUS лояалти хөтөлбөр" гэдэг нь
              “PepsiCo”-гийн албан ёсны онцгой эрхт монгол дахь үйлдвэрлэгч Жи
              эн Бевережис ХХК үнэнч хэрэглэгчээ урамшуулах зорилгоор хэрэгжүүлж
              буй ОЯАЛТИ ХӨТӨЛБӨР юм. "Хэрэглэгч" гэж "PEPSI PLUS " хөтөлбөрийг
              хүлээн зөвшөөрсөн болон үйлчилгээний нөхцөл, хэрэглэгчийн гэрээг
              хүлээн зөвшөөрч аппликейшнд бүртгүүлсэн иргэнийг хэлнэ.
            </p>
            <p className="my-[20px]">
              <span className="text-[18px] font-bold">САНАМЖ:</span> "Хэрэглэгч"
              гэж "PEPSI PLUS " -ыг хүлээн авсан болон үйлчилгээний нөхцөл,
              хэрэглэгчийн гэрээг хүлээн зөвшөөрч аппликейшн бүртгүүлсэн
              иргэнийг хэлнэ.
            </p>
            <div className="mb-5">
              <span className="font-bold">
                Гэрээний хувилбар: 0.1 /2024.12.01/
              </span>
              <p className="font-bold">ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ </p>
              <p className="font-bold">
                1. PEPSI PLUS цуглуулах, зарцуулах эрхийн талаар
              </p>
              <div>
                <p>
                  1.1 "PEPSI PLUS лояалти хөтөлбөр"-ийн PEPSI PLUS аппликейшн
                  болон вэб сайт, "PEPSI PLUS" аппликейшн нь Жи Эн Бевережис"
                  ХХК -ийн өмч бөгөөд "Хэрэглэгч" нь "PEPSI PLUS" - ын эзэмшигч
                  байна.
                </p>
                <p>
                  1.2 "PEPSI PLUS" худалдан авах болон PEPSI PLUS аппликейшнээр
                  нэвтрэн үйлчилгээний нөхцөл, хэрэглэгчийн гэрээтэй уншиж
                  танилцан хүлээн зөвшөөрснөөр гэрээ байгуулсанд тооцно.
                </p>
                <p>
                  1.3 Хэрэглэгч лояалти хөтөлбөрт PEPSI PLUS оноо хэрэглэхдээ
                  доорх аргуудаар PEPSI PLUS оноо цуглуулах, зарцуулах боломжтой
                  байна.
                </p>
                <p>1.3.1 Pepsi.mn вебсайт 1.3.2 PEPSI PLUS аппликейшн</p>
                <p>1.3.2 PEPSI PLUS аппликейшн.</p>
              </div>
            </div>
            <div className="mb-5">
              <p>
                1.4 Хэрэглэгч PEPSI PLUS аппликейшнд нэвтэрснээр PEPSI PLUS
                оноогоо цуглуулах, зарцуулах, гүйлгээний түүхээ харах, үлдэгдэл
                оноогоо шалгах, урамшуулалт хөтөлбөрүүдэд хамрагдах,
                бүтээгдэхүүн үйлчилгээний талаар мэдээлэл авах боломжтой болно.
              </p>
              <p>
                1.5 Хэрэглэгч PEPSI PLUS оноогоо цуглуулах, зарцуулахдаа пин код
                ашиглана. Пин код нь 4 оронтой тоо байна. PEPSI PLUS аппликейшнд
                бүртгүүлэх тохиолдолд хэрэглэгч өөрийн хүссэн пин кодоо үүсгэнэ.
              </p>
              <p>
                1.6 Хэрэглэгч худалдан авалт хийх үедээ 1 PEPSI PLUS оноо = 1
                төгрөг зарчмаар PEPSI PLUS оноогоо зарцуулан, тухайн
                бүтээгдэхүүн үйлчилгээний үнийн дүнгийн 100% хүртэлх дүнд
                хөнгөлөлт эдлэх боломжтой.
              </p>
            </div>
            <div className="mb-5">
              <p>2. Хэрэглэгчийн мэдээлэл:</p>
              <p>
                2.1 PEPSI PLUS аппликейшнд бүртгүүлэхэд таны дараах хувийн
                мэдээллүүд шаардлагатай. Үүнд: Овог, нэр, регистрийн дугаар
                болон гэрийн хаяг.
              </p>
              <p>
                2.2 "PEPSI PLUS лояалти хөтөлбөр"- үйлчлүүлэх боломжийг
                нэмэгдүүлэх, бүтээгдэхүүн, үйлчилгээг сайжруулах, хөгжүүлэлт
                хийх, урамшуулал санал болгох зорилгоор бид таны хувийн
                мэдээллийг PEPSI PLUS -н данс эзэмшигч байх хугацаанд цуглуулах,
                боловсруулах, ашиглах хамтрагч дамжуулж болно.
              </p>
              <p>
                2.3 PEPSI PLUS -н данс эзэмшигч байх эрхээ PEPSI PLUS -н лавлах
                төвд холбогдон цуцлуулах боломжтой.
              </p>
              <p>2.4 Бид таны хувийн мэдээллийг нийтэд ил болгохгүй.</p>
              <p>
                2.5 Гэмт хэрэг, зөрчил шалган шийдвэрлэх ажиллагааны явцад хууль
                сахиулах болон шүүх эрх мэдлийн байгууллагаас албан ёсоор
                шаардсан тохиолдолд таны мэдээлэл, бүтээгдэхүүн үйлчилгээ,
                хөнгөлөлт, урамшууллын түүхийн талаарх мэдээллийг өгөх болно.
              </p>
            </div>
            <div className="mb-5">
              <p>3. Мэдээллийн аюулгүй байдал, нууцлалтай холбоотой үүрэг:</p>
              <p>
                3.1 Жи Эн Бевережис" ХХК нь лояалти системийн аюулгүй,
                найдвартай хэвийн ажиллагааг хангах, мэдээллийн нууцлалыг
                хамгаалах бүх талын арга хэмжээг авч ажиллана.
              </p>
              <p>
                3.2 Хэрэглэгч өөрийн мэдээллийн аюулгүй байдлыг хангах үүрэгтэй
                ба хангаагүйн улмаас үүсэх эрсдэлийг Жи Эн Бевережис" ХХК ХХК
                хариуцахгүй.
              </p>
              <p>
                3.3 Хэрэглэгч гүйлгээний пин кодоо бусдад алдахгүй байх,
                дамжуулахгүй байх үүрэгтэй.
              </p>
              <p>
                3.4 Хэрэглэгч бүртгүүлсэн утасны дугаараа ашиглахаа больсон
                эсвэл эзэмших эрхийг бусдад шилжүүлсэн тохиолдолд PEPSI PLUS
                аппликейшнд өөрийн эрхээр нэвтрэн бүртгэлтэй утасны дугаарын
                мэдээллээ шинэчлэх үүрэгтэй.
              </p>
              <p>
                3.5 Хэрэглэгч PEPSI PLUS бүртгэлээ бусдад ашиглуулахгүй,
                дамжуулахгүй байх үүрэгтэй.
              </p>
              <p>
                3.6 Хэрэглэгч PEPSI PLUS пин мартсан эсвэл гар утсаа бусдад
                алдан PEPSI PLUS аппликейшн руу хандах боломжгүй болсон
                тохиолдолд 7575 0000 лавлах төвд холбогдон PEPSI PLUS оноогоо
                зарцуулах эрхийг түр хаалган бусдад зүй бусаар ашиглуулахаас
                сэргийлэх үүрэгтэй.
              </p>
            </div>
            <div className="mb-5">
              <p>4. Баталгаа өгөхгүй зүйлс:</p>
              <p>4.1 Хэрэглэгчийн бүртгүүлсэн мэдээллийн үнэн зөв байдал.</p>
            </div>
            <div className="mb-5">
              <p>5. Хэрэглэгчид хориглох зүйл:</p>
              <p>
                5.1 PEPSI PLUS зөвхөн өөрийн хувийн хэрэгцээнд ашиглах ёстой ба
                бусдад дамжуулан худалдах, бусдад хэрэглүүлж мөнгө авах зэрэг
                үйлчилгээний нөхцөлийг зөрчсөн үйлдэл хийхийг хориглоно.
              </p>
            </div>
            <div>
              "Жи Эн Бевережис" ХХК Хан-Уул, 3-хороо, Чингисийн өргөн чөлөө-14,
              Пепси төв байр \17060\ Монгол Улс ГОМДОЛ, ХҮСЭЛТ ХҮЛЭЭН АВАХ:
              И-мэйл: hello@pepsi.mn Утас: 7575 0000 PEPSI PLUS аппликейшн:
              Гомдол санал илгээх хэсэг "PEPSI PLUS ЛОЯАЛТИ ХӨТӨЛБӨР”-ИЙН
              ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ, ХЭРЭГЛЭГЧИЙН ГЭРЭЭГ УНШИЖ ТАНИЛЦАН ХҮЛЭЭН
              ЗӨВШӨӨРЧ БАЙНА.
            </div>
            <div className="flex gap-2 mt-3">
              <p className="font-bold ">
                Үйлчилгээний нөхцөлийг хүлээн зөвшөөрч байна
              </p>
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsChecked(e.target.checked);
                }}
              />
            </div>
            <div
              onClick={handleService}
              className="bg-blue-500 p-2 text-white text-center mt-3  rounded-md"
            >
              Хаах
            </div>
            <p className="text-red-500 text-center mt-2">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
