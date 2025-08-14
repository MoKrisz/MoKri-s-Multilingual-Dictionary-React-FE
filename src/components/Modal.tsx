import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  extraStyle?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  extraStyle,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalDocumentElement = document.getElementById("modal");

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
      className={twMerge(
        "rounded-lg shadow-lg border border-border-secondary bg-background-secondary backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        extraStyle
      )}
    >
      <div className="flex justify-end p-1">
        <Button extraStyle="p-1" onClick={onClose}>
          <CgClose />
        </Button>
      </div>
      <div className="mx-4 mb-4">{children}</div>
    </dialog>,
    modalDocumentElement
  );
};

export default Modal;
