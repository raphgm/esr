with open("src/App.tsx", "r") as f:
    content = f.read()

old_content = """                    <span className="logo-blocky px-3 py-1 bg-orange-500 text-slate-900 border-slate-900 text-[10px] font-bold tracking-wide mb-6 inline-block">
                      LOUD Connect Platform 2.0
                    </span>
                    <HeroCarousel />
                  </div>"""

new_content = """                    <span className="logo-blocky px-3 py-1 bg-orange-500 text-slate-900 border-slate-900 text-[10px] font-bold tracking-wide mb-6 inline-block">
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
                  </div>"""

if old_content in content:
    content = content.replace(old_content, new_content)
    with open("src/App.tsx", "w") as f:
        f.write(content)
    print("Replaced!")
else:
    print("Could not find old content!")

