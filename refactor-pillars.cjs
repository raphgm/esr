const fs = require('fs');
let code = fs.readFileSync('src/components/HomeMarketing.tsx', 'utf8');

const regex = /\{\/\* Pillar 1 \*\/\}.*?\{\/\* SECTION 2\.5: SPECIALIZED EXPERT NETWORKS/s;

const newPillars = `
          {
            [
              {
                icon: Lock,
                title: "Strict Escrow Protection",
                desc: "Clients fund the escrow milestones upfront. Work with complete peace of mind knowing your payouts are fully collateralized and locked before you write code or upload media.",
                metric: "ZERO PAYMENT DELAYS",
                feature: "StrrSecure ™",
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
                hoverBg: "group-hover:bg-purple-600"
              },
              {
                icon: Sparkles,
                title: "AI Pitch & Portfolio Grader",
                desc: "Gain access to our built-in AI Copilot. Optimize your client-facing outreach pitches, align with elite brands, and audit your portfolio gap instantly to stand out among top clients.",
                metric: "94% PASS RATE GAIN",
                feature: "Copilot AI",
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
                hoverBg: "group-hover:bg-purple-600"
              },
              {
                icon: ShieldCheck,
                title: "Anonymous Tech Market",
                desc: "Hire or get hired completely anonymously based strictly on verified skill metrics. Bypass bias and evaluate true technical capabilities before revealing identities.",
                metric: "ZERO BIAS MATCHING",
                feature: "Anonymous Protocol",
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
                hoverBg: "group-hover:bg-purple-600"
              },
              {
                icon: BrainCircuit,
                title: "ESTARR AI Lab",
                desc: "Collaboratively train, evaluate, and validate models through RLHF tasks. Contribute to collaborative datasets and earn rewards for shaping the future of AI.",
                metric: "EARN VIA RLHF",
                feature: "AI Lab",
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
                hoverBg: "group-hover:bg-purple-600"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200 hover:border-purple-300 transition-all rounded-2xl group flex flex-col justify-between shadow-xs relative overflow-hidden z-10">
                <div className="absolute -right-8 -bottom-8 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-500 transform-gpu pointer-events-none group-hover:scale-110 -z-10">
                  <pillar.icon className={\`w-48 h-48 \${pillar.color}\`} />
                </div>
                <div>
                  <div className={\`w-10 h-10 rounded-xl \${pillar.bg} \${pillar.color} flex items-center justify-center border \${pillar.border} mb-4 \${pillar.hoverBg} group-hover:text-white transition-colors\`}>
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
                  <span>{pillar.metric}</span>
                  <span className={pillar.color}>{pillar.feature}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* SECTION 2.5: SPECIALIZED EXPERT NETWORKS`;

if (!code.match(regex)) {
  console.log("Could not find match");
} else {
  code = code.replace(regex, newPillars);
  fs.writeFileSync('src/components/HomeMarketing.tsx', code);
  console.log("Updated correctly");
}
