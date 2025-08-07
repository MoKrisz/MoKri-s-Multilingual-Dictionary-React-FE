import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import TranslationGroupForm from "./TranslationGroupForm";
import TranslationGroupOData from "./TranslationGroupOData";
import { useTranslationGroupContext } from "../../Translations/components/Translation";
import { TranslationGroup } from "../models";
import { queryClient } from "../../Words/api";

interface TranslationGroupPickerModal {
  isOpen: boolean;
  onClose: () => void;
  onAddTranslationGroup: (translationGroups: TranslationGroup[]) => void;
}

const TranslationGroupPickerModal: React.FC<TranslationGroupPickerModal> = ({
  isOpen,
  onClose,
  onAddTranslationGroup,
}) => {
  const [isCreationView, setIsCreationView] = useState(false);
  const { selectedTranslationGroups, resetSelection } =
    useTranslationGroupContext();

  let modalBody: React.ReactNode;

  if (isOpen && isCreationView) {
    modalBody = (
      <>
        <Button
          onClick={() => {
            setIsCreationView(false);
          }}
        >
          Back
        </Button>
        <TranslationGroupForm
          onSuccessCallback={(translationGroup) => {
            queryClient.invalidateQueries({ queryKey: ["translationGroup"] });
            onAddTranslationGroup([translationGroup]);
          }}
        />
      </>
    );
  } else if (isOpen) {
    modalBody = (
      <>
        <div className="w-full">
          <h1 className="font-bold text-2xl">Translation groups</h1>
          <TranslationGroupOData />
        </div>
        <Button
          onClick={() => {
            onAddTranslationGroup(selectedTranslationGroups);
            resetSelection();
          }}
          isDisabled={selectedTranslationGroups.length === 0}
        >
          Select translation groups
        </Button>
        <div className="justify-items-center">
          <p className="p-2 italic">
            If you couldn't find the translation group you're searching for,
            maybe it doesn't exist yet.
          </p>
          <Button
            onClick={() => {
              setIsCreationView(true);
            }}
          >
            Add new Translation group
          </Button>
        </div>
      </>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsCreationView(false);
      }}
    >
      {modalBody}
    </Modal>
  );
};

export default TranslationGroupPickerModal;
