"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import TermsService from "../loyalty/TermsService";

export default function Login({
  lottoCount,
  setLottoCount,
  setBell,
  phoneBtn,
  pointBtn,
  setPointBtn,
  setPhoneBtn,
}) {
  const [isPhoneModal, setIsPhoneModal] = useState(false);
  const [isOtpCheckModal, setIsOtpCheckModal] = useState(false);
  const [isCreatePasscodeModal, setIsCreatePasscodeModal] = useState(false);
  const [isLoginPasscodeModal, setIsLoginPasscodeModal] = useState(false);
  const [loginBtn, setLoginBtn] = useState(true);
  const [logOutBtn, setLogOutBtn] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorModal, setErrorModal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passCode, setPassCode] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loader, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [history, setHistory] = useState(false);

  // Single error state
  const [error, setError] = useState("");

  const openModal = () => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      setIsPhoneModal(false);
      setErrorModal("Та нэвтэрсэн байна.");
      setTimeout(() => setErrorModal(""), 2000);
    } else {
      setIsPhoneModal(true);
    }
  };

  const closeModal = () => {
    setIsPhoneModal(false);
  };
  const closeLoginModal = () => {
    setIsPhoneModal(false);
    setIsOtpCheckModal(false);
    setIsLoginPasscodeModal(false);
  };

  const loginOrSign = async () => {
    if (!phoneNumber || phoneNumber.length !== 8) {
      setError("Утасны дугаар оруулна уу.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/getOtp`,
        { phoneNumber }
      );
      if (response.data.title === "Phone number Duplicated") {
        setIsPhoneModal(false);
        setIsLoginPasscodeModal(true);
      }
      const code = response.data.code;
      if (code === 0) {
        setServiceModal(true);
        setIsPhoneModal(false);
      }
      setLoading(false);
      setError(""); // Reset error on success
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleService = () => {
    try {
      if (!isChecked) {
        setError("Та үргэлжлүүлэхийн тулд нөхцөл, болзлыг зөвшөөрөх ёстой.");
      } else {
        setError("");
        setServiceModal(false);
      }
      setIsOtpCheckModal(true);
    } catch (error) {}
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/checkOtp`,
        { phoneNumber, otp }
      );
      const OTP = response.data.title;
      if (OTP === "OTP code is wrong or expired.") {
        setError("Баталгаажуулах код буруу байна.");
      } else if (OTP === "Success") {
        setIsOtpCheckModal(false);
        setIsCreatePasscodeModal(true);
        setLoading(false);
        setError(""); // Reset error on success
      }
    } catch (err) {
      console.error("Error validating OTP:", err);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handlePasscodeSubmit = async () => {
    setLoading(true);
    if (!passCode || passCode.length !== 4) {
      setError("Please enter a valid 4-digit passcode.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/register`,
        { phoneNumber, passCode }
      );
      setIsCreatePasscodeModal(false);
      setIsLoginPasscodeModal(true);
      setPassCode("");
      setError(""); // Reset error on success
      setLoading(false);
    } catch (err) {
      console.error("Error creating passcode:", err);
      setError("Failed to create passcode. Please try again.");
    }
  };

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
        const phoneBtn = response.data.response.phoneNumber;
        const point = response.data.response.point;
        setPhoneBtn(phoneBtn);
        setPointBtn(point);
        setLottoCount(lottoCount);
      } else {
        console.log("No token found it");
      }
    } catch (error) {
      console.error("Error fetching lotto data:", error);
    }
  };

  useEffect(() => {
    checkLotto();
  }, []);

  const handleLoginSubmit = async () => {
    setPassCode("");
    // Validate passCode and phoneNumber
    if (!passCode || passCode.length !== 4) {
      setError("Please enter a valid 4-digit login passcode.");
      return;
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);

      // Make the API call to login
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/login`,
        { phoneNumber, passCode }
      );
      const res = response.data.title;
      if (res === "Passcode is wrong!") {
        setError("Нууц код буруу байна!");
      } else if (res === "Success") {
        setErrorModal("Та амжилттай нэвтэрлээ.");
        setTimeout(() => setErrorModal(""), 2000);
        setError(""); // Reset error message

        const access_token = response.data.response.access_token;
        const currentTime = new Date().getTime();
        const tokenExpiryTime = currentTime + 24 * 60 * 60 * 1000; // 1 day expiry

        // Store the token and expiry time in localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("token_expiry", tokenExpiryTime.toString());

        setIsLoginPasscodeModal(false);
        setIsOtpCheckModal(false);
        setIsPhoneModal(false);
        const LogOutCheck = () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            setLoginBtn(false);
            setLogOutBtn(true);
          }
        };
        LogOutCheck();
        // checkLotto();
        // Incorrect passcode response
      } else if (res === "Passcode is wrong!") {
        setError("Нууц үг буруу байна.");
      } else if (res === "Passcode must be exactly 4 digits.") {
        setError("Нууц үг буруу байна.");
      }
      setBell(true);
      setError(""); // Reset error on success
    } catch (err) {
      console.error("Error logging in:", err);
      if (err.response) {
        setError(
          `Login failed: ${err.response.data.message || "Please try again."}`
        );
      } else {
        setError(
          "Failed to login. Please check your internet connection and try again."
        );
      }
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const checkTokenExpiration = () => {
    const currentTime = new Date().getTime();
    const tokenExpiryTime = localStorage.getItem("token_expiry");
    if (tokenExpiryTime && currentTime > parseInt(tokenExpiryTime)) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expiry");
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const LogOut = () => {
    setModal(false);
    localStorage.removeItem("access_token");
    window.location.reload();
  };
  const LogOutCheck = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setLoginBtn(false);
      setLogOutBtn(true);
    }
  };
  const hanldeProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        return;
      }
      if (token) {
        setBell(true);
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/giftList`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responseData = response.data.response;      
      setData(responseData);
      setHistory(true); // Show the modal
    } catch (error) {
      console.error("Error during API call", error);
    }
    setModal(true);
  };

  useEffect(() => {
    LogOutCheck();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Combine full date (year, month, day) with time in 24-hour format
    return `${date
      .toLocaleDateString("en-GB", {
        year: "numeric", // Full year (e.g., 2024)
        month: "2-digit", // Month in 2 digits (e.g., 12 for December)
        day: "2-digit", // Day of the month in 2 digits (e.g., 24)
      })
      .split("/")
      .reverse()
      .join("/")} ${date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    })}`;
  };
  const close = () => {
    setModal(false);
  };
  return (
    <div className="flex items-center">
      <TermsService
        serviceModal={serviceModal}
        setServiceModal={setServiceModal}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleService={handleService}
        error={error}
        setError={setError}
      />
      {modal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black login-shadow p-6 text-black rounded-md">
            <div className="bg-black p-6 rounded-lg w-full max-h-[500px] max-w-[500px] overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-white">
                    Бэлгийн жагсаалт
                  </h2>
                  <p className="text-white font-semibold">
                    Таны оноо: {pointBtn}
                  </p>
                </div>
                <p
                  onClick={close}
                  className="bg-blue-500 rounded text-white p-1 cursor-pointer"
                >
                  Хаах
                </p>
              </div>
              <div className="border-[2px] rounded-md">
                <div className="space-y-4 overflow-y-auto max-h-[370px] text-white">
                  {/* Render gift items dynamically */}
                  {data && data.length > 0 ? (
                    data
                      .slice() // Create a shallow copy of the array to avoid mutating the original array
                      .reverse() // Reverse the array to show the latest items first
                      .map((item, index) => (
                        <div key={index} className="p-4 border-b">
                          <h3 className="font-medium">
                            Бэлэг: {item.giftName}
                          </h3>
                          <p>Огноо: {formatDate(item.createdAt)}</p>
                        </div>
                      ))
                  ) : (
                    <p>No gifts found.</p>
                  )}
                </div>
              </div>
              <div
                onClick={LogOut}
                className="bg-[red] rounded-sm p-1 font-semibold mt-2 cursor-pointer text-white text-center"
              >
                Системээс гарах
              </div>
            </div>
          </div>
        </div>
      )}
      {loginBtn && (
        <div
          className="p-1 bg-blue-500 rounded cursor-pointer"
          onClick={openModal}
        >
          Нэвтрэх
        </div>
      )}
      {logOutBtn && (
        <div
          onClick={hanldeProfile}
          className="p-2 gap-1 flex items-center cursor-pointer bg-[#0025FF] rounded-[20px] transition duration-500 hover:bg-[#0025F0] shadow-2xl"
        >
          <img
            className="w-[20px] h-[20px]"
            src="/loyalty/profile.png"
            alt=""
          />
          <p>{phoneBtn}</p>
          <img className="w-[10px] h-[10px]" src="/loyalty/arrow.png" alt="" />
        </div>
      )}
      {errorModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[white] p-6 rounded-lg w-80">
            <div className="error-message text-black text-[18px] font-semibold">
              {errorModal}
            </div>
          </div>
        </div>
      )}
      {/* Phone Modal */}
      {isPhoneModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1b1b1b] p-6 rounded-lg w-80 login-shadow">
            <h2 className="text-xl mb-4 text-white">Утасны дугаар</h2>
            <input
              type="tel"
              placeholder="Утасны дугаар"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 bg-white text-black p-2 w-full rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-[black] rounded w-[50%]"
                onClick={closeModal}
              >
                Хаах
              </button>
              <button
                onClick={loginOrSign}
                className="px-4 py-2 bg-blue-500 text-white w-[50%] rounded"
              >
                Нэвтрэх
              </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          {loader && (
            <div className="absolute inset-0 flex justify-center items-center bg-[black] bg-opacity-50">
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
        </div>
      )}

      {/* OTP Verification Modal */}
      {isOtpCheckModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1b1b1b] login-shadow p-6 rounded-lg w-80">
            <h2 className="text-xl mb-4 text-white text-[14px]">
              Баталгаажуулах код
            </h2>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ width: "40px" }}></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="border-[1px] text-center mb-4 rounded-[4px] text-black border-black"
                  type="text"
                  inputMode="numeric"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              )}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-[black] rounded w-[50%]"
                onClick={() => setIsOtpCheckModal(false)}
              >
                Хаах
              </button>
              <button
                onClick={handleOtpSubmit}
                disabled={!otp || otp.length !== 6}
                className="px-4 py-2 bg-blue-500 text-white w-[50%] text-[14px] rounded"
              >
                Баталгаажуулах
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}

      {/* Create Passcode Modal */}
      {isCreatePasscodeModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1b1b1b] login-shadow flex flex-col  p-6 rounded-lg w-80">
            <h2 className="text-[19px] mb-4 text-white">
              Нэвтрэх пин кодоо үүсгээрэй{" "}
            </h2>
            <OtpInput
              value={passCode}
              onChange={setPassCode}
              numInputs={4}
              renderSeparator={<span style={{ width: "40px" }}></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="border-[1px] text-center mb-4 rounded-[4px] text-black border-black"
                  type="text"
                  inputMode="numeric"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              )}
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-[black] rounded w-[50%]"
                onClick={() => setIsCreatePasscodeModal(false)}
              >
                Хаах
              </button>
              <button
                onClick={handlePasscodeSubmit}
                disabled={!passCode || passCode.length !== 4}
                className="px-4 py-2 bg-blue-500 text-white w-[50%] rounded"
              >
                Бүртгүүлэх
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          {loader && (
            <div className="absolute z-[50] inset-0 flex justify-center items-center bg-black bg-opacity-50">
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
        </div>
      )}

      {/* Login Passcode Modal */}
      {isLoginPasscodeModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1b1b1b] login-shadow p-6 rounded-lg w-80">
            <h2 className="text-[19px] mb-4 text-white">
              Дахин пин кодоо оруулна уу ?
            </h2>
            <OtpInput
              value={passCode}
              onChange={setPassCode}
              numInputs={4}
              renderSeparator={<span style={{ width: "40px" }}></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="border-[1px] text-center mb-4 rounded-[4px] text-black border-black"
                  type="text"
                  inputMode="numeric"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              )}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-[black] rounded w-[50%]"
                onClick={closeLoginModal}
              >
                Хаах
              </button>
              <button
                onClick={handleLoginSubmit}
                disabled={!passCode || passCode.length !== 4}
                className="px-4 py-2 bg-blue-500 text-white w-[50%] rounded"
              >
                Нэвтрэх
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          {loader && (
            <div className="absolute inset-0  z-[50] flex justify-center items-center bg-black bg-opacity-50">
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
        </div>
      )}
    </div>
  );
}
