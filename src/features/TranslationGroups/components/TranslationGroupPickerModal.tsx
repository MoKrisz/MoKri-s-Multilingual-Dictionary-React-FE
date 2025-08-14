import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import TranslationGroupForm from "./TranslationGroupForm";
import TranslationGroupOData from "./TranslationGroupOData";
import { useTranslationGroupContext } from "../../Translations/components/Translation";
import { TranslationGroup } from "../models";
import { queryClient } from "../../Words/api";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("translationGroups");
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
          {t("common:back")}
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
        <div>
          <h1 className="font-bold text-2xl">{t("list")}</h1>
          <TranslationGroupOData shouldDisplayCheckbox={true} />
        </div>
        <Button
          onClick={() => {
            onAddTranslationGroup(selectedTranslationGroups);
            resetSelection();
          }}
          isDisabled={selectedTranslationGroups.length === 0}
        >
          {t("select")}
        </Button>
        <div className="justify-items-center">
          <p className="p-2 italic">
            {t("translationGroupNotFoundSuggestion")}
          </p>
          <Button
            onClick={() => {
              setIsCreationView(true);
            }}
          >
            {t("createTitle")}
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
      extraStyle="w-2/3 max-w-3xl"
    >
      {modalBody}
    </Modal>
  );
};

export default TranslationGroupPickerModal;
