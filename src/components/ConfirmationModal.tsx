import React, {FC, useState} from 'react';
import Modal from '@ui/Modal';
import styled from 'styled-components';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
        title,
        message,
        onConfirm,
        onCancel,
    }) => {
    const [closing, setClosing] = useState<boolean>(false)
    const handleConfirm = (): void => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            onConfirm()
        }, 300)
    };

    const handleCancel = (): void => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            onCancel()
        }, 300)
    }

    return (
        <Modal onClose={onCancel} isVisible={!closing}>
            <StyledHeader>{title}</StyledHeader>
            <p>{message}</p>
            <StyledModalActions>
                <StyledConfirmButton onClick={handleConfirm}>
                    Подтвердить
                </StyledConfirmButton>
                <StyledCancelButton onClick={handleCancel}>
                    Отмена
                </StyledCancelButton>
            </StyledModalActions>
        </Modal>
    );
};

const StyledHeader = styled.h4`
  font-weight: 600;
  color: ${props => props.theme.text.primary};
`;

const StyledModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: ${props => props.theme.font.regular};
`;

const StyledConfirmButton = styled(StyledButton)`
  background-color: ${props => props.theme.primary.light};
  color: #fff;
  border: none;

  &:hover {
    background-color: ${props => props.theme.primary.main};
  }
`;

const StyledCancelButton = styled(StyledButton)`
  background-color: ${props => props.theme.states.hover};
  color: ${props => props.theme.text.primary};
  border: none;

  &:hover {
    background-color: ${props => props.theme.states.disabled};
  }
`;


export default ConfirmationModal;