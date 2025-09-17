import { Link } from "react-router-dom";
import ODataContainer from "../../../components/ODataContainer";
import { getTranslationGroups } from "../api";
import { useSearchTranslationGroupReducer } from "../state/searchTranslationGroupReducer";
import TranslationGroupODataCardList from "./TranslationGroupODataCardList";
import TranslationGroupODataSearchBar from "./TranslationGroupODataSearchBar";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";
import { createContext, useContext } from "react";

interface TranslationGroupContext {
  shouldUseGridLayout: boolean;
  shouldDisplayCheckbox: boolean;
}

interface TranslationGroupODataProps {
  shouldHaveNavigationalAddButton?: boolean;
  shouldUseGridForDisplay?: boolean;
  shouldDisplayCheckbox?: boolean;
}

const TranslationGroupODataGridContext = createContext<TranslationGroupContext>(
  { shouldUseGridLayout: false, shouldDisplayCheckbox: true }
);

export const useTranslationGroupODataGridContext = () =>
  useContext(TranslationGroupODataGridContext);

interface TranslationGroupODataGridProviderProps {
  shouldUseGridLayout: boolean;
  shouldDisplayCheckbox: boolean;
  children: React.ReactNode;
}

export const TranslationGroupODataGridProvider: React.FC<
  TranslationGroupODataGridProviderProps
> = ({ shouldUseGridLayout, shouldDisplayCheckbox, children }) => {
  return (
    <TranslationGroupODataGridContext.Provider
      value={{
        shouldUseGridLayout: shouldUseGridLayout,
        shouldDisplayCheckbox: shouldDisplayCheckbox,
      }}
    >
      {children}
    </TranslationGroupODataGridContext.Provider>
  );
};

const TranslationGroupOData: React.FC<TranslationGroupODataProps> = ({
  shouldHaveNavigationalAddButton = false,
  shouldUseGridForDisplay = false,
  shouldDisplayCheckbox = false,
}) => {
  const { t } = useTranslation();

  const renderToolbarActions = () => {
    return (
      <Link to="new">
        <Button extraStyle="py-1">
          <p className="whitespace-nowrap">{t("createNew")}</p>
        </Button>
      </Link>
    );
  };

  return (
    <TranslationGroupODataGridProvider
      shouldUseGridLayout={shouldUseGridForDisplay}
      shouldDisplayCheckbox={shouldDisplayCheckbox}
    >
      <ODataContainer
        queryKeyName="translationGroup"
        fetchData={getTranslationGroups}
        useSearchReducer={useSearchTranslationGroupReducer}
        SearchComponent={TranslationGroupODataSearchBar}
        DisplayComponent={TranslationGroupODataCardList}
        renderToolbarActions={
          shouldHaveNavigationalAddButton ? renderToolbarActions : undefined
        }
      />
    </TranslationGroupODataGridProvider>
  );
};

export default TranslationGroupOData;
