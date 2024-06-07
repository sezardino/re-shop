import {
  FormEvent,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { useDebouncedValue } from "@/hooks";
import { useWatchEffect } from "@/hooks/use-watch-effect";

import { Icon } from "@/components/base/Icon/Icon";

import { Input, InputProps } from "@nextui-org/react";

type OmittedProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export type SearchFormProps = OmittedProps & {
  placeholder?: string;
  onSearch: (value: string) => void;
  initialValue?: string;
  size?: InputProps["size"];
  variant?: InputProps["variant"];
  isDisabled?: boolean;
};

const MIN_SEARCH_LENGTH = 3;

export const SearchForm: FC<SearchFormProps> = (props) => {
  const {
    isDisabled,
    autoFocus,
    onSearch,
    placeholder,
    size = "sm",
    variant,
    initialValue = "",
    ...rest
  } = props;
  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue] = useDebouncedValue(value, 500);

  const isSubmitted = useRef(false);
  const submitResetTimer = useRef<NodeJS.Timeout | null>(null);

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isSubmitted.current) return;
    if (value.length < MIN_SEARCH_LENGTH) return onSearch("");
    if (value === debouncedValue) return;

    onSearch(value);
    isSubmitted.current = true;
  };

  useWatchEffect(() => {
    if (isSubmitted.current) return;
    if (value.length < MIN_SEARCH_LENGTH) return onSearch("");

    onSearch(debouncedValue);
    isSubmitted.current = true;
  }, [debouncedValue]);

  useWatchEffect(() => {
    if (submitResetTimer.current) clearTimeout(submitResetTimer.current);

    submitResetTimer.current = setTimeout(() => {
      isSubmitted.current = false;
    }, 500);
  }, [isSubmitted.current]);

  const resetButton = (
    <button
      type="reset"
      onClick={() => setValue("")}
      className="cursor-pointer p-2"
    >
      <Icon name="HiX" size={12} />
    </button>
  );

  return (
    <form {...rest} onSubmit={submitHandler}>
      <Input
        aria-label={placeholder}
        variant={variant}
        isDisabled={isDisabled}
        autoFocus={autoFocus}
        endContent={
          value ? (
            resetButton
          ) : (
            <Icon
              name="FiSearch"
              size={20}
              className="cursor-text text-default-400"
            />
          )
        }
        placeholder={placeholder}
        value={value}
        onValueChange={(value) => setValue(value)}
        size={size}
      />
    </form>
  );
};
