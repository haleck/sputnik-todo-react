import React, {FC} from 'react';
import styled, {css} from "styled-components";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({checked, onChange, ...props}) => {
    return (
        <label>
            <RealCheckbox
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <CustomCheckbox
                $checked={checked}
                {...props}
            />
        </label>
    );
};

const RealCheckbox = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  z-index: -1;
`

const CustomCheckbox = styled.span`
  display: inline-block;
  width: calc(${props => props.theme.font.regular} + 10px);
  height: calc(${props => props.theme.font.regular} + 10px);
  border: 2px solid ${props => props.theme.primary.light};
  border-radius: 50%;
  vertical-align: sub;
  position: relative;
  transition: all 0.2s ease;
  background-color: ${props => props.theme.background.elements};

  &::before {
    content: "";
    position: absolute;
    width: calc(${props => props.theme.font.regular} + 5px);
    height: calc(${props => props.theme.font.regular} + 5px);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-image: url("/src/assets/svg/check.svg");
    background-size: cover;
    transition: all 0.2s ease;
  }

  &:hover {
    cursor: pointer;
  }

  ${({ $checked }) => $checked && css`
    background-color: ${props => props.theme.primary.main};

    &::before {
      transform: translate(-50%, -50%) scale(1);
    }
  `}
`;




export default Checkbox;