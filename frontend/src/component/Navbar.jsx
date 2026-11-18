
import { useState } from "react";

export default function Navbar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "student", label: "Student Portal" },
    { id: "faculty", label: "Faculty Portal" },
    { id: "admin", label: "Admin Portal" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-gray-800 shadow-lg">

      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8">

        {/* Brand */}
        <button
          onClick={() => handleTabChange("student")}
          className="flex shrink-0 items-center gap-3 text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-950/40">
            TT
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              TT
            </h1>

            <p className="text-xs font-semibold tracking-wide text-indigo-300">
              Smart Attendance System
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                  : "text-gray-200 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="relative md:hidden">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-600 text-white transition hover:bg-gray-700"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-gray-700 bg-gray-800 p-2 shadow-xl">

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-gray-200 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
