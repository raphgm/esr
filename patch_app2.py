with open("src/App.tsx", "r") as f:
    content = f.read()

old_content = """                    <span className="px-3 py-1 bg-orange-500 text-slate-900 border-2 border-slate-900 text-[10px] font-bold tracking-wide mb-6 inline-block uppercase shadow-[2px_2px_0px_#111]">
                      LOUD Connect Platform 2.0
                    </span>
                    <div className="flex flex-col gap-10">
                      <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-6xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                          Learn<br />
                          <span className="text-orange-500">To</span> Earning.
                        </h1>
                        <p className="max-w-md text-base md:text-lg leading-snug text-slate-700">
                          Africa's leading digital ecosystem where practical skills transform into sustainable professional growth.
                        </p>
                      </div>
                      <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                        <h1 className="text-5xl md:text-6xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                          Networking &<br />
                          <span className="text-orange-500">Identity</span>.
                        </h1>
                        <p className="max-w-md text-base md:text-lg leading-snug text-slate-700">
                          Build your professional portfolio, connect with peers, and verify your credentials on-chain.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-slate-200/10">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold font-mono tracking-tighter text-slate-900">124K</div>
                      <div className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Active Learners</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold font-mono tracking-tighter text-slate-900">₦850M</div>
                      <div className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Market Vol</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold font-mono tracking-tighter text-slate-900">12.5K</div>
                      <div className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Verified Jobs</div>
                    </div>
                  </div>"""

new_content = """                    <span className="px-3 py-1 bg-orange-500 text-slate-900 border-2 border-slate-900 text-[10px] font-bold tracking-wide mb-6 inline-block uppercase shadow-[2px_2px_0px_#111]">
                      LOUD Connect Platform 2.0
                    </span>
                    <div className="flex flex-col gap-10">
                      <div className="animate-fade-in">
                        <h1 className="text-5xl md:text-6xl leading-none font-bold tracking-tight mb-4 text-slate-900">
                          Networking &<br />
                          <span className="text-orange-500">Identity</span>.
                        </h1>
                        <p className="max-w-md text-base md:text-lg leading-snug text-slate-700">
                          Build your professional portfolio, connect with peers, and verify your credentials on-chain.
                        </p>
                      </div>
                    </div>
                  </div>"""

if old_content in content:
    content = content.replace(old_content, new_content)
    with open("src/App.tsx", "w") as f:
        f.write(content)
    print("Replaced!")
else:
    print("Could not find old content!")
