import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# We need to find the handleLogin function up to `setIsAuthLoading(false);` and replace it entirely to be safe.

replacement = """  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) return;

    if (authMode === "signup" && authAccountType === "freelancer" && authPassword !== authConfirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setIsAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === "signin") {
        try {
          await signInWithEmailAndPassword(auth, authEmail, authPassword);
        } catch (signInErr: any) {
          // If the user doesn't exist (invalid-credential or user-not-found), automatically attempt registration as a seamless fallback
          if (signInErr.code === "auth/invalid-credential" || signInErr.code === "auth/user-not-found") {
            console.log("Account not found or invalid credentials on first sign in. Attempting seamless auto-registration fallback...");
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
              const user = userCredential.user;
              await saveUserProfile(user.uid, {
                name: authName || authEmail.split("@")[0],
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
                    name: authName || authEmail.split("@")[0],
                    type: "signup"
                  })
                }).catch(err => console.error("Async welcome email dispatch failed:", err));
              } catch (e) {}
            } catch (signUpErr: any) {
              // If registration fails because the email is already in use, it means the password they entered was wrong
              if (signUpErr.code === "auth/email-already-in-use") {
                throw signInErr;
              } else {
                throw signUpErr;
              }
            }
          } else {
            throw signInErr;
          }
        }
      } else {
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
          
          if (authAccountType === "freelancer") {
            setShowVettingModal(true);
          }
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
      }
      setShowAuthModal(false);
    } catch (error: any) {
      console.error("Auth error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      let friendlyMessage = error.message;
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        friendlyMessage = "Incorrect email or password. If you don't have an account, please click SIGN UP below to register first!";
      } else if (error.code === "auth/email-already-in-use") {
        friendlyMessage = "An account with this email already exists. Try signing in instead.";
      } else if (error.code === "auth/email-already-in-use-wrong-password") {
        friendlyMessage = error.message;
      } else if (error.code === "auth/weak-password") {
        friendlyMessage = "Password is too weak. Please use at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        friendlyMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/network-request-failed") {
        friendlyMessage = "Network error: Unable to reach the authentication server. This often happens due to domain restrictions on the Firebase API key. Please ensure your domain is whitelisted in the Firebase Console.";
      }
      setAuthError(friendlyMessage);
    } finally {
      setIsAuthLoading(false);
    }
  };"""

content = re.sub(r'  const handleLogin = async \(e: React\.FormEvent\) => \{.*?\n    \}\n  \};\n', replacement + '\n', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
