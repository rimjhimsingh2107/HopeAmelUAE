import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import SentimentalSection from "./components/SentimentalSection";
import DonationHighlight from "./components/DonationHighlight";
import Partners from "./components/Partners";
import Footer from "./components/Footer";
import About from "./components/About";

export default function App() {
  return (
    <div className="font-sans bg-[#F4F7FB] text-[#1F2937] min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4">
        <section className="mt-8">
          <Slideshow />
        </section>

        <section className="mt-16">
          <SentimentalSection />
        </section>
        <section className="mt-12 text-center">
  <div className="bg-[#D0E8F2] px-6 py-10 rounded-xl shadow-md max-w-xl mx-auto">
    <h2 className="text-2xl font-bold text-logoGreen mb-4">🛍️ Help Us Out With Essentials!</h2>
    <p className="text-[#374151] mb-6">
      You can support our mothers and children directly by purchasing items from our Amazon Wishlist 💛
    </p>
    <a
      href="https://www.amazon.ae/hz/wishlist/ls/1MELXQGWT91P1?ref_=wl_share"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-logoGreen text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition"
    >
      View Wishlist on Amazon
    </a>
  </div>
</section>

        <section className="mt-16">
          <DonationHighlight />
        </section>
        
        <section className="mt-16 mb-16">
          <Partners />
        </section>
      </main>

      <Footer />
    </div>
  );
}
