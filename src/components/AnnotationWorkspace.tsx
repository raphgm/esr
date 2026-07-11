import React, { useState, useRef, useReducer, useEffect } from "react";
import { Plus, Save, Square, Trash2, Tag, ChevronLeft, ChevronRight, Check, X, ClipboardList, Download } from "lucide-react";
import { Annotation } from "../types";

type State = {
  annotations: Annotation[];
  selectedIds: string[];
  history: Annotation[][];
  historyIndex: number;
};

type Action =
  | { type: "ADD_ANNOTATION"; annotation: Annotation }
  | { type: "TOGGLE_SELECT"; id: string; multi: boolean }
  | { type: "SELECT_NONE" }
  | { type: "UPDATE_LABEL"; ids: string[]; label: string }
  | { type: "UPDATE_STATUS"; ids: string[]; status: Annotation["workflowStatus"] }
  | { type: "DELETE_ANNOTATION"; ids: string[] }
  | { type: "UNDO" }
  | { type: "REDO" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ANNOTATION":
      const newAnnotations = [...state.annotations, action.annotation];
      return {
        ...state,
        annotations: newAnnotations,
        history: [...state.history.slice(0, state.historyIndex + 1), newAnnotations],
        historyIndex: state.historyIndex + 1,
      };
    case "TOGGLE_SELECT":
      if (action.multi) {
        return { ...state, selectedIds: state.selectedIds.includes(action.id) ? state.selectedIds.filter(id => id !== action.id) : [...state.selectedIds, action.id] };
      }
      return { ...state, selectedIds: [action.id] };
    case "SELECT_NONE":
      return { ...state, selectedIds: [] };
    case "UPDATE_LABEL":
      const updatedLabel = state.annotations.map((a) =>
        action.ids.includes(a.id) ? { ...a, label: action.label } : a
      );
      return {
        ...state,
        annotations: updatedLabel,
        history: [...state.history.slice(0, state.historyIndex + 1), updatedLabel],
        historyIndex: state.historyIndex + 1,
      };
    case "UPDATE_STATUS":
      const updatedStatus = state.annotations.map((a) =>
        action.ids.includes(a.id) ? { ...a, workflowStatus: action.status } : a
      );
      return {
        ...state,
        annotations: updatedStatus,
        history: [...state.history.slice(0, state.historyIndex + 1), updatedStatus],
        historyIndex: state.historyIndex + 1,
      };
    case "DELETE_ANNOTATION":
      const deleted = state.annotations.filter((a) => !action.ids.includes(a.id));
      return {
        ...state,
        annotations: deleted,
        selectedIds: [],
        history: [...state.history.slice(0, state.historyIndex + 1), deleted],
        historyIndex: state.historyIndex + 1,
      };
    case "UNDO":
      if (state.historyIndex > 0) {
        return {
          ...state,
          historyIndex: state.historyIndex - 1,
          annotations: state.history[state.historyIndex - 1],
        };
      }
      return state;
    case "REDO":
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          historyIndex: state.historyIndex + 1,
          annotations: state.history[state.historyIndex + 1],
        };
      }
      return state;
    default:
      return state;
  }
}

export function AnnotationWorkspace() {
  const [state, dispatch] = useReducer(reducer, {
    annotations: [],
    selectedIds: [],
    history: [[]],
    historyIndex: 0,
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [mode, setMode] = useState<"draw" | "pan">("draw");
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalGoal = 200;
  const progress = Math.min(100, (state.annotations.length / totalGoal) * 100);

  const filteredAnnotations = state.annotations.filter(a => 
    a.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.selectedIds.length > 0 && (e.key === "Backspace" || e.key === "Delete")) {
        dispatch({ type: "DELETE_ANNOTATION", ids: state.selectedIds });
      } else if (e.key === "Escape") {
        dispatch({ type: "SELECT_NONE" });
        setMode("draw");
      } else if (e.key === " ") {
        e.preventDefault();
        setMode(prev => prev === "draw" ? "pan" : "draw");
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault();
          dispatch({ type: "UNDO" });
        } else if (e.key === "y") {
          e.preventDefault();
          dispatch({ type: "REDO" });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.selectedIds]);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.annotations));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "annotations.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDrawing(true);
    dispatch({ type: "SELECT_NONE" });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const endPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    
    const w = Math.abs(endPos.x - startPos.x);
    const h = Math.abs(endPos.y - startPos.y);

    if (w > 5 && h > 5) {
      dispatch({
        type: "ADD_ANNOTATION",
        annotation: {
          id: Math.random().toString(36).substr(2, 9),
          type: "bounding-box",
          data: {
            x: Math.min(startPos.x, endPos.x),
            y: Math.min(startPos.y, endPos.y),
            width: w,
            height: h,
          },
          label: "New Object",
          workflowStatus: "Draft",
        },
      });
    }
    setIsDrawing(false);
  };

  const handleSelect200 = () => {
    const ids = state.annotations.slice(0, 200).map(a => a.id);
    dispatch({ type: "SELECT_NONE" });
    ids.forEach(id => dispatch({ type: "TOGGLE_SELECT", id, multi: true }));
  };

  return (
    <div className="p-6 bg-white rounded-3xl border border-stone-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Data Annotation Workspace</h2>
          <p className="text-sm text-stone-500">
            {state.annotations.length} / {totalGoal} annotations completed
          </p>
        </div>
        <div className="flex gap-2">
            <button onClick={handleSelect200} className="p-2 rounded-lg bg-stone-100 text-stone-600 text-xs font-bold">Select 200</button>
            <button onClick={() => setMode(mode === "draw" ? "pan" : "draw")} className={`p-2 rounded-lg ${mode === "pan" ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-500'}`}>
                {mode === "draw" ? "Draw" : "Pan"} (Space)
            </button>
            <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1">
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1">-</button>
                <span className="text-xs px-1">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1">+</button>
            </div>
            <button onClick={() => setShowAnnotations(!showAnnotations)} className={`p-2 rounded-lg ${showAnnotations ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-500'}`}>Layer</button>
            <button onClick={() => dispatch({type: "UNDO"})} className="p-2 bg-stone-100 rounded-lg"><ChevronLeft className="w-4 h-4"/></button>
            <button onClick={() => dispatch({type: "REDO"})} className="p-2 bg-stone-100 rounded-lg"><ChevronRight className="w-4 h-4"/></button>
        </div>
      </div>
      
      <div className="w-full bg-stone-200 h-2 rounded-full mb-4 overflow-hidden">
        <div className="bg-purple-600 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div 
            ref={containerRef}
            className="relative w-full h-96 bg-stone-100 rounded-xl overflow-hidden cursor-crosshair border-2 border-dashed border-stone-300 flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {state.annotations.length === 0 && (
                <div className="text-stone-400 text-center">
                    <p className="text-lg font-medium">Click and drag to annotate</p>
                    <p className="text-sm">Draw bounding boxes to label objects.</p>
                </div>
            )}
            {showAnnotations && state.annotations.map((a) => (
              <div 
                key={a.id} 
                className={`absolute border-2 ${state.selectedIds.includes(a.id) ? "border-purple-700 bg-purple-700/20" : "border-purple-500 bg-purple-500/20"} cursor-pointer`}
                style={{ left: a.data.x, top: a.data.y, width: a.data.width, height: a.data.height }}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch({type: "TOGGLE_SELECT", id: a.id, multi: e.ctrlKey || e.metaKey});
                }}
              >
                <span className="absolute -top-5 left-0 text-[10px] text-white bg-purple-500 px-1 rounded-sm whitespace-nowrap">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-stone-50 rounded-xl p-4 border border-stone-200 h-96 flex flex-col">
          <input 
            type="text" 
            placeholder="Search labels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border border-stone-300 rounded-lg text-sm"
          />
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredAnnotations.map(a => (
                <div 
                    key={a.id}
                    onClick={() => dispatch({type: "TOGGLE_SELECT", id: a.id, multi: false})}
                    className={`p-2 rounded cursor-pointer text-sm flex justify-between items-center ${state.selectedIds.includes(a.id) ? 'bg-purple-100' : 'hover:bg-stone-100'}`}
                >
                    <span>{a.label}</span>
                    <button onClick={(e) => { e.stopPropagation(); dispatch({type: "DELETE_ANNOTATION", ids: [a.id]})}} className="text-red-400 hover:text-red-600">
                        <Trash2 className="w-3 h-3"/>
                    </button>
                </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 border rounded-lg bg-stone-50">
        {state.selectedIds.length > 0 ? (
          <>
            <h3 className="text-sm font-bold mb-2">Batch Operations ({state.selectedIds.length} selected)</h3>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-stone-500" />
              <input 
                type="text" 
                value={state.annotations.find(a => a.id === state.selectedIds[0])?.label || ""}
                onChange={(e) => dispatch({type: "UPDATE_LABEL", ids: state.selectedIds, label: e.target.value})}
                className="border border-stone-300 rounded px-2 py-1 text-sm flex-1"
                placeholder="Bulk Label..."
              />
              <select
                onChange={(e) => dispatch({type: "UPDATE_STATUS", ids: state.selectedIds, status: e.target.value as any})}
                className="border border-stone-300 rounded px-2 py-1 text-sm"
              >
                <option value="Draft">Draft</option>
                <option value="Review">Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button onClick={() => dispatch({type: "DELETE_ANNOTATION", ids: state.selectedIds})} className="text-red-500 p-2"><Trash2 className="w-4 h-4"/></button>
            </div>
          </>
        ) : (
          <p className="text-stone-500 text-sm">Select one or more annotations to perform batch operations.</p>
        )}
      </div>
      <div className="mt-4 flex gap-4">
        <button className="flex items-center gap-2 border border-stone-300 text-stone-700 px-4 py-2 rounded-lg text-sm" onClick={handleDownload}>
          <Download className="w-4 h-4" /> Download Dataset
        </button>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm" onClick={() => console.log(state.annotations)}>
          <Save className="w-4 h-4" /> Save Annotations
        </button>
      </div>
    </div>
  );
}