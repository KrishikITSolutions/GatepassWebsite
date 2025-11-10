"use client";
import Image from "next/image";
import Footer from "@/components/footer";
import brochureFront from "../assets/gp2.png";
import brochureBack from "../assets/gp1.png";
import Header from "@/components/header";
import buildings from "../assets/buildings.png";

//  Just use the image path (no <source />)
// const BACKGROUND_IMAGE = "/gplogo.png"; // Place your image in /public/gplogo.png

export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover bg-no-repeat relative text-gray-900"
      // style={{
      //   backgroundImage: `url(${BACKGROUND_IMAGE})`,
      // }}
       style={{
        backgroundImage: `url(${buildings.src})`, //  imported image used here
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-12 max-w-7xl mx-auto text-white">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-8 bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="text-[#28B8AE]">AI</span>-powered Community <br /> Management System
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-md mx-auto md:mx-0 leading-relaxed">
            Elevate your living with next-gen{" "}
            <span className="text-[#28B8AE] font-semibold">security</span> and{" "}
            <span className="text-[#28B8AE] font-semibold">automation</span>.
          </p>

          <button className="px-8 py-3 bg-[#28B8AE] text-white text-lg font-semibold rounded-full shadow-md hover:bg-[#239b96] transition-all duration-300 hover:scale-105">
             Start Creating Free
          </button>
        </div>

        {/* Right Section - Brochures */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-center">
          <div className="relative group w-full max-w-md transition-all duration-500 hover:scale-[1.03]">
            <Image
              src={brochureBack}
              alt="Frontend Brochure"
              width={500}
              height={500}
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl"></div>
          </div>

          <div className="relative group w-full max-w-md transition-all duration-500 hover:scale-[1.03]">
            <Image
              src={brochureFront}
              alt="Backend Brochure"
              width={500}
              height={500}
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/*  Compact Video Section */}
      <section className="relative z-10 px-6 md:px-20 py-12 flex justify-center">
        <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:scale-[1.02] transition-all duration-500">
          <iframe
            className="w-full h-[220px] md:h-[300px]"
            src="https://www.youtube.com/embed/_fROb_OlKbc"
            title="AI-Powered Society Management"
            
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

       {/* === Footer (outside overlay) === */}
      <div className="relative z-20 bg-black/80 text-white">
        <Footer />
        </div>
    </div>
      
  );
}
