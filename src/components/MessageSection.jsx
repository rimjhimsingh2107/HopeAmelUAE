import { Link } from "react-router-dom";

export default function MessageSection() {
  return (
    <section className="bg-[#FFE066] rounded-xl shadow-md py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-[#22577A] mb-4">
        Every Donation Counts ❤️
      </h2>
      <p className="text-lg max-w-2xl mx-auto text-[#22577A]">
        Your support brings hope, stability, and opportunity to single mothers across the UAE.
      </p>
      <Link
        to="/donate"
        className="inline-block mt-6 bg-[#22577A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1a4764] transition"
      >
        Donate Now
      </Link>
    </section>
  );
}
