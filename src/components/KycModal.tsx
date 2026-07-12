import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Camera, FileText, CheckCircle2, Loader2, AlertCircle, ScanFace, CreditCard, ChevronRight } from 'lucide-react';

interface KycModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function KycModal({ isOpen, onClose, onComplete }: KycModalProps) {
  const [step, setStep] = useState<"intro" | "document" | "face" | "processing" | "success">("intro");
  const [docType, setDocType] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("intro");
      setDocType(null);
      setCameraActive(false);
    }
  }, [isOpen]);

  const handleDocumentSelect = (type: string) => {
    setDocType(type);
    setStep("face");
  };

  const handleFaceScanStart = () => {
    setCameraActive(true);
    // Simulate camera scan taking a bit
    setTimeout(() => {
      setCameraActive(false);
      setStep("processing");
      
      // Simulate verification processing
      setTimeout(() => {
        setStep("success");
      }, 3000);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={step === "processing" ? undefined : onClose} 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="font-bold tracking-tight">Identity Verification</span>
          </div>
          {step !== "processing" && step !== "success" && (
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6 relative">
          <AnimatePresence mode="wait">
            {step === "intro" && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5 text-center items-center py-2"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <ScanFace className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Verify your identity</h3>
                  <p className="text-sm text-slate-500 leading-relaxed px-4">
                    To access high-impact escrow contracts, we need to verify your identity. This takes less than 2 minutes.
                  </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full text-left flex flex-col gap-3 mt-2">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>Government-issued ID</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <ScanFace className="w-4 h-4 text-slate-400" />
                    <span>Facial biometric scan</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[10px] text-slate-400 mt-2 text-left bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <p>Your data is processed securely by our trusted identity partner (Onfido/Stripe) and is never stored on our servers.</p>
                </div>

                <button 
                  onClick={() => setStep("document")}
                  className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm"
                >
                  Start Verification
                </button>
              </motion.div>
            )}

            {step === "document" && (
              <motion.div 
                key="document"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4 py-2"
              >
                <h3 className="text-lg font-bold text-slate-900">Select Document Type</h3>
                <p className="text-xs text-slate-500 mb-2">Choose the type of government-issued ID you'll use to verify your identity.</p>
                
                <div className="flex flex-col gap-3">
                  {[
                    { id: "passport", label: "Passport", icon: FileText },
                    { id: "drivers_license", label: "Driver's License", icon: CreditCard },
                    { id: "id_card", label: "National ID Card", icon: CreditCard }
                  ].map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDocumentSelect(doc.id)}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 rounded-xl transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-slate-700 transition-colors">
                          <doc.icon className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-sm text-slate-700">{doc.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setStep("intro")}
                  className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors w-full text-center"
                >
                  Back
                </button>
              </motion.div>
            )}

            {step === "face" && (
              <motion.div 
                key="face"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5 text-center items-center py-2"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Face Scan & Document</h3>
                  <p className="text-xs text-slate-500">Center your face and the document in the frame.</p>
                </div>

                <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden shadow-inner border-2 border-slate-200 flex items-center justify-center">
                  {!cameraActive ? (
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <Camera className="w-8 h-8" />
                      <span className="text-xs font-medium">Camera access required</span>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-[80%] h-[90%] border-2 border-emerald-500/50 rounded-full border-dashed" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent h-20 z-20 flex items-end justify-center pb-4">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Scanning Biometrics...</span>
                      </div>
                    </>
                  )}
                </div>

                {!cameraActive ? (
                  <button 
                    onClick={handleFaceScanStart}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <Camera className="w-4 h-4" /> Start Scan
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-slate-200 text-slate-400 font-bold py-3.5 rounded-xl mt-2 cursor-not-allowed"
                  >
                    Processing...
                  </button>
                )}
                
                {!cameraActive && (
                  <button 
                    onClick={() => setStep("document")}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Back to document selection
                  </button>
                )}
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-6 text-center items-center py-12"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Verifying Identity</h3>
                  <p className="text-xs text-slate-500">Checking document authenticity and biometrics...</p>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-6 text-center items-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Verification Complete</h3>
                  <p className="text-sm text-slate-500">
                    Your identity has been successfully verified. You now have full access to high-impact escrow contracts.
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    onComplete();
                    onClose();
                  }}
                  className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm"
                >
                  Continue to Escrow
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
