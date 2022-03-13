import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const Sentiment = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = async (e) => {
    e.stopPropagation();
    setOpenModal(!openModal);
  };
  return (
    <Modal isOpen={openModal} toggle={toggleModal}>
      <ModalHeader
        toggle={toggleModal}
        style={{ backgroundColor: "#a0aecdb0", color: "#FFFFFF" }}
      >
        Word Cloud
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            height: "auto",
            width: "470px",
            display: "block",
            justifyContent: "center",
            backgroundColor: "#9c9c9c21",
            marginRight: "150px",
          }}
        >
          hi
        </div>
      </ModalBody>
    </Modal>
  );
};
export default Sentiment;
