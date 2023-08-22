import React, { useState, useEffect } from "react";
import axios from "./helpers/api";
import "./App.css";
import "./global.css";
import { IoMdMoon } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from "./components/Dropdown/Dropdown";

const App: React.FC = () => {
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  // console.log(countryOptions);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("/all")
      .then((response) => {
        const options = [
          "Filter By Region",
          ...response.data.map((country: any) => country.name.common),
        ];
        setCountryOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching country options:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedOption !== null && selectedOption !== "Filter By Region") {
      axios
        .get(`/region/${selectedOption}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        });
    }
  }, [selectedOption]);

  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };
  // useEffect(() => {
  //   axios
  //     .get("/all") // Use the relative endpoint
  //     .then((response) => {
  //       const options = response.data.map(
  //         (country: any) => country.name.common
  //       );
  //       setCountryOptions(options);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching country options:", error);
  //     });
  // }, []);

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
        <div className="country">
          <div>Image</div>
          <div className="country_info">
            <h3>United States of America</h3>
            <p>
              <span>Population:</span> 345.66.000
            </p>
            <p>
              <span>Region:</span> Americas
            </p>
            <p>
              <span>Capital:</span> Washinton D.C
            </p>
          </div>
        </div>
        <div className="country">
          <div>Image</div>
          <div className="country_info">
            <h3>United States of America</h3>
            <p>
              <span>Population:</span> 345.66.000
            </p>
            <p>
              <span>Region:</span> Americas
            </p>
            <p>
              <span>Capital:</span> Washinton D.C
            </p>
          </div>
        </div>
        <div className="country">
          <div>Image</div>
          <div className="country_info">
            <h3>United States of America</h3>
            <p>
              <span>Population:</span> 345.66.000
            </p>
            <p>
              <span>Region:</span> Americas
            </p>
            <p>
              <span>Capital:</span> Washinton D.C
            </p>
          </div>
        </div>
        <div className="country">
          <div>Image</div>
          <div className="country_info">
            <h3>United States of America</h3>
            <p>
              <span>Population:</span> 345.66.000
            </p>
            <p>
              <span>Region:</span> Americas
            </p>
            <p>
              <span>Capital:</span> Washinton D.C
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
