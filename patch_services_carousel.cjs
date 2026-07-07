const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesCarousel.tsx', 'utf-8');

const importReplacement = `import React, { useRef, useEffect, useState } from "react";
import {
  Users,
  Award,
  ShoppingCart,
  Layers,
  CheckSquare,
  Briefcase,
  FileText,
  CreditCard,
  Calendar,
  BarChart3,
  Heart,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";`;

code = code.replace(/import React, \{ useRef, useEffect \} from "react";\nimport \{\n  Users,[^}]+\} from "lucide-react";/m, importReplacement);

const stateReplacement = `export function ServicesCarousel({ onSelect }: ServicesCarouselProps) {
  const [selectedService, setSelectedService] = useState<any>(null);`;
  
code = code.replace(/export function ServicesCarousel\(\{ onSelect \}: ServicesCarouselProps\) \{\n/, stateReplacement);

const onClickReplacement = `onClick={() => setSelectedService(service)}`;
code = code.replace(/onClick=\{\(\) => onSelect\(service\.id\)\}/g, onClickReplacement);

const modalAddition = `
      <style>{\`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      \`}</style>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 flex flex-col relative"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-purple-200">
                <selectedService.icon className="w-8 h-8" />
              </div>
              
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                {selectedService.label} Details
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-8">
                Welcome to the <strong>{selectedService.label}</strong> module. 
                {selectedService.desc}. Here you can connect with other professionals, 
                explore opportunities, and build your digital footprint on the EstrR platform.
              </p>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onSelect(selectedService.id);
                    setSelectedService(null);
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Enter Module
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`;

code = code.replace(/      <style>\{\`\n        \.hide-scrollbar::\-webkit\-scrollbar \{\n          display: none;\n        \}\n      \`\}<\/style>\n    <\/div>\n  \);\n\}/m, modalAddition);

fs.writeFileSync('src/components/ServicesCarousel.tsx', code);
console.log('ServicesCarousel updated');
