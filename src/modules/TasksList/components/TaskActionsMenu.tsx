import React, {FC} from 'react';
import styled from "styled-components";

const StyledActionsMenu = styled.div`
  position: absolute;
  top: ${({top})=> top };
  left: ${(left)=> left };
  z-index: 100;
  user-select: none;
  background-color: var(--elements-background-color);
  border: 1px solid var(--content-background-color);
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  gap: 5px;
  & button {
    font-size: var(--extra-small-font-size);
    background-color: transparent;
    color: var(--text-color);
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
`

interface TaskActionsMenuProps {
    position: {
        top: number
        left: number
    }
    onDelete: () => void
}

const TaskActionsMenu: FC<TaskActionsMenuProps> = ({position, onDelete}) => {
    return (
        <StyledActionsMenu
            data-role={'actions'}
            top={position.top}
            left={position.left}
        >
            <button onClick={onDelete}>Удалить</button>
        </StyledActionsMenu>
    );
};

export default TaskActionsMenu;