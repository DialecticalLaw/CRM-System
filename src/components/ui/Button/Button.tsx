import type { ReactNode } from "react";
import styles from "./Button.module.scss";

export function Button({
  children,
  onClick,
  classNames,
}: {
  children: ReactNode;
  onClick: () => void;
  classNames?: string[];
}) {
  return (
    <button
      className={`${styles.btn} ${classNames?.join(" ")}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
