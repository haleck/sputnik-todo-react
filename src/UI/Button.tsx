import React from 'react';
import styled, {css} from "styled-components";

const Button = ({children, ...props}) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
  transition: all 0.3s ease;
  width: 100%;
  background-color: ${props => props.theme.primary.main};
  border: 2px solid ${props => props.theme.primary.light};
  color: white;
  border-radius: 10px;
  
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  ${({$big}) => $big && css`
    padding: 15px;
    font-weight: 500;
    font-size: ${props => props.theme.font.regular};
  `}

  ${({$regular}) => $regular && css`
    padding: 10px;
    font-weight: 500;
    font-size: ${props => props.theme.font.small};
  `}
  
  ${({disabled}) => disabled && css`
    opacity: 0.6;
    &:hover {
      opacity: 0.6;
      cursor: auto;
    }
  `}
`

export default Button;