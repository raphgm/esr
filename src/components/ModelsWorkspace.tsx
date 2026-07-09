import React, { useState, useEffect } from "react";
import { AIModel, UserProfile } from "../types";
import { BrainCircuit, Database, Server, Activity } from "lucide-react";
import { getCollectionData } from "../lib/firebase";

const initialMockModels: AIModel[] = [
  { id: "m1", name: "ESTARR-Vision-v2", type: "Computer Vision", status: "Training", accuracy: "-", latency: "-", cost: "-", createdAt: new Date().toISOString() },
  { id: "m2", name: "ESTARR-Chat-7B", type: "LLM", status: "Deployed", accuracy: "92.4%", latency: "45ms", cost: "$0.001/1K", createdAt: new Date().toISOString() },
  { id: "m3", name: "ESTARR-Embeddings", type: "Text Embeddings", status: "Evaluating", accuracy: "89.1%", latency: "12ms", cost: "$0.0001/1K", createdAt: new Date().toISOString() }
];

interface ModelsWorkspaceProps {
  userProfile: UserProfile;
}

export const ModelsWorkspace: React.FC<ModelsWorkspaceProps> = ({ userProfile }) => {
  const [models, setModels] = useState<AIModel[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      const data = await getCollectionData<AIModel>("models", initialMockModels);
      setModels(data);
    };
    loadModels();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-900">Models Workspace</h2>
        <button className="bg-slate-900 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer">
          <BrainCircuit className="w-4 h-4" /> New Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {models.map((model) => (
            <div key={model.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-purple-300 transition-colors cursor-pointer">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Database className="w-6 h-6 text-slate-600" />
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                      {model.name}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                        model.status === 'Deployed' ? 'bg-emerald-100 text-emerald-700' :
                        model.status === 'Training' ? 'bg-blue-100 text-blue-700' : 
                        model.status === 'Failed' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {model.status}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{model.type} • Owner: ESTARR Core</p>
                 </div>
               </div>
               <div className="grid grid-cols-3 gap-4 text-center md:text-right">
                  <div>
                    <p className="text-sm font-black text-slate-900">{model.accuracy}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{model.latency}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Latency</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{model.cost}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Cost</p>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="bg-[#111622] p-6 rounded-3xl text-white shadow-xl shadow-slate-900/20 relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Server className="w-32 h-32" />
           </div>
           
           <div className="relative z-10 flex items-start justify-between mb-8 gap-2">
             <div className="flex items-center gap-3">
               <Activity className="w-6 h-6 text-emerald-400" />
               <h3 className="font-bold text-xl leading-tight">
                 Active<br />Training
               </h3>
             </div>
             <div className="bg-slate-800/50 border border-slate-700 text-slate-300 text-[10px] font-mono p-2 px-2.5 rounded-lg flex-shrink-1 truncate">
               ESTARR-Vision-v2
             </div>
           </div>
           
           <div className="relative z-10 flex flex-col gap-5 flex-grow">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-slate-400 font-mono text-xs">Epoch <span className="text-slate-300">42/100</span></div>
                  <div className="text-emerald-400 font-mono text-sm font-bold">42%</div>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[42%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Loss</p>
                  <p className="text-xl font-mono font-bold text-white flex items-center gap-1">
                    0.2415 <span className="text-emerald-400 text-xs">↓</span>
                  </p>
                </div>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">GPU Util</p>
                  <p className="text-xl font-mono font-bold text-white flex items-baseline gap-1">
                    94% <span className="text-slate-500 text-[10px] font-sans">A100x8</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-2 flex gap-3">
                 <button className="flex-1 bg-white text-slate-900 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer shadow-sm">Logs</button>
                 <button className="flex-1 bg-slate-800 text-white py-2.5 rounded-lg text-sm font-bold border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer shadow-sm">Stop</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
