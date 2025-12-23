import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#28B8AE] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">gatePass.ai</h2>
          <p className="text-sm">
            Smart, secure & seamless entry management powered by AI.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.linkedin.com/company/gatepassai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 text-xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/GatePass_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 text-xl"
            >
              <SiX />
            </a>
            <a
              href="https://www.instagram.com/gatepass_ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@GatePassAI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 text-xl"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/gatepassai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300 text-xl"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-md font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300">
                Visitor Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300">
                Employee Pass
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition-colors duration-300">
                Access Control
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-md font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:gatepassai@gmail.com"
                className="hover:text-black transition-colors duration-300"
              >
                gatepassai@gmail.com
              </a>
            </li>
            <li>                               
              Phone:{" "}
              <a
                href="tel: +918050996382"
                className="hover:text-black transition-colors duration-300"
              >
                +91 8050996382
              </a>
            </li>
            <li>
              Address: 183/6, 4th floor, 
              <br />
              Above Sri Furniture Village,
              <br />
              Sarjapur Main Road, Dommsandra,
              <br />
              Bengaluru - 562125
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/30 py-4 text-center text-sm text-white">
        © {new Date().getFullYear()} gatePass.ai. All rights reserved.
      </div>
    </footer>
  );
}
