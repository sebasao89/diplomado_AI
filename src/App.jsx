import React, { useEffect, useState } from "react";
import Semana1Page from "../semana1.jsx";
import Semana2Page from "../semana2.jsx";
import Semana3Page from "../semana3.jsx";
import Semana4Page from "../semana4.jsx";
import Semana5Page from "../semana5.jsx";
import Semana6Page from "../semana6.jsx";
import MaterialesPDFPage from "../materialesPDF.jsx";

const TOTAL_WEEKS = 6;
const MATERIALS_PAGE = 0;

function getPageFromPath(pathname) {
  if (/^\/materiales\/?$/.test(pathname)) return MATERIALS_PAGE;

  const match = pathname.match(/^\/semana\/(\d+)\/?$/);
  if (!match) return 1;

  const parsed = Number(match[1]);
  if (!Number.isInteger(parsed)) return 1;

  return parsed >= 1 && parsed <= TOTAL_WEEKS ? parsed : 1;
}

function App() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window === "undefined") return 1;
    return getPageFromPath(window.location.pathname);
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const canonicalPath = activePage === MATERIALS_PAGE ? "/materiales" : `/semana/${activePage}`;
    if (window.location.pathname !== canonicalPath) {
      window.history.replaceState({ week: activePage }, "", canonicalPath);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Keep the mobile drawer closed after navigation changes.
    setIsMobileMenuOpen(false);
  }, [activePage]);

  const navigateToWeek = (week) => {
    if (week === activePage) return;

    const path = `/semana/${week}`;
    window.history.pushState({ week }, "", path);
    setActivePage(week);
  };

  const navigateToMaterials = () => {
    if (activePage === MATERIALS_PAGE) return;

    window.history.pushState({ page: "materiales" }, "", "/materiales");
    setActivePage(MATERIALS_PAGE);
  };

  const tabs = [
    { id: 1, name: "Semana 1", topic: "Fundamentos" },
    { id: 2, name: "Semana 2", topic: "Datos y preparacion" },
    { id: 3, name: "Semana 3", topic: "Evaluacion" },
    { id: 4, name: "Semana 4", topic: "NLP" },
    { id: 5, name: "Semana 5", topic: "Supervisado" },
    { id: 6, name: "Semana 6", topic: "Ajuste y generalizacion" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-3 px-4 py-3 md:justify-center">
          <h1 className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-slate-700">
            Diplomado IA
          </h1>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Abrir menu de navegacion"
            aria-expanded={isMobileMenuOpen}
            className="ml-auto inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          >
            Menu
          </button>

          <div className="hidden min-w-0 items-center gap-3 md:ml-2 md:flex">
            <div className="min-w-0 max-w-full overflow-x-auto">
              <nav className="flex min-w-max items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => navigateToWeek(tab.id)}
                    className={`h-14 w-[112px] flex-none rounded-xl px-3 py-2 text-left transition-colors lg:w-[126px] xl:w-[136px] ${
                      activePage === tab.id
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span className="block text-xs font-extrabold uppercase tracking-wide">{tab.name}</span>
                    <span
                      className={`hidden truncate text-[11px] leading-tight lg:block ${
                        activePage === tab.id ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {tab.topic}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={navigateToMaterials}
                  className={`h-14 w-[122px] flex-none rounded-xl px-3 py-2 text-left transition-colors lg:w-[136px] xl:w-[146px] ${
                    activePage === MATERIALS_PAGE
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                  }`}
                >
                  <span className="block text-xs font-extrabold uppercase tracking-wide">Materiales</span>
                  <span
                    className={`hidden truncate text-[11px] leading-tight lg:block ${
                      activePage === MATERIALS_PAGE ? "text-emerald-100" : "text-emerald-700"
                    }`}
                  >
                    PDFs del diplomado
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <nav className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => navigateToWeek(tab.id)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    activePage === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                    {tab.name}
                </button>
              ))}
              <button
                type="button"
                onClick={navigateToMaterials}
                className={`col-span-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  activePage === MATERIALS_PAGE
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                }`}
              >
                Materiales PDF
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {activePage === MATERIALS_PAGE && <MaterialesPDFPage />}
        {activePage === 1 && <Semana1Page />}
        {activePage === 2 && <Semana2Page />}
        {activePage === 3 && <Semana3Page />}
        {activePage === 4 && <Semana4Page />}
        {activePage === 5 && <Semana5Page />}
        {activePage === 6 && <Semana6Page />}
      </main>
    </div>
  );
}

export default App;
