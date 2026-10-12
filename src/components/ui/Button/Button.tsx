import type { ReactNode } from "react";
import styles from "./Button.module.scss";

export function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
