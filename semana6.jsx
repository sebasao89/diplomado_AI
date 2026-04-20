import React, { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  ShieldAlert,
  Shuffle,
  Grid3X3,
  Microscope,
  Scale,
  BadgePercent,
  TrendingDown,
} from "lucide-react";

function estimateShrink(baseValue, lambda, mode) {
  if (mode === "l1") {
    const sign = baseValue >= 0 ? 1 : -1;
    const magnitude = Math.max(0, Math.abs(baseValue) - lambda * 0.35);
    return sign * magnitude;
  }

  return baseValue / (1 + lambda * 0.6);
}

function Semana6Page() {
  const [searchMethod, setSearchMethod] = useState("grid");
  const [lambda, setLambda] = useState(2.5);
  const [regularization, setRegularization] = useState("l2");
  const [complexity, setComplexity] = useState(5);

  const baseCoefficients = [1.2, 0.8, -0.6, 0.4, 0.2];

  const adjusted = useMemo(
    () => baseCoefficients.map((value) => estimateShrink(value, lambda, regularization)),
    [lambda, regularization]
  );

  const methodSummary = useMemo(() => {
    if (searchMethod === "grid") {
      return "Grid Search evalua todas las combinaciones. Es exhaustivo y claro, pero puede ser costoso.";
    }
    if (searchMethod === "random") {
      return "Random Search explora muestras aleatorias del espacio de busqueda y suele ser mas eficiente en espacios amplios.";
    }
    return "Optimizacion Bayesiana aprende de intentos previos y prioriza zonas prometedoras para reducir evaluaciones.";
  }, [searchMethod]);

  const fittingState = useMemo(() => {
    if (complexity <= 3) {
      return {
        title: "Subajuste (Underfitting)",
        description:
          "El modelo es demasiado simple. Tiene sesgo alto y no aprende patrones importantes del conjunto de entrenamiento.",
        color: "text-amber-800",
        box: "border-amber-200 bg-amber-50",
      };
    }

    if (complexity >= 8) {
      return {
        title: "Sobreajuste (Overfitting)",
        description:
          "El modelo es demasiado complejo. Aprende ruido del entrenamiento y pierde capacidad de generalizacion.",
        color: "text-rose-800",
        box: "border-rose-200 bg-rose-50",
      };
    }

    return {
      title: "Zona de balance",
      description:
        "La complejidad es razonable: se reduce error de entrenamiento sin castigar demasiado el error de validacion.",
      color: "text-emerald-800",
      box: "border-emerald-200 bg-emerald-50",
    };
  }, [complexity]);

  const trainError = useMemo(() => {
    return Math.max(0.08, 0.62 - complexity * 0.055);
  }, [complexity]);

  const validationError = useMemo(() => {
    return 0.18 + 0.016 * Math.pow(complexity - 5, 2);
  }, [complexity]);

  const highlightText = (text) => {
    const terms = ["Grid Search", "Random Search", "Optimizacion Bayesiana", "hiperparametros", "regularizacion", "L1", "L2", "lambda", "coeficientes", "sobreajuste", "generalizacion"];
    const escapedTerms = terms
      .slice()
      .sort((a, b) => b.length - a.length)
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    const pattern = new RegExp(`(${escapedTerms.join("|")})`, "gi");
    const parts = String(text).split(pattern);

    return parts.map((part, index) => {
      const isHighlighted = terms.some((term) => term.toLowerCase() === part.toLowerCase());
      if (!isHighlighted) return part;

      return (
        <span key={`${part}-${index}`} className="font-bold text-indigo-700">
          {part}
        </span>
      );
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-left">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800">
              <Microscope className="h-4 w-4" /> Semana 6
            </div>
            <h1 className="text-3xl font-black text-slate-900">Ajuste y Generalizacion del Modelo</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Esta semana fortalece la fase experimental: hiperparametros, regularizacion y
              comparacion para elegir modelos con mejor desempeno fuera de muestra.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Meta</p>
            <p className="mt-1 text-sm text-slate-700">
              Reducir sobreajuste y lograr modelos robustos para datos nuevos.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Exploracion de hiperparametros</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setSearchMethod("grid")}
            className={`rounded-xl border p-4 text-left transition-colors ${
              searchMethod === "grid"
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Grid3X3 className="h-4 w-4" /> Grid Search
            </p>
            <p className="text-xs text-slate-600">{highlightText("Cobertura completa del espacio definido.")}</p>
          </button>

          <button
            type="button"
            onClick={() => setSearchMethod("random")}
            className={`rounded-xl border p-4 text-left transition-colors ${
              searchMethod === "random"
                ? "border-amber-300 bg-amber-50"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Shuffle className="h-4 w-4" /> Random Search
            </p>
            <p className="text-xs text-slate-600">{highlightText("Muestreo inteligente en espacios grandes.")}</p>
          </button>

          <button
            type="button"
            onClick={() => setSearchMethod("bayes")}
            className={`rounded-xl border p-4 text-left transition-colors ${
              searchMethod === "bayes"
                ? "border-emerald-300 bg-emerald-50"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-slate-900">
              <SlidersHorizontal className="h-4 w-4" /> Bayesiana
            </p>
            <p className="text-xs text-slate-600">{highlightText("Prioriza regiones prometedoras.")}</p>
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-700">{highlightText(methodSummary)}</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Teoria ampliada: ajuste, sesgo y varianza</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Ajustar un modelo no significa solo mejorar una metrica en entrenamiento. El objetivo real es
          encontrar un punto donde el modelo aprenda patron verdadero y no ruido. Por eso en esta etapa se
          conecta la busqueda de hiperparametros con el equilibrio sesgo-varianza.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-700">1. Sesgo</p>
            <p className="text-sm leading-relaxed text-slate-700">
              Cuando el modelo es muy simple, comete errores sistematicos. Este escenario se conoce como
              subajuste y suele mejorar aumentando capacidad o ajustando mejor hiperparametros.
            </p>
          </article>
          <article className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-700">2. Varianza</p>
            <p className="text-sm leading-relaxed text-slate-700">
              Cuando el modelo es demasiado flexible, se adapta al ruido y falla en datos nuevos.
              Este escenario es sobreajuste y se controla con regularizacion y validacion.
            </p>
          </article>
          <article className="rounded-xl border border-white bg-white p-4 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">3. Generalizacion</p>
            <p className="text-sm leading-relaxed text-slate-700">
              Un buen modelo no es el que mejor memoriza, sino el que mantiene buen rendimiento en
              datos no vistos. Esta es la meta central de Semana 6.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-indigo-50 p-6 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Modulo interactivo</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">Simulador de regularizacion L1 vs L2</h2>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setRegularization("l1")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  regularization === "l1"
                    ? "bg-rose-600 text-white"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                L1 (Lasso)
              </button>
              <button
                type="button"
                onClick={() => setRegularization("l2")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  regularization === "l2"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                L2 (Ridge)
              </button>
            </div>

            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
              {highlightText("Intensidad de regularizacion (lambda): ")}{lambda.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="6"
              step="0.1"
              value={lambda}
              onChange={(event) => setLambda(Number(event.target.value))}
              className="mt-3 w-full accent-emerald-600"
            />

            <div className="mt-5 space-y-2">
              {adjusted.map((coef, index) => {
                const width = Math.max(8, Math.round(Math.abs(coef) * 80));
                return (
                  <div key={index}>
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      w{index + 1}: {coef.toFixed(3)}
                    </p>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full ${
                          regularization === "l1" ? "bg-rose-500" : "bg-indigo-500"
                        }`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Interpretacion rapida</h3>
            <ul className="space-y-3 text-xs leading-relaxed text-slate-700">
              <li className="flex items-start gap-2">
                <BadgePercent className="mt-0.5 h-4 w-4 text-emerald-600" />
                {highlightText("Mayor lambda implica mayor penalizacion sobre los coeficientes.")}
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown className="mt-0.5 h-4 w-4 text-amber-600" />
                {highlightText("L1 tiende a llevar algunos pesos a cero (seleccion de variables).")}
              </li>
              <li className="flex items-start gap-2">
                <Scale className="mt-0.5 h-4 w-4 text-indigo-600" />
                {highlightText("L2 reduce todos los pesos de forma suave, sin apagarlos por completo.")}
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="mt-0.5 h-4 w-4 text-rose-600" />
                {highlightText("El objetivo es controlar sobreajuste sin perder demasiada capacidad predictiva.")}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-rose-50 p-6 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">Modulo interactivo</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">Simulador de overfitting vs underfitting</h2>
        <p className="mt-2 text-sm text-slate-600">
          Ajusta la complejidad del modelo para observar como cambian el error de entrenamiento y el de validacion.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
              Complejidad del modelo: {complexity}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={complexity}
              onChange={(event) => setComplexity(Number(event.target.value))}
              className="mt-3 w-full accent-amber-600"
            />

            <div className="mt-5 space-y-4">
              <div>
                <p className="mb-1 text-xs font-semibold text-slate-600">
                  Error de entrenamiento: {(trainError * 100).toFixed(1)}%
                </p>
                <div className="h-3 rounded-full bg-slate-200">
                  <div
                    className="h-3 rounded-full bg-emerald-500"
                    style={{ width: `${Math.round(trainError * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold text-slate-600">
                  Error de validacion: {(validationError * 100).toFixed(1)}%
                </p>
                <div className="h-3 rounded-full bg-slate-200">
                  <div
                    className="h-3 rounded-full bg-indigo-500"
                    style={{ width: `${Math.round(validationError * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${fittingState.box}`}>
            <h3 className={`text-sm font-black ${fittingState.color}`}>{fittingState.title}</h3>
            <p className={`mt-2 text-xs leading-relaxed ${fittingState.color}`}>
              {fittingState.description}
            </p>

            <div className="mt-4 rounded-xl border border-white/80 bg-white/70 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Lectura rapida</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-xs leading-relaxed text-slate-700">
                <li>Si ambos errores son altos, el modelo necesita mas capacidad o mejores variables.</li>
                <li>Si entrenamiento es muy bajo y validacion sube, hay sobreajuste.</li>
                <li>El mejor punto busca error bajo y estable en validacion.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Conclusiones de Semana 5 y 6</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Cierre del bloque de aprendizaje supervisado: primero seleccionas el algoritmo adecuado y
          luego optimizas su capacidad de generalizacion con ajuste y regularizacion.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-700">Conclusion Semana 5</p>
            <h3 className="text-base font-black text-cyan-950">Elegir bien el modelo importa tanto como entrenarlo</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-cyan-950">
              <li>El tipo de problema define la familia de algoritmos: clasificacion o regresion.</li>
              <li>Cada algoritmo tiene fortalezas, limites y costos distintos.</li>
              <li>La seleccion inicial debe considerar interpretabilidad, escala y contexto del negocio.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-700">Conclusion Semana 6</p>
            <h3 className="text-base font-black text-indigo-950">Un buen ajuste mejora resultados fuera de muestra</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-indigo-950">
              <li>El ajuste de hiperparametros define el comportamiento del entrenamiento.</li>
              <li>L1 y L2 ayudan a controlar sobreajuste y mejorar generalizacion.</li>
              <li>La decision final siempre se valida con metricas y datos no vistos.</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Semana6Page;
