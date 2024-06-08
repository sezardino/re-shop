import { ModalWithDescription } from "@/components/UI/ModalWithDescription";
import { NewProductForm } from "@/components/forms/NewProduct/NewProductForm";
import { ProjectUrls } from "@/const";
import { useRouter } from "next/router";
import { FC } from "react";

export type NewProductTemplateProps = {};

export const NewProductTemplate: FC<NewProductTemplateProps> = (props) => {
  const router = useRouter();

  return (
    <>
      <main />
      <ModalWithDescription
        isOpen
        onClose={() => undefined}
        title="Add new product to list"
        description="Here you can add new product, what will be displayed in products list"
        size="lg"
        hideCloseButton
      >
        <NewProductForm
          onCancelClick={() => router.push(ProjectUrls.home)}
          onFormSubmit={() => undefined}
        />
      </ModalWithDescription>
    </>
  );
};
