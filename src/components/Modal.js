import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import Wizard from "./SignUpModal/Formik";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(33, 32, 32, 0.6) 0% 0% no-repeat padding-box;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 110;
`;

const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    position: relative;
    z-index: 120;
    border-radius: 10px;
    @media screen and (max-width: 525px){
        width: 95vw;
    }
`;

const ModalImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        margin-bottom: 1rem;
    }
    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`;

const CloseModalButton = styled.button`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;
function Modal({ showModal, setShowModal }) {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal) {
                setShowModal(false);
                console.log("I pressed");
            }
        },
        [setShowModal, showModal]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper showModal={showModal}>
                        {/* <ModalContent> */}
                        <Wizard />
                        {/* </ModalContent> */}
                        <CloseModalButton
                            aria-label="Close modal"
                            onClick={() => setShowModal((prev) => !prev)}
                        />
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    );
}

export default Modal;
