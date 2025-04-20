import { twMerge } from "tailwind-merge";

type ButtonType = React.ComponentPropsWithoutRef<"button"> & {
  state?: ButtonState;
};

type ButtonState = "default" | "outline" | "hover";

export default function Button(props: ButtonType) {
  const { className, children, state = "default", ...rest } = props;
  const buttonStyle: { default: string; outline: string; hover: string } = {
    default: "button-style-default",
    outline: "button-style-outline",
    hover: "button-style-hover",
  };
  return (
    <>
      <button className={twMerge(buttonStyle[state], className)} {...rest}>
        {children}
      </button>
    </>
  );
}
