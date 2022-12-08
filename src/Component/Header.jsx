import moonImg from "../assets/moon.svg";

export default function Header() {
  return (
    <header>
      <div className="container flex">
        <div
          id="header-wrapper"
          className="flex container px-5 py-1 justify-between shadow-3xl h-22"
        >
          <div className="header-title font-bold my-auto">
            Where in the world?
          </div>
          <button className="dark-mode-switcher font-semibold flex">
            <span className="m-auto">
              <img
                src={moonImg}
                alt="dark mode icon"
                className="w-3.5 mr-2.5"
              />
            </span>
            <span className="m-auto">Dark Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
}
