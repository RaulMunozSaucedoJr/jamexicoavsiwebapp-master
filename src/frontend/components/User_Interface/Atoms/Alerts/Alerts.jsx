import React from "react";

const Alerts = ({clasName, text, textStrong, role }) => {
  return (
    <>
      <div class={clasName} role={role}>
        <strong>{textStrong}</strong> {text}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
};

export default Alerts;
