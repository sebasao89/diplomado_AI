import React, { useState } from 'react';
import { 
  TrendingUp, Info, Calculator, AlertTriangle, ThumbsUp, 
  Thermometer, ShoppingCart, Sparkles,
  Zap, Percent, ArrowLeftRight, Coins, Target, Sliders, Activity, 
  Layers, Crosshair, ClipboardCheck, ChevronRight, CheckCircle2, 
  ShieldAlert, BookOpen, ShieldCheck, Eye, LifeBuoy, 
  SearchCode, Grid3X3, ListChecks, AreaChart, Cpu, Filter, RefreshCw
} from 'lucide-react';

// ==========================================
// SIMULADORES SEMANA 3
// ==========================================

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
                <span className="text-[9px] font-black uppercase opacity-70">MSE (Cuadrático)</span>
                <div className="text-2xl font-black font-mono">{mse.toFixed(0)}</div>
             </div>
             <div className="bg-emerald-500 text-white p-4 rounded-xl shadow-lg text-center">
                <span className="text-[9px] font-black uppercase opacity-70">RMSE (Escala Real)</span>
                <div className="text-2xl font-black font-mono">{rmse.toFixed(2)}</div>
             </div>
             <div className="bg-amber-500 text-white p-4 rounded-xl shadow-lg text-center">
                <span className="text-[9px] font-black uppercase opacity-70">R² Score</span>
                <div className="text-2xl font-black font-mono">{r2.toFixed(2)}</div>
             </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-sm self-center shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-rose-500" /> Análisis Práctico</h4>
          <p className="text-slate-600 leading-relaxed text-xs text-left mb-4">
            Nota cómo el <strong>MSE</strong> y el <strong>RMSE</strong> crecen exponencialmente al simular un outlier. Esto valida por qué usamos MAE para métricas robustas y MSE para penalizar fallos inaceptables que deben ser corregidos agresivamente.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-[10px] text-amber-800 italic">
            Tip: Un R² de 1.0 es el ajuste perfecto. Valores negativos indican que el modelo no logra capturar ni siquiera la tendencia base de los datos.
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CONTENIDO PRINCIPAL: PARTE 2 REGRESIÓN
// ==========================================

const Semana3Content = () => (
  <div className="max-w-4xl mx-auto py-8 px-4 space-y-16 animate-in fade-in duration-700 text-left pb-20">
    
    <div className="flex items-center gap-3 mb-2 px-2 text-left border-b-2 border-slate-200 pb-4">
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

    <RegressionMetricsSimulator />

    {/* CONCLUSIONES FINALES - EL CICLO DE VIDA ML */}
    <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden text-left border border-indigo-700 mt-16">
      <div className="absolute top-0 right-0 p-8 opacity-10"><RefreshCw className="w-48 h-48 text-indigo-400 animate-spin-slow" /></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-black text-indigo-300 mb-6 flex items-center gap-3">
          <Layers className="w-8 h-8" /> Conclusiones: El Ciclo de Vida del ML
        </h2>
        <p className="text-indigo-100 mb-10 leading-relaxed text-sm">
          La <strong>Semana 3 (Métricas)</strong> cierra el círculo virtuoso de la Inteligencia Artificial, validando todo el trabajo previo:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl">
            <div className="bg-blue-500/30 w-12 h-12 flex items-center justify-center rounded-xl mb-4"><Cpu className="text-blue-300 w-6 h-6"/></div>
            <h4 className="font-bold text-blue-200 mb-3 text-xs uppercase tracking-widest">Semana 1: El Motor</h4>
            <p className="text-[11px] text-indigo-100/90 leading-relaxed">Los algoritmos (KNN, Regresión) nos dan la capacidad de predecir. Sin las métricas, <strong>conduciríamos a ciegas</strong>; no sabríamos si el motor tiene potencia o está fallando miserablemente.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl">
            <div className="bg-emerald-500/30 w-12 h-12 flex items-center justify-center rounded-xl mb-4"><Filter className="text-emerald-300 w-6 h-6"/></div>
            <h4 className="font-bold text-emerald-200 mb-3 text-xs uppercase tracking-widest">Semana 2: El Combustible</h4>
            <p className="text-[11px] text-indigo-100/90 leading-relaxed">El preprocesamiento y limpieza refina los datos. Las métricas de la Semana 3 son el <strong>único juez cuantitativo</strong> para comprobar si esa limpieza realmente mejoró el rendimiento del modelo.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl border-t-4 border-t-amber-400">
            <div className="bg-amber-500/30 w-12 h-12 flex items-center justify-center rounded-xl mb-4"><Target className="text-amber-300 w-6 h-6"/></div>
            <h4 className="font-bold text-amber-200 mb-3 text-xs uppercase tracking-widest">Semana 3: La Brújula</h4>
            <p className="text-[11px] text-indigo-100/90 leading-relaxed">Evaluamos el éxito absoluto. Si el R² o la Exactitud es baja, la brújula nos indica que debemos volver a la S2 (mejorar datos) o a la S1 (ajustar modelo). <strong>¡Este es el flujo iterativo real de la IA!</strong></p>
          </div>
        </div>
      </div>
    </section>

  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL (APP)
// ==========================================

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="text-indigo-600 w-5 h-5" />
            <span className="font-black text-slate-800 uppercase tracking-tighter">Módulo 3: Métricas Supervisadas</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Univ. Sabana • Diplomado IA</span>
          </div>
        </div>
      </nav>

      <main>
        <Semana3Content />
      </main>
    </div>
  );
}