import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "个人主页" },
  { to: "/text-lab", label: "文字实验室" },
];

export default function Nav() {
  return (
    <div className="hero-topline">
      <p className="brand-eyebrow">zero to tech</p>
      <nav className="inline-links hero-nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
