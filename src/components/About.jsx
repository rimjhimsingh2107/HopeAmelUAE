import { useState, useEffect } from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import { Link } from "react-router-dom";
import BackButton from "./ui/BackButton.jsx";

const images = [image1, image2, image3, image4, image5, image6];

export default function About() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F4F7FB] min-h-screen font-sans text-[#1F2937]">
      {/* Back Button */}
      <BackButton />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-[#D0E8F2] to-[#F7E46C] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-logoGreen mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto">
          “When you uplift a mother, you uplift a family. When you uplift a family, you uplift a community.”
        </p>
      </section>

      {/* Slideshow */}
      {/* View Our Story Button */}
{/* View Our Story Button */}
{/* Sentimental Story Section */}
<section className="max-w-5xl mx-auto mt-12 px-4">
  <div className="bg-[#E6F0F5] rounded-xl shadow-md p-8 text-center">
    <h2 className="text-2xl font-bold text-logoGreen mb-3">💬 Our Story</h2>
    <p className="text-lg italic text-[#374151] max-w-2xl mx-auto mb-6">
      “What started as a personal tragedy grew into a movement of hope — a safe space for mothers who feel forgotten.”
    </p>
    <a
      href="https://gulfnews.com/uae/people/video-tragedy-drives-canadian-expat-to-launch-support-group-for-young-mothers-in-dubai-1.101204450"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-logoGreen text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition"
    >
      Read the Full Story 🌿
    </a>
  </div>
</section>



<section className="max-w-5xl mx-auto mt-12 px-4">
        <div className="overflow-hidden rounded-xl shadow-md h-[350px]">
          <div
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >

            {images.map((img, i) => (
              <div
                key={i}
                className="w-full h-[350px] flex items-center justify-center bg-white"
              >
                <img src={img} alt={`Slide ${i}`} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-logoGreen mb-4">Who We Are</h2>
          <p className="text-lg mb-4 leading-relaxed">
            <strong>Hope Amel – UAE</strong> is a nonprofit initiative founded with the goal of supporting and empowering single mothers
            across the United Arab Emirates. Our organization stands for compassion, resilience, and opportunity.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            We believe that no mother should face parenthood alone. Through generous donations and passionate volunteers,
            Hope Amel facilitates educational programs, provides essential supplies, and connects mothers to life-changing support.
          </p>
          <p className="text-lg leading-relaxed">
            The word "Amel" means hope — and that’s what we’re here to spread. Every act of kindness matters.
          </p>
        </div>
      </section>

      {/* Mission Highlights */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold text-center text-logoGreen mb-6">Our Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#E6F0F5] p-6 rounded-xl text-center shadow-md">
            <h3 className="font-bold text-lg mb-2">Empowerment</h3>
            <p className="text-sm">Workshops, skill building, and educational sessions for mothers.</p>
          </div>
          <div className="bg-[#FFF9DA] p-6 rounded-xl text-center shadow-md">
            <h3 className="font-bold text-lg mb-2">Support</h3>
            <p className="text-sm">Emergency aid, care packages, and housing assistance programs.</p>
          </div>
          <div className="bg-[#DEF6E3] p-6 rounded-xl text-center shadow-md">
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-sm">Events and local partnerships to help mothers feel seen and supported.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-20 text-center bg-[#F7E46C] py-12">
        <h2 className="text-2xl font-bold text-[#22577A] mb-3">Join Us in Making a Difference</h2>
        <Link
  to="/donate"
  className="inline-block bg-logoGreen text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition"
>
  Donate Now
</Link>

      </section>
    </div>
  );
}
