import { useState } from "react";
import bear from "../assets/bear.gif"; // optional cheer gif

export default function Donation() {
  const [donation, setDonation] = useState({
    name: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation({ ...donation, [name]: value });
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans text-[#1F2937] px-6 py-12 relative">
      {/* Header */}
      <section className="bg-[#FFF9DA] p-8 rounded-xl shadow-md max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#22577A] mb-2">Make a Difference 💛</h1>
        <p className="text-lg">
          Your donation helps single mothers in the UAE find strength, support, and hope.
        </p>
        <img src={bear} alt="bear cheer" className="mx-auto mt-4 w-24 rounded-full" />
      </section>

      {/* Donation Form */}
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
          className="w-full bg-logoGreen text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Donate Now 💌
        </button>
      </section>

      {/* Motivational Quote Card */}
      <section className="max-w-xl mx-auto mt-10 text-center text-[#374151] italic bg-[#E6F0F5] p-6 rounded-xl shadow-md">
        “No act of kindness, no matter how small, is ever wasted.”
      </section>
    </div>
  );
}
