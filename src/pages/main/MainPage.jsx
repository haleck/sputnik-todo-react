import React from 'react';
import classes from "./MainPage.module.css";
import TasksList from "../../modules/TasksList";
import TasksCreator from "../../components/TasksCreator.tsx";
import PinSvg from "../../UI/Icons/PinSvg.jsx"
import styled from "styled-components";

const MainPage = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <span>ToDo App</span>
                    <StyledSvg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/>
                    </StyledSvg>
                </div>
                <TasksCreator />
                <TasksList />
            </div>
        </div>
    );
};

const StyledSvg = styled.svg`
  width: 35px;
  height: 35px;
`

export default MainPage;