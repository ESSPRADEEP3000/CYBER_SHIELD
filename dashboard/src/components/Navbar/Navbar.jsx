// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn) {
//       setIsMenuOpen(false);
//     }
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="fixed  left-0 right-0 bg-zinc-900 bg-opacity-90 backdrop-blur-lg  p-3 w-full z-50 ">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Brand Title with Glitch Animation */}
//         <h1 className="text-2xl font-bold text-[#00ff00] animate-glitch">
//           XAI CyberShield
//         </h1>

//         {/* Hamburger Menu Button (Visible on Mobile) */}
//         <div className="lg:hidden flex items-center">
//           <button
//             onClick={toggleMenu}
//             className="text-[#00ff00] hover:text-[#003300] focus:outline-none transition-colors duration-300"
//             aria-label="Toggle Menu"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="#00ff00"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <ul
//           className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#001100] lg:bg-transparent lg:flex lg:gap-6 lg:items-center transition-all duration-300 ${isMenuOpen ? "block" : "hidden"
//             }`}
//         >
//           <li>
//             <Link
//               to="/"
//               className="block px-4 py-2 text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg transition-colors duration-300 lg:inline"
//               onClick={closeMenu}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/sdk-setup"
//               className="block px-4 py-2 text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg transition-colors duration-300 lg:inline"
//               onClick={closeMenu}
//             >
//               SDK Integration
//             </Link>
//           </li>
//           {!isLoggedIn && (
//             <>
//               <li>
//                 <Link
//                   to="/login"
//                   className="block px-4 py-2 text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg transition-colors duration-300 lg:inline"
//                   onClick={closeMenu}
//                 >
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/signup"
//                   className="block px-4 py-2 text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg transition-colors duration-300 lg:inline"
//                   onClick={closeMenu}
//                 >
//                   Sign Up
//                 </Link>
//               </li>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <li>
//                 <Link
//                   to="/dashboard"
//                   className="block px-4 py-2 text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg transition-colors duration-300 lg:inline"
//                   onClick={closeMenu}
//                 >
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/settings"
//                   className="block px-4 py-2 text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg transition-colors duration-300 lg:inline"
//                   onClick={closeMenu}
//                 >
//                   Settings
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="relative block px-4 py-2 text-[#00ff00] bg-[#003300] rounded transition-colors duration-300 lg:inline lg:ml-4 hover:bg-[#00ff00] hover:text-[#003300] group"
//                 >
//                   Log Out
//                   <span className="absolute inset-0 w-full h-full flex items-center justify-center text-[#003300] transform scale-0 transition-transform duration-300">
//                     <span className="absolute w-1/2 h-1 bg-[#003300] transform rotate-45"></span>
//                     <span className="absolute w-1/2 h-1 bg-[#003300] transform -rotate-45"></span>
//                   </span>
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setIsMenuOpen(false);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Base and conditional classes for navigation links
  const linkClasses = "block px-4 py-2 transition-colors duration-300 lg:inline";
  const activeClasses = "bg-[#00ff00] text-[#003300] rounded-lg";
  const inactiveClasses = "text-[#00ff00] hover:text-[#003300] hover:bg-[#00ff00] hover:rounded-lg";

  return (
    <nav className="fixed left-0 right-0 bg-zinc-900 bg-opacity-90 backdrop-blur-lg p-3 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand Title with Glitch Animation */}
        <h1 className="text-2xl font-bold text-[#00ff00] animate-glitch">
          XAI CyberShield
        </h1>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-[#00ff00] hover:text-[#003300] focus:outline-none transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#00ff00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#001100] lg:bg-transparent lg:flex lg:gap-6 lg:items-center transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sdk-setup"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
              onClick={closeMenu}
            >
              SDK Integration
            </NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
                  }
                  onClick={closeMenu}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
                  }
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
                  }
                  onClick={closeMenu}
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="relative block px-4 py-2 text-[#00ff00] bg-[#003300] rounded transition-colors duration-300 lg:inline lg:ml-4 hover:bg-[#00ff00] hover:text-[#003300] group"
                >
                  Log Out
                  <span className="absolute inset-0 w-full h-full flex items-center justify-center text-[#003300] transform scale-0 transition-transform duration-300">
                    <span className="absolute w-1/2 h-1 bg-[#003300] transform rotate-45"></span>
                    <span className="absolute w-1/2 h-1 bg-[#003300] transform -rotate-45"></span>
                  </span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
