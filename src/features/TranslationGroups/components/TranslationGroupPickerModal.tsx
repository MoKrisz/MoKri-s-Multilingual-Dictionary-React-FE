import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import TranslationGroupForm from "./TranslationGroupForm";

interface TranslationGroupPickerModal {
  isOpen: boolean;
  onClose: () => void;
}

const TranslationGroupPickerModal: React.FC<TranslationGroupPickerModal> = ({
  isOpen,
  onClose,
}) => {
  const [isCreationView, setIsCreationView] = useState(false);

  let modalBody: React.ReactNode;

  if (isCreationView) {
    modalBody = (
      <>
        <Button
          onClick={() => {
            setIsCreationView(false);
          }}
        >
          Back
        </Button>
        <TranslationGroupForm />
      </>
    );
  } else {
    modalBody = (
      <>
        OData implementation goes here.
        <div className="justify-items-center">
          <p className="p-2 italic">
            If you couldn't find the translation group you're searching for,
            maybe it doesn't exist yet.
          </p>
          <Button
            onClick={() => {
              setIsCreationView(true);
            }}
            extraStyle="bg-lincolngreendarker"
          >
            Add another word!
          </Button>
        </div>
      </>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalBody}
    </Modal>
  );
};

export default TranslationGroupPickerModal;
