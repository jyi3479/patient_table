import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Healthcare Data</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  text-align: center;
`;

export default Header;
