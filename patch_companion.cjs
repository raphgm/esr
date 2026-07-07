const fs = require('fs');

const code = `import React from "react";
import {
  Smartphone,
  QrCode,
  ShieldCheck,
  Zap,
  Download,
  WifiOff
} from "lucide-react";

export default function CompanionAppDownload() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="relative bg-gradient-to-br from-purple-50 via-white to-emerald-50 rounded-[2rem] p-8 md:p-16 border border-slate-100 overflow-hidden shadow-sm">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">EstrR Mobile App</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Take EstrR <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-emerald-500">
                Everywhere.
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 font-medium max-w-md mb-10 leading-relaxed">
              Download the EstrR Companion App. Access real-time RFQs, accept gig payments, and learn on the go, even when offline.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[10px] font-medium text-slate-300">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-[10px] font-medium text-slate-300">GET IT ON</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-purple-500" />
                <span>Offline Capabilities</span>
              </div>
            </div>
          </div>

          {/* Right Content - Abstract Phone/QR Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <div className="bg-white rounded-[3rem] p-3 border-[10px] border-slate-900 shadow-2xl relative aspect-[1/2] flex flex-col overflow-hidden">
                {/* Top Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-2xl w-1/3 mx-auto z-20"></div>
                
                {/* App Screen Content */}
                <div className="flex-1 bg-slate-50 rounded-[2rem] border border-slate-100 p-5 flex flex-col relative z-10 pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center shadow-sm">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="h-5 bg-slate-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-20 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center p-3 gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                       <div className="space-y-2 flex-1">
                          <div className="h-2 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-2 bg-slate-100 rounded-full w-2/3"></div>
                       </div>
                    </div>
                    <div className="h-20 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center p-3 gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                       <div className="space-y-2 flex-1">
                          <div className="h-2 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-2 bg-slate-100 rounded-full w-2/3"></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Floating Elements */}
              <div className="absolute top-16 -right-6 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg rotate-12 z-30">
                <Zap className="w-6 h-6" />
              </div>

              {/* QR Code Overlay (Floating) */}
              <div className="absolute -bottom-8 -left-8 lg:-left-16 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 -rotate-6 hover:rotate-0 transition-transform duration-500 z-30">
                <div className="bg-slate-50 p-2 rounded-xl mb-2">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
                <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                  Scan to Download
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/CompanionAppDownload.tsx', code);
console.log('Companion App Download Section Redesigned');
