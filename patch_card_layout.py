import re

with open("src/components/ProjectsSection.tsx", "r") as f:
    content = f.read()

# Fix date and user info row
old_footer = """<div className="flex items-center justify-between text-xs text-slate-500 font-medium mt-2 pt-3 border-t border-slate-100">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />{" "}
                                  {task.dueDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />{" "}
                                  {task.assignee.split(" ")[0]}
                                </span>
                              </div>"""

new_footer = """<div className="flex flex-col 2xl:flex-row items-start 2xl:items-center justify-between text-[11px] text-slate-500 font-medium mt-2 pt-3 border-t border-slate-100 gap-1.5 2xl:gap-0">
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                  <Calendar className="w-3 h-3 shrink-0" />{" "}
                                  {task.dueDate}
                                </span>
                                <span className="flex items-center gap-1 whitespace-nowrap truncate max-w-full">
                                  <User className="w-3 h-3 shrink-0" />{" "}
                                  <span className="truncate">{task.assignee.split(" ")[0]}</span>
                                </span>
                              </div>"""
content = content.replace(old_footer, new_footer)

# Fix buttons row
old_buttons = """{/* Quick drag/move buttons */}
                              <div className="grid grid-cols-2 gap-1 mt-2">
                                {status !== "todo" && (
                                  <button
                                    onClick={() => {
                                      const steps: ProjectTask["status"][] = [
                                        "todo",
                                        "inprogress",
                                        "review",
                                        "done",
                                      ];
                                      const idx = steps.indexOf(status);
                                      moveTask(task.id, steps[idx - 1]);
                                    }}
                                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"
                                  >
                                    &larr; Back
                                  </button>
                                )}
                                {status !== "done" && (
                                  <button
                                    onClick={() => {
                                      const steps: ProjectTask["status"][] = [
                                        "todo",
                                        "inprogress",
                                        "review",
                                        "done",
                                      ];
                                      const idx = steps.indexOf(status);
                                      moveTask(task.id, steps[idx + 1]);
                                    }}
                                    className="col-start-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"
                                  >
                                    Next &rarr;
                                  </button>
                                )}
                              </div>"""

new_buttons = """{/* Quick drag/move buttons */}
                              <div className={`flex w-full gap-2 mt-3 ${status === 'todo' ? 'justify-end' : 'justify-between'}`}>
                                {status !== "todo" && (
                                  <button
                                    onClick={() => {
                                      const steps: ProjectTask["status"][] = [
                                        "todo",
                                        "inprogress",
                                        "review",
                                        "done",
                                      ];
                                      const idx = steps.indexOf(status);
                                      moveTask(task.id, steps[idx - 1]);
                                    }}
                                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-bold py-2 px-1 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1"
                                  >
                                    &larr; Back
                                  </button>
                                )}
                                {status !== "done" && (
                                  <button
                                    onClick={() => {
                                      const steps: ProjectTask["status"][] = [
                                        "todo",
                                        "inprogress",
                                        "review",
                                        "done",
                                      ];
                                      const idx = steps.indexOf(status);
                                      moveTask(task.id, steps[idx + 1]);
                                    }}
                                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold py-2 px-1 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1 shadow-sm"
                                  >
                                    Next &rarr;
                                  </button>
                                )}
                              </div>"""

content = content.replace(old_buttons, new_buttons)

with open("src/components/ProjectsSection.tsx", "w") as f:
    f.write(content)
