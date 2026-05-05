import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-lg font-semibold">
              Homer <span className="text-gray-400">See</span>
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Discover premium stays and book your perfect experience anywhere
              in the world.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-4">
              {[
                { Icon: FaFacebookF },
                { Icon: FaTwitter },
                { Icon: FaInstagram },
                { Icon: FaLinkedinIn },
              ].map(({ Icon }, i) => (
                <div
                  key={i}
                  className="cursor-pointer p-2 rounded-lg bg-gray-100 hover:bg-black hover:text-white transition"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["About", "Careers", "Blog", "Press"].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-black transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Help Center", "Contact", "FAQ", "Terms"].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-black transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Stay Updated</h3>
            <p className="text-sm text-gray-500 mb-3">
              Subscribe to get latest listings and updates.
            </p>

            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 w-full bg-transparent outline-none text-sm"
              />
              <button className="cursor-pointer bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} HomerSee. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-black">Privacy</span>
            <span className="cursor-pointer hover:text-black">Terms</span>
            <span className="cursor-pointer hover:text-black">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
