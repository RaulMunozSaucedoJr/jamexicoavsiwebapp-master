import React, { useState, useEffect } from "react";
import ModalService from "./ModalService.js";
import styles from "./ModalRoot.module.css";

const ModalRoot = () => {
  const [modal, setModal] = useState({});
  useEffect(() => {
    ModalService.on("open", ({ component, props }) => {
      setModal({
        component,
        props,
        close: (value) => {
          setModal({});
        },
      });
    });
  }, []);

  const ModalComponent = modal.component ? modal.component : null;

  return (
    <>
      <section className={modal.component ? styles.modalRoot : ""}>
        {ModalComponent && (
          <ModalComponent
            {...modal.props}
            close={modal.close}
            className={ModalComponent ? "d-block" : ""}
          />
        )}
      </section>
    </>
  );
};

export default ModalRoot;
