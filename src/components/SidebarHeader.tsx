import React, {FC, ReactNode} from 'react';
import Header from "../UI/Header";
import styled from "styled-components";

interface SidebarHeaderProps {
    children?: ReactNode
}

const SidebarHeader: FC<SidebarHeaderProps> = ({children}) => {
    return (
        <StyledHeader>
            {children}
        </StyledHeader>
    );
};

const StyledHeader = styled(Header)`
  padding-inline: 20px;
  justify-content: flex-start;
  font-size: ${props => props.theme.font.large};
`

export default SidebarHeader;