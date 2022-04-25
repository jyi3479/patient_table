import React from "react";
import styled from "styled-components";

const Select = ({ state, setState, category, list }) => {
  return (
    <>
      <SelectBox type="string" value={state} onChange={({ target: { value } }) => setState(value)}>
        <option value="">{category}</option>
        {list.map((el, idx) => {
          return (
            <option key={idx} value={el}>
              {el}
            </option>
          );
        })}
      </SelectBox>
    </>
  );
};

const SelectBox = styled.select`
  margin: 5px;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

export default Select;
