import React, { useEffect, useState } from "react";
import axios from "../helpers/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { IoMdMoon } from "react-icons/io";
import "../global.css";
import "./Detail.css";

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
  const [countryDetails, setCountryDetails] = useState<any[]>([]);
  const { countryName } = useParams<{ countryName: string }>();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        setCountryDetails([response.data[0]]);
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
      ) : countryDetails.length > 0 ? (
        countryDetails.map((country) => (
          <div className="detail" key={country.ccn3}>
            <div>
              <img
                className="flag_img"
                src={country.flags.png}
                alt={country.flags.alt}
              />
            </div>
            <div className="detail_info">
              <h2>{country.name.common}</h2>
              <div className="detail_info_inner">
                <div>
                  <p>
                    <span>Native Name:</span> {country.name.official}
                  </p>
                  <p>
                    <span>Population:</span> {country.population}
                  </p>
                  <p>
                    <span>Region:</span> {country.region}
                  </p>
                  <p>
                    <span>Sub Region:</span> {country.subregion}
                  </p>
                  <p>
                    <span>Capital:</span>{" "}
                    {country.capital && country.capital[0]
                      ? country.capital[0]
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Top level Domain:</span> {country.tld[0]}
                  </p>
                  <p>
                    <span>Currencies:</span>
                  </p>
                  <p>
                    <span>Languages:</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Country not found.</p>
      )}
    </main>
  );
};

export default CountryDetail;
