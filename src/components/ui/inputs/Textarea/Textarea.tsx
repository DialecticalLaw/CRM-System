import styles from "./Textarea.module.scss";

export function Textarea({
  onChange,
  value,
  rows,
  name,
  label,
  placeholder,
  required,
}: {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  value: string;
  rows: number;
  name: string;
  placeholder?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        <span className={styles.required}>{required ? "*" : ""}</span>&nbsp;
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder || ""}
        className={styles.textarea}
        rows={rows}
      />
    </div>
  );
}
