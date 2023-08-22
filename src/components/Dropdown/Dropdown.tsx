import React, { useState } from "react";
// import axios from "../../helpers/api";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "../../global.css";

const DropDownContainer = styled.div`
  width: 270px;
  margin: 3rem 0;
`;

const DropDownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--white);
  background-color: var(--blue);
  cursor: pointer;
`;

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul`
  position: absolute;
  width: 269px;
  overflow-y: scroll;
  height: 250px;
  padding: 0;
  font-weight: 400;
  background-color: var(--blue);
  color: var(--white);
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
}

const Dropdown: React.FC<DropdownProps> = ({ onOptionSelected, options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    onOptionSelected(value);
    console.log(selectedOption);
    setIsOpen(false);
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
