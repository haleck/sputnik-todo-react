import React, {FC, useState} from 'react';
import Modal from './Modal';
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
    const [closing, setClosing] = useState(false)
    const handleConfirm = () => {
        setClosing(true)
        setTimeout(()=>{
            setClosing(false)
            onConfirm()
        }, 300)
    };

    const handleCancel = () => {
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
                <StyledCancelButton onClick={handleCancel}>Отмена</StyledCancelButton>
            </StyledModalActions>
        </Modal>
    );
};

const StyledHeader = styled.h4`
  font-weight: 600;
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
`;

const StyledConfirmButton = styled(StyledButton)`
  background-color: var(--light-main-color);
  color: #fff;
  border: none;
  &:hover {
    background-color: var(--main-color);
  }
`;

const StyledCancelButton = styled(StyledButton)`
  background-color: #ccc;
  color: #000;
  border: none;
  &:hover {
    background-color: #b0b0b0;
  }
`;

export default ConfirmationModal;