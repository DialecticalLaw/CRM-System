import styles from "./DateSelect.module.scss";

export function DateSelect({
  onChange,
  value,
  name,
  label,
}: {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  value: string;
  name: string;
  label: string;
}) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder="Выберите дату"
        type="datetime-local"
        className={styles.date}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
