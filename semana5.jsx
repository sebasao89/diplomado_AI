import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  BrainCircuit,
  LineChart,
  Binary,
  ShieldCheck,
  Orbit,
  GitBranch,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ALGORITHMS = [
  {
    key: "linear",
    title: "Regresion Lineal",
    icon: LineChart,
    type: "regresion",
    scale: "medio",
    interpretability: "alta",
    strengths: "Simple, rapida y facil de explicar.",
    risks: "Sensible a outliers y relaciones no lineales.",
  },
  {
    key: "logistic",
    title: "Regresion Logistica",
    icon: Binary,
    type: "clasificacion",
    scale: "medio",
    interpretability: "alta",
    strengths: "Entrega probabilidades para decisiones binarias.",
    risks: "Requiere relaciones relativamente lineales.",
  },
  {
    key: "naive_bayes",
    title: "Naive Bayes",
    icon: BrainCircuit,
    type: "clasificacion",
    scale: "grande",
    interpretability: "media",
    strengths: "Muy rapido y eficiente para texto.",
    risks: "Supone independencia de variables.",
  },
  {
    key: "svm",
    title: "SVM",
    icon: ShieldCheck,
    type: "clasificacion",
    scale: "medio",
    interpretability: "media",
    strengths: "Excelente margen de separacion en alta dimensionalidad.",
    risks: "Mas costoso en datasets muy grandes.",
  },
  {
    key: "knn",
    title: "K-NN",
    icon: Orbit,
    type: "clasificacion",
    scale: "pequeno",
    interpretability: "media",
    strengths: "Intuitivo y facil de implementar.",
    risks: "Prediccion lenta y sensible al escalado.",
  },
  {
    key: "tree",
    title: "Arbol de Decision",
    icon: GitBranch,
    type: "clasificacion",
    scale: "medio",
    interpretability: "alta",
    strengths: "Reglas claras y visuales.",
    risks: "Puede sobreajustar sin controles de profundidad.",
  },
];

function getRecommendation(problemType, datasetSize, priority) {
  const candidates = ALGORITHMS.filter((algorithm) => {
    if (problemType === "regresion") return algorithm.type === "regresion";
    return algorithm.type === "clasificacion";
  });

  const scored = candidates.map((algorithm) => {
    let score = 0;

    if (datasetSize === algorithm.scale) score += 2;
    if (datasetSize === "grande" && algorithm.key === "naive_bayes") score += 2;
    if (datasetSize === "pequeno" && algorithm.key === "knn") score += 2;
    if (priority === "interpretabilidad" && algorithm.interpretability === "alta") score += 3;
    if (priority === "rendimiento" && ["svm", "naive_bayes"].includes(algorithm.key)) score += 2;
    if (priority === "rapidez" && ["linear", "logistic", "naive_bayes"].includes(algorithm.key)) score += 2;

    return { algorithm, score };
  });

  scored.sort((a, b) => b.score - a.score || a.algorithm.title.localeCompare(b.algorithm.title));
  return scored[0]?.algorithm || candidates[0];
}

function Semana5Page() {
  const [problemType, setProblemType] = useState("clasificacion");
  const [datasetSize, setDatasetSize] = useState("medio");
  const [priority, setPriority] = useState("interpretabilidad");

  const recommendation = useMemo(
    () => getRecommendation(problemType, datasetSize, priority),
    [problemType, datasetSize, priority]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-left">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-800">
              <GraduationCap className="h-4 w-4" /> Semana 5
            </div>
            <h1 className="text-3xl font-black text-slate-900">Aprendizaje Supervisado</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              En esta semana trabajamos algoritmos clasicos para clasificacion y regresion,
              incluyendo fortalezas, limites y contexto de uso.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Objetivo</p>
            <p className="mt-1 text-sm text-slate-700">
              Elegir un algoritmo adecuado segun el problema, los datos y la meta del negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Mapa de algoritmos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ALGORITHMS.map(({ key, title, icon: Icon, strengths, risks }) => (
            <article key={key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-lg bg-white p-2">
                  <Icon className="h-4 w-4 text-slate-700" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              </div>
              <p className="mb-2 text-xs text-slate-700">
                <span className="font-bold">Ventaja:</span> {strengths}
              </p>
              <p className="text-xs text-slate-700">
                <span className="font-bold">Riesgo:</span> {risks}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">Modulo interactivo</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">Asistente de seleccion de algoritmo</h2>
        <p className="mt-2 text-sm text-slate-600">
          Simula una decision inicial con criterios practicos. No reemplaza validacion experimental,
          pero ayuda a partir de una base razonable.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Tipo de problema
            <select
              value={problemType}
              onChange={(event) => setProblemType(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-semibold text-slate-700"
            >
              <option value="clasificacion">Clasificacion</option>
              <option value="regresion">Regresion</option>
            </select>
          </label>

          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Tamano de dataset
            <select
              value={datasetSize}
              onChange={(event) => setDatasetSize(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-semibold text-slate-700"
            >
              <option value="pequeno">Pequeno</option>
              <option value="medio">Medio</option>
              <option value="grande">Grande</option>
            </select>
          </label>

          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Prioridad
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-semibold text-slate-700"
            >
              <option value="interpretabilidad">Interpretabilidad</option>
              <option value="rendimiento">Rendimiento</option>
              <option value="rapidez">Rapidez</option>
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
            <Sparkles className="h-4 w-4" /> Recomendacion inicial
          </p>
          <h3 className="text-lg font-black text-emerald-900">{recommendation.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">
            {recommendation.strengths} Considera luego validacion cruzada y metricas de negocio
            para confirmar esta decision.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Recomendacion orientativa basada en criterios del PDF.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Semana5Page;
