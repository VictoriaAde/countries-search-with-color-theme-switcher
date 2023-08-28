import React, { useState, useEffect, useCallback } from "react";
import axios from "../../helpers/api";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchComponentProps {
  onSearchResults: (results: any[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchResults,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  }, []);

  //   useEffect(() => {
  //     if (searchTerm.trim() !== "") {
  //       axios
  //         .get(`/name/${searchTerm}`)
  //         .then((response) => {
  //           onSearchResults(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching search results:", error);
  //         });
  //     } else {
  //       onSearchResults([]); // Clear results when search term is empty
  //     }
  //   }, [searchTerm, onSearchResults]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        // .get(`/name/${searchTerm}`)
        .get(`/name/${searchTerm}`)
        .then((response) => {
          onSearchResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      // Pass the full list of countries to display all
      axios
        .get("/all")
        .then((response) => {
          onSearchResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
        });
    }
  }, [searchTerm, onSearchResults]);

  return (
    <form>
      <button>
        <AiOutlineSearch size={20} />
      </button>
      <input
        type="search"
        name="search"
        value={searchTerm}
        onChange={handleSearch}
        required
        placeholder="Search for country..."
      />
    </form>
  );
};

export default SearchComponent;
