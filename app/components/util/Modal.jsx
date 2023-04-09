// This code is a modal component that displays a dialog box that
// covers the entire screen. The dialog box is centered on the screen
// and can be closed by clicking on the backdrop.

function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog
        className="modal"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}

export default Modal;
