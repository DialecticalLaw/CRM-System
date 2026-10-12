import { Outlet } from "react-router";

export function App() {
  return (
    <div>
      <aside>
        <h1>CRM-System</h1>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
