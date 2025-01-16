import React, {FC, ReactNode} from 'react';
import styled, {css} from "styled-components";

export interface Option {
    id: string;
    label: string;
    icon?: ReactNode;
}

interface SidebarOptionsProps {
    options: Option[]
    currentOption?: string
    onChangeOption: (newOption) => void
}

const SidebarOptions: FC<SidebarOptionsProps> = ({options, currentOption, onChangeOption}) => {
    return (
        <StyledOptions>
            {options.map(({ id, label, icon }) => (
                <StyledOption
                    key={id}
                    $selected={currentOption === id}
                    onClick={()=>onChangeOption(id)}
                >
                    {icon && icon}
                    {label}
                </StyledOption>
            ))}
        </StyledOptions>
    );
};

const StyledOptions = styled.ul`
  list-style: none;
  margin-top: 15px;
  padding-inline: 7px;
`

const StyledOption = styled.li`
  margin-bottom: 3px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 5px 13px;
  border-radius: 15px;
  font-size: ${props => props.theme.font.small};

  ${({$selected}) => $selected && css`
    background-color: ${props => props.theme.states.focus};
  `}
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.background.elements};
  }
`

export default SidebarOptions;