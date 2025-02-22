import React, { FC, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    isVisible?: boolean
    delay?: number
}

const Modal: FC<ModalProps> = ({children, onClose, isVisible, delay}) => {
    const [closing, setClosing] = useState<boolean>(false);

    const handleOverlayClick = (event: React.MouseEvent): void => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const closeModal = (): void => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, delay || 300);
    };

    useEffect(() => {
        if (isVisible) {
            setClosing(false)
        } else {
            setClosing(true)
        }
    }, [isVisible]);

    return (
        <StyledModalOverlay $closing={closing} onClick={handleOverlayClick}>
            <StyledModalContent $closing={closing}>
                {children}
            </StyledModalContent>
        </StyledModalOverlay>
    );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-20px);
  }
`;

const StyledModalOverlay = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.3s forwards;
`;

const StyledModalContent = styled.div<{ $closing: boolean }>`
  background-color: ${props => props.theme.background.content};
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  animation: ${({ $closing }) => ($closing ? slideOut : slideIn)} 0.3s forwards;
`;


export default Modal;