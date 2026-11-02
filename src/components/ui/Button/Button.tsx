import type { ReactNode } from "react";
import styles from "./Button.module.scss";

export function Button({
  children,
  onClick,
  classNames,
  type,
}: {
  children: ReactNode;
  onClick?: () => void;
  classNames?: string[];
  type?: "submit" | "button" | "reset";
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${classNames?.join(" ")}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
