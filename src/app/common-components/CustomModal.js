import React from "react";
import { Modal } from "react-bootstrap";


const CustomModal = (props) => {
  const {
    modalOpen,
    modalHide,
    modalTitle,
    modalCustomClass,
    modalFooter,
    PrimaryButton,
    SecondaryButton,
    modalBody,
    primaryBtnFunc,
    secondaryBtnFunc,
  } = props;
  return (
    <Modal 
    show={modalOpen} 
    onHide={modalHide}
    centered
    dialogClassName={modalCustomClass}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>{" "}
      </Modal.Header>
      <Modal.Body>{modalBody()}</Modal.Body>
      <Modal.Footer>
        <button class="solid-btn graybtn" onClick={secondaryBtnFunc}>
          {SecondaryButton}
        </button>
        <button class="solid-btn" onClick={primaryBtnFunc}>
          {PrimaryButton}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
