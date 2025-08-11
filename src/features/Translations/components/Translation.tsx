import { createContext, useCallback, useContext, useState } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import AutofillSearchBar from "../../Words/components/AutofillSearchBar";
import { Word } from "../../Words/models";
import { getFormLanguageOptions } from "../../Words/utils";
import { Option } from "../../Words/components/FormInput";
import { FaPlus } from "react-icons/fa";
import TranslationGroupPickerModal from "../../TranslationGroups/components/TranslationGroupPickerModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWordRelatedTranslationGroups } from "../../TranslationGroups/api";
import TranslationGroupCard from "../../TranslationGroups/components/TranslationGroupCard";
import { TranslationGroup } from "../../TranslationGroups/models";
import { postTranslation } from "../api";
import { Tooltip } from "../../../components/Tooltip";
import { Trans, useTranslation } from "react-i18next";

interface TranslationGroupContext {
  selectedTranslationGroups: TranslationGroup[];
  onToggleSelection: (translationGroup: TranslationGroup) => void;
  resetSelection: () => void;
}

const TranslationGroupContext = createContext<
  TranslationGroupContext | undefined
>(undefined);

interface TranslationGroupProviderProps {
  children: React.ReactNode;
}

export const TranslationGroupProvider: React.FC<
  TranslationGroupProviderProps
> = ({ children }) => {
  const [selectedTranslationGroups, setSelectedTranslationGroups] = useState<
    TranslationGroup[]
  >([]);

  const onToggleSelection = (translationGroup: TranslationGroup) => {
    setSelectedTranslationGroups((prev) => {
      const isTgSelected = prev.some(
        (tg) => tg.translationGroupId === translationGroup.translationGroupId
      );
      if (isTgSelected) {
        return prev.filter(
          (tg) => tg.translationGroupId !== translationGroup.translationGroupId
        );
      } else {
        return [...prev, translationGroup];
      }
    });
  };

  const resetSelection = useCallback(() => {
    setSelectedTranslationGroups([]);
  }, []);

  return (
    <TranslationGroupContext.Provider
      value={{ selectedTranslationGroups, onToggleSelection, resetSelection }}
    >
      {children}
    </TranslationGroupContext.Provider>
  );
};

export const useOptionalTranslationGroupContext = () =>
  useContext(TranslationGroupContext);

export const useTranslationGroupContext = () => {
  const context = useContext(TranslationGroupContext);

  if (context === undefined) {
    throw new Error(
      "Translation group context is required, but it was not provided."
    );
  }

  return context;
};

const Translation: React.FC = () => {
  const { t } = useTranslation("translation");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language1Id, setLanguage1Id] = useState<number>(0);
  const [language2Id, setLanguage2Id] = useState<number>(0);
  const [word1, setWord1] = useState<Word>();
  const [word2, setWord2] = useState<Word>();
  const [newlyLinkedTranslationGroups, setNewlyLinkedTranslationGroups] =
    useState<TranslationGroup[]>([]);

  const languageOptions1 = getFormLanguageOptions().map(
    (opts): Option => ({
      value: opts.value,
      name: t(`common:languages.${opts.name}`),
    })
  );
  let languageOptions2: Option[] = [];

  if (language1Id) {
    languageOptions2 = languageOptions1.filter(
      (lo) => lo.value !== language1Id
    );
  }

  function handleLanguage1Change(value: number) {
    setLanguage1Id(value);
    setWord1(undefined);

    if (value === 0 || value === language2Id) {
      setLanguage2Id(0);
      setWord2(undefined);
    }
  }

  function handleLanguage2Change(value: number) {
    setLanguage2Id(value);
    setWord2(undefined);
  }

  const isTranslationGroupQueryEnabled = !!word1?.wordId && !!word2?.wordId;

  const { data, isPending, isError } = useQuery({
    queryKey: ["word-related-translation-groups", word1?.wordId, word2?.wordId],
    queryFn: ({ signal }) =>
      getWordRelatedTranslationGroups(word1!.wordId, word2!.wordId, signal),
    enabled: isTranslationGroupQueryEnabled,
  });

  let translationGroupListContent: React.ReactNode;
  if (!isTranslationGroupQueryEnabled) {
    translationGroupListContent = <p>{t("translationGroupListPlaceholder")}</p>;
  } else if (isPending) {
    translationGroupListContent = <p>{t("getRelatedTranslationGroups")}</p>;
  } else if (isError) {
    translationGroupListContent = (
      <p>{t("errorGetRelatedTranslationGroups")}</p>
    );
  } else if (
    (!data ||
      (data.potentialTranslationGroups.length === 0 &&
        data.linkedTranslationGroups.length === 0)) &&
    newlyLinkedTranslationGroups.length === 0
  ) {
    translationGroupListContent = (
      <p>
        <Trans i18nKey="translation:noLinkedTranslationGroups">
          Looks like there are no translation groups linked to these words yet.
          <br />
          You can add a new translation group with the button below.
        </Trans>
      </p>
    );
  } else if (
    (data &&
      (data.potentialTranslationGroups.length > 0 ||
        data.linkedTranslationGroups.length > 0)) ||
    newlyLinkedTranslationGroups.length > 0
  ) {
    let potentialCards: React.ReactNode;
    let linkedCards: React.ReactNode;
    if (data) {
      const potentialTranslationGroups = data.potentialTranslationGroups.filter(
        (tg) =>
          !newlyLinkedTranslationGroups.some(
            (ltg) => ltg.translationGroupId === tg.translationGroupId
          )
      );

      potentialCards = potentialTranslationGroups.map((translationGroup) => (
        <TranslationGroupCard
          key={`translation-group-card-${translationGroup.translationGroupId}`}
          translationGroup={translationGroup}
          selectable
          onSelect={() => {
            setNewlyLinkedTranslationGroups((prev) => [
              ...prev,
              translationGroup,
            ]);
          }}
        />
      ));

      linkedCards = data.linkedTranslationGroups.map((translationGroup) => (
        <TranslationGroupCard
          key={`translation-group-card-${translationGroup.translationGroupId}`}
          translationGroup={translationGroup}
        />
      ));
    }

    const newlyLinkedCards = newlyLinkedTranslationGroups.map(
      (translationGroup) => (
        <TranslationGroupCard
          key={`translation-group-card-${translationGroup.translationGroupId}`}
          translationGroup={translationGroup}
          selectable
          selected
          onSelect={() => {
            setNewlyLinkedTranslationGroups((prev) =>
              prev.filter(
                (tg) =>
                  tg.translationGroupId !== translationGroup.translationGroupId
              )
            );
          }}
        />
      )
    );

    translationGroupListContent = (
      <>
        <h2 className="font-bold">{t("potentialTranslationGroups")}</h2>
        {potentialCards}
        <div className="flex gap-1">
          <h2 className="font-bold">{t("linkedTranslationGroups")}</h2>
          <Tooltip text={t("linkedTranslationGroupTooltip")} />
        </div>
        {linkedCards}
        {newlyLinkedCards}
      </>
    );
  }

  const handleAddTranslationGroup = (translationGroups: TranslationGroup[]) => {
    setNewlyLinkedTranslationGroups((prev) => {
      const notYetLinkedTranslationGroups = translationGroups.filter(
        (tg) =>
          !prev.some((ltg) => ltg.translationGroupId === tg.translationGroupId)
      );
      return [...prev, ...notYetLinkedTranslationGroups];
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center font-bold text-3xl pb-10 pt-5">
        {t("addTitle")}
      </h1>
      <div className="flex justify-between">
        <div className="flex flex-col ml-10 gap-2">
          <h2>{t("source")}</h2>
          <Dropdown
            options={languageOptions1}
            hasEmptyElement={true}
            onChange={handleLanguage1Change}
            extraStyle="w-28"
          />
          <AutofillSearchBar languageId={language1Id} onFill={setWord1} />
        </div>
        <div className="flex flex-col mr-10 gap-2">
          <h2>{t("translation")}</h2>
          <Dropdown
            options={languageOptions2}
            hasEmptyElement={true}
            onChange={handleLanguage2Change}
            extraStyle="w-28"
            isDisabled={!language1Id}
          />
          <AutofillSearchBar languageId={language2Id} onFill={setWord2} />
        </div>
      </div>
      <div className="flex flex-col w-2/3 m-5 gap-4">
        {translationGroupListContent}
        <Button
          extraStyle="flex items-center gap-2 justify-center w-2/4"
          onClick={() => setIsModalOpen(true)}
          isDisabled={!word1?.wordId || !word2?.wordId}
        >
          <FaPlus /> {t("addTranslationGroupButton")}
        </Button>
        <TranslationGroupProvider>
          <TranslationGroupPickerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddTranslationGroup={handleAddTranslationGroup}
          />
        </TranslationGroupProvider>
      </div>
      <Button
        extraStyle="block mx-auto my-5"
        onClick={async () => {
          await postTranslation({
            sourceWordId: word1!.wordId,
            targetWordId: word2!.wordId,
            linkedTranslationGroups: newlyLinkedTranslationGroups,
          });

          setNewlyLinkedTranslationGroups([]);

          useQueryClient().invalidateQueries({
            queryKey: [
              "word-related-translation-groups",
              word1?.wordId,
              word2?.wordId,
            ],
          });
        }}
        isDisabled={
          !word1 || !word2 || newlyLinkedTranslationGroups.length === 0
        }
      >
        {t("addButton")}
      </Button>
    </>
  );
};

export default Translation;
