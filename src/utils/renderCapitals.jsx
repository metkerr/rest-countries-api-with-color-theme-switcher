export default function renderCapitals(cities) {
  // normalize capital cities and languages data *some contries have more than one capital city and languages
  const normalizeCities = cities.map((city, index) => {
    return <span key={city}>{index ? ", " + city : "" + city}</span>;
  });

  return normalizeCities;
}
