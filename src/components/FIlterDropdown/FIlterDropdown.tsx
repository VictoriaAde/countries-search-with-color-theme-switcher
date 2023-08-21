import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "../../global.css";

const DropDownContainer = styled.div`
  margin: 3rem 0;
`;

const DropDownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1.3rem;
  padding: 1rem 1.3rem;
  border-radius: 5px;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--white);
  background-color: var(--blue);
`;

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  background-color: var(--blue);
  color: var(--white);
  margin: 1rem 1.3rem;

  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  list-style: none;
  text-align: left;
  margin-bottom: 0.8em;
  padding: 0.7rem 1.3rem;
`;

const ArrowDownIcon = styled.span``;

const options = ["Filter By Region", "Africa", "America", "Europe"];

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        {selectedOption || "Filter By Region"}
        <ArrowDownIcon>
          <MdOutlineKeyboardArrowDown size={20} />
        </ArrowDownIcon>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options?.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
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

// import "./FilterDropdown.css";
// import "../../global.css";

// interface FilterDropdownProps {
//   options: string[];
//   selectedOption: string;
//   onSelectOption: (option: string) => void;
// }

// const FilterDropdown: React.FC<FilterDropdownProps> = ({
//   options,
//   selectedOption,
//   onSelectOption,
// }) => {
//   const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newOption = event.target.value;
//     onSelectOption(newOption);
//   };

//   return (
//     <div className="filter-dropdown">
//       <select value={selectedOption} onChange={handleOptionChange}>
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default FilterDropdown;
