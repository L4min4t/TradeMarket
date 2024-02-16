import React, {ReactNode} from 'react';
import {CloseButton, ModalContainer, ModalOverlay} from "./styles";

interface ModalProps {
    width: string;
    height: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({width, height, onClose, children}: ModalProps) => {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={e => e.stopPropagation()} style={{width, height}}>
                <CloseButton className="modal-close-button" onClick={onClose}>×</CloseButton>
                {children}
            </ModalContainer>
        </ModalOverlay>
    );
};

export default Modal;
