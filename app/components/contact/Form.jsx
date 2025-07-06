import { useRef, useState } from "react";
import { useLanguage } from "../../ChangeLanguegeProvider";
import axios from "axios";

export default function Form() {
  const { language } = useLanguage();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const entityTypeRef = useRef();
  const contactNameRef = useRef();
  const detailsRef = useRef();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearForm = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    entityTypeRef.current.value = "";
    contactNameRef.current.value = "";
    detailsRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      organizationCitizen: entityTypeRef.current.value,
      location: contactNameRef.current.value,
      more: detailsRef.current.value,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/contacts`,
        contactData
      );
      if (response.status === 201) {
        setSuccessMessage(
          language === "mn"
            ? "Амжилттай илгээгдлээ!"
            : "Contact created successfully!"
        );
        setErrorMessage("");
        clearForm();
      }
    } catch (error) {
      console.error("Error creating contact:", error.response || error.message);
      setErrorMessage(
        language === "mn"
          ? "Илгээхэд алдаа гарлаа."
          : "Failed to create contact."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col items-end max-md:items-center w-[40%] max-md:w-full">
      <form
        onSubmit={handleSubmit}
        className="text-[#707070] max-w-[400px] w-full flex flex-col gap-1"
      >
        <p>{language === "mn" ? "Овог нэр" : "Name"}</p>
        <input
          className="max-w-[400px] rounded-[10px] p-2 w-full mb-4 text-black"
          type="text"
          placeholder={
            language === "mn" ? "Баттулга Ууганбаяр" : "Battulga Uuganbayar"
          }
          ref={nameRef}
        />
        <p>{language === "mn" ? "Цахим шуудангийн хаяг" : "Email"}</p>
        <input
          className="max-w-[400px] rounded-[10px] p-2 w-full mb-4 text-black"
          type="email"
          placeholder={
            language === "mn" ? "Battulga123@gmail.com" : "example@gmail.com"
          }
          ref={emailRef}
        />
        <p>{language === "mn" ? "Утасны дугаар" : "Phone"}</p>
        <input
          className="max-w-[400px] rounded-[10px] p-2 w-full mb-4 text-black"
          type="tel"
          placeholder={language === "mn" ? "9911****" : "9911****"}
          ref={phoneRef}
        />
        <p>
          {language === "mn" ? "Байгуулага | Иргэн" : "Organization | Citizen"}
        </p>
        <select
          className="max-w-[400px] rounded-[10px] p-2 w-full mb-4 text-black"
          ref={entityTypeRef}
        >
          <option value="Citizen">
            {language === "mn" ? "Иргэн" : "Citizen"}
          </option>
          <option value="Organization">
            {language === "mn" ? "Байгуулага" : "Organization"}
          </option>
        </select>
        <p>{language === "mn" ? "Холбогдох газар" : "Relevant location"}</p>
        <input
          className="max-w-[400px] rounded-[10px] p-2 w-full mb-4 text-black"
          type="text"
          placeholder={
            language === "mn" ? "Маркетингийн газар" : "Marketing department"
          }
          ref={contactNameRef}
        />
        <p>
          {language === "mn"
            ? "Дэлгэрэнгүй / зорилго шалтгаан /"
            : "More / purpose and reason /"}
        </p>
        <textarea
          className="max-w-[400px] rounded-[10px] p-2 w-full mb-4 text-black"
          placeholder={
            language === "mn"
              ? "Хамтран ажиллах санал тавих"
              : "Offer to cooperate"
          }
          rows="4"
          ref={detailsRef}
        ></textarea>
        <button
          type="submit"
          className="bg-[#0125FF] rounded-[10px] max-w-[400px] w-full text-white px-4 py-2"
        >
          {language === "mn" ? "Илгээх" : "Submit"}
        </button>
      </form>

      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
}
