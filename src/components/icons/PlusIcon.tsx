import React from "react";

type Props = {
  className?: string;
  danger?: boolean;
};

const PlusIcon = ({ className, danger = false }: Props) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.83337 7.99992H8.50004M13.1667 7.99992H8.50004M8.50004 7.99992V3.33325M8.50004 7.99992V12.6666"
        stroke={danger ? "#e6001f" : "#24292E"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
