import React, { useEffect, useState } from "react";
import axios from "../helpers/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { IoMdMoon } from "react-icons/io";
import "../global.css";
import { useParams } from "react-router-dom";
interface CountryDetailProps {
  match: {
    params: {
      ccn3: string;
    };
  };
}
const CountryDetail: React.FC<CountryDetailProps> = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countryDetails, setCountryDetails] = useState<any>({});
  const { countryName } = useParams<{ countryName: string }>();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        setCountryDetails(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching country details:", error);
        setIsLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryName]);
  console.log("details", countryDetails);

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
      ) : countryDetails ? (
        <div>
          <div>
            <img
              src={countryDetails.flags.png}
              alt={countryDetails.flags.alt}
            />
          </div>
          <div>
            <h2>{countryDetails.name.common}</h2>
            <p>
              <span>Population:</span> {countryDetails.population}
            </p>
            <p>
              <span>Region:</span> {countryDetails.region}
            </p>
            <p>
              <span>Capital:</span>{" "}
              {countryDetails.capital && countryDetails.capital[0]
                ? countryDetails.capital[0]
                : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <p>Country not found.</p>
      )}
    </main>
  );
};

export default CountryDetail;
