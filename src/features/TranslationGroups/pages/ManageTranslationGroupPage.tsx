import React from "react";
import Tabs from "../../../components/Tabs";
import TranslationGroupForm, {
  TranslationGroupFormData,
} from "../components/TranslationGroupForm";
import BackButton from "../../../components/BackButton";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTranslationGroup,
  postTranslationGroup,
  putTranslationGroup,
} from "../api";

type TranslationGroupPageParam = {
  translationGroupId?: string;
};

const ManageTranslationGroupPage: React.FC = () => {
  const { t } = useTranslation("translationGroups");
  const { translationGroupId } = useParams<TranslationGroupPageParam>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: createGroup, isPending: isCreating } = useMutation({
    mutationFn: postTranslationGroup,
    onSuccess: (data) => {
      navigate(`/translation-groups/${data.translationGroupId}`);
    },
    onError: (error) => {
      //TODO: nice error handling.
      throw new Error("Translation group creation failed.");
    },
  });

  const { mutate: updateGroup, isPending: isUpdating } = useMutation({
    mutationFn: (formData: TranslationGroupFormData) =>
      putTranslationGroup(parseInt(translationGroupId!), formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["translationGroup", translationGroupId],
      });
    },
    onError: (error) => {
      throw new Error("Translation group update failed.");
    },
  });

  const handleSubmit = async (data: TranslationGroupFormData) => {
    if (!isEditing) {
      createGroup(data);
    } else {
      updateGroup(data);
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
              content:
                isGetPending && isEditing ? (
                  <div>Loading...</div>
                ) : (
                  <TranslationGroupForm
                    translationGroup={data}
                    onSubmit={handleSubmit}
                    isSubmitting={isCreating || isUpdating}
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
