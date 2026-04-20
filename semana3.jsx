import React, { useState } from 'react';
import { 
  Play, Info, Activity, AlertTriangle, CheckCircle, Database, Layout, 
  PenTool, Layers, Sparkles, Sliders, PieChart, FileCode, SplitSquareHorizontal, 
  Settings, HardDrive, Filter, Settings2, BrainCircuit, LineChart, 
  HelpCircle, ArrowRight, Cpu, ListTree, XCircle, Target, 
  Crosshair, Percent, Calculator, AlertCircle, TrendingUp, BoxSelect, 
  ClipboardCheck, Search, ChevronRight, CheckCircle2, ThumbsUp, BellRing, 
  ShieldAlert, BookOpen, Mail, Stethoscope, Tv, ShieldCheck, Eye, LifeBuoy, SearchCode,
  Scale, Landmark, Zap, Grid3X3, ArrowDownNarrowWide, AlertOctagon, ListChecks,
  AreaChart, MousePointer2, TrendingDown, Thermometer, ArrowLeftRight, RefreshCw, Coins, ExternalLink, Download
} from 'lucide-react';

// ==========================================
// RESÚMENES SEMANAS 1 Y 2
// ==========================================

const Semana1Content = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 text-left">
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
      <Layers className="w-16 h-16 text-blue-500 mx-auto mb-6" />
      <h1 className="text-3xl font-black text-slate-900 mb-4">Semana 1: Fundamentos de IA</h1>
      <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg italic">
        "La capacidad de las máquinas para realizar tareas que requerirían inteligencia humana".
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">Perceptrón</h4>
          <p className="text-xs text-slate-500">Unidad básica de las redes neuronales.</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">Paradigmas</h4>
          <p className="text-xs text-slate-500">Supervisado, No Supervisado y Refuerzo.</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h4 className="font-bold text-slate-800 mb-1">Algoritmos</h4>
          <p className="text-xs text-slate-500">KNN, Árboles, Regresión Lineal y Logística.</p>
        </div>
      </div>
    </section>
  </div>
);

const Semana2Content = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 text-left">
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
      <Sliders className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
      <h1 className="text-3xl font-black text-slate-900 mb-4">Semana 2: Configuración Experimental</h1>
      <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg italic">
        "Si a la IA le entregas basura, aprenderá basura". El preprocesamiento es la clave del éxito.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
          <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Filter className="w-5 h-5" /> Pipeline de Datos
          </h4>
          <p className="text-sm text-indigo-800 opacity-80 leading-relaxed">
            Limpieza de nulos, normalización (MinMaxScaler), codificación de categorías y reducción de dimensionalidad (PCA).
          </p>
        </div>
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <PieChart className="w-5 h-5" /> Balanceo de Clases
          </h4>
          <p className="text-sm text-blue-800 opacity-80 leading-relaxed">
            Muestreo para equilibrar clases (Oversampling con SMOTE) y división de datos (Train/Test Split).
          </p>
        </div>
      </div>
    </section>
  </div>
);

// ==========================================
// SIMULADORES SEMANA 3
// ==========================================

const ConfusionMatrixSimulator = () => {
  const [tp, setTp] = useState(45);
  const [tn, setTn] = useState(40);
  const [fp, setFp] = useState(10);
  const [fn, setFn] = useState(5);
  const total = tp + tn + fp + fn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 shadow-inner text-left">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Calculator className="text-indigo-600" /> Simulador de Cálculo de Métricas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-3 text-center font-mono">
           <div className="bg-emerald-50 p-4 border-2 border-emerald-200 rounded-xl shadow-sm">
             <div className="text-[10px] font-black text-emerald-800 mb-1 uppercase tracking-tighter">True Positive (TP)</div>
             <input type="number" value={tp} onChange={e => setTp(Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-white rounded border border-emerald-300 text-center font-bold" />
           </div>
           <div className="bg-rose-50 p-4 border-2 border-rose-200 rounded-xl shadow-sm">
             <div className="text-[10px] font-black text-rose-800 mb-1 uppercase tracking-tighter">False Negative (FN)</div>
             <input type="number" value={fn} onChange={e => setFn(Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-white rounded border border-rose-300 text-center font-bold" />
           </div>
           <div className="bg-amber-50 p-4 border-2 border-amber-200 rounded-xl shadow-sm">
             <div className="text-[10px] font-black text-amber-800 mb-1 uppercase tracking-tighter">False Positive (FP)</div>
             <input type="number" value={fp} onChange={e => setFp(Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-white rounded border border-amber-300 text-center font-bold" />
           </div>
           <div className="bg-blue-50 p-4 border-2 border-blue-200 rounded-xl shadow-sm">
             <div className="text-[10px] font-black text-blue-800 mb-1 uppercase tracking-tighter">True Negative (TN)</div>
             <input type="number" value={tn} onChange={e => setTn(Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-white rounded border border-blue-300 text-center font-bold" />
           </div>
        </div>
        <div className="space-y-3 flex flex-col justify-center">
          <div className="bg-white p-4 rounded-xl border-l-4 border-l-indigo-500 shadow-sm flex justify-between items-center">
            <span className="font-bold text-slate-700 text-sm">Accuracy</span>
            <span className="text-xl font-black text-indigo-600">{(accuracy * 100).toFixed(1)}%</span>
          </div>
          <div className="bg-white p-4 rounded-xl border-l-4 border-l-emerald-500 shadow-sm flex justify-between items-center">
            <span className="font-bold text-slate-700 text-sm">Precision</span>
            <span className="text-xl font-black text-emerald-600">{(precision * 100).toFixed(1)}%</span>
          </div>
          <div className="bg-white p-4 rounded-xl border-l-4 border-l-rose-500 shadow-sm flex justify-between items-center">
            <span className="font-bold text-slate-700 text-sm">Recall</span>
            <span className="text-xl font-black text-rose-600">{(recall * 100).toFixed(1)}%</span>
          </div>
          <div className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 shadow-lg flex justify-between items-center transform hover:scale-105 transition-transform">
            <span className="font-bold flex items-center gap-2 text-sm"><Sparkles className="w-4 h-4 text-amber-400"/> F1-Score</span>
            <span className="text-2xl font-black text-amber-400">{(f1 * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ROCSimulator = () => {
  const [thresholdIndex, setThresholdIndex] = useState(2);
  
  // Datos del PDF Página 28
  const data = [
    { threshold: 0.65, fpr: 0.0, tpr: 0.2 },
    { threshold: 0.55, fpr: 0.0, tpr: 0.6 },
    { threshold: 0.50, fpr: 0.2, tpr: 0.8 },
    { threshold: 0.45, fpr: 0.2, tpr: 1.0 },
    { threshold: 0.40, fpr: 0.6, tpr: 1.0 },
    { threshold: 0.30, fpr: 1.0, tpr: 1.0 },
  ];

  const current = data[thresholdIndex];

  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mt-6 shadow-inner text-left">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <AreaChart className="text-purple-600" /> Simulador de Umbral y Curva ROC
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico ROC SVG */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm relative">
          <svg viewBox="-10 -10 120 120" className="w-full h-auto overflow-visible">
            {/* Ejes */}
            <line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="100" stroke="#94a3b8" strokeWidth="1" />
            
            {/* Etiquetas ejes */}
            <text x="50" y="115" textAnchor="middle" fontSize="5" fill="#64748b" fontWeight="bold">Tasa Falsos Positivos (FPR)</text>
            <text x="-15" y="50" textAnchor="middle" fontSize="5" fill="#64748b" fontWeight="bold" transform="rotate(-90 -15 50)">Tasa Verdaderos Positivos (TPR)</text>

            {/* Modelo Aleatorio */}
            <line x1="0" y1="100" x2="100" y2="0" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" />
            
            {/* Curva del Modelo */}
            <path 
              d="M 0 100 L 0 80 L 0 40 L 20 20 L 20 0 L 60 0 L 100 0" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
            />

            {/* Punto Actual */}
            <circle 
              cx={current.fpr * 100} 
              cy={100 - (current.tpr * 100)} 
              r="3" 
              fill="#8b5cf6" 
              className="animate-pulse" 
            />
            
            {/* Guías visuales diapositiva */}
            <text x="30" y="20" fontSize="4" fill="#3b82f6" fontWeight="bold">Mejor (Better)</text>
            <text x="70" y="80" fontSize="4" fill="#94a3b8" fontWeight="bold">Peor (Worse)</text>
          </svg>
        </div>

        {/* Controles y Datos */}
        <div className="space-y-6">
          <div className="bg-purple-900 text-white p-6 rounded-2xl shadow-lg border border-purple-700">
            <h4 className="text-xs uppercase font-black tracking-widest text-purple-300 mb-4">Ajustar Umbral de Decisión</h4>
            <input 
              type="range" 
              min="0" max="5" step="1" 
              value={thresholdIndex} 
              onChange={e => setThresholdIndex(parseInt(e.target.value))}
              className="w-full accent-cyan-400 mb-4"
            />
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 p-2 rounded-lg">
                <div className="text-[8px] uppercase opacity-60">Umbral</div>
                <div className="font-mono text-lg font-black">{current.threshold}</div>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <div className="text-[8px] uppercase opacity-60">FPR</div>
                <div className="font-mono text-lg font-black">{current.fpr}</div>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <div className="text-[8px] uppercase opacity-60">TPR (Recall)</div>
                <div className="font-mono text-lg font-black">{current.tpr}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Resumen de Evaluación</h4>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              "Al umbral {current.threshold}, el modelo logra atrapar al {(current.tpr * 100).toFixed(0)}% de los casos positivos reales, con solo un {(current.fpr * 100).toFixed(0)}% de falsas alarmas."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegressionMetricsSimulator = () => {
  const [errorPoint, setErrorPoint] = useState(25);
  const baseReal = [30, 25, 32, 28];
  const basePred = [28, 27, 29, 30];
  const real = [...baseReal];
  const pred = [...basePred];
  pred[2] = 32 - errorPoint;
  const n = real.length;
  const sqErrors = real.map((r, i) => Math.pow(r - pred[i], 2));
  const absErrors = real.map((r, i) => Math.abs(r - pred[i]));
  const mae = absErrors.reduce((a, b) => a + b, 0) / n;
  const mse = sqErrors.reduce((a, b) => a + b, 0) / n;
  const rmse = Math.sqrt(mse);
  const meanReal = real.reduce((a, b) => a + b, 0) / n;
  const ssTot = real.reduce((acc, r) => acc + Math.pow(r - meanReal, 2), 0);
  const ssRes = sqErrors.reduce((a, b) => a + b, 0);
  const r2 = 1 - (ssRes / ssTot);

  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-12 shadow-inner text-left">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <TrendingUp className="text-rose-600" /> Simulador: Sensibilidad de Regresión
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <label className="block text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Ajustar Error (Obs. 3)</label>
            <input type="range" min="0" max="60" step="1" value={errorPoint} onChange={e => setErrorPoint(parseInt(e.target.value))} className="w-full accent-rose-600 mb-4" />
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span>Bajo Error</span>
              <span className="text-rose-600 font-mono text-sm">{errorPoint} uds</span>
              <span>Gran Outlier</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg text-center">
              <span className="text-[9px] font-black uppercase opacity-70">MAE (Lineal)</span>
              <div className="text-2xl font-black font-mono">{mae.toFixed(2)}</div>
            </div>
            <div className={`p-4 rounded-xl shadow-lg text-center transition-all duration-500 ${errorPoint > 20 ? 'bg-rose-700' : 'bg-rose-500'} text-white`}>
              <span className="text-[9px] font-black uppercase opacity-70">MSE (Cuadratico)</span>
              <div className="text-2xl font-black font-mono">{mse.toFixed(0)}</div>
            </div>
            <div className="bg-emerald-500 text-white p-4 rounded-xl shadow-lg text-center">
              <span className="text-[9px] font-black uppercase opacity-70">RMSE (Escala Real)</span>
              <div className="text-2xl font-black font-mono">{rmse.toFixed(2)}</div>
            </div>
            <div className="bg-amber-500 text-white p-4 rounded-xl shadow-lg text-center">
              <span className="text-[9px] font-black uppercase opacity-70">R2 Score</span>
              <div className="text-2xl font-black font-mono">{r2.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-sm self-center shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-rose-500" /> Analisis Practico</h4>
          <p className="text-slate-600 leading-relaxed text-xs text-left mb-4">
            Nota como el <strong>MSE</strong> y el <strong>RMSE</strong> crecen exponencialmente al simular un outlier. Esto valida por que usamos MAE para metricas robustas y MSE para penalizar fallos inaceptables que deben ser corregidos agresivamente.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-[10px] text-amber-800 italic">
            Tip: Un R2 de 1.0 es el ajuste perfecto. Valores negativos indican que el modelo no logra capturar ni siquiera la tendencia base de los datos.
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CONTENIDO SEMANA 3
// ==========================================

const Semana3Content = () => (
  <div className="max-w-4xl mx-auto py-8 px-4 space-y-12 animate-in fade-in duration-500 pb-20 text-left">
    
    {/* DESCRIPCIÓN Y PROPÓSITO */}
    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="inline-block bg-emerald-100 text-emerald-800 text-[10px] px-3 py-1 rounded-full mb-4 font-black tracking-widest uppercase">Módulo 3: Métricas</div>
      <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Métricas de Desempeño</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ClipboardCheck className="text-emerald-600" /> Descripción
          </h4>
          <p className="text-slate-600 leading-relaxed text-sm">
            Evalúan la <strong>eficacia y eficiencia</strong> de los modelos y algoritmos desarrollados. Representan una forma <strong>cuantitativa</strong> de medir qué tan bien un modelo está realizando una tarea específica.
          </p>

          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 pt-4 border-t border-slate-50">
            <Target className="text-blue-600" /> Propósito
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-4 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
              <Search className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
              <div>
                <strong className="text-blue-900 block text-xs tracking-tighter uppercase">Evaluación de Modelos</strong>
                <p className="text-[11px] text-blue-700">Comparar diferentes modelos para determinar cuál funciona mejor para una tarea dada.</p>
              </div>
            </li>
            <li className="flex gap-4 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <Sliders className="w-5 h-5 text-indigo-600 shrink-0 mt-1" />
              <div>
                <strong className="text-indigo-900 block text-xs tracking-tighter uppercase">Optimización de Modelos</strong>
                <p className="text-[11px] text-indigo-700">Guiar el ajuste de hiperparámetros para mejorar el rendimiento.</p>
              </div>
            </li>
            <li className="flex gap-4 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <Activity className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
              <div>
                <strong className="text-emerald-900 block text-xs tracking-tighter uppercase">Toma de Decisiones</strong>
                <p className="text-[11px] text-emerald-700">Proporcionar información valiosa para decidir su implementación real.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* INSIGHT CLAVE EXPANDIDO */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden h-full flex flex-col">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles className="w-12 h-12" /></div>
          <h4 className="font-black text-indigo-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
            💡 Insight Clave: El requerimiento matemático
          </h4>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300 text-left">
            <p>
              ¿Por qué estas métricas son exclusivas del <strong>Aprendizaje Supervisado</strong>? Porque toda fórmula requiere comparar la <strong>"Predicción de la IA"</strong> contra el <strong>"Valor Real"</strong>.
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3 text-xs">
              <p className="flex gap-2">
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Clasificación:</strong> Cruzamos diagnóstico IA vs. realidad (si el paciente estaba enfermo).</span>
              </p>
              <p className="flex gap-2">
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Regresión:</strong> Restamos el número predicho vs. el precio real de la casa.</span>
              </p>
            </div>
            <p className="text-xs leading-relaxed">
              Para esta comparación matemática, <strong>necesitas tener las respuestas correctas guardadas</strong> (datos etiquetados). Por eso estas métricas definen el Aprendizaje Supervisado.
            </p>
            <p className="italic border-t border-white/10 pt-4 mt-auto text-xs text-slate-400">
              En el <strong>No Supervisado</strong> (Clustering), la IA trabaja a ciegas. Usamos métricas geométricas como el <strong>Coeficiente de Silueta</strong> (qué tan agrupados están los datos).
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* DEFINICIÓN DE TÉRMINOS */}
    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2 text-left">
        <Layers className="text-indigo-600" /> Definición de términos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-4 items-start shadow-sm">
          <div className="p-2 bg-emerald-500 rounded-lg text-white shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
          <div className="text-left">
            <h4 className="font-black text-emerald-900 text-sm uppercase tracking-tighter">TP (True Positive)</h4>
            <p className="text-xs text-emerald-800 mt-1 opacity-80">El modelo predice positivo y realmente lo es. <br/><strong>Ejemplo:</strong> Predice enfermedad y el paciente la tiene.</p>
          </div>
        </div>
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4 items-start shadow-sm">
          <div className="p-2 bg-blue-500 rounded-lg text-white shrink-0"><ThumbsUp className="w-5 h-5" /></div>
          <div className="text-left">
            <h4 className="font-black text-blue-900 text-sm uppercase tracking-tighter">TN (True Negative)</h4>
            <p className="text-xs text-blue-800 mt-1 opacity-80">El modelo predice negativo y realmente lo es. <br/><strong>Ejemplo:</strong> Predice que está sano y el paciente realmente lo está.</p>
          </div>
        </div>
        <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4 items-start shadow-sm text-left">
          <div className="p-2 bg-amber-500 rounded-lg text-white shrink-0"><BellRing className="w-5 h-5" /></div>
          <div>
            <h4 className="font-black text-amber-900 text-sm uppercase tracking-tighter">FP (False Positive)</h4>
            <p className="text-xs text-amber-800 mt-1 opacity-80">"Falsa alarma" o Error de Tipo I: El modelo predice positivo pero es negativo.</p>
          </div>
        </div>
        <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex gap-4 items-start shadow-sm text-left">
          <div className="p-2 bg-rose-500 rounded-lg text-white shrink-0"><ShieldAlert className="w-5 h-5" /></div>
          <div>
            <h4 className="font-black text-rose-900 text-sm uppercase tracking-tighter">FN (False Negative)</h4>
            <p className="text-xs text-rose-800 mt-1 opacity-80">"Omisión" o Error de Tipo II: El modelo predice negativo pero es positivo.</p>
          </div>
        </div>
      </div>
    </section>

    {/* PARTE 1: CLASIFICACIÓN */}
    <div className="space-y-12">
      <div className="flex items-center gap-3 mb-2 px-2 text-left">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md shadow-blue-200">Parte 1</span>
        <h2 className="text-3xl font-black text-slate-900">Métricas de Clasificación</h2>
      </div>

      {/* 1. ACCURACY */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-2/3 space-y-4 text-left">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              1. Accuracy (Exactitud)
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Es una de las métricas de evaluación más utilizadas. Mide la proporción de <strong>predicciones correctas</strong> sobre el total de muestras evaluadas.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center font-mono text-sm py-8 shadow-inner text-slate-800">
              Accuracy = (TP + TN) / (TP + TN + FP + FN)
            </div>
          </div>
          <div className="lg:w-1/3 bg-indigo-50 p-6 rounded-3xl border border-indigo-100 shadow-sm self-stretch flex flex-col justify-center text-left">
            <h4 className="font-bold text-indigo-900 text-sm mb-3 flex items-center gap-2 italic">
              <BookOpen className="w-4 h-4"/> Ejemplo: Pacientes
            </h4>
            <div className="space-y-2 text-[11px] text-indigo-800">
              <p>Evaluando 100 pacientes:</p>
              <ul className="space-y-1 ml-4 list-disc opacity-80">
                <li><strong>TP = 45:</strong> Enfermos detectados.</li>
                <li><strong>TN = 40:</strong> Sanos detectados.</li>
                <li><strong>FP = 10:</strong> Sanos marcados como enfermos.</li>
                <li><strong>FN = 5:</strong> Enfermos no detectados.</li>
              </ul>
              <div className="font-black mt-4 border-t border-indigo-200 pt-2 text-center text-sm uppercase">
                Resultado: 85% Exactitud
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-left">
            <h4 className="font-bold text-rose-900 text-xs uppercase mb-2 flex items-center gap-2 tracking-widest text-left">
              <AlertTriangle className="w-4 h-4"/> Limitaciones
            </h4>
            <p className="text-[11px] text-rose-800 leading-relaxed italic">
              "Si el 99% son transacciones normales y el 1% es fraude, un modelo que siempre diga 'Normal' tendrá un 99% de Accuracy pero nunca detectará el fraude."
            </p>
          </div>
          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl text-left">
            <h4 className="font-bold text-emerald-900 text-xs uppercase mb-2 flex items-center gap-2 tracking-widest text-left">
              <ThumbsUp className="w-4 h-4"/> Cuándo Usar
            </h4>
            <ul className="text-[11px] text-emerald-800 space-y-1 list-disc ml-4">
              <li>Distribución de clases balanceada.</li>
              <li>Costos de errores similares.</li>
              <li>Necesidad de una visión general rápida.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. PRECISION */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3 space-y-4 text-left">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              2. Precision (Precisión o VPP)
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm text-left">
              Proporción de instancias correctamente clasificadas como positivas respecto al total predicho como positivo. Es la medida de la <strong>confiabilidad</strong>.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center font-mono text-sm py-8 shadow-inner text-slate-800">
              Precision = TP / (TP + FP)
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-sm italic text-yellow-800 flex gap-2 items-center shadow-sm">
              <Sparkles className="w-5 h-5 text-yellow-500 shrink-0" />
              "De todos los casos que la IA clasificó como positivos, ¿cuántos realmente lo eran?"
            </div>
          </div>
          
          <div className="lg:w-1/3 bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm self-stretch flex flex-col justify-center text-left">
            <h4 className="font-bold text-blue-900 text-sm mb-3 flex items-center gap-2 italic">
              <Mail className="w-4 h-4"/> Ejemplo: Filtro Spam
            </h4>
            <div className="space-y-2 text-[11px] text-blue-800 text-left">
              <p>Evaluando 100 correos:</p>
              <ul className="space-y-1 ml-4 list-disc opacity-80">
                <li><strong>Positivos Reales:</strong> 30 spam.</li>
                <li><strong>Negativos Reales:</strong> 70 legítimos.</li>
                <li><strong>TP = 20:</strong> Spam detectado.</li>
                <li><strong>FP = 5:</strong> Legítimos marcados como Spam.</li>
              </ul>
              <div className="font-black mt-4 border-t border-blue-200 pt-2 text-center text-sm uppercase">
                Precisión = 20 / (20 + 5) = 80%
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
            <Stethoscope className="w-8 h-8 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
            <h5 className="font-bold text-slate-800 text-xs mb-1">Diagnóstico Médico</h5>
            <p className="text-[10px] text-slate-500 leading-tight">Evita ansiedad y pruebas innecesarias por falsas alarmas (FP).</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
            <Tv className="w-8 h-8 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
            <h5 className="font-bold text-slate-800 text-xs mb-1">Recomendación</h5>
            <p className="text-[10px] text-slate-500 leading-tight">Garantiza resultados relevantes al usuario.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <h5 className="font-bold text-slate-800 text-xs mb-1">Detección de Fraude</h5>
            <p className="text-[10px] text-slate-500 leading-tight">Evita bloquear transacciones legítimas y molestar al usuario.</p>
          </div>
        </div>
      </section>

      {/* 3. RECALL */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start text-left">
          <div className="lg:w-2/3 space-y-4">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              3. Recall (Sensibilidad o TPR)
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm text-left">
              Mide qué tan bien el modelo encuentra los casos positivos reales. Es la <strong>Tasa de Verdaderos Positivos</strong>.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center font-mono text-sm py-8 shadow-inner text-slate-800">
              Recall = TP / (TP + FN)
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm italic text-blue-800 flex gap-2 items-center shadow-sm">
              <Eye className="w-5 h-5 text-blue-500 shrink-0" />
              "De todos los casos que realmente eran positivos, ¿cuántos logré detectar?"
            </div>
          </div>
          
          <div className="lg:w-1/3 bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm self-stretch flex flex-col justify-center text-left">
            <h4 className="font-bold text-emerald-900 text-sm mb-3 flex items-center gap-2 italic">
              <BookOpen className="w-4 h-4"/> Ejemplo: Diagnóstico
            </h4>
            <div className="space-y-2 text-[11px] text-emerald-800 text-left">
              <p>Evaluando 100 pacientes:</p>
              <ul className="space-y-1 ml-4 list-disc opacity-80 text-left">
                <li><strong>Positivos Reales:</strong> 30 enfermos.</li>
                <li><strong>Negativos Reales:</strong> 70 sanos.</li>
                <li><strong>TP = 25:</strong> Enfermos detectados.</li>
                <li><strong>FN = 5:</strong> Enfermos ignorados.</li>
              </ul>
              <div className="font-black mt-4 border-t border-emerald-200 pt-2 text-center text-sm uppercase">
                Recall = 25 / (25 + 5) = 83.3%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. F1-SCORE */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 text-left">
        <div className="flex flex-col lg:flex-row gap-8 items-start text-left">
          <div className="lg:w-2/3 space-y-4">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              4. F1-Score
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Combina <strong>precisión</strong> y <strong>recall</strong> en una sola medida. Es la media armónica de ambas. Útil cuando necesitas un equilibrio.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center font-mono text-sm py-8 shadow-inner text-slate-800">
              F1 = 2 * (Precision * Recall) / (Precision + Recall)
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 text-sm italic text-orange-800 flex gap-2 items-center shadow-sm">
              <Zap className="w-5 h-5 text-orange-500 shrink-0" />
              "¿Cuál es el mejor equilibrio entre precisión y recall en mi modelo?"
            </div>
          </div>
          
          <div className="lg:w-1/3 bg-amber-50 p-6 rounded-3xl border border-amber-100 shadow-sm self-stretch flex flex-col justify-center text-left">
            <h4 className="font-bold text-amber-900 text-sm mb-3 flex items-center gap-2 italic">
              <Landmark className="w-4 h-4"/> Ejemplo: Fraude Bancario
            </h4>
            <div className="space-y-2 text-[11px] text-amber-800 text-left">
              <p>De 1000 transacciones:</p>
              <ul className="space-y-1 ml-4 list-disc opacity-80">
                <li><strong>Fraudes Reales:</strong> 50.</li>
                <li><strong>TP = 40:</strong> Fraudes detectados.</li>
                <li><strong>FP = 20:</strong> Legítimas marcadas mal.</li>
                <li><strong>FN = 10:</strong> Fraudes omitidos.</li>
              </ul>
              <div className="font-black mt-4 border-t border-amber-200 pt-2 text-center text-sm uppercase">
                F1 = 0.727
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MATRIZ DE CONFUSIÓN */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 text-left">
        <div className="flex items-center gap-3 mb-2 px-2 text-left">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            5. Matriz de Confusión
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start text-left">
          <div className="lg:w-1/2 space-y-4">
            <p className="text-slate-600 leading-relaxed text-sm">
              Herramienta fundamental para evaluar el rendimiento. Permite analizar cuántas predicciones fueron correctas e incorrectas y qué tipos de errores cometió el modelo.
            </p>
            <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 space-y-3">
              <h4 className="font-black text-indigo-900 text-xs uppercase tracking-widest flex items-center gap-2">
                <ListChecks className="w-4 h-4" /> ¿Cuándo Usar?
              </h4>
              <ul className="text-xs text-indigo-800 space-y-2">
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 mt-1 shrink-0"/> Visualizar rendimiento más allá de una sola métrica.</li>
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 mt-1 shrink-0"/> Calcular métricas derivadas (Precision, Recall, F1).</li>
                <li className="flex gap-2"><ChevronRight className="w-3 h-3 mt-1 shrink-0"/> En clasificación multiclase para entender qué clases se confunden.</li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-center">
              <div className="grid grid-cols-3 gap-2 mb-2 font-black text-[10px] uppercase tracking-widest">
                <div></div>
                <div className="text-indigo-600">Pred: Clase 1</div>
                <div className="text-indigo-600">Pred: Clase 2</div>
              </div>
              <div className="grid grid-cols-3 gap-2 h-32">
                <div className="flex items-center justify-center font-black text-[10px] uppercase tracking-widest text-slate-400 rotate-[-90deg]">Real C1</div>
                <div className="bg-emerald-100 border-2 border-emerald-300 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-emerald-900 font-black text-xl">TP</span>
                  <span className="text-[8px] text-emerald-700">Aciertos C1</span>
                </div>
                <div className="bg-amber-100 border-2 border-amber-300 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-amber-900 font-black text-xl">FP</span>
                  <span className="text-[8px] text-amber-700">Fallos C2</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 h-32 mt-2">
                <div className="flex items-center justify-center font-black text-[10px] uppercase tracking-widest text-slate-400 rotate-[-90deg]">Real C2</div>
                <div className="bg-rose-100 border-2 border-rose-300 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-rose-900 font-black text-xl">FN</span>
                  <span className="text-[8px] text-rose-700">Fallos C1</span>
                </div>
                <div className="bg-blue-100 border-2 border-blue-300 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-blue-900 font-black text-xl">TN</span>
                  <span className="text-[8px] text-blue-700">Aciertos C2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EJEMPLO MULTICLASE */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 text-left">
          <h4 className="text-xl font-black text-indigo-400 flex items-center gap-2">
            <Grid3X3 className="w-6 h-6" /> Ejemplo Multiclase (Animales)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono border-collapse border border-white/10">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-3 border border-white/10"></th>
                  <th className="p-3 border border-white/10 text-indigo-300">Pred: Perro</th>
                  <th className="p-3 border border-white/10 text-indigo-300">Pred: Gato</th>
                  <th className="p-3 border border-white/10 text-indigo-300">Pred: Pájaro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-white/10 font-bold bg-white/5">Real: Perro</td>
                  <td className="p-3 border border-white/10 bg-emerald-500/20 text-emerald-400 font-black text-center">40 ✓</td>
                  <td className="p-3 border border-white/10 bg-rose-500/10 text-rose-400 text-center">5 ✗</td>
                  <td className="p-3 border border-white/10 bg-rose-500/10 text-rose-400 text-center">3 ✗</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold bg-white/5">Real: Gato</td>
                  <td className="p-3 border border-white/10 bg-rose-500/10 text-rose-400 text-center">7 ✗</td>
                  <td className="p-3 border border-white/10 bg-emerald-500/20 text-emerald-400 font-black text-center">50 ✓</td>
                  <td className="p-3 border border-white/10 bg-rose-500/10 text-rose-400 text-center">2 ✗</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold bg-white/5">Real: Pájaro</td>
                  <td className="p-3 border border-white/10 bg-rose-500/10 text-rose-400 text-center">6 ✗</td>
                  <td className="p-3 border border-white/10 bg-rose-500/10 text-rose-400 text-center">3 ✗</td>
                  <td className="p-3 border border-white/10 bg-emerald-500/20 text-emerald-400 font-black text-center">55 ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
           <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl space-y-4">
              <h4 className="font-black text-rose-900 text-xs uppercase tracking-widest flex items-center gap-2">
                <AlertOctagon className="w-4 h-4" /> Limitaciones de la Matriz
              </h4>
              <ul className="text-[11px] text-rose-800 space-y-3 opacity-80 list-disc pl-4 text-left">
                <li>No es útil con datos desbalanceados (Accuracy engañosa).</li>
                <li>No indica calidad absoluta, solo muestra errores.</li>
                <li>Escalabilidad limitada en multiclase masiva.</li>
                <li>No mide confianza en las predicciones.</li>
              </ul>
           </div>
           <div className="bg-indigo-900 p-6 rounded-2xl shadow-xl flex flex-col justify-center">
              <div className="bg-indigo-400/20 p-3 rounded-full w-fit mb-4">
                <ArrowDownNarrowWide className="text-indigo-400 w-6 h-6" />
              </div>
              <p className="text-xs text-white leading-relaxed italic text-left">
                "FN (20 legítimos en spam) puede ser molesto, pero no crítico. FP (50 spam no detectados) llena tu bandeja de basura. El balance es la clave."
              </p>
           </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-left">
          <div className="flex items-center justify-between gap-3">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Simulador Parte 1 · 1 de 2</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Matriz de Confusión</span>
          </div>
          <p className="text-xs text-indigo-800 mt-2">
            Ajusta TP, TN, FP y FN para ver en tiempo real cómo cambian Accuracy, Precision, Recall y F1-Score.
          </p>
        </div>

        <ConfusionMatrixSimulator />
      </section>

      {/* 6. CURVA ROC Y AUC */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-12 text-left">
        <div className="flex items-center gap-3 mb-2 px-2 text-left">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            6. Curva ROC y AUC
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3 space-y-6">
            <p className="text-slate-600 leading-relaxed text-sm">
              La <strong>Curva ROC</strong> (Receiver Operating Characteristic) evalúa el rendimiento al mostrar la relación entre la <strong>Sensibilidad (TPR)</strong> y la <strong>Tasa de Falsos Positivos (FPR)</strong> en diferentes umbrales de decisión.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <h4 className="font-black text-indigo-900 text-xs mb-3 flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> Fórmulas Clave
                </h4>
                <div className="space-y-4 font-mono text-[10px]">
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="block text-indigo-500 font-bold mb-1">TPR (Recall):</span>
                    TP / (TP + FN)
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="block text-rose-500 font-bold mb-1">FPR (Falsos Pos.):</span>
                    FP / (FP + TN)
                  </div>
                </div>
              </div>

              <div className="p-5 bg-purple-50 border border-purple-100 rounded-2xl">
                <h4 className="font-black text-purple-900 text-xs mb-3 flex items-center gap-2">
                  <SearchCode className="w-4 h-4" /> Interpretación AUC
                </h4>
                <ul className="text-[10px] space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500"/> <strong>1.0:</strong> Modelo perfecto.</li>
                  <li className="flex items-center gap-2"><AlertCircle className="w-3 h-3 text-amber-500"/> <strong>0.5:</strong> Modelo aleatorio (azar).</li>
                  <li className="flex items-center gap-2"><XCircle className="w-3 h-3 text-rose-500"/> <strong>&lt; 0.5:</strong> Peor que el azar.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 bg-slate-900 text-white p-6 rounded-3xl shadow-xl self-stretch flex flex-col justify-center">
            <h4 className="font-bold text-xs uppercase mb-4 tracking-widest text-indigo-400">Ejemplo: Umbrales Spam</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] text-center border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-2 text-slate-400 font-medium">Umbral</th>
                    <th className="pb-2 text-rose-300 font-bold">FPR</th>
                    <th className="pb-2 text-emerald-300 font-bold">TPR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white/5"><td className="py-1.5 border-b border-white/5">0.65</td><td className="py-1.5 border-b border-white/5">0</td><td className="py-1.5 border-b border-white/5">0.2</td></tr>
                  <tr><td className="py-1.5 border-b border-white/5">0.55</td><td className="py-1.5 border-b border-white/5">0</td><td className="py-1.5 border-b border-white/5">0.6</td></tr>
                  <tr className="bg-white/5"><td className="py-1.5 border-b border-white/5">0.50</td><td className="py-1.5 border-b border-white/5">0.2</td><td className="py-1.5 border-b border-white/5">0.8</td></tr>
                  <tr><td className="py-1.5 border-b border-white/5">0.40</td><td className="py-1.5 border-b border-white/5">0.6</td><td className="py-1.5 border-b border-white/5">1.0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-left">
          <div className="flex items-center justify-between gap-3">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Simulador Parte 1 · 2 de 2</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">Curva ROC y Umbral</span>
          </div>
          <p className="text-xs text-purple-800 mt-2">
            Mueve el umbral de decisión para observar el impacto en TPR, FPR y la posición del punto en la curva ROC.
          </p>
        </div>

        {/* SIMULADOR GRÁFICO */}
        <ROCSimulator />

        {/* USO Y LIMITACIONES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-blue-500" /> ¿Cuándo Usar?
            </h4>
            <ul className="text-[11px] text-slate-700 space-y-2 opacity-90 pl-4 list-disc">
              <li>Cuando el balance entre FP y FN es clave (salud, fraude).</li>
              <li>Para comparar modelos y elegir el más efectivo.</li>
              <li>Cuando el umbral de decisión puede ajustarse.</li>
              <li>Modelos probabilísticos para medir rendimiento global.</li>
            </ul>
          </div>
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl space-y-4">
            <h4 className="font-black text-rose-900 text-xs uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Limitaciones
            </h4>
            <ul className="text-[11px] text-rose-800 space-y-2 opacity-90 pl-4 list-disc">
              <li>No es útil en datos muy desbalanceados (AUC engañoso).</li>
              <li>No muestra el mejor umbral por sí sola.</li>
              <li>No diferencia tipos de errores (FN vs FP).</li>
              <li>A veces insensible a mejoras leves en TPR/FPR.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3 mb-2 mt-8 px-2 text-left border-b-2 border-slate-200 pb-4">
        <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">Parte 2</span>
        <h2 className="text-3xl font-black text-slate-900">Métricas de Regresión</h2>
      </div>

      {/* 1. MAE */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 text-left">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-sm"><TrendingUp className="w-8 h-8" /></div>
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">1. Error Absoluto Medio (MAE)</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Evalúa el desempeño de un modelo midiendo el <strong>error promedio entre las predicciones y los valores reales</strong>, sin considerar la dirección del error (usa valor absoluto).
            </p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner relative text-center">
               <div className="absolute top-2 left-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fórmula MAE</div>
               <div className="font-serif text-2xl text-slate-800 mb-6">MAE = <span className="text-lg">(1/n)</span> Σ |y<sub className="text-[10px]">i</sub> - ŷ<sub className="text-[10px]">i</sub>|</div>
               <div className="text-left text-[10px] text-slate-400 font-mono border-t border-slate-200 pt-4">y<sub className="text-[8px]">i</sub>: valor real | ŷ<sub className="text-[8px]">i</sub>: predicho | n: observaciones</div>
            </div>
          </div>
          <div className="lg:w-1/3 self-stretch flex flex-col gap-4">
            <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-sm text-left h-full flex flex-col justify-center">
              <h4 className="font-black text-indigo-900 text-xs uppercase mb-3 flex items-center gap-2"><Thermometer className="w-4 h-4" /> Caso Temperatura</h4>
              <div className="bg-indigo-600 text-white p-3 rounded-xl text-center font-black text-xs uppercase">MAE = 2.25°C</div>
              <p className="text-[10px] text-indigo-800 mt-3 italic text-center">El modelo tiene un error promedio de 2.25°C en sus predicciones.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <h4 className="font-black text-blue-600 text-xs uppercase tracking-widest flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> ¿Cuándo usar?</h4>
            <ul className="text-[11px] text-slate-700 space-y-2 list-disc pl-4">
              <li>Cuando se necesita interpretar el error en <strong>unidades reales</strong>.</li>
              <li>En problemas donde los errores positivos y negativos tienen igual importancia.</li>
              <li>Cuando se buscan métricas <strong>robustas</strong> ante grandes valores atípicos.</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl space-y-3 shadow-sm">
            <h4 className="font-black text-rose-600 text-xs uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Limitaciones</h4>
            <ul className="text-[11px] text-rose-800 space-y-2 list-disc pl-4 opacity-90">
              <li><strong>No penaliza</strong> los errores grandes.</li>
              <li>No es derivable en algunos puntos, lo que dificulta su uso en optimización.</li>
              <li>No es ideal para comparar modelos con diferentes escalas de valores.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. MSE */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 text-left">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 shadow-sm"><Zap className="w-8 h-8" /></div>
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">2. Error Cuadrático Medio (MSE)</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Mide la diferencia promedio al cuadrado entre los valores predichos y los valores reales. <strong>Penaliza los errores grandes</strong> más que los pequeños, lo que lo hace sensible a valores atípicos.
            </p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner relative text-center">
               <div className="absolute top-2 left-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fórmula MSE</div>
               <div className="font-serif text-2xl text-slate-800 mb-6">MSE = <span className="text-lg">(1/n)</span> Σ (y<sub className="text-[10px]">i</sub> - ŷ<sub className="text-[10px]">i</sub>)²</div>
               <div className="text-left text-[10px] text-slate-400 font-mono border-t border-slate-200 pt-4">El cuadrado amplifica el impacto de los errores grandes.</div>
            </div>
          </div>
          <div className="lg:w-1/3 self-stretch flex flex-col justify-center">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl text-left border border-slate-700">
              <h4 className="font-bold text-amber-400 text-xs uppercase mb-4 tracking-widest">Ejemplo Térmico</h4>
              <div className="space-y-2 font-mono text-[10px]">
                <div className="flex justify-between"><span>Err: 2°C</span><span>Err²: 4</span></div>
                <div className="flex justify-between"><span>Err: 3°C</span><span>Err²: 9</span></div>
              </div>
              <div className="mt-4 p-2 bg-white/5 rounded border border-white/10 text-center font-black text-amber-400 text-sm">MSE = 5.25°C²</div>
              <p className="text-[9px] text-slate-400 mt-2 text-center">Indica que en promedio los errores al cuadrado son 5.25°C².</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <h4 className="font-black text-amber-600 text-xs uppercase tracking-widest flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> ¿Cuándo usar?</h4>
            <ul className="text-[11px] text-slate-700 space-y-2 list-disc pl-4">
              <li>Cuando se desea penalizar errores grandes más que pequeños.</li>
              <li>En modelos de regresión lineal y redes neuronales, ya que es diferenciable.</li>
              <li>En problemas donde los errores grandes son costosos.</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl space-y-3 shadow-sm">
            <h4 className="font-black text-rose-600 text-xs uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Limitaciones</h4>
            <ul className="text-[11px] text-rose-800 space-y-2 list-disc pl-4 opacity-90">
              <li>Penaliza fuertemente los valores atípicos.</li>
              <li><strong>No tiene una escala interpretable</strong> (resultado en unidades cuadradas).</li>
              <li>Menos robusto en comparación con el MAE.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. RMSE */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 text-left">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 shadow-sm"><Sparkles className="w-8 h-8" /></div>
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">3. Raíz del Error Cuadrático Medio (RMSE)</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Es la raíz cuadrada del MSE. Permite expresar el error en las <strong>mismas unidades que los datos originales</strong> manteniendo la penalización matemática a los errores grandes.
            </p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner relative text-center">
               <div className="absolute top-2 left-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fórmula RMSE</div>
               <div className="font-serif text-2xl text-slate-800 mb-6">RMSE = √[ <span className="text-lg">(1/n)</span> Σ (y<sub className="text-[10px]">i</sub> - ŷ<sub className="text-[10px]">i</sub>)² ]</div>
               <div className="text-left text-[10px] text-slate-400 font-mono border-t border-slate-200 pt-4">O lo que es lo mismo: RMSE = √MSE</div>
            </div>
          </div>
          
          <div className="lg:w-1/3 self-stretch flex flex-col justify-center">
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm text-center h-full flex flex-col justify-center">
              <h4 className="font-black text-emerald-900 text-xs uppercase mb-4 tracking-widest">Retorno a Unidad Real</h4>
              <p className="text-[10px] text-emerald-800 mb-2 italic">Si el MSE fue 5.25°C²...</p>
              <div className="bg-emerald-600 text-white p-3 rounded-xl font-black text-lg">RMSE = √5.25 ≈ 2.29 °C</div>
              <p className="text-[10px] text-emerald-700 mt-4 leading-tight">
                En promedio, el error de predicción es de <strong>2.29°C</strong>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 text-left shadow-sm">
            <h4 className="font-black text-emerald-600 text-xs uppercase tracking-widest flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> ¿Cuándo Usar RMSE?</h4>
            <ul className="text-[11px] text-slate-700 space-y-3 list-disc pl-4 leading-relaxed">
              <li>Cuando se necesita un error en las <strong>mismas unidades</strong> que los datos originales, facilitando su interpretación.</li>
              <li>En predicción de precios, temperatura o demanda.</li>
              <li>Cuando se quiere <strong>penalizar más los errores grandes</strong>.</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl space-y-4 text-left shadow-sm">
            <h4 className="font-black text-rose-600 text-xs uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Limitaciones</h4>
            <ul className="text-[11px] text-rose-800 space-y-3 list-disc pl-4 opacity-90 leading-relaxed marker:text-rose-500">
              <li><strong>Es sensible a valores atípicos</strong> (errores grandes se elevan al cuadrado).</li>
              <li>No indica la dirección del error.</li>
              <li>No es ideal para comparar modelos en conjuntos de datos con escalas diferentes.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMPARACIÓN DE MÉTRICAS */}
      <section className="bg-slate-900 p-8 rounded-3xl shadow-xl space-y-8 text-left border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-2xl text-white shadow-sm"><ArrowLeftRight className="w-8 h-8" /></div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Comparación con otras métricas</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/20 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white">
                <th className="p-4 text-xs font-black uppercase tracking-widest border-r border-white/10">Métrica</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest border-r border-white/10">Interpretación</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-center">Sensibilidad a errores grandes</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/10"><td className="p-4 font-black text-blue-400 bg-white/5 border-r border-white/10">MAE</td><td className="p-4 text-slate-300 border-r border-white/10">Error promedio absoluto</td><td className="p-4 text-center bg-white/5"><span className="text-blue-300 font-black">Baja</span></td></tr>
              <tr className="border-b border-white/10"><td className="p-4 font-black text-amber-400 bg-white/5 border-r border-white/10">MSE</td><td className="p-4 text-slate-300 border-r border-white/10">Error cuadrático medio (eleva los errores al cuadrado)</td><td className="p-4 text-center bg-white/5"><span className="text-rose-400 font-black">Alta</span></td></tr>
              <tr><td className="p-4 font-black text-emerald-400 bg-white/5 border-r border-white/10">RMSE</td><td className="p-4 text-slate-300 border-r border-white/10">Raíz del MSE, devuelve el error en las mismas unidades que los datos</td><td className="p-4 text-center bg-white/5"><span className="text-rose-400 font-black">Alta</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. R2 SCORE */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 text-left">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 shadow-sm"><Percent className="w-8 h-8" /></div>
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">4. Coeficiente de Determinación (R² Score)</h2>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-sm text-left">
              Es una métrica utilizada en modelos de regresión para medir <strong>qué tan bien el modelo explica la variabilidad de los datos</strong>. Evalúa la proporción de la variabilidad total en la variable dependiente que puede ser explicada por las variables independientes del modelo.
            </p>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner relative text-center">
               <div className="absolute top-2 left-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fórmula del R² Score</div>
               <div className="font-serif text-2xl text-slate-800 mb-6">
                  R² = 1 - (SS<sub className="text-sm">res</sub> / SS<sub className="text-sm">tot</sub>)
               </div>
               <div className="text-left text-[10px] text-slate-500 font-mono space-y-2 px-4 border-t border-slate-200 pt-4">
                  <p><strong>SS<sub className="text-[8px]">res</sub></strong> = Σ(y<sub className="text-[8px]">i</sub> - ŷ<sub className="text-[8px]">i</sub>)² : Suma de los errores al cuadrado (error residual).</p>
                  <p><strong>SS<sub className="text-[8px]">tot</sub></strong> = Σ(y<sub className="text-[8px]">i</sub> - ȳ)² : Suma de las desviaciones al cuadrado (total de variabilidad).</p>
               </div>
            </div>
          </div>

          <div className="lg:w-1/3 self-stretch flex flex-col gap-4">
            <div className="bg-indigo-50 text-indigo-900 p-6 rounded-2xl shadow-sm text-left border border-indigo-100">
              <h4 className="font-bold text-indigo-700 text-xs uppercase mb-4 tracking-widest text-left">Interpretación</h4>
              <ul className="space-y-3 text-[11px]">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> <strong>R² = 1</strong></span>
                  <span className="text-right">Explica toda la variabilidad.</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400"></div> <strong>R² = 0</strong></span>
                  <span className="text-right">No explica nada.</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div> <strong>R² &lt; 0</strong></span>
                  <span className="text-right text-rose-700 font-bold leading-tight">Peor que predecir con la media.</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm text-left border border-emerald-100 flex-1">
               <h4 className="font-black text-emerald-900 text-xs uppercase mb-3 flex items-center gap-2">
                  <Coins className="w-4 h-4" /> Ingresos Mensuales
               </h4>
               <p className="text-[10px] text-emerald-800 leading-tight mb-3">
                 SSres = 40,000 | SStot = 100,000.
               </p>
               <div className="bg-emerald-600 text-white p-2 rounded-lg text-center font-black text-sm my-3 font-mono">
                 1 - (40k / 100k) = 0.6
               </div>
               <p className="text-[10px] font-bold text-emerald-900 border-t border-emerald-200/50 pt-2 leading-tight">
                 El modelo explica el 60% de la variabilidad de los ingresos.
               </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 text-left shadow-sm">
            <h4 className="font-black text-indigo-600 text-xs uppercase tracking-widest flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> ¿Cuándo Usar R²?</h4>
            <ul className="text-[11px] text-slate-700 space-y-3 list-disc pl-4 leading-relaxed">
              <li>Cuando se necesita evaluar la <strong>calidad del ajuste</strong> de un modelo de regresión.</li>
              <li>Para <strong>comparar distintos modelos</strong> de regresión, eligiendo aquel con el mayor R².</li>
              <li>Cuando el objetivo es explicar la relación entre variables.</li>
              <li>En econometría y predicción financiera.</li>
            </ul>
          </div>
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl space-y-4 text-left shadow-sm">
            <h4 className="font-black text-rose-600 text-xs uppercase tracking-widest flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Limitaciones</h4>
            <ul className="text-[11px] text-rose-800 space-y-3 list-disc pl-4 opacity-90 leading-relaxed marker:text-rose-500">
              <li><strong>No mide la precisión del modelo:</strong> Un R² alto no asegura buenas predicciones individuales.</li>
              <li><strong>No detecta sobreajuste:</strong> Exceso de variables infla el R² pero falla en datos nuevos.</li>
              <li><strong>No siempre mejora con más variables:</strong> Algunas solo inflan artificialmente la métrica.</li>
              <li><strong>No es adecuado para modelos no lineales.</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-left">
        <div className="flex items-center justify-between gap-3">
          <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Simulador Parte 2 · 1 de 1</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-700">Métricas de Regresión</span>
        </div>
        <p className="text-xs text-rose-800 mt-2">
          Modifica el error de una observación y compara la sensibilidad de MAE, MSE, RMSE y R².
        </p>
      </div>

      <RegressionMetricsSimulator />

      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden text-left border border-indigo-700 mt-16">
        <div className="absolute top-0 right-0 p-8 opacity-10"><RefreshCw className="w-48 h-48 text-indigo-400" /></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-indigo-300 mb-6 flex items-center gap-3">
            <Layers className="w-8 h-8" /> Conclusiones: El Ciclo de Vida del ML
          </h2>
          <p className="text-indigo-100 mb-10 leading-relaxed text-sm">
            La <strong>Semana 3 (Metricas)</strong> cierra el circulo virtuoso de la Inteligencia Artificial.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl">
              <div className="bg-blue-500/30 w-12 h-12 flex items-center justify-center rounded-xl mb-4"><Cpu className="text-blue-300 w-6 h-6"/></div>
              <h4 className="font-bold text-blue-200 mb-3 text-xs uppercase tracking-widest">Semana 1: El Motor</h4>
              <p className="text-[11px] text-indigo-100/90 leading-relaxed">Sin metricas, no sabriamos si el modelo funciona bien.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl">
              <div className="bg-emerald-500/30 w-12 h-12 flex items-center justify-center rounded-xl mb-4"><Filter className="text-emerald-300 w-6 h-6"/></div>
              <h4 className="font-bold text-emerald-200 mb-3 text-xs uppercase tracking-widest">Semana 2: El Combustible</h4>
              <p className="text-[11px] text-indigo-100/90 leading-relaxed">Las metricas validan si la preparacion de datos realmente mejora resultados.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl border-t-4 border-t-amber-400">
              <div className="bg-amber-500/30 w-12 h-12 flex items-center justify-center rounded-xl mb-4"><Target className="text-amber-300 w-6 h-6"/></div>
              <h4 className="font-bold text-amber-200 mb-3 text-xs uppercase tracking-widest">Semana 3: La Brujula</h4>
              <p className="text-[11px] text-indigo-100/90 leading-relaxed">Si las metricas son bajas, iteramos en datos y modelo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-3">Material PDF del Diplomado</h3>
        <p className="text-sm text-slate-600 mb-4">
          Documento de soporte para esta semana y acceso al repositorio completo de materiales.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/pdfs/Semana 3.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <ExternalLink className="w-4 h-4" /> Abrir PDF Semana 3
          </a>
          <a
            href="/pdfs/Semana 3.pdf"
            download
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download className="w-4 h-4" /> Descargar
          </a>
          <a
            href="/materiales"
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Ver todos los PDF
          </a>
        </div>
      </section>
    </div>

    

  </div>
);

export default function Semana3Page() {
  return <Semana3Content />;
}