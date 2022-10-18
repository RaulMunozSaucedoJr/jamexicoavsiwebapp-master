import React from "react";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader"
import ModalFooter from "./ModalFooter"

const ModalTest = (props) => {
  return (
    <>
      <Modal>
        <ModalHeader>HOLA</ModalHeader>
        <ModalBody>
          <p>HOLA</p>
        </ModalBody>
        <ModalFooter>
          <button onClick={props.close} className="btn btn-primary">
            Close Modal
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalTest;
