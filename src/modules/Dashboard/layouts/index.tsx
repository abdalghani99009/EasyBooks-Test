import { useState } from "react";
import Header from "@/common/components/Layouts/Dashboard/Header";
import NavigationList from "@/common/components/Layouts/Dashboard/NavigationList";
import { Outlet } from "react-router-dom";
import "./index.css";
import { useScreenSize } from "@/common/hooks/media-query/useScreenSize";
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMedium } = useScreenSize();
  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex flex-col">
      <Header
        toggleMenu={() => setSidebarOpen(!sidebarOpen)}
        title="Dashboard"
        menuToggleEnabled={isMedium}
      />

      <div className="flex relative flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
          <NavigationList onClose={() => setSidebarOpen(false)} />
        </div>{" "}
        <div className="content-area flex-1 p-4 bg-[#f3f6f9] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
