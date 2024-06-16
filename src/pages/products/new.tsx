import { LoadingOverlay } from "@/components/UI/LoadingOverlay";
import { NewProductFormValues } from "@/components/forms/NewProduct/NewProductForm";
import { NewProductTemplate } from "@/components/templates/NewProduct/NewProductTemplate";
import { ProjectUrls } from "@/const";
import { useCreateProductMutation } from "@/hooks";
import { useRouter } from "next/router";

const NewProductPage = () => {
  const router = useRouter();

  const { mutateAsync: createProduct, isPending } = useCreateProductMutation();

  const createProductHandler = async (product: NewProductFormValues) => {
    await createProduct(product);
    router.push(ProjectUrls.home);
  };

  return (
    <>
      {isPending && <LoadingOverlay />}

      <NewProductTemplate onCreateProduct={createProductHandler} />
    </>
  );
};

export default NewProductPage;
