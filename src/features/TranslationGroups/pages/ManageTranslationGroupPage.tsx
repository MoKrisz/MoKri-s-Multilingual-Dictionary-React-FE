import React from "react";
import Tabs from "../../../components/Tabs";
import TranslationGroupForm, {
  TranslationGroupFormData,
} from "../components/TranslationGroupForm";
import BackButton from "../../../components/BackButton";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTranslationGroup, postTranslationGroup } from "../api";

type TranslationGroupPageParam = {
  translationGroupId?: string;
};

const ManageTranslationGroupPage: React.FC = () => {
  const { t } = useTranslation("translationGroups");
  const { translationGroupId } = useParams<TranslationGroupPageParam>();
  const navigate = useNavigate();

  const isEditing = !!translationGroupId;

  const {
    data,
    isPending: isGetPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["translationGroup", translationGroupId],
    queryFn: ({ signal }) => getTranslationGroup(translationGroupId!, signal),
    staleTime: 120000,
    enabled: isEditing,
  });

  const handleSubmit = async (data: TranslationGroupFormData) => {
    if (!isEditing) {
      const { translationGroupId } = await postTranslationGroup(data);
      navigate(`/translation-groups/${translationGroupId}`);
    } else {
      //TODO: call PUT endpoint.
    }
  };

  return (
    <>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <BackButton returnTo="/translation-groups" />
        <Tabs
          tabs={[
            {
              key: "translation-group",
              label: t("translationGroup"),
              content: (!isGetPending || !isEditing) && (
                <TranslationGroupForm
                  translationGroup={data}
                  onSubmit={handleSubmit}
                  isSubmitting={false}
                />
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default ManageTranslationGroupPage;
