"use client"
import Image from 'next/image';
import Footer from '@/components/footer';
import brochureFront from "../assets/gp2.png"
import brochureBack from "../assets/gp1.png"
import Header from '@/components/header';

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="px-4 md:px-20 flex flex-col md:flex-row items-start justify-between py-16 gap-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-green-800">AI</span>-powered community management system
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Where Community Safety Meets Artificial Intelligence
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md text-lg shadow hover:bg-indigo-700">
            Start creating free
          </button>

          {/* YouTube Embed video updated!*/}
          
          <div className="mt-10 flex justify-center md:justify-start w-full">
  <div className="relative w-full pb-[56.25%] rounded-lg shadow-md overflow-hidden max-w-xl">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/_fROb_OlKbc"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>



        </div>

        {/* Right Side - Brochure Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <Image
            src={brochureBack}
            alt="Frontend Brochure"
            width={500}
            height={500}
            className="rounded-lg shadow-md w-full object-contain"
          />
          <Image
            src={brochureFront}
            alt="Backend Brochure"
            width={500}
            height={500}
            className="rounded-lg shadow-md w-full object-contain"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
