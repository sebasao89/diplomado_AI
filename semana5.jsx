import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  Sparkles,
  LineChart,
  Binary,
  BrainCircuit,
  ShieldCheck,
  Orbit,
  GitBranch,
  SlidersHorizontal,
  ShieldAlert,
  Scale,
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
  },
  {
    key: "logistic",
    title: "Regresion Logistica",
    icon: Binary,
    type: "clasificacion",
    scale: "medio",
    interpretability: "alta",
  },
  {
    key: "naive_bayes",
    title: "Naive Bayes",
    icon: BrainCircuit,
    type: "clasificacion",
    scale: "grande",
    interpretability: "media",
  },
  {
    key: "svm",
    title: "SVM",
    icon: ShieldCheck,
    type: "clasificacion",
    scale: "medio",
    interpretability: "media",
  },
  {
    key: "knn",
    title: "K-NN",
    icon: Orbit,
    type: "clasificacion",
    scale: "pequeno",
    interpretability: "media",
  },
  {
    key: "tree",
    title: "Arbol de Decision",
    icon: GitBranch,
    type: "clasificacion",
    scale: "medio",
    interpretability: "alta",
  },
];

const SECTION_ORDER = [
  {
    id: "linear-regression",
    title: "Regresion Lineal",
    accent: "blue",
    summary:
      "Modela una salida continua mediante una relacion lineal entre variables independientes y dependientes.",
    advantages: [
      "Simple de entender y explicar.",
      "Rapida de entrenar.",
      "Sirve como linea base para comparar otros modelos.",
    ],
    uses: [
      "Precio de casas.",
      "Ventas futuras.",
      "Temperatura, demanda o consumo.",
    ],
    disadvantages: [
      "No captura bien relaciones no lineales.",
      "Es sensible a valores extremos.",
      "Puede quedarse corta en problemas complejos.",
    ],
    whenNotUse: [
      "Cuando la relacion entre variables es claramente no lineal.",
      "Cuando hay muchos outliers y no vas a tratarlos.",
    ],
    example: "Ejemplo: predecir el precio de una casa a partir de su tamano.",
  },
  {
    id: "logistic-regression",
    title: "Regresion Logistica",
    accent: "indigo",
    summary:
      "Se usa para clasificacion binaria y transforma una salida lineal en una probabilidad entre 0 y 1.",
    advantages: [
      "Entrega probabilidades interpretables.",
      "Muy util en decisiones binarias.",
      "Suele funcionar bien como modelo base en negocio.",
    ],
    uses: [
      "Spam / no spam.",
      "Sano / enfermo.",
      "Aprobado / reprobado.",
    ],
    disadvantages: [
      "Prefiere fronteras relativamente lineales.",
      "Puede requerir ajuste de hiperparametros.",
      "No es la mejor opcion para relaciones complejas sin transformaciones.",
    ],
    whenNotUse: [
      "Cuando el problema no es binario y no vas a extenderlo.",
      "Cuando la frontera de decision es muy compleja o muy no lineal.",
    ],
    nested: [
      {
        title: "Ajuste de hiperparametros",
        note:
          "No es otro algoritmo: es la forma de elegir la mejor configuracion de la regresion logistica.",
        points: [
          "Grid Search prueba todas las combinaciones.",
          "Random Search explora combinaciones aleatorias.",
          "Optimizacion bayesiana concentra la busqueda en zonas prometedoras.",
          "Validacion cruzada anidada ayuda a estimar mejor el rendimiento final.",
        ],
      },
      {
        title: "Regularizacion L1 y L2",
        note:
          "Tampoco son algoritmos aparte: son tecnicas para controlar el sobreajuste dentro del modelo.",
        points: [
          "L1 puede llevar coeficientes a cero y ayuda a seleccionar variables.",
          "L2 reduce la magnitud de los coeficientes y estabiliza el modelo.",
        ],
      },
    ],
    example:
      "Ejemplo: diagnosticar diabetes usando la probabilidad generada por el modelo.",
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    accent: "emerald",
    summary:
      "Clasificador probabilistico que asume independencia entre caracteristicas.",
    advantages: [
      "Muy rapido y escalable.",
      "Funciona bien con texto.",
      "Rinde bien aun con pocos datos.",
    ],
    uses: [
      "Spam.",
      "Analisis de sentimientos.",
      "Clasificacion documental.",
    ],
    disadvantages: [
      "Asume independencia entre variables.",
      "Puede bajar su precision si las caracteristicas estan correlacionadas.",
    ],
    whenNotUse: [
      "Cuando las dependencias entre variables son importantes.",
      "Cuando necesitas interacciones complejas entre caracteristicas.",
    ],
    nested: [
      {
        title: "Variantes de Naive Bayes",
        note:
          "Estas variantes pertenecen a la familia Naive Bayes y se eligen segun el tipo de dato.",
        points: [
          "GaussianNB: variables continuas con distribucion normal.",
          "BernoulliNB: variables binarias, presencia o ausencia.",
          "CategoricalNB: variables categoricas discretas.",
          "ComplementNB: utiles con clases desbalanceadas.",
          "MultinomialNB: conteos y frecuencias, muy usado en texto.",
        ],
      },
    ],
    example:
      "Ejemplo: clasificar correos segun la frecuencia de palabras como oferta o gratis.",
  },
  {
    id: "svm",
    title: "Maquinas de Vectores de Soporte (SVM)",
    accent: "violet",
    summary:
      "Busca el hiperplano que separa mejor las clases maximizando el margen entre ellas.",
    advantages: [
      "Muy fuerte en alta dimensionalidad.",
      "Puede usar kernels para fronteras no lineales.",
      "Muy bueno en texto e imagenes.",
    ],
    uses: [
      "Clasificacion binaria.",
      "Texto con muchas variables.",
      "Imagenes y problemas de alta dimensionalidad.",
    ],
    disadvantages: [
      "Puede ser costoso en datasets grandes.",
      "No siempre es el mas interpretable.",
      "Ajustar kernels y parametros puede requerir bastante prueba.",
    ],
    whenNotUse: [
      "Cuando el dataset es muy grande y necesitas entrenamiento rapido.",
      "Cuando la interpretabilidad simple es prioridad.",
    ],
    example:
      "Ejemplo: clasificar documentos o imagenes con gran cantidad de variables.",
  },
  {
    id: "knn",
    title: "K vecinos mas cercanos (K-NN)",
    accent: "amber",
    summary:
      "Clasifica un punto por la mayoria de sus vecinos mas cercanos en el espacio de caracteristicas.",
    advantages: [
      "Muy simple e intuitivo.",
      "No requiere entrenamiento pesado.",
      "Facil de explicar conceptualmente.",
    ],
    uses: [
      "Clasificacion sencilla.",
      "Recomendacion basica.",
      "Escenarios donde la cercania entre instancias es importante.",
    ],
    disadvantages: [
      "La prediccion puede ser lenta.",
      "Es sensible al escalado.",
      "Se degrada con alta dimensionalidad.",
    ],
    whenNotUse: [
      "Cuando el dataset es muy grande.",
      "Cuando tienes demasiadas dimensiones.",
      "Cuando necesitas predicciones muy rapidas.",
    ],
    example:
      "Ejemplo: clasificar una flor segun sus vecinos en el dataset Iris.",
  },
  {
    id: "decision-tree",
    title: "Arbol de Decision",
    accent: "slate",
    summary:
      "Divide recursivamente los datos en reglas hasta llegar a una prediccion final en las hojas.",
    advantages: [
      "Muy interpretable.",
      "Permite reglas claras de decision.",
      "Sirve para clasificacion y regresion.",
    ],
    uses: [
      "Reglas de negocio.",
      "Clasificacion y regresion.",
      "Casos donde importa explicar la ruta de decision.",
    ],
    disadvantages: [
      "Tiende a sobreajustar si no se controla.",
      "Puede ser inestable con pequenos cambios en los datos.",
    ],
    whenNotUse: [
      "Cuando no vas a controlar profundidad o aplicar poda.",
      "Cuando el ruido de los datos es muy alto.",
    ],
    example:
      "Ejemplo: decidir si se aprueba un prestamo a partir de ingresos, edad e historial crediticio.",
  },
  {
    id: "comparison",
    title: "Comparacion final",
    accent: "cyan",
    summary:
      "Cierra el bloque comparando rapidamente donde destaca cada tecnica y donde conviene evitarla.",
    advantages: [
      "Ayuda a elegir mejor segun el contexto.",
      "Resume fortalezas y limites de cada tecnica.",
      "Facilita la memoria visual del tema.",
    ],
    uses: [
      "Elegir el modelo adecuado.",
      "Contrastar interpretabilidad, costo y precision.",
      "Preparar la siguiente fase de ajuste y validacion.",
    ],
    disadvantages: [
      "No sustituye la validacion experimental.",
      "No basta con memorizar el nombre del algoritmo.",
    ],
    whenNotUse: [
      "Cuando ya tomaste la decision sin revisar el tipo de problema.",
      "Cuando no comparaste el costo computacional ni la interpretabilidad.",
    ],
    example:
      "Idea final: no elegir por nombre, sino por el tipo de problema, el tamano del dato y la interpretabilidad requerida.",
  },
];

function SectionCard({ section }) {
  const accentStyles = {
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
    rose: "border-rose-200 bg-rose-50 text-rose-900",
    violet: "border-violet-200 bg-violet-50 text-violet-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    slate: "border-slate-200 bg-slate-50 text-slate-900",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-900",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${accentStyles[section.accent]}`}>
        Tema de estudio
      </div>
      <h3 className="text-2xl font-black text-slate-900">{section.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.summary}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Ventajas</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {section.advantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Usos</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {section.uses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Desventajas</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {section.disadvantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`rounded-xl border p-4 ${accentStyles[section.accent]}`}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide opacity-80">Cuando no usarlo</p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {section.whenNotUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {section.nested?.length > 0 && (
        <div className="mt-5 space-y-4">
          {section.nested.map((nestedSection) => (
            <div key={nestedSection.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-base font-bold text-slate-900">{nestedSection.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{nestedSection.note}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {nestedSection.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className={`mt-5 rounded-xl border p-4 ${accentStyles[section.accent]}`}>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide opacity-80">Ejemplo</p>
        <p className="text-sm leading-relaxed">{section.example}</p>
      </div>
    </article>
  );
}

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

            <div className="mt-4 max-w-4xl rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Definicion</p>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-blue-950">
                <li>
                  Se define como el uso de datos <strong>etiquetados</strong> para entrenar algoritmos
                  que <strong>clasifican</strong> los datos o <strong>predicen</strong> resultados.
                </li>
                <li>
                  El aprendizaje supervisado utiliza varios conjuntos de datos necesarios para que el
                  modelo funcione, como los datos de entrenamiento.
                </li>
                <li>
                  Estos datos permiten ajustar los parametros del modelo hasta minimizar lo suficiente
                  la funcion de perdida.
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Objetivo</p>
            <p className="mt-1 text-sm text-slate-700">
              Elegir un algoritmo adecuado segun el problema, los datos y la meta del negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-sm">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-800">
          <Sparkles className="h-4 w-4" /> Insight Semana 5
        </div>
        <h2 className="text-xl font-black text-slate-900">Que cambia frente a las semanas anteriores</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Hasta la Semana 4 construiste la base del pipeline completo. En la Semana 5 das el salto
          de preparar y medir a decidir que modelo supervisado entrenar con criterio tecnico.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Semana 1</p>
            <h3 className="mb-2 text-sm font-bold text-slate-900">Fundamentos de IA</h3>
            <p className="text-xs leading-relaxed text-slate-700">
              Entendiste paradigmas, conceptos base y el panorama general de modelos.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Semana 2</p>
            <h3 className="mb-2 text-sm font-bold text-slate-900">Datos y preparacion</h3>
            <p className="text-xs leading-relaxed text-slate-700">
              Trabajaste limpieza, transformaciones, escalado y balanceo para entrenar mejor.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Semana 3</p>
            <h3 className="mb-2 text-sm font-bold text-slate-900">Evaluacion del modelo</h3>
            <p className="text-xs leading-relaxed text-slate-700">
              Interpretaste matriz de confusion, precision, recall, F1 y ROC para medir calidad.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Semana 4</p>
            <h3 className="mb-2 text-sm font-bold text-slate-900">NLP y representacion</h3>
            <p className="text-xs leading-relaxed text-slate-700">
              Convertiste texto en variables utiles: normalizacion, tokenizacion, BoW y n-gramas.
            </p>
          </article>

          <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-700">Semana 5</p>
            <h3 className="mb-2 text-sm font-bold text-cyan-900">Aprendizaje supervisado aplicado</h3>
            <p className="text-xs leading-relaxed text-cyan-900/90">
              Profundizas en seleccionar el algoritmo correcto segun el problema y el contexto.
            </p>
          </article>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs leading-relaxed text-emerald-900/90">
            <span className="font-bold">En resumen:</span> antes construiste la base; ahora tomas
            decisiones de modelado supervisado con criterios tecnicos y de negocio.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-slate-800">Tipos de problemas y algoritmos categorizados</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          Primero defines el objetivo del problema y luego eliges el algoritmo adecuado. Aunque
          algunos nombres se parezcan, problema y algoritmo no son lo mismo.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">Tipos de problemas</p>
            <div className="space-y-4">
              <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-blue-900">Clasificacion</h3>
                <p className="text-xs leading-relaxed text-blue-900/90">
                  Se usa cuando quieres asignar una etiqueta o clase. Ejemplos: spam/no spam,
                  positivo/negativo, aprobado/reprobado.
                </p>
              </div>
              <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-blue-900">Regresion</h3>
                <p className="text-xs leading-relaxed text-blue-900/90">
                  Se usa cuando quieres predecir un valor numerico continuo. Ejemplos: precio,
                  ventas, temperatura o demanda.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">Algoritmos categorizados</p>
            <div className="space-y-4">
              <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-emerald-900">Para clasificacion</h3>
                <p className="text-xs leading-relaxed text-emerald-900/90">
                  Regresion Logistica, Naive Bayes, SVM, K-NN y Arboles de Decision.
                </p>
              </div>
              <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-emerald-900">Para regresion</h3>
                <p className="text-xs leading-relaxed text-emerald-900/90">
                  Regresion Lineal y, segun el caso, Arboles de Decision en modo regresion.
                </p>
              </div>
              <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="mb-1 text-sm font-bold text-emerald-900">Nombre parecido, uso distinto</h3>
                <p className="text-xs leading-relaxed text-emerald-900/90">
                  Regresion Logistica se llama asi por su formulacion matematica, pero se usa para
                  clasificacion. Por eso el nombre no siempre coincide con el tipo de problema.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-slate-800">Desarrollo detallado del tema</h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          Las secciones siguientes siguen el orden del estudio: primero los tipos de problema,
          luego cada algoritmo o bloque de ajuste, y al final la comparacion general.
        </p>

        <div className="space-y-5">
          {SECTION_ORDER.map((section) => (
            <SectionCard key={section.id} section={section} />
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
            <CheckCircle2 className="h-4 w-4" /> Recomendacion inicial
          </p>
          <h3 className="text-lg font-black text-emerald-900">{recommendation.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">
            La recomendacion orientativa cambia segun el problema, el tamano del dataset y la prioridad.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Recomendacion orientativa basada en criterios del tema.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Semana5Page;
