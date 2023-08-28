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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/all")
      .then((response) => {
        const regions = response.data?.map((region: any) => region.region);
        console.log(response);

        const uniqueRegions: string[] = [];
        regions.forEach((region: string) => {
          if (!uniqueRegions.includes(region)) {
            uniqueRegions.push(region);
          }
        });

        const options: string[] = ["Filter By Region", ...uniqueRegions];

        setRegionOptions(options);

        // Set country data for page load
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching country options:", error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    let url = "/all"; // Default URL for fetching all countries

    if (selectedOption && selectedOption !== "Filter By Region") {
      url = `/region/${selectedOption}`; // Construct the URL based on selected region
    }

    axios
      .get(url)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedOption]);

  // useEffect(() => {
  //   if (selectedOption === "Filter By Region" || selectedOption === null) {
  //     setIsLoading(true);

  //     axios
  //       .get(`/region/${selectedOption}`)
  //       .then((response) => {
  //         setCountries(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching countries:", error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   } else if (selectedOption !== null) {
  //     setIsLoading(true);

  //     axios
  //       .get(`/region/${selectedOption}`)
  //       .then((response) => {
  //         setCountries(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching countries:", error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [selectedOption]);

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearchResults = (results: any[]) => {
    setCountries(results);
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
        <SearchComponent onSearchResults={handleSearchResults} />
        {/* <form>
          <button>
            <AiOutlineSearch size={20} />
          </button>
          <input
            type="search"
            name=""
            id=""
            required
            placeholder="Search for country..."
          />
        </form> */}

        <div>
          <Dropdown
            onOptionSelected={handleOptionSelected}
            options={regionOptions}
          />
        </div>
      </div>
      <div className="countries">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          countries?.map((country, idx) => (
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
        {/* {countries?.map((country) => (
    
        ))} */}
      </div>
    </main>
  );
};

export default App;
