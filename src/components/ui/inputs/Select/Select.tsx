import styles from "./Select.module.scss";

export function Select({
  onChange,
  value,
  name,
  label,
  options,
}: {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  value: string;
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <select
        value={value}
        className={styles.select}
        id={name}
        name={name}
        onChange={onChange}
      >
        {options.map((option) => (
          <option className={styles.option} key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
