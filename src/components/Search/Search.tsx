import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchComponentProps {
  onSearchResults: (results: any[]) => void;
  countries: any[];
  onSearchTermChange: (newSearchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearchResults,
  countries,
  onSearchTermChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Use useEffect to listen for changes in searchTerm and notify the parent
  useEffect(() => {
    onSearchTermChange(searchTerm);
  }, [searchTerm, onSearchTermChange]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);

      // Note: You can keep the existing filtering logic here if needed

      // Filter countries based on the search term
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(newSearchTerm.toLowerCase())
      );

      // Pass the filtered countries to the parent component
      onSearchResults(filtered);
    },
    [countries, onSearchResults]
  );

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
