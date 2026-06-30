import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <div className="page-shell">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
