import React, { useState, useEffect } from "react";
import axios from "./helpers/api";
import "./App.css";
import "./global.css";
import { IoMdMoon } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from "./components/Dropdown/Dropdown";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const App: React.FC = () => {
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(countries);

  useEffect(() => {
    axios
      .get("/all")
      .then((response) => {
        const options = [
          "Filter By Region",
          ...response.data?.map((country: any) => country.name.common),
        ];
        setCountryOptions(options);
        // Set country data for page load
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching country options:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedOption === "Filter By Region" || selectedOption === null) {
      setIsLoading(true);

      axios
        .get("/all")
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (
      selectedOption !== null &&
      selectedOption !== "Filter By Region"
    ) {
      setIsLoading(true);

      axios
        .get(`/name/${selectedOption}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedOption]);

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
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
        <form>
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
        </form>

        <div>
          <Dropdown
            onOptionSelected={handleOptionSelected}
            options={countryOptions}
          />
        </div>
      </div>
      <div className="countries">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          countries?.map((country) => (
            <div className="country" key={country.ccn3}>
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
