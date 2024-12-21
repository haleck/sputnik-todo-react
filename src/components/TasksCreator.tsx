import React, {FC, useState} from 'react';
import AutoResizeTextarea from "../UI/AutoResizeTextarea";
import taskService, {tasksStore} from "../services/TaskService";
import styled, {css} from "styled-components";

const TasksCreator: FC = () => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [lengthCounterVisible, setLengthCounterVisible] = useState<boolean>(false)

    const createTask = (): void => {
        taskService.addTask({"title": newTaskTitle})
        setNewTaskTitle('');
    }

    return (
        <>
            <Wrapper>
                <AutoResizeTextarea
                    text={newTaskTitle}
                    setText={setNewTaskTitle}
                    maxLength={tasksStore.maxTaskTitleLength}
                    handleEnter={createTask}
                    placeholder={'Новая задача'}
                    onFocus={()=>setLengthCounterVisible(true)}
                    onBlur={()=>setLengthCounterVisible(false)}
                />
            </Wrapper>
            <CharCounter $visible={lengthCounterVisible}>
                {newTaskTitle.length}/{tasksStore.maxTaskTitleLength} символов
            </CharCounter>
        </>
    );
};

const Wrapper = styled.div`
  background: var(--elements-background-color);
  padding: 10px;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus-within {
    background-color: var(--focus-color);
  }
  &:hover {
    background-color: var(--focus-color);
  }
`

const CharCounter = styled.div`
  padding-right: 8px;
  padding-top: 5px;
  text-align: right;
  font-size: var(--extra-small-font-size);
  color: var(--text-color);
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${({$visible})=>$visible && css`
    opacity: 1
  `}
`

export default TasksCreator;