import React from 'react';
import TasksList from "../../modules/TasksList";
import TasksCreator from "../../components/TasksCreator.tsx";
import styled from "styled-components";

const MainPage = () => {
    return (
        <StyledWrapper>
            <StyledContent>
                <StyledHeader>
                    <span>ToDo App</span>
                    <StyledSvg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/>
                    </StyledSvg>
                </StyledHeader>
                <TasksCreator />
                <TasksList />
            </StyledContent>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.div`
  background-color: ${props => props.theme.background.content};
  width: min(100vw, 640px);
  min-height: min(100dvh, 640px);
  max-height: 95dvh;
  margin: 0 auto;
  padding: 20px;
  border: 3px solid ${props => props.theme.primary.light};
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.media.laptop} {
    padding: 15px;
  }

  @media ${props => props.theme.media.tablet} {
    padding: 10px;
  }

  @media ${props => props.theme.media.phone} {
    border-radius: 0;
    border: none;
    min-height: 100dvh;
  }

  @media ${props => props.theme.media.smallPhone} {
    padding: 5px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: ${props => props.theme.font.large};
  font-weight: 700;
  color: ${props => props.theme.text.primary};
`;

const StyledSvg = styled.svg`
  width: 35px;
  height: 35px;
  fill: ${props => props.theme.text.primary};
`;


export default MainPage;