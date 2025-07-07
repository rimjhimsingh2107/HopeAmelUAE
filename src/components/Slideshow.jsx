import { useEffect, useState } from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
const images = [image1, image2, image3, image4, image5, image6];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row gap-10 items-center justify-center px-6 md:px-20 py-16 bg-[#F9FAFB]">
      {/* Left: Slideshow */}
      <div className="md:w-1/2 w-full overflow-hidden rounded-xl shadow-lg h-[300px] bg-white flex items-center justify-center">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-full h-[300px] flex items-center justify-center bg-white">
              <img src={img} alt={`Slide ${i + 1}`} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Who Are We */}
      <div className="md:w-1/2 w-full bg-[#E6F0F5] p-6 rounded-xl shadow-md text-[#1F2937]">
        <h2 className="text-2xl font-bold text-[#22577A] mb-4">Who Are We?</h2>
        <p className="text-base leading-relaxed">
          <strong>Hope Amel - UAE</strong> is a small nonprofit started to support single mothers across the country. We focus on helping them feel seen, supported, and less alone. Whether its through donations, workshops, or simply being there when things get tough, our goal is to make sure these women have access to what they need to take care of their families and don’t have to face things alone. Everything we do is focused on making their day-to-day lives a little easier.
        </p>
      </div>
    </section>
  );
}
