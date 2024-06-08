import { Autocomplete, AutocompleteProps } from "@nextui-org/react";
import { useField } from "formik";

type Props = {
  name: string;
  onAfterChange?: (key: string) => void;
};

type OmittedAutocompleteProps<T extends object> = Omit<
  AutocompleteProps<T>,
  "selectedKey" | "onSelectionChange" | "isInvalid" | "errorMessage"
>;

export type FormikAutocompleteProps<T extends object> =
  OmittedAutocompleteProps<T> & Props;

export const FormikAutocomplete = <T extends object>(
  props: FormikAutocompleteProps<T>
) => {
  const { name, onAfterChange, ...rest } = props;
  const [field, meta, helper] = useField(name);

  const error = meta.touched && meta.error ? meta.error : undefined;

  const changeHandler = (key: string) => {
    helper.setValue(key);
    helper.setTouched(true);

    if (!onAfterChange) return;

    onAfterChange(key);
  };

  return (
    <Autocomplete
      {...rest}
      selectedKey={field.value}
      onSelectionChange={(key) => changeHandler(key as string)}
      isInvalid={!!error}
      errorMessage={error}
    />
  );
};
