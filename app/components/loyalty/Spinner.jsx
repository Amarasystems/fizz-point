import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Spinner() {
  const circleRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [prizeImage, setPrizeImage] = useState("");
  const [prize, setPrize] = useState("");
  const [code, setCode] = useState("");
  const [errorModal, setErrorModal] = useState("");
  const [lottoCount, setLottoCount] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedRotation = localStorage.getItem("totalRotation");
    const savedIsSpinning = localStorage.getItem("isSpinning");

    if (savedRotation) {
      setTotalRotation(Number(savedRotation));
    }
    if (savedIsSpinning) {
      setIsSpinning(savedIsSpinning === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("totalRotation", totalRotation);
    localStorage.setItem("isSpinning", isSpinning);
  }, [totalRotation, isSpinning]);

  const checkLotto = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        console.log("token not found");
      } else if (access_token) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
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

  const checkToken = async () => {
    const access_token = localStorage.getItem("access_token");
    if (isSpinning || loader) return;
    if (!access_token) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
      return;
    }
    setLoader(true);
    try {
      if (lottoCount === 0) {
        setErrorModal("Таньд хүрд эргүүлэх эрх байхгүй байна.");
        setTimeout(() => setErrorModal(null), 2000);
        return;
      }
      setIsSpinning(true);
      const spinResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/gift/spin`,
        {},
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const giftName = spinResponse.data.response.name;
      const prizeDetails = getPrizeDetails(giftName);
      setPrize(prizeDetails.prizeName);
      setPrizeImage(prizeDetails.imageUrl);
      setTotalRotation(prizeDetails.deg);
      setTimeout(() => {
        setModal(true);
        setIsSpinning(false);
      }, 3000);

      setTimeout(() => {
        setModal(false);
        setTotalRotation(0);
      }, 5000);
    } catch (error) {
      setErrorModal("Та эхлээд нэвтэрнэ үү.");
      setTimeout(() => setErrorModal(""), 2000);
    } finally {
      setLoader(false);
    }
  };

  const getPrizeDetails = (giftName) => {
    const prizeData = new Map([
      [
        "Thank you",
        {
          prizeName: "Баярлалаа дахин оролдоно уу.",
          deg: 1290,
          imageUrl:
            "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/uag5okqqmurnht3vvcgu.png",
        },
      ],
      [
        "Samsung 55 inch TV",
        {
          prizeName: "Samsung 55 inch TV",
          deg: 1410,
          imageUrl:
            "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/cgwm4da6fgf1kz5ifhec.png",
        },
      ],
      [
        "Apple Watch",
        {
          prizeName: "Apple Watch",
          deg: 1230,
          imageUrl:
            "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/vbi9xqlr4qtlfuponkwk.png",
        },
      ],
      [
        "AirPods Max",
        {
          prizeName: "AirPods Max",
          deg: 1170,
          imageUrl:
            "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/vjsyh8fmvgfusxni8yrh.png",
        },
      ],
      [
        "Dyson V15",
        {
          prizeName: "Dyson V15",
          deg: 1350,
          imageUrl:
            "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739711/pepsi/fv6ukozvzvvs9msi5pcw.png",
        },
      ],
      [
        "iPhone 16 Pro Max",
        {
          prizeName: "iPhone 16 Pro Max",
          deg: 1110,
          imageUrl:
            "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/w5jvzckdnxbbqm6v3bdz.png",
        },
      ],
    ]);

    return (
      prizeData.get(giftName) || {
        prizeName: "Unknown",
        deg: 1290,
        imageUrl:
          "https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/uag5okqqmurnht3vvcgu.png",
      }
    );
  };

  const spinnerStyle = {
    transform: `rotate(${totalRotation}deg)`,
    transition: isSpinning ? "transform 3s ease-out" : "none",
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
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
    } catch (error) {
      console.error("Error sending code:", error);
      setErrorModal("Та эхлээд нэвтэрнэ үү.");
      setTimeout(() => {
        setErrorModal("");
      }, 2000);
      setLoader(false);
    }
  };

  return (
    <div className="max-w-[1440px] m-auto">
      {loginError && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <p className="text-[18px] font-semibold">Та эхлээд нэвтэрнэ үү..</p>
          </div>
        </div>
      )}
      {errorModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <div className="error-message text-black text-[18px] font-semibold">
              {errorModal}
            </div>
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
      <div className="max-w-[1350px] m-auto px-4 mb-[30px] pt-4 flex items-center rounded-lg qrlinear">
        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 text-center text-[20px] rounded-lg w-80">
              <div className="flex flex-col gap-2">
                <p>{`${prize}`}</p>
                <img
                  src={prizeImage}
                  alt={prize}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="qrlinear max-w-[1350px] w-full flex justify-around p-6 max-sm:p-0 max-sm:pb-3 rounded-2xl">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Input Fields */}
            <div className="">
              <p className="text-[#0028D7]">Бөглөөний код</p>
              <input
                value={code}
                onChange={handleCodeChange}
                placeholder="XXXX XXXX"
                className="rounded-[10px] mt-2 p-1 max-w-[300px] w-full border-[2px] border-solid border-[#0028D7]"
                type="text"
              />
              <div
                className="gradient-div rounded-[10px] max-w-[300px] w-full p-1 text-white mt-2 text-center cursor-pointer"
                onClick={sentcode}
              >
                ИЛГЭЭХ
              </div>
              <div className="mt-3">
                {/* <p> Таньд {lottoCount} хүрд эргүүлэх эрх байна</p> */}
                <p>
                  {lottoCount ? (
                    `Таньд ${lottoCount} хүрд эргүүлэх эрх байна`
                  ) : (
                    <span>Таньд 0 хүрд эргүүлэх эрх байна</span> // Optional message for when there's no lottoCount
                  )}
                </p>
              </div>
            </div>

            {/* Spin Button and Spinner */}
            <div className="w-[360px] max-sm:w-[320px] flex flex-col items-center">
              <div className="arrow"></div>
              <div className="spin-container flex flex-col gap-4">
                <div onClick={checkToken} className="spinImg cursor-pointer">
                  <img
                    className="w-[100px] h-[100px]"
                    src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732096336/pepsi/photos/cyepjp0jjfz3uontdjnt.png"
                    alt="spin button"
                  />
                </div>
                <div
                  ref={circleRef}
                  className="circle max-sm:w-[300px] max-sm:h-[300px]"
                  style={spinnerStyle}
                >
                  <div style={{ "--n": 0 }}>
                    <img
                      src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732739711/pepsi/fv6ukozvzvvs9msi5pcw.png"
                      alt="slot 1"
                    />
                  </div>
                  <div style={{ "--n": 1 }}>
                    <img
                      src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/uag5okqqmurnht3vvcgu.png"
                      alt=""
                    />
                  </div>
                  <div style={{ "--n": 2 }}>
                    <img
                      src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/vbi9xqlr4qtlfuponkwk.png"
                      alt=""
                    />
                  </div>

                  <div style={{ "--n": 3 }}>
                    <img
                      src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/vjsyh8fmvgfusxni8yrh.png"
                      alt=""
                    />
                  </div>
                  <div style={{ "--n": 4 }}>
                    <img
                      src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/w5jvzckdnxbbqm6v3bdz.png"
                      alt=""
                    />
                  </div>
                  <div style={{ "--n": 5 }}>
                    <img
                      src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732739712/pepsi/cgwm4da6fgf1kz5ifhec.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Image */}
          <img
            className="max-lg:hidden w-[600px]"
            src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732743835/pepsi/fgdw5hqk2kygp24zs4id.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
