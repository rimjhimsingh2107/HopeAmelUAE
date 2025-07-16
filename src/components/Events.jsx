import { useState, useEffect } from "react";
import { testConnection, joinEvent } from "../services/api.js";
import turtle from "../assets/turtle.gif";
import BackButton from "./ui/BackButton.jsx";

const events = Array.from({ length: 12 }).map((_, i) => ({
  title: [
    "🎉 Mompreneur Market",
    "🧘‍♀️ Self-Care Sunday",
    "📚 Storytime & Snacks",
    "🧵 Sewing for Smiles",
    "🛍️ Sustainable Swaps",
    "🎂 Birthday Bash for Kids",
    "🍲 Cooking Circle",
    "🎈 Play & Learn Picnic",
    "🧑‍🏫 Legal Aid Q&A",
    "🎭 Confidence Theatre",
    "🎨 Kids Craft Carnival",
    "🧠 Mental Wellness Workshop",
  ][i % 12],
  date: `2025 — ${i + 1}`,
  desc: `This is a fun and supportive event for mothers and families. We share, laugh, and grow together!`,
  color: ["#FFF9DA", "#E6F0F5", "#DEF6E3", "#FCE4EC"][i % 4],
}));

export default function Events() {
  const [joined, setJoined] = useState(Array(events.length).fill(false));
  const [dropdownVisible, setDropdownVisible] = useState(Array(events.length).fill(false));
  const [formData, setFormData] = useState({ name: "", email: "" });
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
      }
    };
    
    checkConnection();
  }, []);

  const toggleDropdown = (i) => {
    const copy = [...dropdownVisible];
    copy[i] = !copy[i];
    setDropdownVisible(copy);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (i) => {
    try {
      
      if (!formData.name || !formData.email) {
        alert("Please provide both name and email.");
        return;
      }
      
     
      if (!connectionStatus.connected) {
        alert("Cannot connect to server. Please check if the backend server is running.");
        return;
      }
      
      
      const eventId = `event-${i+1}`;
      
      console.log(`Joining event: ${eventId}`);
      console.log('Form data:', formData);
      
    
      const data = await joinEvent(eventId, formData);
      
 
      const copy = [...joined];
      copy[i] = true;
      setJoined(copy);
      toggleDropdown(i);
      setFormData({ name: "", email: "" });
      alert("You've successfully signed up for the event!");
      
    } catch (error) {
      console.error("Failed to join event:", error);
      alert(error.message || "Failed to join event. Please try again.");
    }
  };
  

  return (
    <div className="relative bg-[#F9FAFB] font-sans text-[#1F2937]">
      {/* ...*/}
      <BackButton />
      
      {/* ... */}
      <img src={turtle} className="hidden md:block fixed left-4 top-32 w-20 z-10 opacity-90" alt="turtle cheering" />
      <img src={turtle} className="hidden md:block fixed right-4 top-[60%] w-20 z-10 opacity-90" alt="turtle cheering" />
      <img src={turtle} className="hidden md:block fixed left-8 bottom-12 w-20 z-10 opacity-90" alt="turtle cheering" />

      {/* ... */}
      {connectionStatus.checking ? (
        <div className="bg-blue-100 p-2 text-center text-blue-700">
          Checking connection to server...
        </div>
      ) : connectionStatus.connected ? (
        <div className="bg-green-100 p-2 text-center text-green-700">
          ✅ Connected to server
        </div>
      ) : (
        <div className="bg-red-100 p-2 text-center text-red-700">
          ⚠️ Cannot connect to server: {connectionStatus.error}
          <br />
          <span className="text-sm">Please make sure the backend server is running on port 5000</span>
        </div>
      )}

      {/* ... */}
      <section className="bg-[#D0E8F2] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-logoGreen mb-2">Upcoming Events 🗓️</h1>
        <p className="text-lg text-[#374151]">
          Discover joyful gatherings, workshops, and community magic below!
        </p>
      </section>

      {/* ... */}
      <section className="max-w-5xl mx-auto py-16 px-4 space-y-8">
        {events.map((event, i) => (
          <div
            key={i}
            className="rounded-xl p-6 shadow-md transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: event.color }}
          >
            <h2 className="text-xl font-bold text-[#22577A] mb-1">{event.title}</h2>
            <p className="text-sm font-medium text-[#4B5563] mb-2">{event.date}</p>
            <p className="text-base text-[#1F2937] mb-4">{event.desc}</p>
            <button
              onClick={() => {
                if (!joined[i]) toggleDropdown(i);
              }}
              className={`${
                joined[i] ? "bg-logoGreen" : "bg-[#22577A]"
              } text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition`}
            >
              {joined[i] ? "You're In! 🎉" : "Interested"}
            </button>

            {/* ... */}
            {!joined[i] && dropdownVisible[i] && (
              <div className="mt-4 space-y-2">
                <input
                  name="name"
                  placeholder="Your name"
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="email"
                  placeholder="Your email"
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => handleSubmit(i)}
                  className="bg-logoGreen text-white px-4 py-2 rounded"
                >
                  Join Event
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
