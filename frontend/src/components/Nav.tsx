import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "个人主页" },
  { to: "/text-lab", label: "文字实验室" },
];

export default function Nav() {
  return (
    <div className="mb-[22px] flex items-baseline justify-between gap-6 sm:mb-[18px] sm:flex-col sm:items-start sm:gap-[10px]">
      <p className="text-[21px] font-medium leading-[1.14] tracking-[-0.03em] text-[rgba(29,29,31,0.88)] sm:text-[18px]">
        zero to tech
      </p>
      <nav className="inline-flex flex-wrap justify-end gap-[18px]">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) =>
              "cursor-pointer text-[15px] leading-[1.33] tracking-[-0.24px] text-[rgba(29,29,31,0.54)] transition-colors duration-200 hover:text-textMain" +
              (isActive ? " font-bold text-textMain" : "")
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
