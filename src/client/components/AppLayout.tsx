import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const AppLayout = () => (
  <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);
