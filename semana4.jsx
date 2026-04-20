import React, { useMemo, useState } from "react";
import {
  Languages,
  BookText,
  Database,
  Sparkles,
  SplitSquareHorizontal,
  Filter,
  ListTree,
  AlignLeft,
  Hash,
  BarChart3,
  Tags,
  ExternalLink,
  Download,
} from "lucide-react";

const SPANISH_STOPWORDS = new Set([
  "de", "la", "que", "el", "en", "y", "a", "los", "del", "se", "las", "por", "un", "para",
  "con", "no", "una", "su", "al", "lo", "como", "mas", "pero", "sus", "le", "ya", "o", "este",
  "si", "porque", "esta", "entre", "cuando", "muy", "sin", "sobre", "tambien", "me", "hasta", "hay",
  "donde", "quien", "desde", "todo", "nos", "durante", "todos", "uno", "les", "ni", "contra", "otros",
  "ese", "eso", "ante", "ellos", "e", "esto", "mi", "antes", "algunos", "que", "unos", "yo", "otro",
  "otras", "otra", "el", "tanto", "esa", "estos", "mucho", "quienes", "nada", "muchos", "cual", "poco",
  "ella", "estar", "estas", "algunas", "algo", "nosotros", "mi", "mis", "tu", "te", "ti", "tu", "tus",
]);

const SIMPLE_LEMMAS = {
  "caminando": "caminar",
  "caminamos": "caminar",
  "caminan": "caminar",
  "estudiando": "estudiar",
  "estudiamos": "estudiar",
  "aprendiendo": "aprender",
  "aprendimos": "aprender",
  "modelos": "modelo",
  "datos": "dato",
  "palabras": "palabra",
  "tokens": "token",
  "mejores": "mejor",
  "peores": "peor",
};

function normalizeText(input, options) {
  let output = input;

  if (options.toLower) {
    output = output.toLowerCase();
  }

  if (options.removePunctuation) {
    output = output.replace(/[.,;:!?()\[\]{}"'`¡¿\-]/g, " ");
  }

  if (options.removeNumbers) {
    output = output.replace(/\d+/g, " ");
  }

  output = output.replace(/\s+/g, " ").trim();
  return output;
}

function tokenize(text) {
  if (!text) return [];
  return text
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean);
}

function stemToken(token) {
  const suffixes = ["mente", "ciones", "cion", "ando", "iendo", "ados", "adas", "ado", "ada", "es", "s"];
  for (const suffix of suffixes) {
    if (token.length > suffix.length + 2 && token.endsWith(suffix)) {
      return token.slice(0, -suffix.length);
    }
  }
  return token;
}

function buildBagOfWords(tokens) {
  const frequency = new Map();
  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) || 0) + 1);
  }

  return Array.from(frequency.entries())
    .map(([term, count]) => ({ term, count }))
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term));
}

function buildNGrams(tokens, n) {
  if (n <= 1) return tokens;
  const grams = [];
  for (let i = 0; i <= tokens.length - n; i += 1) {
    grams.push(tokens.slice(i, i + n).join(" "));
  }
  return grams;
}

function Semana4Page() {
  const [inputText, setInputText] = useState(
    "La IA está transformando la educación: los estudiantes caminando y aprendiendo NLP en 2026."
  );
  const [options, setOptions] = useState({
    toLower: true,
    removePunctuation: true,
    removeNumbers: true,
    removeStopwords: true,
    applyStemming: false,
    applyLemmatization: true,
  });
  const [nGramSize, setNGramSize] = useState(2);

  const normalizedText = useMemo(() => normalizeText(inputText, options), [inputText, options]);

  const tokens = useMemo(() => {
    const baseTokens = tokenize(normalizedText);

    let transformed = baseTokens;

    if (options.removeStopwords) {
      transformed = transformed.filter((token) => !SPANISH_STOPWORDS.has(token));
    }

    if (options.applyLemmatization) {
      transformed = transformed.map((token) => SIMPLE_LEMMAS[token] || token);
    }

    if (options.applyStemming) {
      transformed = transformed.map(stemToken);
    }

    return transformed;
  }, [normalizedText, options]);

  const bagOfWords = useMemo(() => buildBagOfWords(tokens), [tokens]);
  const nGrams = useMemo(() => buildNGrams(tokens, nGramSize), [tokens, nGramSize]);

  const onToggle = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-left">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-800">
              <Languages className="h-4 w-4" /> Semana 4
            </div>
            <h1 className="text-3xl font-black text-slate-900">Preprocesamiento de Texto en NLP</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Esta semana aterriza el flujo que convierte texto crudo en datos analizables: normalizacion,
              tokenizacion, limpieza semantica y representacion tipo Bag of Words y n-gramas.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Objetivo</p>
            <p className="mt-1 text-sm text-slate-700">
              Transformar lenguaje natural en una estructura util para analisis, clasificacion y modelos de IA.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-bold text-slate-800">Que es el lenguaje</h2>
        <p className="text-sm leading-relaxed text-slate-700">
          Un lenguaje es un conjunto potencialmente infinito de oraciones y sentencias de
          palabras construidas mediante reglas gramaticales, foneticas y de significacion que
          rigen el propio lenguaje.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Tipos de Lenguaje</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              01
            </div>
            <h3 className="mb-2 text-base font-bold text-blue-900">Lenguaje Natural</h3>
            <p className="text-sm leading-relaxed text-blue-900/90">
              Nace de manera espontanea por la necesidad de comunicarse.
              Ejemplos: idiomas como ingles, espanol y chino.
            </p>
          </article>

          <article className="rounded-xl border border-slate-300 bg-slate-100 p-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
              02
            </div>
            <h3 className="mb-2 text-base font-bold text-slate-800">Lenguaje Formal</h3>
            <p className="text-sm leading-relaxed text-slate-700">
              Lenguajes creados para una situacion particular.
              Ejemplos: matematico, logico, musical y programacion.
            </p>
          </article>

          <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
              03
            </div>
            <h3 className="mb-2 text-base font-bold text-indigo-900">Lenguaje Artificial</h3>
            <p className="text-sm leading-relaxed text-indigo-900/90">
              Lenguajes creados antes de ser usados por los parlantes,
              como una mezcla de natural y formal.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Que es el Preprocesamiento en NLP</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-5 border border-blue-100">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Definicion</p>
              <p className="text-sm leading-relaxed text-blue-950">
                Transformacion de texto en un formato adecuado para su analisis.
              </p>
            </div>
            <div className="rounded-xl bg-indigo-50 p-5 border border-indigo-100">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-700">Objetivo</p>
              <p className="text-sm leading-relaxed text-indigo-950">
                Tratar la interaccion entre los lenguajes humanos (lenguajes naturales) y los
                dispositivos informaticos.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm leading-relaxed text-slate-700">
              Campo que combina la <strong>Informatica</strong>, la <strong>Inteligencia Artificial</strong> y la <strong>Lingüistica</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-inner">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">Vista grafica del proceso</p>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-6 shadow-sm">
              <svg viewBox="0 0 980 430" className="h-full w-full">
                <defs>
                  <linearGradient id="flowBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8fafc" />
                  </linearGradient>
                  <linearGradient id="blueFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="100%" stopColor="#eff6ff" />
                  </linearGradient>
                  <linearGradient id="greenFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d1fae5" />
                    <stop offset="100%" stopColor="#ecfdf5" />
                  </linearGradient>
                  <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
                  </marker>
                </defs>

                <rect x="0" y="0" width="980" height="430" rx="24" fill="url(#flowBg)" />

                <text x="36" y="40" fill="#0f172a" fontSize="14" fontWeight="700" letterSpacing="1.5">
                  FLUJO DE PREPROCESAMIENTO
                </text>

                <rect x="34" y="150" width="178" height="92" rx="18" fill="#eff6ff" stroke="#93c5fd" />
                <text x="123" y="184" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="700">TEXTO CRUDO</text>
                <text x="123" y="208" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="600">Entrada</text>

                <line x1="212" y1="196" x2="318" y2="196" stroke="#cbd5e1" strokeWidth="5" markerEnd="url(#arrowHead)" />

                <rect x="326" y="118" width="322" height="156" rx="22" fill="#ffffff" stroke="#cbd5e1" />
                <rect x="346" y="136" width="282" height="32" rx="14" fill="#dbeafe" />
                <text x="487" y="157" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="800">NORMALIZACION</text>
                <rect x="346" y="176" width="282" height="32" rx="14" fill="#e0f2fe" />
                <text x="487" y="197" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800">TOKENIZACION</text>
                <rect x="346" y="216" width="282" height="32" rx="14" fill="#ecfccb" />
                <text x="487" y="237" textAnchor="middle" fill="#3f6212" fontSize="13" fontWeight="800">LIMPIEZA / STOP WORDS</text>

                <line x1="648" y1="196" x2="754" y2="196" stroke="#cbd5e1" strokeWidth="5" markerEnd="url(#arrowHead)" />

                <rect x="756" y="150" width="178" height="92" rx="18" fill="#ecfdf5" stroke="#86efac" />
                <text x="845" y="184" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="700">TEXTO LISTO</text>
                <text x="845" y="208" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="600">Analisis</text>

                <circle cx="758" cy="90" r="58" fill="#dbeafe" fillOpacity="0.7" stroke="#93c5fd" strokeWidth="2" />
                <circle cx="828" cy="90" r="58" fill="#e0e7ff" fillOpacity="0.7" stroke="#a5b4fc" strokeWidth="2" />
                <circle cx="793" cy="132" r="32" fill="#d1fae5" fillOpacity="0.95" stroke="#6ee7b7" strokeWidth="2" />

                <text x="730" y="94" fill="#1d4ed8" fontSize="12" fontWeight="800">Informatica</text>
                <text x="816" y="94" fill="#4338ca" fontSize="12" fontWeight="800">IA</text>
                <text x="793" y="138" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="900">NLP</text>

                <text x="710" y="162" fill="#475569" fontSize="10" fontWeight="600">Lingüistica</text>
                <text x="843" y="162" fill="#475569" fontSize="10" fontWeight="600">Datos</text>

                <text x="122" y="274" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">Proceso</text>
                <text x="487" y="274" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">Transformacion</text>
                <text x="845" y="274" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">Resultado</text>

                <rect x="34" y="306" width="912" height="60" rx="16" fill="#ffffff" stroke="#e2e8f0" />
                <text x="56" y="342" fill="#64748b" fontSize="11" fontWeight="700">CAMPO INTERDISCIPLINARIO:</text>
                <text x="248" y="342" fill="#0f172a" fontSize="14" fontWeight="600">
                  Informatica + Inteligencia Artificial + Lingüistica
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-slate-800">Donde se puede encontrar</h2>
            <p className="mb-4 text-sm text-slate-600">
              El preprocesamiento en NLP aparece como etapa base en multiples soluciones de lenguaje.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                ["Recuperacion de informacion", "Busca y ordena contenido relevante en grandes colecciones."],
                ["Extraccion y categorizacion", "Clasifica texto y extrae entidades o temas clave."],
                ["Analisis de sentimientos", "Detecta opinion, tono y subjetividad en mensajes."],
                ["Traduccion automatica", "Convierte texto entre idiomas con apoyo de modelos NLP."],
                ["Generacion de lenguaje", "Crea respuestas, resúmenes o texto nuevo."],
                ["Questions & Answering", "Sustenta chatbots y asistentes que responden preguntas."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                  <h3 className="mb-1 text-sm font-bold text-slate-800">{title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Paso siguiente
            </div>
            <h2 className="mb-3 text-xl font-bold text-slate-800">Conceptos para el NLP</h2>
            <p className="mb-4 text-sm text-slate-600">
              Son las piezas base que convierten texto libre en representaciones utiles para analizar y modelar.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { title: "Corpus", icon: Database, accent: "text-blue-700", bg: "bg-blue-50", desc: "Coleccion de textos: articulos, libros, tweets o criticas. Ejemplo: miles de reseñas de peliculas para analizar opinion." },
                { title: "Bag of Words", icon: BarChart3, accent: "text-indigo-700", bg: "bg-indigo-50", desc: "Representa el contenido por frecuencia de palabras sin orden. Ejemplo: 'IA', 'IA', 'datos' -> IA:2, datos:1." },
                { title: "Normalizacion", icon: Filter, accent: "text-emerald-700", bg: "bg-emerald-50", desc: "Pone el texto en igualdad de condiciones: minusculas, puntuacion, numeros. Ejemplo: 'Hola, Mundo 2026' -> 'hola mundo'." },
                { title: "Tokenizacion", icon: SplitSquareHorizontal, accent: "text-cyan-700", bg: "bg-cyan-50", desc: "Divide el texto en unidades pequeñas como palabras o frases. Ejemplo: 'Me gusta NLP' -> ['Me', 'gusta', 'NLP']." },
                { title: "Segmentacion", icon: ListTree, accent: "text-slate-700", bg: "bg-slate-100", desc: "Separa en oraciones o parrafos para procesarlos mejor. Ejemplo: un texto largo se corta en frases antes de clasificarlo." },
                { title: "Stemming", icon: Tags, accent: "text-rose-700", bg: "bg-rose-50", desc: "Reduce palabras a su raiz o tallo. Ejemplo: 'caminando', 'caminar', 'camina' -> 'camin'." },
                { title: "Lematizacion", icon: Sparkles, accent: "text-violet-700", bg: "bg-violet-50", desc: "Convierte palabras flexionadas en su lema valido. Ejemplo: 'caminando' -> 'caminar', 'mejores' -> 'mejor'." },
                { title: "Stop Word", icon: Filter, accent: "text-amber-700", bg: "bg-amber-50", desc: "Elimina palabras que aportan poco significado. Ejemplo: 'de', 'la', 'y', 'el' suelen retirarse en analisis." },
                { title: "POS Tagging", icon: Tags, accent: "text-blue-700", bg: "bg-blue-50", desc: "Etiqueta sustantivos, verbos, adjetivos, etc. Ejemplo: 'correr' = verbo, 'rápido' = adjetivo." },
                { title: "n-gramas", icon: Hash, accent: "text-emerald-700", bg: "bg-emerald-50", desc: "Conserva secuencias contiguas de N elementos. Ejemplo: 'inteligencia artificial' como bigrama." },
              ].map(({ title, desc, icon: Icon, accent, bg }) => (
                <div key={title} className="rounded-xl border border-white bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5">
                  <div className="mb-2 flex items-center gap-3">
                    <div className={`rounded-lg ${bg} p-2`}>
                      <Icon className={`h-4 w-4 ${accent}`} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">{title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-sky-50 px-5 py-5 shadow-sm">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-700">Modulo interactivo</p>
          <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-sm">
              <BookText className="h-5 w-5" />
            </span>
            Laboratorio de Texto
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Experimenta con el pipeline de preprocesamiento y observa como cambian los resultados paso a paso.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
            Texto de entrada (corpus mini)
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-800 outline-none ring-cyan-200 transition focus:ring"
          />

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              ["toLower", "Minusculas"],
              ["removePunctuation", "Quitar puntuacion"],
              ["removeNumbers", "Quitar numeros"],
              ["removeStopwords", "Eliminar stop words"],
              ["applyLemmatization", "Lematizacion basica"],
              ["applyStemming", "Stemming basico"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() => onToggle(key)}
                  className="h-4 w-4 accent-cyan-600"
                />
                <span className="text-slate-700">{label}</span>
              </label>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
            <Sparkles className="h-5 w-5 text-emerald-600" /> Resultado del Pipeline
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Texto normalizado</p>
              <p className="text-sm text-slate-700">{normalizedText || "Sin contenido"}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Tokens finales ({tokens.length})</p>
              <div className="flex flex-wrap gap-2">
                {tokens.length > 0 ? (
                  tokens.map((token, idx) => (
                    <span
                      key={`${token}-${idx}`}
                      className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-800"
                    >
                      {token}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">No hay tokens para mostrar.</span>
                )}
              </div>
            </div>
          </div>
        </article>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <BarChart3 className="h-5 w-5 text-indigo-600" /> Bag of Words
          </h3>

          <div className="max-h-64 overflow-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Termino</th>
                  <th className="px-3 py-2 text-right font-semibold">Frecuencia</th>
                </tr>
              </thead>
              <tbody>
                {bagOfWords.length > 0 ? (
                  bagOfWords.map((row) => (
                    <tr key={row.term} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-700">{row.term}</td>
                      <td className="px-3 py-2 text-right font-mono font-semibold text-slate-900">{row.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-3 py-4 text-center text-slate-500">
                      Sin terminos para contabilizar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <Hash className="h-5 w-5 text-amber-600" /> n-gramas
          </h3>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-amber-700">
              Tamano de n (actual: {nGramSize})
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={nGramSize}
              onChange={(e) => setNGramSize(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Secuencias contiguas ({nGrams.length})</p>
            <div className="flex flex-wrap gap-2">
              {nGrams.length > 0 ? (
                nGrams.map((gram, idx) => (
                  <span key={`${gram}-${idx}`} className="rounded-lg border border-amber-200 bg-white px-2 py-1 text-xs text-slate-700">
                    {gram}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">No hay n-gramas suficientes con el texto actual.</span>
              )}
            </div>
          </div>
        </article>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800"><SplitSquareHorizontal className="h-4 w-4 text-cyan-600" /> Tokenizacion</h4>
          <p className="text-xs text-slate-600">Divide el texto en unidades manejables para analisis posterior.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800"><Filter className="h-4 w-4 text-emerald-600" /> Stop Words</h4>
          <p className="text-xs text-slate-600">Elimina palabras funcionales que suelen aportar poco valor semantico.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800"><ListTree className="h-4 w-4 text-indigo-600" /> POS y Estructura</h4>
          <p className="text-xs text-slate-600">Paso natural siguiente: etiquetar sustantivos, verbos y adjetivos para contexto.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800"><Tags className="h-4 w-4 text-amber-600" /> Casos de Uso</h4>
          <p className="text-xs text-slate-600">Chatbots, analisis de sentimiento, busqueda, clasificacion y Q&A.</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-800">Material PDF del Diplomado</h3>
        <p className="mb-4 text-sm text-slate-600">
          Documento de soporte para esta semana y acceso al repositorio completo de materiales.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/pdfs/Semana 4.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-700"
          >
            <ExternalLink className="h-4 w-4" /> Abrir PDF Semana 4
          </a>
          <a
            href="/pdfs/Semana 4.pdf"
            download
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" /> Descargar
          </a>
          <a
            href="/materiales"
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Ver todos los PDF
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold"><AlignLeft className="h-5 w-5 text-cyan-300" /> Enfoque de estudio recomendado</h3>
        <p className="text-sm text-slate-300">
          Repite el laboratorio con 3 textos: uno academico, uno de redes sociales y uno de soporte al cliente.
          Compara como cambian tokens, BoW y n-gramas para fortalecer intuicion antes de entrenar modelos.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6 shadow-sm">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-800">
          <Sparkles className="h-4 w-4" /> Conclusiones
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">
          Relacion con las semanas anteriores y cierre de la Semana 4
        </h3>
        <p className="text-sm leading-relaxed text-slate-700">
          El preprocesamiento general de las semanas anteriores prepara datos crudos para que puedan ser analizados
          o usados por un modelo. En esta semana, ese mismo principio se aplica al texto: el preprocesamiento en NLP
          transforma lenguaje natural en una forma util para la maquina mediante normalizacion, tokenizacion,
          eliminacion de ruido, lematizacion, stemming y representaciones como Bag of Words y n-gramas.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          En conclusion, no son dos temas distintos sino dos niveles del mismo proceso: primero se prepara la
          informacion en general y luego se especializa esa preparacion para el lenguaje. Asi, la Semana 4 cierra el
          recorrido mostrando como el NLP actua como puente entre la comunicacion humana y el analisis
          computacional.
        </p>
      </section>
    </div>
  );
}

export default Semana4Page;
