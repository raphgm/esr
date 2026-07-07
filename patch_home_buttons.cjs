const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const target1 = `              <ServicesCarousel onSelect={setActiveTab} />
              
              <HomeMarketing 
                onStartEarning={() => {
                  setActiveTab("connect");
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }
                }} 
                onStartCollabing={() => {
                  setActiveTab("projects");
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }
                }}
              />`;

const replacement1 = `              <ServicesCarousel onSelect={(tab) => {
                if (!isAuthenticated) {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                } else {
                  setActiveTab(tab);
                }
              }} />
              
              <HomeMarketing 
                onStartEarning={() => {
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  } else {
                    setActiveTab("connect");
                  }
                }} 
                onStartCollabing={() => {
                  if (!isAuthenticated) {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  } else {
                    setActiveTab("projects");
                  }
                }}
              />`;

code = code.replace(target1, replacement1);

const targetShareButton = `<button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setIsLinkCopied(true);
                          setTimeout(() => setIsLinkCopied(false), 2000);
                        }}`;

const replacementShareButton = `<button
                        onClick={() => {
                          if (!isAuthenticated) {
                            setAuthMode("signup");
                            setShowAuthModal(true);
                            return;
                          }
                          navigator.clipboard.writeText(window.location.href);
                          setIsLinkCopied(true);
                          setTimeout(() => setIsLinkCopied(false), 2000);
                        }}`;

code = code.replace(targetShareButton, replacementShareButton);

fs.writeFileSync('src/App.tsx', code);
console.log('Home buttons patched');
