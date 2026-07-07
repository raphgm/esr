with open("src/components/RealEstateSection.tsx", "r") as f:
    content = f.read()

import re

# Add state
content = content.replace('const [searchQuery, setSearchQuery] = useState("");', 'const [searchQuery, setSearchQuery] = useState("");\n  const [isCreatingProject, setIsCreatingProject] = useState(false);')

# Update button
content = content.replace('<button className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">', '<button onClick={() => setIsCreatingProject(true)} className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">')

# Add Modal
modal_code = """
      {isCreatingProject && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border-2 border-slate-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-display font-bold text-xl text-slate-900">Start New Project</h3>
              <button onClick={() => setIsCreatingProject(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Project Type</label>
                <select className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-orange-500">
                  <option>Residential Construction</option>
                  <option>Commercial Development</option>
                  <option>Land Procurement</option>
                  <option>Property Renovation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Location</label>
                <input type="text" placeholder="e.g. Lekki Phase 1, Lagos" className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Estimated Budget</label>
                <input type="text" placeholder="e.g. ₦50,000,000" className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Project Details</label>
                <textarea rows={3} placeholder="Describe your vision..." className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-orange-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button onClick={() => setIsCreatingProject(false)} className="px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs border-2 border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={() => { setIsCreatingProject(false); alert("Project submitted for review!"); }} className="px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-orange-500 hover:bg-orange-600 text-white shadow-[2px_2px_0px_#111] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                Submit Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
"""

content = content.replace('    </div>\n  );\n}', modal_code + '    </div>\n  );\n}')

with open("src/components/RealEstateSection.tsx", "w") as f:
    f.write(content)
