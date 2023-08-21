import "./App.css";
import "./global.css";
import { IoMdMoon } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import FilterDropdown from "./components/FIlterDropdown/FIlterDropdown";
import { useState } from "react";

function App() {
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
        <FilterDropdown />
      </div>

      <div>
        <h3>United States of America</h3>
        <p>Population: 345.66.000</p>
        <p>Region: Americas</p>
        <p>Capital: Washinton D.C</p>
      </div>
    </main>
  );
}

export default App;
