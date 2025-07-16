import { useState, useEffect } from "react";
import { testConnection, createDonation } from "../services/api.js";
import bear from "../assets/bear.gif";
import BackButton from "./ui/BackButton.jsx";

export default function Donation() {
  const [donation, setDonation] = useState({
    name: "",
    amount: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState({
    checking: true,
    connected: false,
    error: null
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await testConnection();
        setConnectionStatus({
          checking: false,
          connected: true,
          error: null
        });
      } catch (error) {
        setConnectionStatus({
          checking: false,
          connected: false,
          error: error.message
        });
        setError("Cannot connect to server. Please check if the backend server is running.");
      }
    };
    
    checkConnection();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation({ ...donation, [name]: value });
 
    setError("");
    setSuccessMessage("");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!connectionStatus.connected) {
      setError("Cannot connect to server. Please check if the backend server is running.");
      return;
    }
    

    if (!donation.name.trim()) {
      setError("Please provide your name.");
      return;
    }
    
    if (!donation.amount || parseFloat(donation.amount) <= 0) {
      setError("Please provide a valid donation amount.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const data = await createDonation({
        name: donation.name.trim(),
        amount: parseFloat(donation.amount),
        message: donation.message.trim()
      });
      
      if (data.url) {
     
        window.location.href = data.url;
      } else {
        setError("Failed to process donation. No checkout URL provided.");
      }
    } catch (err) {
      console.error("Donation error:", err);
      setError(err.message || "Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans text-[#1F2937] px-6 py-12 relative">
      {/* ... */}
      <BackButton />
      {/* ... */}
      {connectionStatus.checking ? (
        <div className="bg-blue-100 p-2 text-center text-blue-700 mb-4 rounded">
          Checking connection to server...
        </div>
      ) : connectionStatus.connected ? (
        <div className="bg-green-100 p-2 text-center text-green-700 mb-4 rounded">
          ✅ Connected to server
        </div>
      ) : (
        <div className="bg-red-100 p-2 text-center text-red-700 mb-4 rounded">
          ⚠️ Cannot connect to server: {connectionStatus.error}
          <br />
          <span className="text-sm">Please make sure the backend server is running on port 5000</span>
        </div>
      )}
      
      {/* ...*/}
      <section className="bg-[#FFF9DA] p-8 rounded-xl shadow-md max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#22577A] mb-2">Make a Difference 💛</h1>
        <p className="text-lg">
          Your donation helps single mothers in the UAE find strength, support, and hope.
        </p>
        <img src={bear} alt="bear cheer" className="mx-auto mt-4 w-24 rounded-full" />
      </section>

      {/* ... */}
      <section className="bg-white max-w-xl mx-auto p-6 rounded-xl shadow-lg space-y-5">
        <label className="block">
          <span className="block mb-1 font-medium text-logoGreen">Your Name</span>
          <input
            name="name"
            type="text"
            value={donation.name}
            onChange={handleChange}
            placeholder="A kind soul..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoGreen"
          />
        </label>

        <label className="block">
          <span className="block mb-1 font-medium text-logoGreen">Donation Amount (AED)</span>
          <input
            name="amount"
            type="number"
            value={donation.amount}
            onChange={handleChange}
            placeholder="e.g. 50"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoGreen"
          />
        </label>

        <label className="block">
          <span className="block mb-1 font-medium text-logoGreen">Message (optional)</span>
          <textarea
            name="message"
            value={donation.message}
            onChange={handleChange}
            rows="4"
            placeholder="Sending love and support 💛"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoGreen"
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-logoGreen text-white py-3 rounded-full font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Donate Now 💌"}
        </button>
        
        {/* ... */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {/* ...*/}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
      </section>

      {/* ... */}
      <section className="max-w-xl mx-auto mt-10 text-center text-[#374151] italic bg-[#E6F0F5] p-6 rounded-xl shadow-md">
        “No act of kindness, no matter how small, is ever wasted.”
      </section>
    </div>
  );
}
