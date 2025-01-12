import React from 'react';
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import Filters from "./Filters";
import Sorting from "./Sorting";
import Ordering from "./Ordering";

const SidebarTools = observer(() => {
    return (
        <Wrapper>
            <Filters />
            <Sorting />
            <Ordering />
        </Wrapper>
    );
});

const Wrapper = styled.div`
  padding-top: 2.5dvh;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media ${props => props.theme.media.laptop} {
    background-color: ${props => props.theme.background.content};
    min-height: 100dvh;
  }
`

export default SidebarTools;