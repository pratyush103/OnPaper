import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const Toasts = ({ toastType, toastContent, autohide, onClose }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    return (
        <Toast bg={toastType} onClose={handleClose} show={show} autohide={autohide} delay={autohide ? 5000 : undefined}>
            <Toast.Header>
                <strong className="me-auto">{toastContent.Header}</strong>
            </Toast.Header>
            <Toast.Body>{toastContent.Message}</Toast.Body>
        </Toast>
    );
};

export default Toasts;