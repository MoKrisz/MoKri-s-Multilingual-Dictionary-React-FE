import TranslationGroupOData from "../components/TranslationGroupOData";

const TranslationGroupListPage: React.FC = () => {
  return (
    <section className="w-2/3 flex justify-self-center mt-14">
      <TranslationGroupOData
        shouldHaveNavigationalAddButton
        shouldUseGridForDisplay={true}
      />
    </section>
  );
};

export default TranslationGroupListPage;
