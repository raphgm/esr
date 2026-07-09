import React, { useState, useEffect } from "react";
import { 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  Trash2, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Layout,
  Music,
  Camera,
  Play,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  Tv
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, Course } from "../types";
import { db, saveCollectionItem, deleteCollectionItem, subscribeToCollection, where } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface CreatorContent {
  id: string;
  creatorId: string;
  title: string;
  type: "video" | "slide" | "photo";
  url: string;
  thumbnail?: string;
  views: number;
  earnings: number;
  status: "draft" | "published";
  createdAt: any;
}

interface CreatorStudioProps {
  userProfile: UserProfile;
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  userProfile,
  courses,
  onUpdateCourses
}) => {
  const [content, setContent] = useState<CreatorContent[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<"video" | "slide" | "photo">("video");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [viewMode, setViewMode] = useState<"dashboard" | "upload" | "library">("dashboard");
  const [aiLoading, setAiLoading] = useState(false);
  const [architectTopic, setArchitectTopic] = useState("");
  const [architectCategory, setArchitectCategory] = useState("Digital");
  const [generatedOutline, setGeneratedOutline] = useState<any>(null);

  const handleArchitectCourse = async () => {
    if (!architectTopic) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/creator/generate-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: architectTopic, category: architectCategory })
      });
      const data = await res.json();
      setGeneratedOutline(data);
    } catch (err) {
      console.error("Architect error:", err);
      alert("Failed to architect course with AI. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    // Subscribe to content for this creator
    const unsub = subscribeToCollection<CreatorContent>("creator_content", (items) => {
      setContent(items);
    }, where("creatorId", "==", userProfile.email));
    return () => unsub();
  }, [userProfile.email]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setIsUploading(true);
    try {
      await addDoc(collection(db, "creator_content"), {
        creatorId: userProfile.email,
        title,
        type: uploadType,
        url,
        thumbnail: uploadType === "video" ? "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=300" : url,
        views: 0,
        earnings: 0,
        status: "published",
        createdAt: serverTimestamp()
      });
      setTitle("");
      setUrl("");
      setViewMode("library");
      alert("Content uploaded and published successfully!");
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteContent = async (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      await deleteCollectionItem("creator_content", id);
    }
  };

  const stats = {
    totalViews: content.reduce((acc, curr) => acc + (curr.views || 0), 0),
    totalEarnings: content.reduce((acc, curr) => acc + (curr.earnings || 0), 0),
    publishedCount: content.filter(c => c.status === "published").length
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-100">
        <button 
          onClick={() => setViewMode("dashboard")}
          className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
            viewMode === "dashboard" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Insights
        </button>
        <button 
          onClick={() => setViewMode("upload")}
          className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
            viewMode === "upload" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Create Content
        </button>
        <button 
          onClick={() => setViewMode("library")}
          className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
            viewMode === "library" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Media Library ({content.length})
        </button>
        <button 
          onClick={() => setViewMode("courses")}
          className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
            viewMode === "courses" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Courses
        </button>
      </div>

      {viewMode === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">Total Earnings</span>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              <span className="text-3xl font-black">${stats.totalEarnings.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-emerald-400 mt-2">✓ Based on views and tips</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">Content Reach</span>
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-500" />
              <span className="text-3xl font-black text-slate-900">{stats.totalViews.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Total combined impressions</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">Publishing Pace</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              <span className="text-3xl font-black text-slate-900">{stats.publishedCount}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Active assets in academy</p>
          </div>
        </div>
      )}

      {viewMode === "upload" && (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Upload New Asset</h3>
              <p className="text-sm text-slate-500">Create high-quality educational material for your students.</p>
            </div>
          </div>

          <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Asset Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "video", icon: Video, label: "Video" },
                    { id: "slide", icon: FileText, label: "Slides" },
                    { id: "photo", icon: ImageIcon, label: "Photo" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setUploadType(type.id as any)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        uploadType === type.id 
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700" 
                          : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      <type.icon className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Introduction to Gbagada Logistics"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">URL / Source</label>
                <input 
                  type="url"
                  required
                  placeholder="Paste your hosted media URL here"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={isUploading}
                className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
              >
                {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isUploading ? "Uploading..." : "Save & Publish Asset"}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Preview</label>
              <div className="flex-1 min-h-[300px] bg-slate-950 rounded-[2rem] border border-slate-800 overflow-hidden relative flex items-center justify-center group">
                {url ? (
                  uploadType === "photo" ? (
                    <img src={url} className="w-full h-full object-cover" alt="Preview" />
                  ) : uploadType === "video" ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Play className="w-12 h-12 text-white/50" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white/50 gap-4">
                      <FileText className="w-16 h-16" />
                      <span className="text-xs font-black uppercase">Document Preview</span>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-4 text-slate-600">
                    <Camera className="w-12 h-12" />
                    <p className="text-xs font-bold uppercase tracking-widest">No Media Provided</p>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                   <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase">Live Preview</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {viewMode === "library" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {content.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-40"
              >
                <Layout className="w-16 h-16 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest">No content uploaded yet</p>
                <button 
                  onClick={() => setViewMode("upload")}
                  className="mt-4 text-emerald-600 font-black uppercase text-[10px] hover:underline"
                >
                  Create your first asset
                </button>
              </motion.div>
            ) : (
              content.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm group hover:border-emerald-200 transition-all"
                >
                  <div className={`relative h-48 flex items-center justify-center bg-gradient-to-br ${
                    item.type === "video" ? "from-indigo-600 to-purple-700" :
                    item.type === "slide" ? "from-cyan-600 to-blue-700" :
                    "from-emerald-600 to-teal-700"
                  } overflow-hidden`}>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      {item.type === "video" && <Video className="w-8 h-8 text-white/80" />}
                      {item.type === "slide" && <FileText className="w-8 h-8 text-white/80" />}
                      {item.type === "photo" && <ImageIcon className="w-8 h-8 text-white/80" />}
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                        item.type === "video" ? "bg-red-500 text-white" :
                        item.type === "slide" ? "bg-blue-500 text-white" :
                        "bg-emerald-500 text-white"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 hover:scale-110 transition-all">
                        <Play className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteContent(item.id)}
                        className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-sm font-black text-slate-900 mb-1">{item.title}</h4>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> ₦{item.earnings}</span>
                      </div>
                      <span>{new Date(item.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
      {viewMode === "courses" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* AI Architect Tool */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 border border-slate-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-emerald-400" />
                   </div>
                   <h3 className="text-lg font-black uppercase tracking-widest">AI Course Architect</h3>
                 </div>

                 <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                   Stuck on how to structure your skill? Tell us your topic and our AI will draft a high-converting syllabus and missions for you.
                 </p>

                 <div className="flex flex-col gap-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <input 
                       placeholder="Topic e.g. 'Advanced Crochet'" 
                       value={architectTopic}
                       onChange={(e) => setArchitectTopic(e.target.value)}
                       className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500 transition-all"
                     />
                     <select 
                       value={architectCategory}
                       onChange={(e) => setArchitectCategory(e.target.value)}
                       className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                     >
                        <option value="Trades">Trades & Crafts</option>
                        <option value="Digital">Digital & Creator</option>
                        <option value="Business">Business & Sales</option>
                        <option value="Tech">Tech / AI</option>
                     </select>
                   </div>
                   <button 
                     onClick={handleArchitectCourse}
                     disabled={aiLoading || !architectTopic}
                     className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                   >
                     {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                     {aiLoading ? "Architecting..." : "Generate Professional Outline"}
                   </button>
                 </div>

                 {generatedOutline && (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="mt-8 pt-8 border-t border-slate-800"
                   >
                     <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">{architectCategory}</span>
                            <h4 className="text-lg font-black text-white mt-1">{generatedOutline.title}</h4>
                          </div>
                          <button 
                            onClick={() => {
                              const newCourse: Course = {
                                id: `course-${Date.now()}`,
                                title: generatedOutline.title,
                                price: 2500,
                                category: architectCategory as any,
                                description: generatedOutline.description,
                                rating: 5.0,
                                students: 0,
                                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300",
                                lessons: generatedOutline.syllabus.map((s: any, idx: number) => ({
                                  id: `l-${idx}`,
                                  title: s.title,
                                  duration: s.duration,
                                  completed: false
                                })),
                                missions: generatedOutline.missions,
                                quizzes: [],
                                instructorName: userProfile.name,
                                instructorAvatar: userProfile.avatar,
                                zeroToIncome: true
                              };
                              onUpdateCourses([newCourse, ...courses]);
                              setGeneratedOutline(null);
                              setArchitectTopic("");
                              alert("AI Architected course published!");
                            }}
                            className="bg-white text-slate-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            Use Outline
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mb-4 italic leading-relaxed">"{generatedOutline.description}"</p>
                        <div className="space-y-2">
                           {generatedOutline.syllabus.map((lesson: any, i: number) => (
                             <div key={i} className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                               <span className="text-[10px] font-bold text-slate-300">{i+1}. {lesson.title}</span>
                               <span className="text-[9px] font-mono text-slate-500">{lesson.duration}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   </motion.div>
                 )}
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Layout className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Manual Course Launch</h3>
                  <p className="text-sm text-slate-500">Package your assets into a structured curriculum.</p>
                </div>
              </div>

              <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newCourse: Course = {
                id: `course-${Date.now()}`,
                title: formData.get("title") as string,
                price: Number(formData.get("price")),
                category: formData.get("category") as any,
                description: formData.get("description") as string,
                rating: 5.0,
                students: 0,
                image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300",
                lessons: [
                  { id: "l1", title: "Introduction", duration: "10 mins", completed: false }
                ],
                missions: [],
                quizzes: [],
                instructorName: userProfile.name,
                instructorAvatar: userProfile.avatar,
                zeroToIncome: true
              };
              onUpdateCourses([newCourse, ...courses]);
              alert("Course published successfully!");
            }} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Course Title</label>
                  <input name="title" required className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Unlock Price (₦)</label>
                  <input name="price" type="number" required className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                <select name="category" className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold">
                  <option value="Trades">Trades & Crafts</option>
                  <option value="Digital">Digital & Creator</option>
                  <option value="Business">Business & Sales</option>
                  <option value="Tech">Tech / AI</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                <textarea name="description" rows={4} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold resize-none" />
              </div>
              <button type="submit" className="bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all">
                🚀 Launch Course
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
             <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                <h4 className="text-sm font-black text-slate-900 mb-6">My Active Courses</h4>
                <div className="space-y-4">
                  {courses.filter(c => c.instructorName === userProfile.name).map(course => (
                    <div key={course.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className={`w-16 h-16 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br ${
                        course.category === "AI & ML" ? "from-indigo-600 to-purple-700" :
                        course.category === "Web3" ? "from-amber-500 to-orange-600" :
                        course.category === "Cloud DevOps" ? "from-cyan-600 to-blue-700" :
                        "from-slate-700 to-slate-800"
                      }`}>
                        {course.category === "AI & ML" && <Sparkles className="w-6 h-6 text-white/80" />}
                        {course.category === "Cloud DevOps" && <Tv className="w-6 h-6 text-white/80" />}
                        {!["AI & ML", "Cloud DevOps"].includes(course.category) && <Zap className="w-6 h-6 text-white/80" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase">{course.category}</span>
                        <h5 className="text-sm font-black text-slate-900">{course.title}</h5>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold text-slate-400">₦{course.price?.toLocaleString()}</span>
                          <span className="text-[10px] font-bold text-slate-400">•</span>
                          <span className="text-[10px] font-bold text-slate-400">{course.students} Students</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {courses.filter(c => c.instructorName === userProfile.name).length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-8">No courses published yet.</p>
                  )}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RefreshCw: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>
);
