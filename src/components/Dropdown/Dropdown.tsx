import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DropDownContainer = styled.div<{ isDarkMode: boolean }>`
  width: 270px;
  margin: 3rem 0;
  background-color: ${(props) =>
    props.isDarkMode ? "var(--dark-bg)" : "var(--white)"};
  border-radius: 5px;
`;

const DropDownHeader = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${(props) => (props.isDarkMode ? "var(--white)" : "var(--dark-text)")};
  background-color: ${(props) =>
    props.isDarkMode ? "var(--blue)" : "var(--white)"};
  cursor: pointer;
`;

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul<{ isDarkMode: boolean }>`
  position: absolute;
  width: 269px;
  overflow-y: scroll;
  height: 250px;
  padding: 0;
  font-weight: 400;
  background-color: ${(props) =>
    props.isDarkMode ? "var(--blue)" : "var(--white)"};
  color: ${(props) => (props.isDarkMode ? "var(--white)" : "var(--dark-text)")};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &:first-child {
    margin-top: 0.8em;
  }
`;

const ListItem = styled.li`
  font-size: 0.9rem;
  list-style: none;
  text-align: left;
  margin-bottom: 0.8em;
  padding: 0.7rem 1.3rem;
  cursor: pointer;
`;

const ArrowDownIcon = styled.span``;

interface DropdownProps {
  onOptionSelected: (option: string) => void;
  options: string[];
  countries: any[]; // Pass the countries data as a prop
  setCountries: (countries: any[]) => void; // Function to update countries
  isDarkMode: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  onOptionSelected,
  options,
  countries,
  setCountries,
  isDarkMode,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    onOptionSelected(value);

    // Filter countries based on the selected region
    if (value === "Filter By Region") {
      setCountries([...countries]); // Reset to the original list
    } else {
      const filteredCountries = countries.filter(
        (country) => country.region === value
      );
      setCountries(filteredCountries);
    }

    setIsOpen(false);
  };

  return (
    <DropDownContainer isDarkMode={isDarkMode}>
      <DropDownHeader isDarkMode={isDarkMode} onClick={toggling}>
        {selectedOption || "Filter By Region"}
        <ArrowDownIcon>
          <MdOutlineKeyboardArrowDown size={20} />
        </ArrowDownIcon>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList isDarkMode={isDarkMode}>
            {options?.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={option}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
