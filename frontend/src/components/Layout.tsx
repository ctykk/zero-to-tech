import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#f5f5f7_28%,#f5f5f7_100%)]">
      <div className="max-w-page mx-auto w-full px-5 pb-8 sm:px-3">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
