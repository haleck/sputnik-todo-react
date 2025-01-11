import React, {FC, useState} from 'react';
import AutoResizeTextarea from "../UI/AutoResizeTextarea";
import taskService, {tasksStore} from "../services/TaskService";
import styled, {css} from "styled-components";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const TaskCreatorModal: FC = ({onClose}) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('')
    const [titleLengthCounterVisible, setTitleLengthCounterVisible] = useState<boolean>(false)
    const [descriptionLengthCounterVisible, setDescriptionLengthCounterVisible] = useState<boolean>(false)

    const [closing, setClosing] = useState(false)

    const createTask = (): void => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            taskService.addTask({
                title: title,
                description: description,
                status: "not completed",
            })
            onClose();
        }, 300)
    }

    const handleClose = () => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            setTitle('');
            setDescription('');
            onClose();
        }, 100)
    }

    return (
        <Modal onClose={handleClose} isVisible={!closing} delay={100}>
            <Header>
                Создание задачи
            </Header>
            <Textarea
                text={title}
                setText={setTitle}
                maxLength={tasksStore.maxTaskTitleLength}
                placeholder={'Заголовок задачи'}
                handleEnter={()=>{}}
                onFocus={()=>setTitleLengthCounterVisible(true)}
                onBlur={()=>setTitleLengthCounterVisible(false)}
            />
            <CharCounter $visible={titleLengthCounterVisible}>
                {title.length}/{tasksStore.maxTaskTitleLength}
            </CharCounter>
            <Textarea
                text={description}
                setText={setDescription}
                maxLength={tasksStore.maxTaskTitleLength}
                placeholder={'Описание задачи'}
                handleEnter={()=>{}}
                onFocus={()=>setDescriptionLengthCounterVisible(true)}
                onBlur={()=>setDescriptionLengthCounterVisible(false)}
                rows={3}
            />
            <CharCounter $visible={descriptionLengthCounterVisible}>
                {description.length}/{tasksStore.maxTaskTitleLength}
            </CharCounter>
            <Button $big onClick={createTask} disabled={!title.length > 0}>
                Добавить
            </Button>
        </Modal>
    );
};

const Header = styled.h2`
  font-size: ${props=> props.theme.font.extraLarge};
  margin-bottom: 20px;
  font-weight: 600;
  color: ${props => props.theme.text.primary}
`

const Textarea = styled(AutoResizeTextarea)`
  background: ${props => props.theme.background.elements};
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:focus {
    background-color: ${props => props.theme.states.focus};
  }
  &:hover {
    background-color: ${props => props.theme.states.focus};
  }
`;

const CharCounter = styled.div`
  padding-right: 8px;
  text-align: right;
  font-size: ${props => props.theme.font.extraSmall};
  color: ${props => props.theme.text.primary};
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${({$visible}) => $visible && css`
    opacity: 1;
  `}
`;


export default TaskCreatorModal;