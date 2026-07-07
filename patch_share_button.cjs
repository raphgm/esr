const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const shareButtonCode = `                    <div className="mt-8 flex items-center gap-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setIsLinkCopied(true);
                          setTimeout(() => setIsLinkCopied(false), 2000);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md border border-slate-800"
                      >
                        {isLinkCopied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4 text-purple-400" />
                            <span>Share Portfolio</span>
                          </>
                        )}
                      </button>
                    </div>`;

code = code.replace(
  '                    <div className="mt-auto pt-8">',
  shareButtonCode + '\n                    <div className="mt-auto pt-8">'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Share button added.');
