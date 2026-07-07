with open("src/components/ConnectSection.tsx", "r") as f:
    content = f.read()

# We need to remove the giant hero card we added to ConnectSection.tsx
old_content = """<div className="grid grid-cols-1 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <div className="p-6 md:p-10 flex flex-col justify-between rounded-xl">
          <div className="mt-2">
            <span className="logo-blocky px-3 py-1 bg-orange-500 text-slate-900 border-slate-900 text-[10px] font-bold tracking-wide mb-6 inline-block">
              LOUD Connect Platform 2.0
            </span>
            <HeroCarousel />
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
          </div>
        </div>
      </div>"""

new_content = """<PageBanner
        title="LOUD Professional Network"
        subtitle="CONNECT & COLLABORATE"
        description="Build your professional portfolio, connect with peers, find mentors, and endorse practical skills within the LOUD ecosystem."
        icon={Users}
      />"""

content = content.replace(old_content, new_content)

with open("src/components/ConnectSection.tsx", "w") as f:
    f.write(content)
