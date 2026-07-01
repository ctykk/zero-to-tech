import { Link, NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "个人主页" },
  { to: "/text-lab", label: "文字实验室" },
];

export default function Nav() {
  return (
    <nav className="mb-6 flex w-full items-center justify-between">
      <Link to="/">
        <img alt="logo" src="/logo.svg" className="h-8 w-auto" />
      </Link>
      <div className="flex items-center gap-5">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) =>
              "hover:text-textMain text-[15px] leading-[1.33] tracking-[-0.24px] text-[rgba(29,29,31,0.54)] transition-colors duration-200" +
              (isActive ? " text-textMain font-bold" : "")
            }
          >
            {it.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
