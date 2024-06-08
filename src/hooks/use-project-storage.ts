import { HomeGridLayout } from "@/components/templates/Home/HomeTemplate";
import useLocalStorage from "use-local-storage";

export type LocalStorageEntity = {
  homeGrid: HomeGridLayout;
};

const LOCAL_STORAGE_NAME = "RE_STORE_STORAGE";

export const useProjectStorage = () => {
  const [storage, setStorage] = useLocalStorage<LocalStorageEntity>(
    LOCAL_STORAGE_NAME,
    {} as LocalStorageEntity
  );

  const changeStorageField = <Key extends keyof LocalStorageEntity>(
    field: Key,
    value: LocalStorageEntity[Key]
  ) => {
    setStorage({
      ...storage,
      [field]: value,
    });
  };

  return {
    storage,
    changeStorageField,
    changeStorageFields: setStorage,
  };
};

export const useProjectStorageField = <Key extends keyof LocalStorageEntity>(
  field: Key
) => {
  const { storage, changeStorageField } = useProjectStorage();

  return [
    storage[field],
    (value: LocalStorageEntity[Key]) => changeStorageField(field, value),
  ] as const;
};
