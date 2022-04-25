import React from "react";
import styled from "styled-components";

const Select = ({ state, setState, category, list }) => {
  return (
    <>
      <SelectBox type="string" value={state} onChange={({ target: { value } }) => setState(value)}>
        <option value="">{category}</option>
        {list.map((el) => {
          return <option value={el}>{el}</option>;
        })}
      </SelectBox>
    </>
  );
};

const SelectBox = styled.select`
  margin: 5px 5px 20px 0px;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  font-family: inherit; // font 상속
  line-height: inherit;
  /* border: 2px solid #acacac;
  border-radius: 10px; */
  border: none;
  color: inherit;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

export default Select;
