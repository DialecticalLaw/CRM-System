import type { ReactNode } from "react";
import styles from "./ValidationError.module.scss";

export function ValidationError({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <div className={styles.wrapper}>
      {children}
      <p className={styles.errorText}>{text}</p>
    </div>
  );
}
