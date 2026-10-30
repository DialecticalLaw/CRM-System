import { Outlet } from "react-router";
import styles from "./App.module.scss";
import { Sidebar } from "./components/Sidebar/Sidebar";

export function App() {
  return (
    <div className={styles.app}>
      <Sidebar />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
