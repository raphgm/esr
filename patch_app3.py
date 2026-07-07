with open("src/App.tsx", "r") as f:
    content = f.read()

new_comp = """              <HomeMarketing onStartEarning={() => {
                setActiveTab("connect");
                if (!isAuthenticated) {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                }
              }} />"""

content = content.replace('<HomeMarketing />', new_comp)

with open("src/App.tsx", "w") as f:
    f.write(content)
