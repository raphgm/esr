import React, { useState } from 'react';
import { ShieldCheck, Share2, Loader2 } from 'lucide-react';

export const VerifiedBadge = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareBadge = async () => {
    if (isSharing) return;
    
    // Basic share functionality - open native share dialog if available
    if (navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share({
          title: 'RemoGigs Verified Professional',
          text: 'I am an RemoGigs Verified professional!',
          url: window.location.href,
        });
      } catch (err: any) {
        // Ignore AbortError (user cancelled) or log other meaningful errors
        if (err.name !== 'AbortError') {
          console.error('Sharing failed:', err);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      alert('Sharing is not supported on this browser. Copy the URL to share.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl shadow-sm w-full max-w-[200px]">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-6 h-6 text-amber-600" />
        <span className="text-sm font-bold text-amber-900">RemoGigs Verified</span>
      </div>
      <button 
        onClick={shareBadge}
        disabled={isSharing}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-200 text-amber-800 rounded-lg text-xs font-bold hover:bg-amber-50 transition-colors disabled:opacity-50"
      >
        {isSharing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Share2 className="w-3 h-3" />} 
        {isSharing ? 'Sharing...' : 'Share'}
      </button>
    </div>
  );
};
