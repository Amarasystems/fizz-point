"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/contacts`
        );
        setContacts(response.data.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts.");
      }
    };
    fetchContacts();
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/protected/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Delete contact
  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/contacts/${selectedContact._id}`
      );
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== selectedContact._id)
      );
      setShowModal(false);
      setSelectedContact(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
      setError("Failed to delete contact.");
    }
  };

  // Loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="flex h-[100vh] bg-black justify-center items-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // Show no contacts message if the contact list is empty
  if (contacts.length === 0) {
    return <p>No contacts available.</p>;
  }

  return (
    <div className="flex flex-col items-center max-w-[1440px] m-auto">
      <h1 className="text-2xl mb-4">Contact List</h1>

      <div className="flex flex-wrap gap-4">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="relative mb-2 p-4 border rounded bg-gray-100"
          >
            <button
              onClick={() => {
                setSelectedContact(contact);
                setShowModal(true);
              }}
              className="absolute top-2 right-2 text-xl font-bold"
              title="Delete"
            >
              &times;
            </button>
            <p className="text-black font-bold">{contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Type: {contact.organizationCitizen}</p>
            <p>Location: {contact.location}</p>
            <p>Details: {contact.more}</p>
            <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>

      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedContact.name}</strong>?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedContact(null); // Reset selected contact on cancel
                }}
                className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteContact}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {dashboardData && (
        <div className="mt-8">
          <h2 className="text-xl mb-2">Dashboard Data</h2>
          <pre className="p-4 bg-gray-200 rounded">
            {JSON.stringify(dashboardData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
