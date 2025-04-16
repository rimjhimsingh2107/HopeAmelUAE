import { useState } from "react";
import bunny from "../assets/bunny.gif";
import turtle from "../assets/turtle.gif";
import bear from "../assets/bear.gif";

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

  const handleJoin = (i) => {
    const updated = [...joined];
    updated[i] = !updated[i];
    setJoined(updated);
  };

  return (
    <div className="relative bg-[#F9FAFB] font-sans text-[#1F2937]">
      {/* Floating cheering animals */}
        <img src={turtle} className="hidden md:block fixed left-4 top-32 w-20 z-10 opacity-90" alt="turtle cheering" />
        <img src={turtle} className="hidden md:block fixed right-4 top-[60%] w-20 z-10 opacity-90" alt="turtle cheering" />
        <img src={turtle} className="hidden md:block fixed left-8 bottom-12 w-20 z-10 opacity-90" alt="turtle cheering" />

      {/* Header */}
      <section className="bg-[#D0E8F2] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-logoGreen mb-2">Upcoming Events 🗓️</h1>
        <p className="text-lg text-[#374151]">
          Discover joyful gatherings, workshops, and community magic below!
        </p>
      </section>

      {/* Scrollable list of events */}
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
              onClick={() => handleJoin(i)}
              className={`${
                joined[i] ? "bg-logoGreen" : "bg-[#22577A]"
              } text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition`}
            >
              {joined[i] ? "You're In! 🎉" : "Join Event"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
