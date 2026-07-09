import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('      if (authMode === "signup" && authAccountType === "freelancer") {\n        setShowVettingModal(true);\n      }', '')

# We will put the VettingModal trigger right where it succeeds on signup.

replacement = """        } catch (signUpErr: any) {
          if (signUpErr.code === "auth/email-already-in-use") {
            console.log("Email already in use on signup. Attempting seamless auto-login fallback...");
            try {
              await signInWithEmailAndPassword(auth, authEmail, authPassword);
              // Successfully logged in as existing user. Let's prevent the vetting modal since they aren't new.
              setAuthMode("signin"); // Will prevent the vetting modal condition
            } catch (signInErr: any) {
              if (signInErr.code === "auth/wrong-password" || signInErr.code === "auth/invalid-credential") {
                const customError = new Error("An account with this email exists, but the password provided is incorrect. Please sign in instead.");
                (customError as any).code = "auth/email-already-in-use-wrong-password";
                throw customError;
              }
              throw signInErr;
            }
          } else {
            throw signUpErr;
          }
        }
        
        // This is a true new signup, so trigger vetting modal
        if (authAccountType === "freelancer") {
          setShowVettingModal(true);
        }
"""

content = re.sub(r'        \} catch \(signUpErr: any\) \{.*?throw signUpErr;\n          \}\n        \}', replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
