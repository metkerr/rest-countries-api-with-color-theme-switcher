import searchImg from "../assets/search.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import numberFormat from "../utils/numberFormat";
import renderCapitals from "../utils/renderCapitals";
import { Link } from "react-router-dom";

export default function Homepage({ isDarkMode }) {
  const [isHidden, setIsHidden] = useState(true);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState();
  const [selectedRegion, setSelectedRegion] = useState();

  // console.log(selectedRegion);

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
          countries.slice(0, 28)
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
      // console.log(country);
      //CountryCard Component

      return (
        <Link to={`/details/${name?.common}`} className="sm:mb-20">
          <div
            id="card-container"
            className={`min-h-min  rounded-md  pb-5 w-68 mx-auto mb-10 ${
              isDarkMode ? "bg-dark-blue" : "bg-white shadow-3xl"
            } sm:h-full sm:mb-0 sm:flex sm:flex-col sm:pb-0`}
          >
            <div id="c-flag">
              <img
                src={flags?.png}
                alt="c-flag"
                className="w-full rounded-t-md sm:h-40"
              />
            </div>
            <div id="c-details" className="p-7 sm:my-auto">
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

  const handleSelectedRegion = (region) => {
    setSelectedRegion(region);
    setIsHidden(true);
  };

  return (
    <main className="min-h-screen">
      <div className="homepage-wrapper mx-5 my-7 flex flex-col sm:container sm:mx-auto">
        <div id="filter" className="sm:flex sm:mb-14 mt-5 sm:justify-between">
          <div
            id="input-wrapper "
            className={`py-1 px-5  rounded-md  flex ${
              isDarkMode ? "bg-dark-blue" : "shadow-3xl bg-white"
            } sm:w-96 sm:h-13 my-auto`}
          >
            <span className="m-auto w-14">
              <img
                src={searchImg}
                alt="search icon"
                className={`w-4.5 mx-auto ${
                  isDarkMode ? "invert" : "opacity-40"
                }`}
              />
            </span>
            <input
              type="search"
              placeholder="Search for a country..."
              className={`p-3 grow ${
                isDarkMode && "bg-dark-blue text-white placeholder-white"
              }`}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            id="dropdown-container"
            className={`filter-wrapper my-10 w-52 flex flex-col relative rounded-md ${
              isDarkMode ? "bg-dark-blue" : "bg-white shadow-3xl"
            } sm:my-0`}
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
                    fill={`${isDarkMode ? "#fff" : "#030D45"}`}
                  />
                </svg>
              </span>
            </div>
            <div
              className={`dropdown-list absolute  mt-14 w-52  py-3 rounded-md ${
                isHidden && "hidden"
              }
            ${isDarkMode ? "bg-dark-blue text-white" : "shadow-3xl bg-white"}
            `}
            >
              <div
                className="px-4 py-1 active:font-semibold cursor-pointer hover:opacity-70"
                onClick={() => handleSelectedRegion("")}
              >
                All
              </div>
              <div
                className="px-4 py-1 active:font-semibold cursor-pointer hover:opacity-70"
                onClick={() => handleSelectedRegion("Africa")}
              >
                Africa
              </div>
              <div
                className="px-4 py-1 active:font-semibold cursor-pointer hover:opacity-70"
                onClick={() => handleSelectedRegion("Americas")}
              >
                America
              </div>
              <div
                className="px-4 py-1 active:font-semibold cursor-pointer hover:opacity-70"
                onClick={() => handleSelectedRegion("Asia")}
              >
                Asia
              </div>
              <div
                className="px-4 py-1 active:font-semibold cursor-pointer hover:opacity-70"
                onClick={() => handleSelectedRegion("Europe")}
              >
                Europe
              </div>
              <div
                className="px-4 py-1 active:font-semibold cursor-pointer hover:opacity-70"
                onClick={() => handleSelectedRegion("Oceania")}
              >
                Oceania
              </div>
            </div>
          </div>
        </div>

        <section className="sm:flex sm:flex-wrap sm:justify-between">
          {countries.map((country, index) => {
            return <CountryCard country={country} key={index} />;
          })}
        </section>
      </div>
    </main>
  );
}
