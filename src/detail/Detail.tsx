import React, { useEffect, useState } from "react";
import axios from "../helpers/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { IoMdMoon } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

import "../global.css";
import "./Detail.css";

import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

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
    <main className={`main ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div>
        <Link to="/" className={`back_btn ${isDarkMode ? "dark-mode" : ""}`}>
          <IoIosArrowRoundBack fontSize={23} /> Back
        </Link>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : countryDetails.length > 0 ? (
        countryDetails.map((country) => (
          <div
            className={`detail ${isDarkMode ? "dark-mode" : ""}`}
            key={country.ccn3}
          >
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
              <div className="tags">
                <span>Border Countries:</span>
                {country.borders?.map(
                  (
                    border:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined,
                    index: React.Key | null | undefined
                  ) => (
                    <span
                      key={index}
                      className={`tag ${isDarkMode ? "dark-mode" : ""}`}
                    >
                      {border}
                    </span>
                  )
                )}
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
