import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMcontext } from "@/context/trendingcontext";
export default function Layout() {
const {fakeAuth}=useMcontext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const routes = [
    { path: "/", label: "Home" },
    { path: "/movies", label: "All Movies" },
    { path: "/tv", label: "All TV Series" },
  ];

  return (
    <nav className="bg-[#202E4B] text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Brand */}
          <div
            className="text-2xl font-bold text-yellow-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            CinemaView
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `font-medium hover:text-yellow-400 transition
                   ${isActive ? "underline decoration-yellow-400" : ""}`
                }
              >
                {route.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {fakeAuth ? (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/user")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 rounded-full border-2 border-yellow-400">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>

               
                <span className="font-medium">Profile</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-500 ease-out
          ${mobileMenuOpen ? "max-h-96" : "max-h-0"}
          ${mobileMenuOpen ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="bg-[#202E4B] px-4 pt-2 pb-4 space-y-2">

          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md font-medium transition
                 ${isActive
                   ? "bg-yellow-400 text-black"
                   : "text-white hover:bg-yellow-500 hover:text-black"}`
              }
            >
              {route.label}
            </NavLink>
          ))}

          {fakeAuth ? (
            <div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/user");
              }}
            >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 rounded-full border-2 border-yellow-400">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>
              <span>Profile</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full bg-yellow-400 text-black px-3 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="w-full border border-yellow-400 text-yellow-400 px-3 py-2 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
