"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/user/all`
        );
        if (response.data && response.data.response) {
          setUsers(response.data.response);
          setFilteredUsers(response.data.response);
        } else {
          setError("No users found in response");
        }
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.phoneNumber.toLowerCase().includes(query) ||
        user.lottoCount.toString().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const exportToExcel = () => {
    const dataToExport = users.map((user) => ({
      Phone: user.phoneNumber,
      "Lotto Count": user.lottoCount,
      Point: user.point,
      Email: user.email,
      "First Name": user.firstName,
      Sex: user.sex,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "users.xlsx");
  };

  return (
    <div className="max-w-[1440px] m-auto">
      <AdminNavbar />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search input and download */}
      <div className="mt-4 flex justify-center gap-4 items-center">
        <p className="text-white text-[20px]">Total Users: {users.length}</p>
        <input
          type="text"
          className="p-2 border rounded-lg"
          placeholder="Search by phone number or lotto count"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Download Excel
        </button>
      </div>

      {/* User list */}
      <div>
        {filteredUsers.length > 0 && (
          <div className="mt-4 flex justify-center">
            <div className="list-disc pl-5 mt-2 text-black flex flex-wrap gap-6">
              {filteredUsers.map((user, index) => (
                <div className="bg-gray-200 p-2 rounded-lg" key={index}>
                  <p>
                    <strong>#{index + 1}</strong>
                  </p>
                  <p>
                    <strong>id:</strong> {user.id}
                  </p>
                  <p>
                    <strong>firstName:</strong> {user.firstName}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {user.phoneNumber}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Lotto count:</strong> {user.lottoCount}
                  </p>
                  <p>
                    <strong>Point:</strong> {user.point}
                  </p>
                  <p>
                    <strong>sex:</strong> {user.sex}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
