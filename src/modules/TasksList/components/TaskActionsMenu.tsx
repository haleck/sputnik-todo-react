import React, {FC} from 'react';
import styled from "styled-components";
import {Position} from "../types/ActionsMenu";

interface TaskActionsMenuProps {
    position: Position
    onDelete: () => void
}

const TaskActionsMenu: FC<TaskActionsMenuProps> = ({position, onDelete}) => {
    return (
        <StyledActionsMenu
            data-role={'actions'}
            $top={position.top}
            $left={position.left}
        >
            <StyledButton onClick={onDelete}>
                Удалить
            </StyledButton>
        </StyledActionsMenu>
    );
};

const StyledActionsMenu = styled.div<{ $top: number, $left: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  z-index: 100;
  user-select: none;
  background-color: var(--elements-background-color);
  border: 1px solid var(--content-background-color);
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`

const StyledButton = styled.button`
  font-size: var(--extra-small-font-size);
  background-color: transparent;
  color: var(--text-color);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
`

export default TaskActionsMenu;