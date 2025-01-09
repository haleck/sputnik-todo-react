import React, {useRef, useState} from 'react';
import AutoResizeTextarea from "../../../UI/AutoResizeTextarea";
import taskService, {tasksStore} from "../../../services/TaskService";
import useDelayedCallback from "../hooks/useDelayedCallback";
import styled, {css} from "styled-components";
import {getShortedText} from "../helpers/getShortedText";

const TaskContent = ({task, editable, setEditableTask}) => {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description)

    const titleTextareaRef = useRef<HTMLTextAreaElement | null>(null)
    const descriptionTextareaRef = useRef(null)

    const focus = (textareaRef) => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.focus()
            textarea.setSelectionRange(
                textarea.value.length,
                textarea.value.length
            )
        }
    }

    const delayedFocusOnTitle = useDelayedCallback(()=> {
        focus(titleTextareaRef)
    }, 100)

    const delayedFocusOnDescription = useDelayedCallback(()=> {
        focus(descriptionTextareaRef)
    }, 100)

    const changeTaskTitle = (): void => {
        taskService.changeTaskTitle(task.id, title);
    };

    const changeTaskDescription = (): void => {
        taskService.changeTaskDescription(task.id, description);
    };

    const handleTitleClick = (): void => {
        if (!editable) {
            setEditableTask(task.id)
            delayedFocusOnTitle()
        }
    }

    const handleDescriptionClick = (): void => {
        if (!editable) {
            setEditableTask(task.id)
            delayedFocusOnDescription()
        }
    }

    return editable ? (
        <InputBlock data-role={"task"}>
            <TitleTextarea
                text={title}
                setText={setTitle}
                onBlur={changeTaskTitle}
                handleEnter={(ref) => ref.current.blur()}
                maxLength={tasksStore.maxTaskTitleLength}
                ref={titleTextareaRef}
            />
            <DescriptionTextarea
                text={description}
                setText={setDescription}
                onBlur={changeTaskDescription}
                handleEnter={(ref) => ref.current.blur()}
                maxLength={300}
                ref={descriptionTextareaRef}
                placeholder={'Описание...'}
            />
        </InputBlock>
    ) : (
        <DisplayBlock data-role={"task"} $isCompleted={task.status === "completed"}>
            <Title onClick={handleTitleClick}>
                {getShortedText(title, 80)}
            </Title>
            <Description onClick={handleDescriptionClick}>
                {getShortedText(description, 100)}
            </Description>
        </DisplayBlock>
    );
};

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3px;
`

const TitleTextarea = styled(AutoResizeTextarea)`
  padding: 0;
`

const DescriptionTextarea = styled(AutoResizeTextarea)`
  font-size: ${props => props.theme.font.small};
  padding: 0;
`

const DisplayBlock = styled.div`
  width: 100%;
  padding: 3px;

  ${({ $isCompleted }) => $isCompleted && css`
    & > div {
      text-decoration: line-through;
      color: ${props => props.theme.states.disabled};
    }
  `}
`

const Title = styled.div`
  width: 100%;
  cursor: pointer;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: hidden;
`

const Description = styled(Title)`
  font-size: ${props => props.theme.font.small};
  color: ${props => props.theme.text.secondary}
`

export default TaskContent;