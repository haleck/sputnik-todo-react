import React, {FC, ReactNode} from 'react';
import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import SidebarOptions, {Option} from "./SidebarOptions";

export interface Header {
    label: string
    icon?: ReactNode
}

interface SidebarContainerProps {
    header: Header
    options: Option[]
    currentOption?: string
    onChangeOption: (newOption) => void
}

const Sidebar: FC<SidebarContainerProps> = ({header, options, currentOption, onChangeOption}) => {
    if (!header || !options) {
        return <div>Ошибка props<br/> для sidebar</div>;
    }

    return (
        <StyledContainer>
            <SidebarHeader>
                {header.label}
                {header.icon}
            </SidebarHeader>
            <SidebarOptions
                options={options}
                currentOption={currentOption}
                onChangeOption={onChangeOption}
            />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  background-color: ${props => props.theme.background.content};
  min-width: 250px;
  padding-block: 20px;
  border: 3px solid ${props => props.theme.primary.light};
  border-radius: 15px;

  @media ${props => props.theme.media.laptop} {
    border: none;
    border-radius: 0;
    min-width: 0;
    padding-left: 10px;
  }

  @media ${props => props.theme.media.phone} {
    display: none;
  }
`

export default Sidebar;