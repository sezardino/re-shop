import { Input, InputProps } from "@nextui-org/react";
import { useField } from "formik";
import { FC } from "react";

type Props = {
  name: string;
};

type OmittedInputProps = Omit<
  InputProps,
  "value" | "onChange" | "isInvalid" | "errorMessage"
>;

export type FormikInputProps = OmittedInputProps & Props;

export const FormikInput: FC<FormikInputProps> = (props) => {
  const { name, ...rest } = props;
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error ? meta.error : undefined;

  return (
    <Input {...rest} {...field} isInvalid={!!error} errorMessage={error} />
  );
};
