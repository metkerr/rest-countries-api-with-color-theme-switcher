import searchImg from "../assets/search.svg";

export default function Homepage() {
  return (
    <main className="min-h-screen">
      <div className="homepage-wrapper mx-5 my-7 flex flex-col">
        <div
          id="input-wrapper "
          className="py-1 px-5 shadow-md rounded-md bg-white flex"
        >
          <span className="m-auto w-14">
            <img
              src={searchImg}
              alt="search icon"
              className="w-4.5 mx-auto opacity-40"
            />
          </span>
          <input
            type="search"
            placeholder="Search for a country..."
            className="p-3 grow"
          />
        </div>
        <div className="filter-wrapper my-10 bg-white shadow-md w-52 flex rounded-md">
          <select className="py-5 px-1 font-semibold mx-auto w-40 focus:rounded-md">
            <option value="none" selected hidden>
              Filter by Region
            </option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
    </main>
  );
}
