import { cn } from "@/lib/utils";
import { ButtonType } from "@/typings/enums";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  buttonType: ButtonType;
  className?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  buttonType,
  className,
  disabled = false,
  ...props
}: Props) => {
  let buttonStyle: string;

  switch (buttonType) {
    case ButtonType.ACTIVE:
      buttonStyle = "border-[#E1E4E8] text-black";
      break;
    case ButtonType.SUBMIT:
      buttonStyle = "border-[#1E874B] text-white bg-[#00AA45]";
      break;
    default:
      buttonStyle = "";
  }

  return (
    <button
      disabled={disabled}
      className={cn(
        "flex items-center gap-1 text-sm px-4 py-[6px] border rounded-xl w-fit",
        disabled ? "opacity-60" : "",
        buttonStyle,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
