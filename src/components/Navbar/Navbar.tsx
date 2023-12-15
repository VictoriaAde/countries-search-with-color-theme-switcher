import React, { useEffect } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";

import "./Navbar.css";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`top_nav ${isDarkMode ? "dark-mode" : ""}`}>
      <div>
        <h1>Where in the world?</h1>
      </div>
      <div>
        <span onClick={toggleDarkMode}>
          {isDarkMode ? <MdOutlineWbSunny /> : <IoMdMoon />}
          {isDarkMode ? "Light mode" : "Dark mode"}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
