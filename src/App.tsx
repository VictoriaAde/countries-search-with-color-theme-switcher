import React, { useState, useEffect } from "react";
import axios from "./helpers/api";
import "./App.css";
import "./global.css";
import { IoMdMoon } from "react-icons/io";
import Dropdown from "./components/Dropdown/Dropdown";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import SearchComponent from "./components/Search/Search";
import { Link } from "react-router-dom";
import { useDebounce } from "./helpers/debounce";

const App: React.FC = () => {
  const [regionOptions, setRegionOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [visibleItems, setVisibleItem] = useState(20);

  const handleLoadMore = () => {
    setVisibleItem((prev: number) => prev + 10); // Increase the number of visible items
  };

  useEffect(() => {
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
        setFilteredCountries(response.data);
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
          setFilteredCountries(response.data);
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
          setFilteredCountries(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setIsLoading(false);
        });
    }
  }, [selectedOption]);

  // Add this useEffect block to handle the debounced search term
  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      // You can put your search logic here
      // For example, filter countries based on the debouncedSearchTerm
      const filtered = countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );

      // Update the filtered countries with the search results
      setFilteredCountries(filtered);
    } else {
      // If the search term is empty, reset the filtered countries
      setFilteredCountries(countries);
    }
  }, [debouncedSearchTerm, countries]);

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchResults = (results: any[]) => {
    setFilteredCountries(results);
  };

  // Update the searchTerm state when the user types in the search input
  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
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
        {/* Pass handleSearchTermChange as a prop to the SearchComponent */}
        <SearchComponent
          onSearchResults={handleSearchResults}
          countries={countries}
          onSearchTermChange={handleSearchTermChange}
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
          filteredCountries?.slice(0, visibleItems).map((country, idx) => (
            <Link to={`/country/${country.ccn3}`} className="countrylink">
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
                {/* Overlay */}
                {/* <div className="country_overlay">
                  <button className="view_details_button">View Details</button>
                </div> */}
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="wrapper_load_more_btn">
        {filteredCountries.length > visibleItems && (
          <button className="load_more_btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </main>
  );
};

export default App;
