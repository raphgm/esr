const fs = require('fs');

let code = fs.readFileSync('src/components/ChatDrawer.tsx', 'utf-8');

const handleRecordComplete = `  const handleRecordComplete = (audioUrl: string, duration: number) => {
    const updatedMessages = [
      ...messages,
      { role: "user" as const, text: "🎤 Voice note", audioUrl, audioDuration: duration },
    ];
    setMessages(updatedMessages);
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I've received your audio note. I have logged this feedback. Do you want me to convert this into a structured task?",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };
`;

code = code.replace(
  'const handleSendMessage = async (e: React.FormEvent) => {',
  handleRecordComplete + '\n  const handleSendMessage = async (e: React.FormEvent) => {'
);

fs.writeFileSync('src/components/ChatDrawer.tsx', code);
console.log("ChatDrawer patched again!");
