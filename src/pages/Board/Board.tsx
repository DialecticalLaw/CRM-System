import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";

export function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>Доска CRM</h2>
        <Button onClick={() => {}}>+ Создать</Button>
      </div>
    </div>
  );
}
