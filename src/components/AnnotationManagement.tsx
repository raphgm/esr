import React, { useState } from "react";
import { Plus, Upload, BookOpen, CheckSquare, Send, Database } from "lucide-react";
import { AnnotationProject } from "../types";

export function AnnotationManagement() {
  const [projects, setProjects] = useState<AnnotationProject[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handlePublish = (id: string) => {
    setProjects(projects.map(p => p.id === id ? {...p, status: "Published"} : p));
  };

  return (
    <div className="p-6 bg-white rounded-3xl border border-stone-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Annotation Management</h2>
        <button 
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => setIsCreating(true)}
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {isCreating ? (
        <div className="p-6 border border-purple-100 rounded-2xl bg-purple-50/50 mb-6">
            <h3 className="font-bold mb-4">Create New Project</h3>
            <div className="grid grid-cols-2 gap-4">
                <input placeholder="Project Name" className="p-2 border rounded" />
                <button className="flex items-center justify-center gap-2 border border-stone-300 rounded p-2 text-sm"><Database className="w-4 h-4"/> Select Dataset</button>
                <textarea placeholder="Labeling Guidelines" className="p-2 border rounded col-span-2" rows={3}/>
            </div>
            <div className="mt-4 flex gap-2">
                <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm" onClick={() => setIsCreating(false)}>Create Draft</button>
                <button className="bg-stone-200 px-4 py-2 rounded text-sm" onClick={() => setIsCreating(false)}>Cancel</button>
            </div>
        </div>
      ) : null}

      <div className="space-y-4">
        {projects.length === 0 ? (
            <p className="text-center text-stone-500 py-10">No projects yet. Create your first one!</p>
        ) : projects.map(p => (
            <div key={p.id} className="p-4 border rounded-xl flex justify-between items-center">
                <div>
                    <h4 className="font-bold">{p.name}</h4>
                    <span className="text-xs text-stone-500">{p.status}</span>
                </div>
                <button 
                    className="flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs"
                    onClick={() => handlePublish(p.id)}
                >
                    <Send className="w-3 h-3" /> Publish
                </button>
            </div>
        ))}
      </div>
    </div>
  );
}
