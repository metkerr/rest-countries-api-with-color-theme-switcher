import moonImg from "../assets/moon.svg";
import darkMoonImg from "../assets/dark-moon.svg";
import { Link } from "react-router-dom";

export default function Header({ isDarkMode, darkModeToggle }) {
  const className = isDarkMode ? "bg-dark-blue" : "bg-white shadow-3xl";
  return (
    <header>
      <div className={`flex  ${className}`}>
        <div
          id="header-wrapper"
          className={`flex container mx-auto px-5 py-1 justify-between h-22 sm:px-0`}
        >
          <Link to="/" className="header-title font-bold my-auto sm:text-xl">
            Where in the world?
          </Link>
          <button
            className="dark-mode-switcher font-semibold flex"
            onClick={() => darkModeToggle()}
          >
            <span className="m-auto">
              <img
                src={isDarkMode ? darkMoonImg : moonImg}
                alt="dark mode icon"
                className={`w-3.5 mr-2.5 ${isDarkMode && "invert"}`}
              />
            </span>
            <span className="m-auto">Dark Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
}
