
"use client";

import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login"); 
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background animated image */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/society-bg.mp4" type="video/mp4" /> 
        
      </video>

   

      {/* Center button */}
      <button
        onClick={handleClick}
        className="relative z-10 px-8 py-4 text-xl font-semibold text-white bg-indigo-600 rounded-2xl shadow-lg hover:bg-indigo-700 transition duration-300"
      >
        Your Community Login Portal
      </button>
    </div>
  );
}
