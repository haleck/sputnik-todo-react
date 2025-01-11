import React from 'react';
import styled from "styled-components";

const Header = ({children, ...props}) => {
    return (
        <StyledHeader {...props}>
            {children}
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: ${props => props.theme.font.large};
  font-weight: 700;
  color: ${props => props.theme.text.primary};
`;

export default Header;