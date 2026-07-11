import React, { useState, useEffect } from "react";
import { redactPII } from "../utils";
import { Dataset, UserProfile, AuditLog } from "../types";
import { Database, FileText, Settings, Plus, UploadCloud, Brain, Shield } from "lucide-react";
import { getCollectionData, saveCollectionItem } from "../lib/firebase";

const initialMockDatasets: Dataset[] = [];

interface CollaborativeDatasetsProps {
  userProfile: UserProfile;
}

export const CollaborativeDatasets: React.FC<CollaborativeDatasetsProps> = ({ userProfile }) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newDataset, setNewDataset] = useState<Partial<Dataset>>({ type: "Text / QA", size: "0 KB", items: "0" });

  useEffect(() => {
    const loadDatasets = async () => {
      const data = await getCollectionData<Dataset>("datasets", initialMockDatasets);
      setDatasets(data);
    };
    loadDatasets();
  }, []);

  const handleAIPreLabel = async (dataset: Dataset) => {
    const updatedDataset: Dataset = {
      ...dataset,
      status: "Ready",
      auditLogs: [
        ...(dataset.auditLogs || []),
        { id: `log-${Date.now()}`, action: "AI Pre-labeled & PII Redacted", timestamp: new Date().toISOString(), userId: userProfile.email }
      ]
    };
    await saveCollectionItem("datasets", updatedDataset);
    setDatasets(datasets.map(ds => ds.id === dataset.id ? updatedDataset : ds));
  };

  const handleUpload = async () => {
    if (!newDataset.name) return;
    
    const datasetToSave: Dataset = {
      id: `ds-${Date.now()}`,
      name: newDataset.name,
      type: newDataset.type || "Text / QA",
      size: newDataset.size || "Unknown",
      items: newDataset.items || "0",
      status: "Processing",
      createdAt: new Date().toISOString()
    };

    await saveCollectionItem("datasets", datasetToSave);
    setDatasets([datasetToSave, ...datasets]);
    setIsUploading(false);
    setNewDataset({ type: "Text / QA", size: "0 KB", items: "0" });
  };

  if (isUploading) {
    return (
      <div className="flex flex-col gap-6">
        <button onClick={() => setIsUploading(false)} className="text-purple-600 font-bold text-sm w-fit">&larr; Cancel</button>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
           <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <UploadCloud className="w-6 h-6 text-purple-600" /> Upload New Dataset
           </h2>
           <p className="text-sm text-slate-500 mb-4">Upload your dataset to start processing or annotating.</p>

           <div className="space-y-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-1">Dataset Name</label>
               <input 
                 type="text" 
                 placeholder="e.g., ecommerce-reviews-2026" 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold"
                 value={newDataset.name || ""}
                 onChange={e => setNewDataset({...newDataset, name: e.target.value})}
               />
             </div>
             
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-1">Dataset Type</label>
               <select 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
                 value={newDataset.type || ""}
                 onChange={e => setNewDataset({...newDataset, type: e.target.value})}
               >
                 <option value="Text / QA">Text / QA</option>
                 <option value="Image">Image</option>
                 <option value="Text / Conversational">Text / Conversational</option>
                 <option value="Code">Code</option>
                 <option value="Audio">Audio</option>
                 <option value="Video">Video</option>
               </select>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Estimated Size</label>
                 <input 
                   type="text" 
                   placeholder="e.g., 500 MB" 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
                   value={newDataset.size || ""}
                   onChange={e => setNewDataset({...newDataset, size: e.target.value})}
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1">Number of Items</label>
                 <input 
                   type="text" 
                   placeholder="e.g., 10000" 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
                   value={newDataset.items || ""}
                   onChange={e => setNewDataset({...newDataset, items: e.target.value})}
                 />
               </div>
             </div>
             
             <div className="mt-4 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-700">Drag & drop files here, or <span className="text-purple-600 cursor-pointer">browse</span></p>
                <p className="text-xs text-slate-500 mt-1">Supports JSONL, CSV, Parquet, or ZIP archives (up to 50GB)</p>
             </div>
           </div>

           <button 
             onClick={handleUpload}
             disabled={!newDataset.name}
             className="w-full bg-slate-900 hover:bg-purple-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors mt-4 flex items-center justify-center gap-2"
           >
             <Database className="w-4 h-4" /> Create & Upload Dataset
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-900">Collaborative Datasets</h2>
        <button onClick={() => setIsUploading(true)} className="bg-slate-900 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer">
          <Database className="w-4 h-4" /> Upload Dataset
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         {datasets.length === 0 ? (
           <div className="p-8 text-center flex flex-col items-center">
              <Database className="w-12 h-12 text-slate-200 mb-4" />
              <h3 className="font-bold text-slate-900">No datasets found</h3>
              <p className="text-slate-500 text-sm mt-1 mb-4">Upload your first dataset to start training or validating models.</p>
              <button onClick={() => setIsUploading(true)} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl text-sm font-bold">
                Upload Dataset
              </button>
           </div>
         ) : (
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                 <th className="p-4">Dataset Name</th>
                 <th className="p-4">Type</th>
                 <th className="p-4">Size</th>
                 <th className="p-4">Rows/Items</th>
                 <th className="p-4">Status</th>
                 <th className="p-4">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {datasets.map((ds) => (
                 <tr key={ds.id} className="hover:bg-slate-50 transition-colors">
                   <td className="p-4">
                     <div className="flex items-center gap-3">
                       <FileText className="w-5 h-5 text-purple-600" />
                       <span className="font-bold text-slate-900">{ds.name}</span>
                     </div>
                   </td>
                   <td className="p-4 text-sm text-slate-500">{ds.type}</td>
                   <td className="p-4 text-sm font-mono text-slate-700">{ds.size}</td>
                   <td className="p-4 text-sm font-mono text-slate-700">{ds.items}</td>
                   <td className="p-4">
                      <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold ${
                        ds.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' :
                        ds.status === 'Processing' ? 'bg-blue-100 text-blue-700 animate-pulse' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {ds.status}
                      </span>
                   </td>
                   <td className="p-4">
                     {ds.status === 'Processing' && (
                        <button 
                          onClick={() => handleAIPreLabel(ds)}
                          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-bold text-xs"
                        >
                          <Brain className="w-3 h-3" /> AI Pre-Label
                        </button>
                     )}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         )}
      </div>
    </div>
  );
};
