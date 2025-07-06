import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Spin({ lottoCount, setLottoCount }) {
  const circleRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [prizeImage, setPrizeImage] = useState("");
  const [prize, setPrize] = useState("");
  const [code, setCode] = useState("");
  const [errorModal, setErrorModal] = useState("");
  const router = useRouter();

  // Function to get prize details by prize name
  const getPrizeDetails = (giftName) => {
    const prizeData = new Map([
      ["THANK YOU", { id: 1, prizeName: "Баярлалаа дахин оролдоно уу.", deg: 1313 }],
      ["IPHONE 16 PRO MAX", { id: 2, prizeName: "iPhone 16 Pro Max", deg: 1349 }],
      ["AIRPODS MAX", { id: 3, prizeName: "AirPods Max", deg: 1278 }],
      ["PEPSI 3 MONTHS OF USE", { id: 4, prizeName: "PEPSI 3 САРЫН ХЭРЭГЛЭЭ", deg: 1242 }],
      ["AIR PURIFIER", { id: 5, prizeName: "АГААР ЦЭВЭРШҮҮЛЭГЧ", deg: 1206 }],
      ["SMART TV", { id: 6, prizeName: "Ухаалаг зурагт", deg: 1170 }],
      ["MARSHALL SPEAKER", { id: 7, prizeName: "MARSHALL SPEAKER", deg: 1134 }],
      ["PEPSI 1 MONTHS OF USE", { id: 8, prizeName: "PEPSI 1 САРЫН ХЭРЭГЛЭЭ", deg: 1459 }],
      ["DYSON V15", { id: 9, prizeName: "Dyson V15", deg: 1421 }],
      ["APPLE WATCH", { id: 10, prizeName: "Apple Watch", deg: 1385 }],
    ]);
    return (
      prizeData.get(giftName) || {
        id: 1,
        prizeName: "Баярлалаа дахин оролдоно уу.",
        deg: 1313,
      }
    );
  };

  const checkLotto = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        console.log("token not found");
      } else if (access_token) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/user`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const lottoCount = response.data.response.lottoCount;
        setLottoCount(lottoCount);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error fetching lotto data:", error);
    }
  };
  checkLotto();
  
  const handlespin = async () => {
    // Prevent multiple clicks
    if (isSpinning || loader) return;

    setLoader(true);
    setIsSpinning(true); // Set spinning state to true
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      try {
        if (lottoCount === 0) {
          setErrorModal("Таньд хүрд эргүүлэх эрх байхгүй байна.");
          setTimeout(() => setErrorModal(null), 2000);
          setLoader(false);
          return;
        }

        if (lottoCount > 0) {
          const spinResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/spin`,
            {},
            { headers: { Authorization: `Bearer ${access_token}` } }
          );
          if (spinResponse && spinResponse.data && spinResponse.data.response) {
            const giftName = spinResponse.data.response.name;
            const prizeDetails = getPrizeDetails(giftName);
            const prizeDeg = prizeDetails.deg;

            setTotalRotation((prevRotation) => prevRotation + 360 + prizeDeg);
            setPrize(prizeDetails.prizeName);
            setPrizeImage(spinResponse.data.response.image);

            setTimeout(() => {
              setIsSpinning(false);
              setModal(true);
            }, 5000); // Assuming spin duration is 5 seconds
          } else {
            throw new Error("Invalid response from server");
          }
        }
        setLoader(false);
      } catch (error) {
        console.error("Error spinning the wheel:", error);
        setIsSpinning(false);
        setLoader(false);

        // Handle error states
        if (error.message === "Invalid response from server") {
          setErrorModal("Таньд хүрд эргүүлэх эрх байхгүй байна.");
        } else {
          setErrorModal("Алдаа гарлаа. Дахин оролдож үзнэ үү.");
        }

        setTimeout(() => setErrorModal(""), 2000);
      }
    } else {
      setLoader(false);
      setErrorModal("Та эхлээд нэвтэрнэ үү.");
      setTimeout(() => setErrorModal(""), 2000);
    }
  };

  const handleModalClose = () => {
    setModal(false);
    setTotalRotation(0);
    setPrize("");
    setPrizeImage("");
    setErrorModal("");
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value.toUpperCase());
  };

  const sentcode = async () => {
    const access_token = localStorage.getItem("access_token");
    if (isSpinning || loader) return;

    if (!access_token) {
      setErrorModal("Та эхлээд нэвтэрнэ үү.");
      setTimeout(() => setErrorModal(""), 2000);
      return;
    }

    if (!code || code.length !== 8) {
      setErrorModal("Бөглөөний код оруулна уу.");
      setTimeout(() => setErrorModal(""), 2000);
      return;
    }

    try {
      setLoader(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/collectLotteryCode`,
        { code },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const title = response.data.title;
      if (title === "Success") {
        setErrorModal("Бөглөөний код амжилттай бүртгэгдлээ.");
        setTimeout(() => {
          setErrorModal("");
        }, 2000);
      }
      if (title === "This code already registered.") {
        setErrorModal("Бөглөөний код бүртгэгдсэн байна");
        setTimeout(() => {
          setErrorModal("");
        }, 2000);
      }
      if (title === "Code is wrong.") {
        setErrorModal("Бөглөөний код буруу байна");
        setTimeout(() => {
          setErrorModal("");
        }, 2000);
      }
      setLoader(false);
      setCode("");
    } catch (error) {
      console.error("Error sending code:", error);
      setErrorModal("Та эхлээд нэвтэрнэ үү.");
      setTimeout(() => {
        setErrorModal("");
      }, 2000);
      setLoader(false);
    }
  };

  const spinnerStyle = {
    transform: `rotate(${totalRotation}deg)`,
    transition: isSpinning ? "transform 4.5s ease-out" : "none",
  };

  return (
    <div className="max-w-[1440px] my-5 m-auto max-sm:my-[180px] max-md:my-[150px] max-lg:my-[120px]">
      <div className="">
        <div className="relative flex justify-center ">
          <div className="">
            <div className="absolute z-[1] top-[220px] max-sm:top-[50px] max-lg:top-[150px] max-md:top-[90px] mx-auto justify-around w-full flex items-center">
              <div className="flex justify-center md:max-w-[600px] scale">
                <img
                  // src="https://res.cloudinary.com/dv0wipf01/image/upload/v1734099079/pepsi/qhnpahhx6lvfqmomkg3q.png"
                  src="/loyalty/qhnpahhx6lvfqmomkg3q.png"
                  alt="Image 1"
                  className="w-full  animate-horizontal-move"
                />
              </div>
              <div className="flex justify-center md:max-w-[600px] scale">
                <img
                  // src="https://res.cloudinary.com/dv0wipf01/image/upload/v1734099079/pepsi/zvv2mm6aagv4juo56t78.png"
                  src="/loyalty/zvv2mm6aagv4juo56t78.png"
                  alt="Image 2"
                  className="w-full  animate-horizontal-move"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <img
              className="transform"
              alt="Background "
              // src="https://res.cloudinary.com/dv0wipf01/image/upload/v1735365990/pepsi/fct2tkbhhnaqwzen7oro.png"
              src="/loyalty/fct2tkbhhnaqwzen7oro.png"
            />
          </div>
          <div>
            <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 z-[1] -translate-y-1/2">
              <img
                className=""
                // src="https://res.cloudinary.com/dv0wipf01/image/upload/v1735291616/pepsi/pjf0aup2b8jmqero8cbk.png"
                src="/loyalty/IMG_1490.png"
                alt=""
              />
            </div>
            <div className="">
              <div className="w-[500px] absolute  z-[3] h-[500px] pb-6 flex flex-col max-sm:w-[300px] max-sm:h-[300px] max-md:w-[400px] max-md:h-[400px]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center z-5">
                <div className=" absolute top-[-150px] w-[100px] ">
                  <img
                    // src="https://res.cloudinary.com/dv0wipf01/image/upload/v1734007136/pepsi/tufwdqhwhdfx7tx6zllc.png"
                    src="/loyalty/tufwdqhwhdfx7tx6zllc.png"
                    alt=""
                  />
                </div>
                <div className="w-[30px]">
                  <img
                    // src="https://res.cloudinary.com/dv0wipf01/image/upload/v1734371152/pepsi/h7njpndvctm6quokehj1.png"
                    src="/loyalty/h7njpndvctm6quokehj1.png"
                    alt=""
                  />
                </div>
                <div style={spinnerStyle} ref={circleRef}>
                  <img className="" src="/loyalty/spin.png" alt="Arrow" />
                  <div
                    onClick={handlespin}
                    className={`${
                      isSpinning || loader ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    } absolute rounded-[50%] z-[5] w-[100px] h-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  ></div>
                </div>
                <div className="text-center absolute z-[8] top-[500px] max-md:top-[400px] max-sm:top-[300px]">
                  <p className="text-[white] mb-2 font-bold text-[24px]">Бөглөөний код</p>
                  <input
                    placeholder="*    *    *    *    *    *    *    *"
                    className="rounded-md mb-2 p-1"
                    type="text"
                    name="lottoCode"
                    id="lottoCode"
                    value={code}
                    onChange={handleCodeChange} // Handle input change
                  />
                  <p className="text-white mb-2 text-[10px] font-semibold">
                    {lottoCount ? (
                      `Таньд ${lottoCount} хүрд эргүүлэх эрх байна`
                    ) : (
                      <span>Таньд 0 хүрд эргүүлэх эрх байна</span>
                    )}
                  </p>
                  <div className="bg-[#0028D7] text-white p-2 rounded-lg cursor-pointer" onClick={sentcode}>
                    Илгээх
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed top-0 z-[7] left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 z-[1] -translate-y-1/2">
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
          </div>
          <div className="bg-[white] p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="mt-2">{prize}</p>
            {prizeImage && <img src={prizeImage} alt={prize} className="mt-4 w-40" />}
            <button
              onClick={handleModalClose} // Close and reset state
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Хаах
            </button>
          </div>
        </div>
      )}

      {errorModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[white] p-6 rounded-lg w-80">
            <div className="error-message text-black text-[18px] font-semibold">{errorModal}</div>
          </div>
        </div>
      )}

      {loader && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}

      {/* <div className="fixed inset-0 z-[2] flex justify-center items-center">
        <div className="snowflakes" aria-hidden="true">
          <div className="snowflake">❅</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
        </div>
      </div> */}
    </div>
  );
}
