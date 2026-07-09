import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
          const user = userCredential.user;
          await saveUserProfile(user.uid, {
            name: authName,
            email: authEmail,
            birthdate: authBirthdate || "1998-07-06",
            accountType: authAccountType,
            profession: authAccountType === "creator" ? "Creator" : authAccountType === "academyLearner" ? "Certified Creator" : authAccountType === "freelancer" ? (applyingAs ? `${applyingAs} Specialist` : "Professional Freelancer") : (selectedRoleType ? `Hiring: ${selectedRoleType}` : "Job Provider / Owner"),
          });
          // Send signup welcome email
          try {
            fetch("/api/send-welcome", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: authEmail,
                name: authName,
                type: "signup"
              })
            }).catch(err => console.error("Async welcome email dispatch failed:", err));
          } catch (e) {}
        } catch (signUpErr: any) {
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
      }"""

# we are replacing lines 744 to 766
content = re.sub(r'      \} else \{\n        const userCredential.*?\} catch \(e\) \{\}\n      \}', replacement, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
