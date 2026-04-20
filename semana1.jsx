import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Info, Activity, AlertTriangle, CheckCircle, Database, Layout, PenTool, Layers, Sparkles, Loader2, MousePointerClick, RefreshCw, GitCommit, Settings, ExternalLink, Download } from 'lucide-react';

// --- COMPONENTES DE SIMULACIÓN ---

const PerceptronSimulator = () => {
  const [x1, setX1] = useState(0.5);
  const [x2, setX2] = useState(0.5);
  const [w1, setW1] = useState(1.0);
  const [w2, setW2] = useState(-1.0);
  const [bias, setBias] = useState(0.0);

  const sum = (x1 * w1) + (x2 * w2) + bias;
  const isActivated = sum >= 0;

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-8 shadow-inner">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Activity className="text-blue-600" /> Simulador de Perceptrón
      </h3>
      <p className="text-sm text-slate-600 mb-6">Ajusta las entradas, los pesos y el bias para ver cómo la neurona decide activarse matemáticamente en tiempo real.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-2">Entradas (Rango 0 a 1)</h4>
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Entrada x₁</span> <span className="font-mono bg-slate-100 px-2 rounded">{x1.toFixed(1)}</span>
                </label>
                <input type="range" min="0" max="1" step="0.1" value={x1} onChange={(e) => setX1(parseFloat(e.target.value))} className="w-full accent-blue-600" />
              </div>
              <div>
                <label className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Entrada x₂</span> <span className="font-mono bg-slate-100 px-2 rounded">{x2.toFixed(1)}</span>
                </label>
                <input type="range" min="0" max="1" step="0.1" value={x2} onChange={(e) => setX2(parseFloat(e.target.value))} className="w-full accent-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-2">Pesos y Bias (Rango -5 a 5)</h4>
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Peso w₁</span> <span className="font-mono bg-slate-100 px-2 rounded">{w1.toFixed(1)}</span>
                </label>
                <input type="range" min="-5" max="5" step="0.1" value={w1} onChange={(e) => setW1(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
              </div>
              <div>
                <label className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Peso w₂</span> <span className="font-mono bg-slate-100 px-2 rounded">{w2.toFixed(1)}</span>
                </label>
                <input type="range" min="-5" max="5" step="0.1" value={w2} onChange={(e) => setW2(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
              </div>
              <div className="pt-2 border-t border-slate-100">
                <label className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Bias (b)</span> <span className="font-mono bg-slate-100 px-2 rounded">{bias.toFixed(1)}</span>
                </label>
                <input type="range" min="-5" max="5" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} className="w-full accent-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="w-full mb-6 p-4 bg-slate-50 rounded-lg font-mono text-sm border border-slate-200">
            <div className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Cálculo Interno ($\Sigma$):</div>
            <div className="flex flex-wrap items-center gap-1">
              <span>(</span><span className="text-blue-600">{x1.toFixed(1)}</span>
              <span>*</span><span className="text-indigo-600">{w1.toFixed(1)}</span><span>)</span>
              <span>+</span>
              <span>(</span><span className="text-blue-600">{x2.toFixed(1)}</span>
              <span>*</span><span className="text-indigo-600">{w2.toFixed(1)}</span><span>)</span>
              <span>+</span><span className="text-emerald-600">({bias.toFixed(1)})</span>
            </div>
            <div className="mt-2 text-lg font-bold text-slate-800 border-t border-slate-200 pt-2">
              Suma Total = {sum.toFixed(2)}
            </div>
          </div>

          <div className="text-center w-full">
            <div className="text-sm text-slate-500 mb-2">Función Escalón: ¿Suma ≥ 0?</div>
            <div className={`transition-all duration-300 transform rounded-xl p-6 shadow-lg border-2 ${
              isActivated 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-200 scale-105' 
                : 'bg-gradient-to-br from-slate-200 to-slate-300 border-slate-100 scale-100 opacity-80'
            }`}>
              <div className="text-white text-3xl font-black drop-shadow-md">
                {isActivated ? 'SALIDA: 1' : 'SALIDA: 0'}
              </div>
              <div className={`text-sm font-bold mt-1 uppercase tracking-widest ${isActivated ? 'text-green-900' : 'text-slate-500'}`}>
                {isActivated ? 'Neurona Activada' : 'Neurona Inactiva'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegressionSimulator = () => {
  const [newX, setNewX] = useState(50);
  
  const trainData = [
    { x: 20, y: 30 }, { x: 25, y: 36 }, { x: 30, y: 38 }, 
    { x: 35, y: 47 }, { x: 40, y: 49 }, { x: 45, y: 53 }, 
    { x: 50, y: 62 }, { x: 55, y: 64 }, { x: 60, y: 71 }
  ];

  const predictedY = (newX * 1) + 10;
  const isInterpolation = newX >= 20 && newX <= 60;

  const mapX = (val) => (val / 100) * 400;
  const mapY = (val) => 300 - ((val / 100) * 300);

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-8 shadow-inner">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Activity className="text-blue-600" /> Simulador: Interpolación vs Extrapolación
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        Mueve el control deslizante para analizar una nueva muestra. Observa cómo la línea de regresión 
        no tiene límites y sigue prediciendo, pero hacerlo fuera de los datos conocidos (extrapolar) es más riesgoso.
      </p>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
        <svg viewBox="0 0 400 300" className="w-full h-64 bg-slate-50 rounded border border-slate-200">
          <line x1="0" y1="150" x2="400" y2="150" stroke="#e2e8f0" strokeDasharray="4" />
          <line x1="200" y1="0" x2="200" y2="300" stroke="#e2e8f0" strokeDasharray="4" />
          
          <rect x={mapX(20)} y="0" width={mapX(60) - mapX(20)} height="300" fill="#dbeafe" opacity="0.3" />
          
          <line x1={mapX(0)} y1={mapY(10)} x2={mapX(100)} y2={mapY(110)} stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
          <line x1={mapX(20)} y1={mapY(30)} x2={mapX(60)} y2={mapY(70)} stroke="#3b82f6" strokeWidth="4" />

          {trainData.map((pt, i) => (
            <circle key={i} cx={mapX(pt.x)} cy={mapY(pt.y)} r="4" fill="#1e3a8a" />
          ))}

          <circle 
            cx={mapX(newX)} cy={mapY(predictedY)} r="8" 
            fill={isInterpolation ? "#10b981" : "#ef4444"} 
            className="transition-all duration-200"
          />
          
          <line x1={mapX(newX)} y1={mapY(predictedY)} x2={mapX(newX)} y2="300" stroke={isInterpolation ? "#10b981" : "#ef4444"} strokeDasharray="4" />
          <line x1="0" y1={mapY(predictedY)} x2={mapX(newX)} y2={mapY(predictedY)} stroke={isInterpolation ? "#10b981" : "#ef4444"} strokeDasharray="4" />
        </svg>

        <div className="flex justify-between px-2 text-xs text-slate-400 mt-2 font-mono">
          <span>0 (Densidad X)</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 text-center">
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          Analizar nueva muestra (Densidad X = {newX})
        </label>
        <input 
          type="range" min="0" max="100" step="1" 
          value={newX} 
          onChange={(e) => setNewX(parseInt(e.target.value))} 
          className={`w-full max-w-lg mx-auto block mb-6 ${isInterpolation ? 'accent-emerald-500' : 'accent-red-500'}`} 
        />
        
        <div className={`p-4 rounded-lg border-2 inline-block text-left transition-colors ${
          isInterpolation ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="font-mono text-lg font-bold text-slate-800 mb-1">
            Predicción Y: {predictedY.toFixed(1)}
          </div>
          <div className="flex items-start gap-2">
            {isInterpolation ? (
              <>
                <CheckCircle className="text-emerald-500 w-5 h-5 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-700 block">Interpolación (Seguro)</span>
                  <span className="text-emerald-600 text-sm">Dentro del rango de datos conocidos.</span>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5" />
                <div>
                  <span className="font-bold text-red-700 block">Extrapolación (Riesgoso)</span>
                  <span className="text-red-600 text-sm">Fuera de los límites. El modelo asume que tendencia continúa.</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const KNNSimulator = () => {
  const [kValue, setKValue] = useState(3);
  const [newPoint, setNewPoint] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [result, setResult] = useState(null);
  const svgRef = useRef(null);

  const initialPoints = [
    { id: 1, x: 20, y: 70, type: 'A' }, { id: 2, x: 25, y: 80, type: 'A' }, { id: 3, x: 15, y: 60, type: 'A' },
    { id: 4, x: 30, y: 65, type: 'A' }, { id: 5, x: 35, y: 85, type: 'A' }, { id: 6, x: 10, y: 90, type: 'A' },
    { id: 7, x: 40, y: 75, type: 'A' }, { id: 8, x: 25, y: 55, type: 'A' }, { id: 9, x: 45, y: 90, type: 'A' },
    { id: 10, x: 70, y: 20, type: 'B' }, { id: 11, x: 80, y: 30, type: 'B' }, { id: 12, x: 60, y: 25, type: 'B' },
    { id: 13, x: 85, y: 15, type: 'B' }, { id: 14, x: 65, y: 40, type: 'B' }, { id: 15, x: 75, y: 45, type: 'B' },
    { id: 16, x: 90, y: 35, type: 'B' }, { id: 17, x: 55, y: 15, type: 'B' }, { id: 18, x: 85, y: 50, type: 'B' },
    { id: 19, x: 45, y: 45, type: 'A' }, { id: 20, x: 50, y: 55, type: 'B' }, { id: 21, x: 55, y: 60, type: 'A' }
  ];

  const handleSvgClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setNewPoint({ x, y });
    calculateKNN(x, y, kValue);
  };

  const calculateKNN = (x, y, k) => {
    const distances = initialPoints.map(pt => ({
      ...pt,
      dist: Math.sqrt(Math.pow(pt.x - x, 2) + Math.pow(pt.y - y, 2))
    }));
    
    distances.sort((a, b) => a.dist - b.dist);
    const nearest = distances.slice(0, k);
    setNeighbors(nearest);

    const votesA = nearest.filter(n => n.type === 'A').length;
    const votesB = nearest.filter(n => n.type === 'B').length;
    
    setResult({
      votesA,
      votesB,
      winner: votesA > votesB ? 'Grupo A (Azules)' : 'Grupo B (Naranjas)',
      color: votesA > votesB ? 'text-blue-700' : 'text-orange-700'
    });
  };

  useEffect(() => {
    if (newPoint) calculateKNN(newPoint.x, newPoint.y, kValue);
  }, [kValue]);

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 shadow-inner">
      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <MousePointerClick className="text-purple-600" /> Simulador: K-Vecinos Más Cercanos (KNN)
      </h3>
      <p className="text-sm text-slate-600 mb-6">Haz clic en cualquier parte del gráfico para añadir una nueva muestra y ver cómo el algoritmo la clasifica buscando a sus "K" vecinos más cercanos.</p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm relative">
            <div className="absolute top-4 left-4 bg-white/80 p-2 rounded text-xs border border-slate-200 pointer-events-none z-10">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Grupo A</div>
              <div className="flex items-center gap-2 mt-1"><div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-orange-500"></div> Grupo B</div>
            </div>
            
            <svg 
              ref={svgRef} 
              viewBox="0 0 100 100" 
              className="w-full aspect-square bg-slate-50 rounded cursor-crosshair"
              onClick={handleSvgClick}
            >
              {newPoint && neighbors.map(n => (
                <line key={`line-${n.id}`} x1={newPoint.x} y1={newPoint.y} x2={n.x} y2={n.y} stroke="#a855f7" strokeWidth="0.5" strokeDasharray="1" opacity="0.7" className="animate-pulse" />
              ))}

              {initialPoints.map(pt => {
                const isNeighbor = neighbors.find(n => n.id === pt.id);
                return pt.type === 'A' ? (
                  <rect key={pt.id} x={pt.x - 2} y={pt.y - 2} width="4" height="4" fill={isNeighbor ? "#1e3a8a" : "#3b82f6"} rx="1" className="transition-all" />
                ) : (
                  <polygon key={pt.id} points={`${pt.x},${pt.y-2.5} ${pt.x-2.5},${pt.y+2} ${pt.x+2.5},${pt.y+2}`} fill={isNeighbor ? "#9a3412" : "#f97316"} className="transition-all" />
                );
              })}

              {newPoint && (
                <circle cx={newPoint.x} cy={newPoint.y} r="3" fill="#a855f7" stroke="#ffffff" strokeWidth="0.5">
                  <animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" />
                </circle>
              )}
            </svg>
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-2">1. Selecciona 'K' (Vecinos)</label>
            <div className="flex items-center gap-4">
              <input type="range" min="1" max="9" step="2" value={kValue} onChange={(e) => setKValue(parseInt(e.target.value))} className="w-full accent-purple-600" />
              <span className="font-mono bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold">{kValue}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Es mejor usar números impares para evitar empates en la votación.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm min-h-[160px]">
            <label className="block text-sm font-bold text-slate-700 mb-4 border-b pb-2">2. Resultado de la Votación</label>
            {!result ? (
              <div className="text-sm text-slate-400 text-center py-4 flex flex-col items-center">
                <MousePointerClick className="w-6 h-6 mb-2 opacity-50" />
                Haz clic en el gráfico para analizar un punto.
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Votos Grupo A:</span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{result.votesA}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-600">Votos Grupo B:</span>
                  <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{result.votesB}</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500 block mb-1">Clasificación ganadora:</span>
                  <strong className={`text-lg block ${result.color}`}>{result.winner}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const KMeansSimulator = () => {
  const [k, setK] = useState(3);
  const [points, setPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [iteration, setIteration] = useState(0);

  const colors = ["#94a3b8", "#ef4444", "#3b82f6", "#10b981", "#a855f7", "#f59e0b"]; // 0 is unassigned

  const generateData = useCallback(() => {
    const newPoints = Array.from({ length: 80 }, () => ({
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      cluster: 0 
    }));
    setPoints(newPoints);
    setCentroids([]);
    setIteration(0);
  }, []);

  useEffect(() => {
    generateData();
  }, [generateData]);

  const stepKMeans = () => {
    if (centroids.length === 0) {
      const newCentroids = Array.from({ length: k }, () => ({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      }));
      setCentroids(newCentroids);
      setIteration(1);
    } else {
      const assignedPoints = points.map(pt => {
        let minDist = Infinity;
        let cluster = 0;
        centroids.forEach((c, idx) => {
          const d = Math.sqrt(Math.pow(pt.x - c.x, 2) + Math.pow(pt.y - c.y, 2));
          if (d < minDist) {
            minDist = d;
            cluster = idx + 1;
          }
        });
        return { ...pt, cluster };
      });

      const newCentroids = centroids.map((_, idx) => {
        const clusterPts = assignedPoints.filter(p => p.cluster === idx + 1);
        if (clusterPts.length === 0) return centroids[idx];
        const sumX = clusterPts.reduce((acc, p) => acc + p.x, 0);
        const sumY = clusterPts.reduce((acc, p) => acc + p.y, 0);
        return {
          x: sumX / clusterPts.length,
          y: sumY / clusterPts.length
        };
      });

      setPoints(assignedPoints);
      setCentroids(newCentroids);
      setIteration(i => i + 1);
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 shadow-inner">
      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <GitCommit className="text-blue-500" /> Simulador: K-Means (Agrupamiento No Supervisado)
      </h3>
      <p className="text-sm text-slate-600 mb-6">El algoritmo agrupa datos sin etiquetas ('a ciegas'). Elige 'K' grupos, inicia el proceso y observa cómo los centros de gravedad (centroides) se ajustan para encontrar similitudes.</p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm relative">
          <svg viewBox="0 0 100 100" className="w-full aspect-square bg-slate-50 rounded">
            {points.map((pt, i) => (
              <circle key={`pt-${i}`} cx={pt.x} cy={pt.y} r="1.5" fill={colors[pt.cluster]} className="transition-colors duration-500" />
            ))}
            {centroids.map((c, i) => (
              <g key={`cent-${i}`} className="transition-all duration-700 ease-in-out" transform={`translate(${c.x}, ${c.y})`}>
                <circle cx="0" cy="0" r="4" fill="white" stroke={colors[i+1]} strokeWidth="1.5" className="animate-pulse" />
                <path d="M-2,-2 L2,2 M-2,2 L2,-2" stroke={colors[i+1]} strokeWidth="1.5" />
              </g>
            ))}
          </svg>
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-2">1. Número de Grupos (K)</label>
            <div className="flex items-center gap-4">
              <input type="range" min="2" max="5" step="1" value={k} onChange={(e) => {setK(parseInt(e.target.value)); generateData();}} className="w-full accent-blue-600" />
              <span className="font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-bold">{k}</span>
            </div>
          </div>

          <button onClick={stepKMeans} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow transition-colors flex justify-center items-center gap-2">
            <Play className="w-5 h-5" />
            {iteration === 0 ? "Iniciar Algoritmo" : "Ejecutar un Paso"}
          </button>
          
          <button onClick={generateData} className="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold py-2 px-4 rounded-xl transition-colors flex justify-center items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> Desordenar Datos
          </button>

          <div className="bg-slate-100 p-3 rounded-lg text-center text-sm font-mono text-slate-600">
            Iteración actual: <span className="font-bold text-slate-800">{iteration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE IA: GEMINI EXAMPLES GENERATOR ---
const GeminiExamplesGenerator = () => {
  const [industry, setIndustry] = useState('');
  const [examples, setExamples] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchWithRetry = async (url, options, retries = 5) => {
    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, delays[i]));
      }
    }
  };

  const handleGenerate = async () => {
    if (!industry.trim()) return;
    setIsGenerating(true);
    setError('');
    setExamples([]);

    try {
      const apiKey = ""; // API Key proveída por el entorno
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      const promptText = `Actúa como un profesor experto en Inteligencia Artificial. 
      El estudiante quiere entender el Aprendizaje Supervisado y trabaja en la industria o área de: "${industry}".
      Genera 3 ejemplos creativos, muy realistas y útiles de cómo aplicar "Aprendizaje Supervisado" en esa área específica.
      Deben incluir tanto problemas de Clasificación como de Regresión.
      Devuelve la respuesta ESTRICTAMENTE como un arreglo JSON válido con el siguiente formato, sin texto markdown adicional:
      [
        { "titulo": "Nombre del ejemplo", "tipo": "Clasificación o Regresión", "descripcion": "Descripción concisa del caso de uso..." }
      ]`;

      const result = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const textResult = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResult) throw new Error("Respuesta vacía de la API");
      
      const parsedExamples = JSON.parse(textResult);
      setExamples(parsedExamples);
    } catch (err) {
      setError('Lo sentimos, hubo un problema al generar los ejemplos con IA. Por favor, intenta nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-200 shadow-sm">
      <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-orange-500" />
        Ejemplos Personalizados con IA
      </h4>
      <p className="text-sm text-red-800 mb-4">
        ¿Quieres ver cómo aplica el Aprendizaje Supervisado en tu área? Escribe tu profesión o industria y Gemini creará casos de uso para ti.
      </p>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Ej: Agricultura, Finanzas, Medicina..." 
          className="flex-1 px-4 py-2 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          disabled={isGenerating}
        />
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !industry.trim()}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          ✨ Generar
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 text-xs rounded-lg flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      {examples.length > 0 && (
        <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {examples.map((ej, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border border-red-100 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  ej.tipo.toLowerCase().includes('clasificación') || ej.tipo.toLowerCase().includes('clasificacion') 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {ej.tipo}
                </span>
                <strong className="text-slate-800 text-sm">{ej.titulo}</strong>
              </div>
              <p className="text-xs text-slate-600">{ej.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (TODO EL CONTENIDO SEMANA 1) ---

const Semana1Content = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12 pb-24 animate-in fade-in duration-500">
      
      {/* SECCIÓN 1: INTRODUCCIÓN */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
          Inteligencia Artificial con Deep Learning
        </h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">
            Bienvenido al primer módulo del diplomado impartido por el <strong>Ing. Jorge Alberto Castellanos</strong> (Universidad de La Sabana). En esta primera semana, sentaremos las bases fundamentales de la Inteligencia Artificial, desde su teoría hasta las herramientas prácticas de programación.
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">¿Qué es la Inteligencia Artificial?</h3>
          <p>
            Alan Turing, considerado uno de los padres de la IA, la definió como la capacidad de las máquinas para realizar tareas que requerirían inteligencia humana si fueran realizadas por un ser humano. 
            Nuestra inteligencia se caracteriza por la adaptabilidad, el procesamiento de información, la inmensa complejidad de nuestro cerebro (aprox. 100 mil millones de neuronas), el uso del lenguaje y el pensamiento abstracto. La IA busca replicar matemáticamente estas capacidades.
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Breve Historia</h3>
          <ul className="space-y-2 text-slate-600">
            <li><strong>1940-1950 (Los Primeros Días):</strong> McCulloch y Pitts proponen el modelo booleano del cerebro. Turing introduce el Test de Turing.</li>
            <li><strong>1950-1970 (Emoción y Primeros Logros):</strong> Se acuña el término "Inteligencia Artificial" (Conferencia de Dartmouth, 1956).</li>
            <li><strong>1970-1990 (Sistemas Expertos):</strong> Auge de sistemas basados en reglas y posterior "Invierno de la IA" por expectativas no cumplidas.</li>
            <li><strong>1990-2010 (Renacimiento Estadístico):</strong> Resurgen algoritmos probabilísticos. Deep Blue vence a Kasparov (1997). Geoffrey Hinton populariza el "Deep Learning" (2006).</li>
            <li><strong>2010-2020 (Expansión):</strong> AlexNet revoluciona la visión por computadora (2012). AlphaGo derrota al campeón mundial (2016). Auge del procesamiento de lenguaje natural (GPT).</li>
          </ul>
        </div>
      </section>

      {/* SECCIÓN 2: EL PERCEPTRÓN Y SUS RANGOS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Layers className="text-indigo-600" /> Redes Neuronales: El Perceptrón
        </h2>
        <div className="prose prose-slate max-w-none">
          <p>
            Un perceptrón es esencialmente una neurona artificial; es la unidad básica en el campo de las redes neuronales. Su objetivo es tomar decisiones binarias (0 o 1) basándose en una serie de datos de entrada.
          </p>
          
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">¿Cómo funciona exactamente?</h3>
          <ol className="list-decimal pl-5 space-y-2 mb-8 text-slate-600">
            <li><strong>Entradas ($x_1, x_2, ..., x_n$):</strong> Son las señales o datos numéricos que recibe la neurona.</li>
            <li><strong>Pesos ($w_1, w_2, ..., w_n$):</strong> Cada entrada está conectada a la neurona mediante un "peso". El perceptrón multiplica cada entrada por su respectivo peso. Estos pesos determinan la <em>importancia</em> de cada entrada.</li>
            <li><strong>Sumatoria ($\Sigma$):</strong> El núcleo de la neurona suma todas las entradas previamente ponderadas.</li>
            <li><strong>Bias ($b$):</strong> Es un sesgo que permite "desplazar" la función de activación. Actúa como la flexibilidad de la neurona para activarse.</li>
            <li><strong>Función de Activación:</strong> Evalúa la suma total y decide si la neurona se "activa" (1) o no (0).</li>
          </ol>

          {/* SIMULADOR 1 */}
          <PerceptronSimulator />

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">¿Cómo se establecen estos valores en la vida real?</h3>
          <ul className="space-y-4 mt-4 text-slate-600">
            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <strong>1. Las Entradas (x) - Normalización:</strong> Los datos del mundo real tienen escalas muy diferentes (ej. edad vs. salario). Para que un número grande no aplaste a uno pequeño, aplicamos <em>Normalización</em> o <em>Estandarización</em>, llevando todas las entradas a una escala común (típicamente de 0 a 1).
            </li>
            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <strong>2. La Salida (y) - Función de Activación:</strong> El rango de la salida está dictado por la función al final de la neurona. El perceptrón clásico usa una función escalón (salida estricta 0 o 1). Modelos modernos usan la función Sigmoide que da decimales entre 0 y 1, actuando como probabilidad.
            </li>
            <li className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <strong>3. Los Pesos (w) y el Bias (b) - El Aprendizaje:</strong> ¡Tú no decides estos valores! Se inicializan aleatoriamente con valores muy cercanos a cero. A medida que la red procesa datos y se equivoca, usa algoritmos para ajustarlos poco a poco hasta que deja de equivocarse.
            </li>
          </ul>

          <div className="mt-6 p-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl shadow-sm">
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Settings className="w-5 h-5" /> El Rol Vital del Preprocesamiento
            </h4>
            <p className="text-sm text-indigo-800 leading-relaxed">
              Es crucial entender la fuerte conexión entre las distintas etapas del proyecto. Aunque el algoritmo ajusta los <strong>Pesos y el Bias</strong> por sí solo durante el entrenamiento, su capacidad para hacerlo con éxito <strong>depende completamente de cómo se prepararon los datos en la fase de Preprocesamiento</strong> (tema de la Semana 2).
              <br/><br/>
              Si omites el preprocesamiento y pasas datos con escalas drásticamente diferentes al perceptrón (ej. una entrada es la edad: 25, y otra es el salario: 2,500,000), las matemáticas colapsan. El algoritmo intentará compensar asignando pesos desproporcionados, lo que vuelve al modelo inestable, incapaz de aprender patrones reales (sobreajuste o ineficiencia). Al aplicar técnicas como la <em>Normalización</em> en el preprocesamiento, garantizas un terreno equilibrado donde el perceptrón puede ajustar sus pesos de manera justa y precisa.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: PARADIGMAS DE MACHINE LEARNING */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Database className="text-emerald-600" /> Paradigmas de Machine Learning
        </h2>
        <div className="prose prose-slate max-w-none">
          <p className="mb-6">
            El Aprendizaje Automático no es un solo algoritmo, sino que se divide en tres grandes "tipos de contratos" o ramas principales, dependiendo de los datos que tengas y el objetivo que busques.
          </p>

          <div className="my-6 text-center">
            <div className="inline-block p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-sm w-full max-w-3xl">
               <svg viewBox="0 0 500 180" className="w-full h-auto">
                 <rect x="175" y="10" width="150" height="40" rx="8" fill="#334155" />
                 <text x="250" y="35" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Machine Learning</text>
                 <line x1="250" y1="50" x2="250" y2="70" stroke="#94a3b8" strokeWidth="2" />
                 <line x1="80" y1="70" x2="420" y2="70" stroke="#94a3b8" strokeWidth="2" />
                 <line x1="80" y1="70" x2="80" y2="90" stroke="#94a3b8" strokeWidth="2" />
                 <line x1="250" y1="70" x2="250" y2="90" stroke="#94a3b8" strokeWidth="2" />
                 <line x1="420" y1="70" x2="420" y2="90" stroke="#94a3b8" strokeWidth="2" />
                 <rect x="10" y="90" width="140" height="50" rx="8" fill="#ef4444" />
                 <text x="80" y="115" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Supervised</text>
                 <text x="80" y="130" fill="#fca5a5" fontSize="10" textAnchor="middle">Learning</text>
                 
                 <rect x="180" y="90" width="140" height="50" rx="8" fill="#3b82f6" />
                 <text x="250" y="115" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Unsupervised</text>
                 <text x="250" y="130" fill="#bfdbfe" fontSize="10" textAnchor="middle">Learning</text>
                 
                 <rect x="350" y="90" width="140" height="50" rx="8" fill="#10b981" />
                 <text x="420" y="115" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Reinforcement</text>
                 <text x="420" y="130" fill="#a7f3d0" fontSize="10" textAnchor="middle">Learning</text>
               </svg>
            </div>
          </div>

          <div className="space-y-8 my-8">
            {/* 1. Supervisado */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <h3 className="text-red-800 font-bold text-xl mb-3 flex items-center gap-2 border-b border-red-200 pb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div> 1. Aprendizaje Supervisado
              </h3>
              <p className="text-red-900 mb-4 font-medium">Entrenamiento con "Respuestas Correctas" (Datos Etiquetados). El modelo aprende a mapear entradas a salidas conocidas.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                   <h4 className="font-bold text-slate-800 mb-2">Ejemplos de Aplicación:</h4>
                   <ul className="text-sm text-slate-700 space-y-3 list-disc pl-4">
                     <li><strong>Detección de spam:</strong> Clasificar correos como spam o no spam.</li>
                     <li><strong>Diagnóstico médico:</strong> Predecir enfermedades a partir de síntomas.</li>
                     <li><strong>Reconocimiento de voz:</strong> Convertir el habla en texto.</li>
                     <li><strong>Predicción de precios:</strong> Estimar el valor de una vivienda.</li>
                     <li><strong>Detección de fraudes:</strong> Identificar transacciones inusuales en tiempo real.</li>
                   </ul>
                   <GeminiExamplesGenerator />
                </div>
                <div className="flex flex-col items-center justify-center p-4 space-y-4">
                   <div className="p-5 bg-white border-2 border-red-300 rounded-lg w-full shadow-md relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                       Conexión Clave
                     </div>
                     <h4 className="font-bold text-red-900 mb-2 mt-2">Tareas y Herramientas</h4>
                     <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                       Las tareas de <strong>Clasificación vs Regresión</strong> (Sección 4) y los <strong>5 algoritmos</strong> (Sección 5) <strong>aplican exclusivamente</strong> dentro del Aprendizaje Supervisado:
                     </p>
                     <div className="grid grid-cols-2 gap-2">
                       <div className="bg-red-50 p-2 rounded border border-red-100">
                         <span className="block text-[11px] font-bold text-red-800 mb-1 border-b border-red-200 pb-1">Clasificación</span>
                         <ul className="text-[10px] text-slate-700 space-y-1">
                           <li>• Reg. Logística</li>
                           <li>• SVM</li>
                         </ul>
                       </div>
                       <div className="bg-red-50 p-2 rounded border border-red-100">
                         <span className="block text-[11px] font-bold text-red-800 mb-1 border-b border-red-200 pb-1">Regresión</span>
                         <ul className="text-[10px] text-slate-700 space-y-1">
                           <li>• Regresión Lineal</li>
                         </ul>
                       </div>
                       <div className="col-span-2 bg-red-50 p-2 rounded border border-red-100 flex items-center justify-between">
                         <span className="text-[11px] font-bold text-red-800">Ambas tareas:</span>
                         <span className="text-[10px] text-slate-700">• Árboles de Decisión • KNN</span>
                       </div>
                     </div>
                   </div>

                   <div className="p-3 bg-white/80 border border-red-100 rounded-lg w-full shadow-sm">
                     <svg viewBox="0 0 300 150" className="w-full h-auto">
                       <rect x="10" y="10" width="130" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                       <text x="75" y="30" fontSize="12" textAnchor="middle" fill="#64748b" fontWeight="bold">Clasificación</text>
                       <circle cx="40" cy="50" r="4" fill="#ef4444"/><circle cx="55" cy="40" r="4" fill="#ef4444"/><circle cx="30" cy="70" r="4" fill="#ef4444"/><circle cx="65" cy="65" r="4" fill="#ef4444"/>
                       <circle cx="100" cy="110" r="4" fill="#3b82f6"/><circle cx="115" cy="90" r="4" fill="#3b82f6"/><circle cx="85" cy="120" r="4" fill="#3b82f6"/><circle cx="95" cy="95" r="4" fill="#3b82f6"/>
                       <line x1="15" y1="125" x2="125" y2="35" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4"/>
                       <rect x="160" y="10" width="130" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                       <text x="225" y="30" fontSize="12" textAnchor="middle" fill="#64748b" fontWeight="bold">Regresión</text>
                       <line x1="170" y1="120" x2="280" y2="40" stroke="#3b82f6" strokeWidth="2"/>
                       <circle cx="180" cy="115" r="4" fill="#f59e0b"/><circle cx="210" cy="90" r="4" fill="#f59e0b"/><circle cx="240" cy="75" r="4" fill="#f59e0b"/><circle cx="270" cy="45" r="4" fill="#f59e0b"/><circle cx="195" cy="100" r="4" fill="#f59e0b"/><circle cx="225" cy="85" r="4" fill="#f59e0b"/>
                     </svg>
                   </div>
                </div>
              </div>
            </div>

            {/* 2. No Supervisado */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 overflow-hidden">
              <h3 className="text-blue-800 font-bold text-xl mb-3 flex items-center gap-2 border-b border-blue-200 pb-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div> 2. Aprendizaje No Supervisado
              </h3>
              <p className="text-blue-900 mb-4 font-medium">Encontrar Patrones Ocultos (Datos No Etiquetados). El algoritmo agrupa o simplifica la información por sí solo.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                   <h4 className="font-bold text-slate-800 mb-2">Ejemplos de Aplicación:</h4>
                   <ul className="text-sm text-slate-700 space-y-3 list-disc pl-4">
                     <li><strong>Segmentación de clientes:</strong> Agrupar clientes por características demográficas.</li>
                     <li><strong>Detección de anomalías:</strong> Identificar patrones inusuales en máquinas.</li>
                     <li><strong>Reducción de dimensionalidad:</strong> Simplificar imágenes (compresión).</li>
                     <li><strong>Agrupación de documentos:</strong> Organizar por temas para buscadores.</li>
                     <li><strong>Recomendaciones:</strong> Ofrecer contenido basado en patrones de usuarios.</li>
                   </ul>
                </div>
                <div className="flex items-center justify-center p-4">
                   <div className="p-4 bg-white border border-blue-200 rounded-lg w-full shadow-sm">
                     <svg viewBox="0 0 200 150" className="w-full h-auto max-w-xs mx-auto">
                       <rect x="10" y="10" width="180" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                       <text x="100" y="30" fontSize="12" textAnchor="middle" fill="#64748b" fontWeight="bold">Clustering (Agrupamiento)</text>
                       <circle cx="50" cy="60" r="4" fill="#ef4444"/><circle cx="40" cy="80" r="4" fill="#ef4444"/><circle cx="65" cy="75" r="4" fill="#ef4444"/><circle cx="55" cy="90" r="4" fill="#ef4444"/>
                       <circle cx="140" cy="50" r="4" fill="#10b981"/><circle cx="160" cy="65" r="4" fill="#10b981"/><circle cx="130" cy="70" r="4" fill="#10b981"/><circle cx="150" cy="80" r="4" fill="#10b981"/>
                       <circle cx="100" cy="110" r="4" fill="#3b82f6"/><circle cx="85" cy="125" r="4" fill="#3b82f6"/><circle cx="115" cy="120" r="4" fill="#3b82f6"/><circle cx="100" cy="130" r="4" fill="#3b82f6"/>
                       <line x1="90" y1="80" x2="30" y2="130" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"/>
                       <line x1="90" y1="80" x2="100" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"/>
                       <line x1="90" y1="80" x2="170" y2="105" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4"/>
                     </svg>
                   </div>
                </div>
              </div>

              {/* SIMULADOR 3: K-MEANS */}
              <KMeansSimulator />
            </div>

            {/* 3. Refuerzo */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-green-800 font-bold text-xl mb-3 flex items-center gap-2 border-b border-green-200 pb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div> 3. Aprendizaje por Refuerzo
              </h3>
              <p className="text-green-900 mb-4 font-medium">Prueba, Error y Recompensa. Un agente interactúa con un entorno aprendiendo iterativamente a maximizar la retroalimentación positiva o puntaje.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Ejemplos de Aplicación:</h4>
                  <ul className="text-sm text-slate-700 space-y-3 list-disc pl-4">
                    <li><strong>Juegos:</strong> AlphaGo y AlphaZero alcanzando niveles sobrehumanos en ajedrez.</li>
                    <li><strong>Robótica:</strong> Enseñar a robots a caminar, manipular objetos o ensamblar.</li>
                    <li><strong>Conducción autónoma:</strong> Navegar de manera segura en entornos dinámicos.</li>
                    <li><strong>Control de semáforos:</strong> Optimizar el flujo de tráfico en tiempo real.</li>
                    <li><strong>Centros de datos:</strong> Asignar recursos para maximizar rendimiento.</li>
                  </ul>
                </div>
                <div className="flex items-center justify-center p-4">
                   <div className="p-4 bg-white border border-green-200 rounded-lg w-full shadow-sm">
                     <svg viewBox="0 0 250 160" className="w-full h-auto max-w-xs mx-auto">
                       <rect x="75" y="20" width="100" height="40" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2"/>
                       <text x="125" y="44" fontSize="14" textAnchor="middle" fill="#334155" fontWeight="bold">Entorno</text>
                       
                       <rect x="75" y="100" width="100" height="40" rx="6" fill="#f0fdf4" stroke="#10b981" strokeWidth="2"/>
                       <text x="125" y="124" fontSize="14" textAnchor="middle" fill="#047857" fontWeight="bold">Agente (IA)</text>
                       
                       <path d="M 75 120 L 30 120 L 30 40 L 75 40" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                       <polygon points="75,36 83,40 75,44" fill="#3b82f6"/>
                       <text x="20" y="80" fontSize="11" textAnchor="middle" fill="#2563eb" fontWeight="bold" transform="rotate(-90 20 80)">Acción</text>

                       <path d="M 175 40 L 220 40 L 220 120 L 175 120" fill="none" stroke="#f59e0b" strokeWidth="2"/>
                       <polygon points="175,116 167,120 175,124" fill="#f59e0b"/>
                       <text x="235" y="80" fontSize="10" textAnchor="middle" fill="#d97706" fontWeight="bold" transform="rotate(90 235 80)">Feedback / Recompensa</text>
                     </svg>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CLASIFICACIÓN VS REGRESIÓN */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Layout className="text-amber-500" /> Tareas: Clasificación vs Regresión
        </h2>
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">
            Para evitar confusiones: la Clasificación y la Regresión <strong>no son métodos ni algoritmos</strong>. Son los dos <strong>tipos de trabajos (tareas)</strong> que te pueden pedir dentro del Aprendizaje Supervisado.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg mb-8">
            <p className="text-amber-900 m-0">
              <strong>La regla de oro:</strong> Mira la columna de las "respuestas correctas" en tus datos. Si está llena de palabras o categorías (ej. Perro/Gato), es <em>Clasificación</em>. Si está llena de números que miden cantidades infinitas (ej. Precios, Temperatura), es <em>Regresión</em>.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Profundizando en Regresión: Interpolación vs Extrapolación</h3>
          <p>
            Una duda común es creer que la regresión calcula valores entre un mínimo y un máximo estricto. ¡No es así! La regresión busca la mejor línea de tendencia matemática, y esa línea se extiende hacia el infinito.
          </p>
          <ul className="space-y-2 mb-6">
            <li><strong>Interpolación:</strong> Predecir un valor dentro del rango de los datos que el modelo ya conoce. (Seguro).</li>
            <li><strong>Extrapolación:</strong> Predecir un valor fuera del rango conocido, asumiendo que la tendencia continúa infinitamente. (Riesgoso, porque en la vida real los fenómenos físicos o económicos suelen aplanarse en los extremos).</li>
          </ul>

          {/* SIMULADOR 2 */}
          <RegressionSimulator />
        </div>
      </section>

      {/* SECCIÓN 5: ALGORITMOS (LAS HERRAMIENTAS) */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <PenTool className="text-rose-600" /> Algoritmos de Machine Learning (Herramientas)
        </h2>
        <div className="prose prose-slate max-w-none">
          <p className="mb-6">
            Siguiendo nuestra analogía del constructor: si el Aprendizaje Supervisado es el "tipo de obra" y la Clasificación es el trabajo a realizar, estos 5 algoritmos son las <strong>herramientas específicas (el taladro, el martillo)</strong> que sacas de tu caja matemática. <em>Todos los siguientes pertenecen al Aprendizaje Supervisado.</em>
          </p>

          <div className="space-y-6">
            {/* 1. Regresión Lineal */}
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-5 rounded-lg border border-slate-100 items-center">
              <div className="md:w-1/4 w-full">
                <h4 className="font-bold text-slate-800 text-lg m-0">1. Regresión Lineal</h4>
              </div>
              <div className="md:w-1/2 w-full text-slate-600">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2 font-semibold tracking-wide">TAREA: REGRESIÓN</span>
                <p className="m-0">Traza una línea recta a través de los datos. Herramienta perfecta para predecir un valor numérico continuo (ej. predecir el precio exacto de una casa). Usa Gradiente Descendiente para minimizar errores.</p>
              </div>
              <div className="md:w-1/4 w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[100px]">
                  <line x1="10" y1="90" x2="90" y2="10" stroke="#3b82f6" strokeWidth="3" />
                  <circle cx="20" cy="70" r="4" fill="#64748b" />
                  <circle cx="35" cy="60" r="4" fill="#64748b" />
                  <circle cx="45" cy="55" r="4" fill="#64748b" />
                  <circle cx="65" cy="40" r="4" fill="#64748b" />
                  <circle cx="80" cy="20" r="4" fill="#64748b" />
                  <circle cx="70" cy="25" r="4" fill="#64748b" />
                </svg>
              </div>
            </div>

            {/* 2. Regresión Logística */}
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-5 rounded-lg border border-slate-100 items-center">
              <div className="md:w-1/4 w-full">
                <h4 className="font-bold text-slate-800 text-lg m-0">2. Regresión Logística</h4>
              </div>
              <div className="md:w-1/2 w-full text-slate-600">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded mb-2 font-semibold tracking-wide">TAREA: CLASIFICACIÓN</span>
                <p className="m-0">¡Cuidado con el nombre! Su trabajo principal es clasificar. En lugar de darte un número infinito, te da una probabilidad (0 a 1) usando una curva sigmoide. Si la probabilidad pasa del 50%, lo clasifica en una categoría.</p>
              </div>
              <div className="md:w-1/4 w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[100px]">
                  <path d="M 10 90 C 40 90, 60 10, 90 10" fill="none" stroke="#10b981" strokeWidth="3" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeDasharray="4" strokeWidth="2" />
                  <text x="15" y="45" fontSize="10" fill="#64748b">50%</text>
                </svg>
              </div>
            </div>

            {/* 3. Árbol de Decisión */}
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-5 rounded-lg border border-slate-100 items-center">
              <div className="md:w-1/4 w-full">
                <h4 className="font-bold text-slate-800 text-lg m-0">3. Árbol de Decisión</h4>
              </div>
              <div className="md:w-1/2 w-full text-slate-600">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mb-2 font-semibold tracking-wide">TAREA: AMBAS</span>
                <p className="m-0">Funciona como un diagrama de flujo de preguntas de "Sí o No". Divide los datos en ramas mediante selección de características hasta llegar a una "hoja" final que te da la predicción.</p>
              </div>
              <div className="md:w-1/4 w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[100px]">
                  <rect x="35" y="10" width="30" height="15" rx="3" fill="#a855f7" />
                  <line x1="50" y1="25" x2="25" y2="45" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="50" y1="25" x2="75" y2="45" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="10" y="45" width="30" height="15" rx="3" fill="#c084fc" />
                  <rect x="60" y="45" width="30" height="15" rx="3" fill="#c084fc" />
                  <line x1="25" y1="60" x2="15" y2="80" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="25" y1="60" x2="35" y2="80" stroke="#cbd5e1" strokeWidth="2" />
                  <rect x="5" y="80" width="20" height="10" rx="2" fill="#e9d5ff" />
                  <rect x="25" y="80" width="20" height="10" rx="2" fill="#e9d5ff" />
                </svg>
              </div>
            </div>

            {/* 4. SVM */}
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-5 rounded-lg border border-slate-100 items-center">
              <div className="md:w-1/4 w-full">
                <h4 className="font-bold text-slate-800 text-lg m-0">4. SVM (Soporte Vectorial)</h4>
              </div>
              <div className="md:w-1/2 w-full text-slate-600">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded mb-2 font-semibold tracking-wide">TAREA: CLASIFICACIÓN PRINCIPAL</span>
                <p className="m-0">Traza una línea (o un hiperplano) lo más ancha posible en el gráfico para separar drásticamente dos grupos de datos distintos, creando una "frontera" segura entre categorías.</p>
              </div>
              <div className="md:w-1/4 w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[100px]">
                  <line x1="20" y1="90" x2="80" y2="10" stroke="#10b981" strokeWidth="3" />
                  <line x1="10" y1="90" x2="70" y2="10" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="4" />
                  <line x1="30" y1="90" x2="90" y2="10" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="4" />
                  <circle cx="20" cy="40" r="4" fill="#3b82f6" />
                  <circle cx="35" cy="20" r="4" fill="#3b82f6" />
                  <circle cx="45" cy="15" r="4" fill="#3b82f6" />
                  <circle cx="60" cy="80" r="4" fill="#ef4444" />
                  <circle cx="80" cy="65" r="4" fill="#ef4444" />
                  <circle cx="75" cy="90" r="4" fill="#ef4444" />
                </svg>
              </div>
            </div>

            {/* 5. KNN */}
            <div className="flex flex-col md:flex-row gap-6 bg-slate-50 p-5 rounded-lg border border-slate-100 items-center overflow-hidden">
              <div className="md:w-1/4 w-full">
                <h4 className="font-bold text-slate-800 text-lg m-0">5. K-Vecinos más cercanos (KNN)</h4>
              </div>
              <div className="md:w-1/2 w-full text-slate-600">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mb-2 font-semibold tracking-wide">TAREA: AMBAS</span>
                <p className="m-0">El algoritmo de "dime con quién andas y te diré quién eres". Si llega un dato nuevo, mide la distancia hacia sus "K" vecinos más cercanos en el gráfico. Si la mayoría son de un grupo, asume que el nuevo también lo es.</p>
              </div>
              <div className="md:w-1/4 w-full flex justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[100px]">
                  <circle cx="50" cy="50" r="28" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                  <circle cx="50" cy="50" r="5" fill="#a855f7" />
                  <circle cx="40" cy="40" r="4" fill="#ef4444" />
                  <circle cx="60" cy="45" r="4" fill="#ef4444" />
                  <circle cx="55" cy="65" r="4" fill="#ef4444" />
                  <circle cx="15" cy="20" r="4" fill="#3b82f6" />
                  <circle cx="85" cy="85" r="4" fill="#3b82f6" />
                  <circle cx="80" cy="25" r="4" fill="#3b82f6" />
                  <circle cx="20" cy="80" r="4" fill="#3b82f6" />
                </svg>
              </div>
            </div>
            
            {/* SIMULADOR 4: KNN */}
            <KNNSimulator />

          </div>
        </div>
      </section>

      {/* SECCIÓN 6: ENTORNOS Y LIBRERÍAS */}
      <section className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Database className="text-cyan-400" /> El Taller de Trabajo y la Caja de Herramientas
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="mb-8 text-slate-300">
            Nadie programa las complejas fórmulas matemáticas desde cero. Pasemos de la teoría a cómo se construye esto en el día a día.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Entornos */}
            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">El Taller de Trabajo (Entornos)</h3>
              <p className="text-sm text-slate-300 mb-4">Donde escribes y ejecutas las instrucciones.</p>
              <ul className="space-y-4 text-sm">
                <li><strong className="text-white block">Python:</strong> El idioma universal y estándar de la industria.</li>
                <li><strong className="text-white block">Anaconda:</strong> El "taller prefabricado". Una distribución con Python y las librerías preinstaladas.</li>
                <li><strong className="text-white block">Jupyter Notebooks:</strong> Tu mesa interactiva para bloques de código.</li>
                <li><strong className="text-white block">Google Colab:</strong> Es un Jupyter en la nube de Google con GPUs gratis.</li>
              </ul>
            </div>

            {/* Librerías */}
            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">La Caja de Herramientas (Librerías)</h3>
              <p className="text-sm text-slate-300 mb-4">Código pre-escrito y optimizado para el flujo de trabajo.</p>
              <ul className="space-y-3 text-sm">
                <li><span className="text-yellow-400 font-bold">1. Preparación:</span> <strong>Pandas</strong> (tablas) y <strong>NumPy</strong> (matrices).</li>
                <li><span className="text-yellow-400 font-bold">2. Visualización:</span> <strong>Matplotlib</strong>, para graficar datos.</li>
                <li><span className="text-yellow-400 font-bold">3. Algoritmos Clásicos:</span> <strong>Scikit-learn</strong>. La navaja suiza de la IA.</li>
                <li><span className="text-yellow-400 font-bold">4. Deep Learning:</span> <strong>TensorFlow</strong>, <strong>PyTorch</strong> y <strong>Keras</strong> para redes neuronales masivas.</li>
              </ul>
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
            href="/pdfs/Semana 1.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <ExternalLink className="w-4 h-4" /> Abrir PDF Semana 1
          </a>
          <a
            href="/pdfs/Semana 1.pdf"
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
  );
};

export default function Semana1Page() {
  return <Semana1Content />;
}