const fs = require('fs');
let code = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf-8');

// Add imports
code = code.replace(
  'import { motion, AnimatePresence } from "motion/react";',
  'import { motion, AnimatePresence } from "motion/react";\nimport { VoiceRecorder, AudioPlayer } from "./VoiceRecorder";\nimport { MessageSquare } from "lucide-react";'
);

// Add states
code = code.replace(
  'const [searchQuery, setSearchQuery] = useState("");',
  'const [searchQuery, setSearchQuery] = useState("");\n  const [openCommentsId, setOpenCommentsId] = useState<string | null>(null);\n  const [commentText, setCommentText] = useState("");'
);

// Add handleAddComment
const addCommentReplacement = `const deleteTask = (taskId: string) => {`;
const addCommentNew = `const handleAddComment = (taskId: string, text: string, audioUrl?: string, audioDuration?: number) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          comments: [
            ...(t.comments || []),
            {
              id: \`comment-\${Date.now()}\`,
              author: userProfile.name,
              text,
              audioUrl,
              audioDuration,
              time: "Just now"
            }
          ]
        };
      }
      return t;
    });
    onUpdateTasks(updated);
  };

  const deleteTask = (taskId: string) => {`;
code = code.replace(addCommentReplacement, addCommentNew);

// Add comment UI below interactive pipeline triggers
const uiReplacement = `                            {status === "done" && (
                              <button
                                onClick={() =>
                                  onOpenAiChat(
                                    \`Draft a professional completion certificate and positive review for my contract with \${client} regarding the work: \${task.title}.\`,
                                    "projects"
                                  )
                                }
                                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-[9px] font-bold py-1.5 rounded-lg text-center cursor-pointer transition-all"
                              >
                                Generate AI Completion Review
                              </button>
                            )}
                          </div>`;
const uiNew = `                            {status === "done" && (
                              <button
                                onClick={() =>
                                  onOpenAiChat(
                                    \`Draft a professional completion certificate and positive review for my contract with \${client} regarding the work: \${task.title}.\`,
                                    "projects"
                                  )
                                }
                                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-[9px] font-bold py-1.5 rounded-lg text-center cursor-pointer transition-all"
                              >
                                Generate AI Completion Review
                              </button>
                            )}
                          </div>
                          
                          {/* Comments Section */}
                          <div className="mt-3 border-t border-slate-200/50 pt-3">
                            <button 
                              onClick={() => setOpenCommentsId(openCommentsId === task.id ? null : task.id)}
                              className="text-[10px] text-slate-500 hover:text-purple-600 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              {task.comments?.length || 0} Updates & Feedback
                            </button>
                            
                            <AnimatePresence>
                              {openCommentsId === task.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 flex flex-col gap-2 overflow-hidden"
                                >
                                  <div className="max-h-[150px] overflow-y-auto pr-1 flex flex-col gap-2 custom-scrollbar">
                                    {task.comments?.map(c => (
                                      <div key={c.id} className="bg-white border border-slate-100 p-2 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-[9px] font-bold text-slate-700">{c.author}</span>
                                          <span className="text-[8px] text-slate-400">{c.time}</span>
                                        </div>
                                        {c.text && <p className="text-[10px] text-slate-600 leading-relaxed">{c.text}</p>}
                                        {c.audioUrl && (
                                          <div className="mt-1.5">
                                            <AudioPlayer src={c.audioUrl} duration={c.audioDuration} compact={true} />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                    {(!task.comments || task.comments.length === 0) && (
                                      <p className="text-[9px] text-slate-400 italic text-center py-2">No feedback yet.</p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1 bg-white border border-slate-200 rounded-lg p-1 pr-1 focus-within:border-purple-400 transition-colors shadow-inner">
                                    <input 
                                      type="text" 
                                      placeholder="Add voice or text feedback..."
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      className="flex-1 bg-transparent text-[10px] px-2 py-1.5 outline-none text-slate-700 font-medium placeholder-slate-400"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && commentText.trim()) {
                                          handleAddComment(task.id, commentText, undefined, undefined);
                                          setCommentText("");
                                        }
                                      }}
                                    />
                                    {!commentText && (
                                      <VoiceRecorder compact={true} onRecordComplete={(url, duration) => handleAddComment(task.id, "🎤 Voice note attached", url, duration)} />
                                    )}
                                    {commentText && (
                                      <button 
                                        onClick={() => {
                                          if (commentText.trim()) {
                                            handleAddComment(task.id, commentText, undefined, undefined);
                                            setCommentText("");
                                          }
                                        }}
                                        className="p-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded cursor-pointer transition-colors shadow-sm"
                                      >
                                        <Send className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>`;
                          
code = code.replace(uiReplacement, uiNew);

fs.writeFileSync('src/components/ProjectsSection.tsx', code);
console.log('SUCCESS');
