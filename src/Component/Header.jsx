import moonImg from "../assets/moon.svg";
import darkMoonImg from "../assets/dark-moon.svg";

export default function Header({ isDarkMode, darkModeToggle }) {
  const className = isDarkMode ? "bg-dark-blue" : "bg-white shadow-3xl";
  return (
    <header>
      <div className="container flex">
        <div
          id="header-wrapper"
          className={`flex container px-5 py-1 justify-between h-22 ${className}`}
        >
          <div className="header-title font-bold my-auto">
            Where in the world?
          </div>
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
