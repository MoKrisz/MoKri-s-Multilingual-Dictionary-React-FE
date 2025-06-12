import Modal from "../../../components/Modal";

interface TranslationGroupPickerModal {
  isOpen: boolean;
  onClose: () => void;
}

const TranslationGroupPickerModal: React.FC<TranslationGroupPickerModal> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      Something goes here.
    </Modal>
  );
};

export default TranslationGroupPickerModal;
