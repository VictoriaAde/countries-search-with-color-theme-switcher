import React, { useState, useEffect } from "react";
import axios from "./helpers/api";
import "./App.css";
import "./global.css";
import { IoMdMoon } from "react-icons/io";
import Dropdown from "./components/Dropdown/Dropdown";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import SearchComponent from "./components/Search/Search";

const App: React.FC = () => {
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch region options and all countries on page load
    axios
      .get("/all")
      .then((response) => {
        const regions = response.data?.map((region: any) => region.region);

        const uniqueRegions: string[] = [];
        regions?.forEach((region: string | null | undefined) => {
          if (region && !uniqueRegions.includes(region)) {
            uniqueRegions.push(region);
          }
        });

        const options: string[] = ["Filter By Region", ...uniqueRegions];

        setRegionOptions(options);

        // Set country data for page load
        setCountries(response.data);
        setFilteredCountries(response.data); // Initialize filtered countries with all countries
      })
      .catch((error) => {
        console.error("Error fetching country options:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch countries based on selected region
    if (selectedOption && selectedOption !== "Filter By Region") {
      setIsLoading(true);

      axios
        .get(`/region/${selectedOption}`)
        .then((response) => {
          setCountries(response.data);
          setFilteredCountries(response.data); // Update filtered countries when data is updated
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setIsLoading(false);
        });
    } else if (selectedOption === "Filter By Region") {
      setIsLoading(true);

      axios
        .get("/all")
        .then((response) => {
          setCountries(response.data);
          setFilteredCountries(response.data); // Update filtered countries when data is updated
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setIsLoading(false);
        });
    }
  }, [selectedOption]);

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchResults = (results: any[]) => {
    setFilteredCountries(results);
  };

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

      <div className="form_and_FilterDiv">
        <SearchComponent
          onSearchResults={handleSearchResults}
          countries={countries}
        />
        <div>
          <Dropdown
            onOptionSelected={handleOptionSelected}
            options={regionOptions}
            countries={countries}
            setCountries={() => {}}
          />
        </div>
      </div>
      <div className="countries">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          filteredCountries?.map((country, idx) => (
            <div className="country" key={idx}>
              <div>
                <img
                  className="img_flag"
                  src={country.flags.png}
                  alt={country.flags.alt}
                />
              </div>
              <div className="country_info">
                <h3>{country.name.common}</h3>
                <p>
                  <span>Population:</span> {country.population}
                </p>
                <p>
                  <span>Region:</span> {country.region}
                </p>
                <p>
                  <span>Capital:</span>{" "}
                  {country.capital && country.capital[0]
                    ? country.capital[0]
                    : "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default App;
