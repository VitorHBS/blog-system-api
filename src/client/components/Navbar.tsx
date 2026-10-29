import { Menu, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Posts", to: "/posts" },
];

export const Navbar = () => (
  <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
    <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
      <NavLink to="/" className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
          B
        </span>
        <span className="text-lg font-black tracking-normal">BrightBlog</span>
      </NavLink>

      <div className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <button
          className="grid size-10 place-items-center rounded-lg bg-slate-950 text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu size={19} />
        </button>
      </div>
    </nav>
  </header>
);
