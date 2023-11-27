import React, { useEffect, useState } from "react";
import axios from "../helpers/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { IoMdMoon } from "react-icons/io";
import "../global.css";

interface CountryDetailProps {
  match: {
    params: {
      ccn3: string;
    };
  };
}
const CountryDetail: React.FC<CountryDetailProps> = ({ match }) => {
  const [country, setCountry] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("country", country);

  useEffect(() => {
    axios
      .get(`/alpha`)
      .then((response) => {
        setCountry(response.data);
        setIsLoading(false);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
        setIsLoading(false);
      });
  }, [match.params.ccn3]);

  return (
    <main className="main">
      <div className="top_nav">
        <div>
          <h1>Where in the world?</h1>
        </div>
        <div>
          <span>
            <IoMdMoon /> Dark mode
          </span>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : country ? (
        <div>
          <h2>{country.name.common}</h2>
          <img src={country.flags.png} alt={country.flags.alt} />
          <p>
            <span>Population:</span> {country.population}
          </p>
          <p>
            <span>Region:</span> {country.region}
          </p>
          <p>
            <span>Capital:</span>{" "}
            {country.capital && country.capital[0] ? country.capital[0] : "N/A"}
          </p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Country not found.</p>
      )}
    </main>
  );
};

export default CountryDetail;
