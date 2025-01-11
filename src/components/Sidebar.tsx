import React from 'react';
import styled, {css} from "styled-components";
import Header from "../UI/Header";
import StarIcon from "../UI/StarIcon";
import {tasksStore} from "../services/TaskService";
import {observer} from "mobx-react-lite";

const Sidebar = observer(() => {
    return (
        <Wrapper>
            <StyledHeader>
                Фильтры
                <FilterSvg />
            </StyledHeader>
            <List>
                <ListItem $selected={tasksStore.filter==="all"} onClick={()=>tasksStore.setFilter("all")}>
                    <AllSvg />
                    Все задачи
                </ListItem>
                <ListItem $selected={tasksStore.filter==="favorite"} onClick={()=>tasksStore.setFilter("favorite")}>
                    <StarSvg />
                    Избранное
                </ListItem>
                <ListItem $selected={tasksStore.filter==="done"} onClick={()=>tasksStore.setFilter("done")}>
                    <DoneSvg />
                    Завершенные
                </ListItem>
                <ListItem $selected={tasksStore.filter==="inProgress"} onClick={()=>tasksStore.setFilter("inProgress")}>
                    <WaitingSvg />
                    В процессе
                </ListItem>
            </List>
        </Wrapper>
    );
});

const Wrapper = styled.div`
  margin-top: 2.5dvh;
  background-color: ${props => props.theme.background.content};
  max-height: 95dvh;
  min-width: 250px;
  padding-block: 20px;
  border: 3px solid ${props => props.theme.primary.light};
  border-radius: 15px;
  align-self: flex-start;

  @media ${props => props.theme.media.laptop} {
    margin: 0;
    border: none;
    border-radius: 0;
    max-height: 100dvh;
    height: 100dvh;
    min-width: 0;
    padding-left: 10px;
  }

  @media ${props => props.theme.media.phone} {
    display: none;
  }
`

const StyledHeader = styled(Header)`
  padding-inline: 20px;
  justify-content: flex-start;
`

const List = styled.ul`
  list-style: none;
  margin-top: 15px;
  padding-inline: 7px;
`

const ListItem = styled.li`
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

const Svg = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`

const StarSvg = styled(StarIcon)`
  width: 20px;
  height: 20px;
  fill: currentColor;
`

const FilterSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={25} height={25} fill="currentColor">
        <path
            d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/>
    </svg>
)

const AllSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path
            d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/>
    </Svg>
)

const DoneSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path
            d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/>
    </Svg>
)

const WaitingSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path
            d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/>
    </Svg>
)

export default Sidebar;