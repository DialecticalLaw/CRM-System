import { NavLink } from "react-router";
import styles from "./Sidebar.module.scss";

const routes = [
  { path: "board", name: "Доска" },
  { path: "task-list", name: "Список задач" },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>CRM System</h1>
      <nav className={styles.nav}>
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={`/${route.path}`}
            className={({ isActive }) =>
              (isActive ? styles.navActive : "") + " " + styles.navLink
            }
          >
            {route.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
