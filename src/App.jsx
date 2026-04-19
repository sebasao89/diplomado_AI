import React, { useState } from "react";
import Semana1Page from "../semana1.jsx";
import Semana2Page from "../semana2.jsx";

function PendingWeek({ weekNumber }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 text-center">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 shadow-sm">
        <h2 className="mb-4 text-3xl font-bold text-slate-700">Semana {weekNumber}</h2>
        <p className="text-lg text-slate-500">Proximamente...</p>
      </div>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState(1);

  const tabs = [
    { id: 1, name: "Semana 1" },
    { id: 2, name: "Semana 2" },
    { id: 3, name: "Semana 3" },
    { id: 4, name: "Semana 4" },
    { id: 5, name: "Semana 5" },
    { id: 6, name: "Semana 6" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Diplomado IA
          </h1>

          <nav className="flex items-center gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePage(tab.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activePage === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {activePage === 1 && <Semana1Page />}
        {activePage === 2 && <Semana2Page />}
        {activePage > 2 && <PendingWeek weekNumber={activePage} />}
      </main>
    </div>
  );
}

export default App;
