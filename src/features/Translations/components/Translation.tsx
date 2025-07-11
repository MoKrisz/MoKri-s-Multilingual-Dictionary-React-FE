import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import AutofillSearchBar from "../../Words/components/AutofillSearchBar";
import { Word } from "../../Words/models";
import { getFormLanguageOptions } from "../../Words/utils";
import { Option } from "../../Words/components/FormInput";
import { FaPlus } from "react-icons/fa";
import TranslationGroupPickerModal from "../../TranslationGroups/components/TranslationGroupPickerModal";
import { useQuery } from "@tanstack/react-query";
import { getWordRelatedTranslationGroups } from "../../TranslationGroups/api";
import TranslationGroupCard from "../../TranslationGroups/components/TranslationGroupCard";
import { TranslationGroup } from "../../TranslationGroups/models";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language1Id, setLanguage1Id] = useState<number>(0);
  const [language2Id, setLanguage2Id] = useState<number>(0);
  const [word1, setWord1] = useState<Word>();
  const [word2, setWord2] = useState<Word>();
  const [linkedTranslationGroups, setLinkedTranslationGroups] = useState<
    TranslationGroup[]
  >([]);

  const languageOptions1 = getFormLanguageOptions();
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
    translationGroupListContent = (
      <p>
        Once the words are selected, all of the related translation groups will
        show up here.
      </p>
    );
  } else if (isPending) {
    translationGroupListContent = (
      <p>
        Trying to fetch translation groups that are related to the selected
        words...
      </p>
    );
  } else if (isError) {
    translationGroupListContent = (
      <p>An error happened while fetching the translation groups.</p>
    );
  } else if (
    (!data || data.length === 0) &&
    linkedTranslationGroups.length === 0
  ) {
    translationGroupListContent = (
      <p>
        Looks like there are no translation groups linked to these words yet.
        <br />
        You can add a new translation group with the button below.
      </p>
    );
  } else if ((data && data.length >= 0) || linkedTranslationGroups.length > 0) {
    const linkedCards = linkedTranslationGroups.map((translationGroup) => (
      <TranslationGroupCard
        key={`translation-group-card-${translationGroup.translationGroupId}`}
        translationGroup={translationGroup}
        selectable
        selected
        onSelect={() => {
          setLinkedTranslationGroups((prev) =>
            prev.filter(
              (tg) =>
                tg.translationGroupId !== translationGroup.translationGroupId
            )
          );
        }}
      />
    ));

    const potentialCards = data ? (
      data
        .filter(
          (tg) =>
            !linkedTranslationGroups.some(
              (ltg) => ltg.translationGroupId === tg.translationGroupId
            )
        )
        .map((translationGroup) => (
          <TranslationGroupCard
            key={`translation-group-card-${translationGroup.translationGroupId}`}
            translationGroup={translationGroup}
            selectable
            onSelect={() => {
              setLinkedTranslationGroups((prev) => [...prev, translationGroup]);
            }}
          />
        ))
    ) : (
      <></>
    );

    translationGroupListContent = (
      <>
        <h2 className="font-bold">Potential translation groups</h2>
        {potentialCards}
        <h2 className="font-bold">Linked translation groups</h2>
        {linkedCards}
      </>
    );
  }

  const handleAddTranslationGroup = (translationGroups: TranslationGroup[]) => {
    setLinkedTranslationGroups((prev) => {
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
        Add Translation
      </h1>
      <div className="flex justify-between">
        <div className="flex flex-col ml-10 gap-3">
          <h2>Word to be translated</h2>
          <Dropdown
            options={languageOptions1}
            hasEmptyElement={true}
            onChange={handleLanguage1Change}
            extraStyle="w-28"
          />
          <AutofillSearchBar languageId={language1Id} onFill={setWord1} />
        </div>
        <div className="flex flex-col mr-10 gap-3">
          <h2>Translation</h2>
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
      <div className="flex flex-col border border-red-700 w-2/3 m-5 gap-4">
        {translationGroupListContent}
        <Button
          extraStyle="flex items-center gap-2 justify-center w-2/4"
          onClick={() => setIsModalOpen(true)}
          isDisabled={!word1?.wordId || !word2?.wordId}
        >
          <FaPlus /> Select other translation group
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
        onClick={() => {
          console.log("L1: ", word1?.wordId);
          console.log("L2: ", word2?.wordId);
        }}
        isDisabled={!word1 || !word2}
      >
        Link words
      </Button>
    </>
  );
};

export default Translation;
