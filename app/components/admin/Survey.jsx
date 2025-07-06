"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Survey = () => {
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  // Unified form state
  const [form, setForm] = useState({
    type: "text-input",
    text: "",
    image: "",
    options: [""],
    minValue: 0,
    maxValue: 10,
  });

  const router = useRouter();

  const getSurveys = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/survey`
      );
      setSurveys(response.data.response);
    } catch (error) {
      console.error("Error fetching surveys:", error);
      setErrorMessage(
        "An error occurred while fetching surveys. Please try again."
      );
    }
  };

  const getSurveyQuestions = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/survey/${id}/questions`
      );
      setQuestions(response.data.response.questions);
      setSelectedSurveyId(id);
    } catch (error) {
      console.error("Error fetching survey questions:", error);
      setErrorMessage(
        "An error occurred while fetching questions. Please try again."
      );
    }
  };

  useEffect(() => {
    getSurveys();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addOption = () => {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      type: form.type,
      text: form.text,
      image: form.image,
      options: ["single-choice", "multiple-choice"].includes(form.type)
        ? form.options.filter(Boolean)
        : [],
      ...(form.type === "range-choice" && {
        min: parseInt(form.minValue),
        max: parseInt(form.maxValue),
      }),
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/survey/${selectedSurveyId}/questions`,
        questionData
      );

      // Reset form
      setForm({
        type: "text-input",
        text: "",
        image: "",
        options: [""],
        minValue: 0,
        maxValue: 10,
      });

      // Refresh questions
      getSurveyQuestions(selectedSurveyId);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Surveys</h1>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {Array.isArray(surveys) && surveys.length > 0 ? (
        surveys.map((survey) => (
          <div
            key={survey.id}
            onClick={() => getSurveyQuestions(survey.id)}
            className="mb-4 p-4 border rounded bg-gray-800 cursor-pointer hover:bg-gray-700"
          >
            <h2 className="text-xl font-bold">{survey.title}</h2>
            <p>{survey.description}</p>
            <p>Status: {survey.status}</p>
            <p>Points: {survey.point}</p>
            <p>ID: {survey.id}</p>
          </div>
        ))
      ) : (
        <p>No surveys found.</p>
      )}

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Survey Questions</h2>
          {questions.map((question) => (
            <div key={question.id} className="mb-4 p-4 bg-gray-700 rounded">
              <p className="font-medium">Question: {question.text}</p>
              <p className="text-sm text-gray-300">Type: {question.type}</p>
              {question.image && (
                <img
                  src={question.image}
                  alt="Question"
                  className="mt-2 rounded w-full max-w-md"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {selectedSurveyId && (
        <form onSubmit={handleSubmit} className="mt-8 p-4 bg-gray-900 rounded">
          <h2 className="text-xl font-semibold mb-4">Create New Question</h2>

          <div className="mb-4">
            <label className="block mb-1">Question Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleFormChange}
              className="w-full text-black p-2 rounded"
            >
              <option value="text-input">Text Input</option>
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="range-choice">Range</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Question Text</label>
            <input
              name="text"
              value={form.text}
              onChange={handleFormChange}
              className="w-full text-black p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Image URL (optional)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleFormChange}
              className="w-full text-black p-2 rounded"
            />
          </div>

          {["single-choice", "multiple-choice"].includes(form.type) && (
            <div className="mb-4">
              <label className="block mb-1">Options</label>
              {form.options.map((opt, idx) => (
                <input
                  key={idx}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="w-full text-black p-2 mb-2 rounded"
                />
              ))}
              <button
                type="button"
                onClick={addOption}
                className="text-blue-400 hover:underline"
              >
                + Add Option
              </button>
            </div>
          )}

          {form.type === "range-choice" && (
            <div className="mb-4">
              <label className="block mb-1">Min Value</label>
              <input
                type="number"
                name="minValue"
                value={form.minValue}
                onChange={handleFormChange}
                className="w-full text-black p-2 rounded"
              />
              <label className="block mt-2 mb-1">Max Value</label>
              <input
                type="number"
                name="maxValue"
                value={form.maxValue}
                onChange={handleFormChange}
                className="w-full text-black p-2 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Question
          </button>
        </form>
      )}
    </div>
  );
};

export default Survey;
