"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "@/app/components/admin/AdminNavbar";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  const lottery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/spinWon`
      );
      console.log(response.data);
      // Sort the data by date, most recent first
      const sortedData = response.data.response.sort((a, b) => {
        const dateA = new Date(a.data);
        const dateB = new Date(b.data);
        return dateB - dateA;
      });
      setData(sortedData);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    lottery();
  }, []);

  // Function to format date and time as YYYY/MM/DD HH:MM
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Adding leading zeros if needed for hours or minutes
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}/${month}/${day} ${formattedHours}:${formattedMinutes}`;
  };

  // Filter the data based on the search term
  const filteredData = data.filter((item) =>
    item.giftName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] m-auto">
      <AdminNavbar />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Input */}
      <div className="mt-4 mx-8 flex justify-center">
        <input 
          type="text"
          className="p-2 border rounded-lg"
          placeholder="Search by gift name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
        />
      </div>

      {/* Display data if available */}
      {!loading && !error && filteredData.length > 0 && (
        <div className="mt-4 mx-8">
          <h2 className="text-xl font-bold text-white">
            Users and Their Gifts
          </h2>
          <div className="mt-2 flex gap-3 flex-wrap">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg text-black"
              >
                <p>
                  <strong>Phone Number:</strong> {item.phoneNumber}
                </p>
                <p>
                  <strong>Gift:</strong> {item.giftName}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(item.data)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display a message if no data matches the search */}
      {!loading && !error && filteredData.length === 0 && (
        <p className="text-red-500 mt-4 px-8">
          No users found with the specified gift name.
        </p>
      )}
    </div>
  );
}
