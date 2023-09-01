import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchComponentProps {
  onSearchResults: (results: any[]) => void;
  countries: any[]; // Pass the countries data as a prop
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchResults,
  countries,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  }, []);

  useEffect(() => {
    // Filter by search term
    let filtered = countries;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Pass the filtered countries to the parent component
    onSearchResults(filtered);
  }, [searchTerm, countries, onSearchResults]);

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
