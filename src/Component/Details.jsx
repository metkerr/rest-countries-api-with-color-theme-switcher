import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowBack from "../assets/arrow-back.svg";
import axios from "axios";
import numberFormat from "../utils/numberFormat";
import renderCapitals from "../utils/renderCapitals";

export default function Details({ isDarkMode }) {
  const { countryName } = useParams();
  const [country, setCountry] = useState();
  const [borderNames, setBorderNames] = useState([]);

  useEffect(() => {
    let ignore = false; //cleanup

    if (!ignore) {
      axios(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((selectedCountry) => {
          setCountry(selectedCountry.data);

          //get country borders name
          axios("https://restcountries.com/v3.1/all")
            .then((res) => {
              const { borders } = selectedCountry.data[0];
              let borderCountries = [];

              borders.map((borderCode) => {
                return borderCountries.push(
                  res.data.find((data) => data.cca3 === borderCode)?.name
                    ?.common
                );
              });

              setBorderNames(borderCountries);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }

    return () => {
      ignore = true;
    };
  }, [countryName]);

  if (country) {
    const {
      flags,
      name,
      population,
      capital,
      demonyms,
      region,
      subregion,
      tld,
      currencies,
      languages,
    } = country[0];
    // console.log(country[0]);

    const RenderBorderList = () => {
      return (
        <div className="flex flex-wrap sm:gap-1">
          {borderNames.map((borderCountry) => {
            return (
              <Link
                to={`/details/${borderCountry}`}
                key={borderCountry}
                className={`py-1 mr-2 mb-2 px-6  active:bg-dark-gray active:text-white whitespace-nowrap ${
                  isDarkMode ? "bg-dark-blue" : "shadow-3xl"
                } sm:my-auto`}
              >
                {borderCountry}
              </Link>
            );
          })}
        </div>
      );
    };

    return (
      <main className="min-h-screen pb-16">
        <section
          id="details-wrapper "
          className="mx-5 my-7 flex flex-col sm:container sm:mx-auto"
        >
          <Link
            to="/"
            className={`flex w-24 justify-between px-5 py-1 mb-14 ${
              isDarkMode ? "bg-dark-blue" : "shadow-3xl"
            }`}
          >
            <span>
              <img
                src={arrowBack}
                alt="back icon"
                className={`w-5 ${isDarkMode && "invert"}`}
              />
            </span>
            <span className="my-auto">Back</span>
          </Link>

          <div id="c-details-wrapper" className="sm:flex">
            <div
              id="c-flag"
              className="mx-auto mb-4 w-full sm:basis-2/5 sm:mb-0 sm:flex"
            >
              <img
                src={flags?.png}
                alt={`${name.common} flag`}
                className="w-full sm:w-128 sm:h-80 sm:my-auto"
              />
            </div>
            <div id="c-details" className="sm:basis-3/5 sm:my-auto sm:pl-24">
              <h1 className="font-bold text-2xl py-5 sm:py-4">{name.common}</h1>
              <div id="details-wrapper" className="sm:flex sm:gap-20">
                <div id="section-1">
                  <p className="py-1">
                    <span className="font-semibold">Native Name: </span>
                    <span>{demonyms.eng.m}</span>
                  </p>
                  <p className="py-1">
                    <span className="font-semibold">Population: </span>
                    <span>{numberFormat(population)}</span>
                  </p>
                  <p className="py-1">
                    <span className="font-semibold">Region: </span>
                    <span>{region}</span>
                  </p>
                  <p className="py-1">
                    <span className="font-semibold">Sub Region: </span>
                    <span>{subregion}</span>
                  </p>
                  <p className="py-1">
                    <span className="font-semibold">Capital: </span>
                    <span>{capital}</span>
                  </p>
                </div>
                <br />
                <div id="section-2">
                  <p className="py-1 mt-2">
                    <span className="font-semibold">Top Level Domain: </span>
                    <span>{tld && renderCapitals(tld)}</span>
                  </p>
                  <p className="py-1">
                    <span className="font-semibold">Currencies: </span>
                    <span>
                      {currencies && Object.values(currencies)[0]?.name}
                    </span>
                  </p>
                  <p className="py-1">
                    <span className="font-semibold">Languages: </span>
                    <span>
                      {languages && renderCapitals(Object.values(languages))}
                    </span>
                  </p>
                </div>
              </div>
              <br />

              <div
                id="border-countries-wrapper"
                className="mt-2 sm:flex sm:gap-4 sm:mt-7"
              >
                <h3 className="font-semibold text-base mb-3 sm:my-auto sm:whitespace-nowrap">
                  Border Countries:
                </h3>
                <div id="border-list-wrapper">
                  <RenderBorderList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  } else {
    return null;
  }
}
