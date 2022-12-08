import searchImg from "../assets/search.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import numberFormat from "../utils/numberFormat";
import renderCapitals from "../utils/renderCapitals";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [isHidden, setIsHidden] = useState(true);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState();
  const [selectedRegion, setSelectedRegion] = useState();

  console.log(selectedRegion);

  useEffect(() => {
    let cancel = false;
    let apiUrl;
    if (search) {
      apiUrl = `https://restcountries.com/v3.1/name/${search}`;
    } else if (selectedRegion) {
      apiUrl = `https://restcountries.com/v3.1/region/${selectedRegion}`;
    } else {
      apiUrl = "https://restcountries.com/v3.1/all";
    }

    axios(apiUrl)
      .then((res) => {
        if (cancel) return;

        //searched countries filtered by region
        const countries =
          search && selectedRegion
            ? res.data.filter((country) => {
                return country.region === selectedRegion;
              })
            : res.data;

        setCountries(
          countries.slice(0, 30)
          // limit data
        );
      })
      .catch((err) => console.log(err));

    return () => (cancel = true);
  }, [search, selectedRegion]);

  const handleDropdown = () => {
    setIsHidden(!isHidden);
  };

  const CountryCard = ({ country }) => {
    if (country) {
      const { flags, name, population, region, capital = [] } = country;
      console.log(country);
      //CountryCard Component

      return (
        <Link to={`/details/${name?.common}`}>
          <div
            id="card-container"
            className="min-h-min bg-white rounded-md shadow-3xl pb-5 w-68 mx-auto mb-10"
          >
            <div id="c-flag">
              <img src={flags?.png} alt="c-flag" className="w-full" />
            </div>
            <div id="c-details" className="p-7">
              <h3 className="font-bold text-lg pb-4">{name.common}</h3>
              <p className="pb-1.5">
                <span className="font-semibold">Population: </span>
                {numberFormat(population)}
              </p>
              <p className="pb-1.5">
                <span className="font-semibold">Region: </span>
                {region}
              </p>
              <p>
                <span className="font-semibold">Capital: </span>
                {renderCapitals(capital)}
              </p>
            </div>
          </div>
        </Link>
      );
    }
  };

  return (
    <main className="min-h-screen">
      <div className="homepage-wrapper mx-5 my-7 flex flex-col">
        <div
          id="input-wrapper "
          className="py-1 px-5 shadow-3xl rounded-md bg-white flex"
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          id="dropdown-container"
          className="filter-wrapper my-10 bg-white shadow-3xl w-52 flex flex-col relative rounded-md"
        >
          <div
            className="dropdown-button flex justify-between p-4 cursor-pointer"
            onClick={handleDropdown}
          >
            <span>{selectedRegion || "Filter by Region"}</span>
            <span className="my-auto">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967Z"
                  fill="#030D45"
                />
              </svg>
            </span>
          </div>
          <div
            className={`dropdown-list absolute bg-white mt-14 w-52 shadow-3xl py-3 rounded-md ${
              isHidden && "hidden"
            }`}
          >
            <div
              className="px-4 py-1 active:font-semibold"
              onClick={() => setSelectedRegion("")}
            >
              All
            </div>
            <div
              className="px-4 py-1 active:font-semibold"
              onClick={() => setSelectedRegion("Africa")}
            >
              Africa
            </div>
            <div
              className="px-4 py-1 active:font-semibold"
              onClick={() => setSelectedRegion("Americas")}
            >
              America
            </div>
            <div
              className="px-4 py-1 active:font-semibold"
              onClick={() => setSelectedRegion("Asia")}
            >
              Asia
            </div>
            <div
              className="px-4 py-1 active:font-semibold"
              onClick={() => setSelectedRegion("Europe")}
            >
              Europe
            </div>
            <div
              className="px-4 py-1 active:font-semibold"
              onClick={() => setSelectedRegion("Oceania")}
            >
              Oceania
            </div>
          </div>
        </div>

        <section>
          {countries.map((country, index) => {
            return <CountryCard country={country} key={index} />;
          })}
        </section>
      </div>
    </main>
  );
}
