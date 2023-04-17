import React, { Children } from "react";

const ModalComponent = ({ children }) => {
  return (
    <>
      <div className="modal fade" tabIndex="-1" aria-hidden="true" id="Modal">
        <div className="modal-dialog">
          <div className="modal-content">{Children.toArray(children)}</div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
