import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
import_statement = "import { VettingProtocolModal } from './components/VettingProtocolModal';\n"
content = re.sub(r'(import .*?;)', r'\1\n' + import_statement, content, count=1)

# Add state
state_statement = "  const [showVettingModal, setShowVettingModal] = useState(false);"
content = content.replace('  const [showAuthModal, setShowAuthModal] = useState(false);', '  const [showAuthModal, setShowAuthModal] = useState(false);\n' + state_statement)

# Replace signup success
# It is around:
#           setUserProfile(updatedProfile);
#           setIsAuthenticated(true);
#           setShowAuthModal(false);
#           setIsAuthLoading(false);
#           confetti...

signup_success_replacement = """          setUserProfile(updatedProfile);
          setIsAuthenticated(true);
          setShowAuthModal(false);
          if (authAccountType === "freelancer" && authMode === "signup") {
            setShowVettingModal(true);
          }
          setIsAuthLoading(false);"""
content = re.sub(r'setUserProfile\(updatedProfile\);\s*setIsAuthenticated\(true\);\s*setShowAuthModal\(false\);\s*setIsAuthLoading\(false\);', signup_success_replacement, content)

# And in the fallback seamless registration
fallback_signup_replacement = """              // Send signup welcome email
              try {
                await fetch('https://estarr-mail-dispatcher.onrender.com/send-welcome', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: authEmail, name: authName || authEmail.split("@")[0], type: "signup" })
                }).catch(err => console.error("Async welcome email dispatch failed:", err));
              } catch (e) {}
              
              if (authMode === "signup" && authAccountType === "freelancer") {
                setShowVettingModal(true);
              }"""
content = content.replace('// Send signup welcome email\n              try {\n                await fetch(\'https://estarr-mail-dispatcher.onrender.com/send-welcome\', {\n                  method: \'POST\',\n                  headers: { \'Content-Type\': \'application/json\' },\n                  body: JSON.stringify({\n                    email: authEmail,\n                    name: authName || authEmail.split("@")[0],\n                    type: "signup"\n                  })\n                }).catch(err => console.error("Async welcome email dispatch failed:", err));\n              } catch (e) {}', fallback_signup_replacement)

# Also there's one more block around line 761: `setShowAuthModal(false);` 
# I will just place the VettingModal in the JSX

modal_jsx = """      {showVettingModal && (
        <VettingProtocolModal 
          onClose={() => setShowVettingModal(false)}
          onApply={() => {
            setShowVettingModal(false);
            alert("Application submitted! Check your email for the CCAT link.");
          }}
        />
      )}
"""
content = content.replace('{showAuthModal && (', modal_jsx + '\n      {showAuthModal && (')

with open('src/App.tsx', 'w') as f:
    f.write(content)
