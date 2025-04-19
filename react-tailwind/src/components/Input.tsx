import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

type OnlyLiterals<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

type ReactInputs = OnlyLiterals<HTMLInputTypeAttribute>;

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type?: Exclude<ReactInputs, "checkbox" | "range">;
};

export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <>
      <input
        type="text"
        placeholder="please type..."
        className={twMerge(
          "w-[240px] h-[48px] border border-[#4f4f4f bg-white rounded-[8px] px-[12px] py-[8px]",
          className
        )}
        {...rest}
      />
    </>
  );
}
