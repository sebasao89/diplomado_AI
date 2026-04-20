import React, { useMemo, useState } from "react";
import {
  Languages,
  BookText,
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
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-700">
            Campo que combina la <strong>Informatica</strong>, la <strong>Inteligencia Artificial</strong> y la <strong>Lingüistica</strong>.
          </p>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800">
            <BookText className="h-5 w-5 text-cyan-600" /> Laboratorio de Texto
          </h2>

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
    </div>
  );
}

export default Semana4Page;
