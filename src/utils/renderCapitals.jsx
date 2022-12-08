export default function renderCapitals(cities) {
  // normalize capital cities *some contries have more than one capital city
  const normalizeCities = cities.map((city, index) => {
    return <span key={city}>{index ? ", " + city : "" + city}</span>;
  });

  return normalizeCities;
}
