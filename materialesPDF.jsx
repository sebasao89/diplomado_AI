import React from "react";
import { BookOpen, ExternalLink, Download } from "lucide-react";

const ALL_PDFS = [
  { name: "Semana 1", file: "Semana 1.pdf" },
  { name: "Semana 2", file: "Semana 2.pdf" },
  { name: "Semana 3", file: "Semana 3.pdf" },
  { name: "Semana 4", file: "Semana 4.pdf" },
  { name: "Semana 5-6", file: "Semana 5-6.pdf" },
];

function MaterialesPDFPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-left">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-2">
            <BookOpen className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Materiales PDF del Diplomado</h1>
            <p className="text-sm text-slate-600">
              Repositorio central de documentos para todas las semanas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ALL_PDFS.map((pdf) => {
            const href = `/pdfs/${pdf.file}`;
            return (
              <article key={pdf.file} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-3 text-base font-bold text-slate-800">{pdf.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" /> Abrir
                  </a>
                  <a
                    href={href}
                    download
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Download className="h-4 w-4" /> Descargar
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default MaterialesPDFPage;
