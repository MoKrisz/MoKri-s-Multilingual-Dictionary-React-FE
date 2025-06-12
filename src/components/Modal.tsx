import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import Button from "./Button";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalDocumentElement = document.getElementById("modal");

  console.log("open?", isOpen);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) {
      return;
    }

    if (isOpen && !modalElement.open) {
      modalElement.showModal();
    } else if (!isOpen && modalElement.open) {
      modalRef.current.close();
    }
  }, [isOpen, onClose]);

  if (!modalDocumentElement) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onClose}
      className="w-2/3 rounded-lg shadow-lg border border-gray-300 bg-lincolngreen backdrop:bg-black/50"
    >
      <div className="flex justify-end p-1">
        <Button
          extraStyle="p-1 bg-lincolngreendarker hover:bg-lincolngreenlighter"
          onClick={onClose}
        >
          <CgClose />
        </Button>
      </div>
      <div className="mx-4 mb-4">{children}</div>
    </dialog>,
    modalDocumentElement
  );
};

export default Modal;
