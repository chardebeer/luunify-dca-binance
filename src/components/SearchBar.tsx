import React from 'react';
import styled from 'styled-components';
import { BsChevronDown } from 'react-icons/bs';

const StyledInput = styled.input`
  border-radius: 50px;
  background: #eeeeee;
  flex-grow: 2;
  border: none;
  padding-left: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  height: 30px;
  border: none;
  width: 30%;
`;

const StyledButton = styled.button`
  border: none;
  margin-left: -25px;
  background: #eeeeee;
  border-radius: 50%;
  color: grey;
`;

function SearchBar() {
  return (
    <StyledForm action="/" method="get">
      <label htmlFor="header-search"></label>
      <StyledInput type="text" id="header-search" placeholder=" 🔍 Search" name="searchBar" />

      <StyledButton>
        <BsChevronDown size={15} />
      </StyledButton>
    </StyledForm>
  );
}

export default SearchBar;
