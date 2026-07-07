const fs = require('fs');

let code = fs.readFileSync('src/components/ChatDrawer.tsx', 'utf-8');

code = code.replace(
  'import { motion, AnimatePresence } from "motion/react";',
  'import { motion, AnimatePresence } from "motion/react";\nimport { VoiceRecorder, AudioPlayer } from "./VoiceRecorder";'
);

code = code.replace(
  '{ role: "user" | "model"; text: string }[]',
  '{ role: "user" | "model"; text: string; audioUrl?: string; audioDuration?: number }[]'
);

const handleSendReplacement = `  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputMsg.trim();
    if (!query || isLoading) return;

    // Append user message
    const updatedMessages = [
      ...messages,
      { role: "user" as const, text: query },
    ];
    setMessages(updatedMessages);
    setInputMsg("");
    setIsLoading(true);

    // Mock network request to LLM
    setTimeout(() => {
      let mockReply = "";`;

const handleSendNew = `  const handleRecordComplete = (audioUrl: string, duration: number) => {
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputMsg.trim();
    if (!query || isLoading) return;

    // Append user message
    const updatedMessages = [
      ...messages,
      { role: "user" as const, text: query },
    ];
    setMessages(updatedMessages);
    setInputMsg("");
    setIsLoading(true);

    // Mock network request to LLM
    setTimeout(() => {
      let mockReply = "";`;

code = code.replace(handleSendReplacement, handleSendNew);

const messageRenderReplacement = `<p className={\`text-xs leading-relaxed \${
                        msg.role === "user"
                          ? "text-white"
                          : "text-slate-300 font-medium"
                      }\`}>
                      {msg.text}
                    </p>`;

const messageRenderNew = `{msg.audioUrl ? (
                      <div className="mt-1">
                        <AudioPlayer src={msg.audioUrl} duration={msg.audioDuration} />
                      </div>
                    ) : (
                      <p className={\`text-xs leading-relaxed \${
                        msg.role === "user"
                          ? "text-white"
                          : "text-slate-300 font-medium"
                      }\`}>
                        {msg.text}
                      </p>
                    )}`;
code = code.replace(messageRenderReplacement, messageRenderNew);

const inputFormReplacement = `<form
              onSubmit={handleSendMessage}
              className="p-5 border-t border-white/10 bg-slate-950 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Ask EstrR AI anything..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-600 font-medium"
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white p-3.5 border border-white/20 rounded-xl cursor-pointer transition-colors shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>`;

const inputFormNew = `<form
              onSubmit={handleSendMessage}
              className="p-5 border-t border-white/10 bg-slate-950 flex gap-2 items-center"
            >
              <div className="flex-1 flex items-center bg-slate-900 border border-white/15 rounded-xl pr-2 focus-within:border-purple-600 transition-colors">
                <input
                  type="text"
                  placeholder="Ask EstrR AI anything..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none font-medium"
                />
                {!inputMsg && (
                   <VoiceRecorder onRecordComplete={handleRecordComplete} compact={true} />
                )}
              </div>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white p-3.5 border border-white/20 rounded-xl cursor-pointer transition-colors shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>`;

code = code.replace(inputFormReplacement, inputFormNew);

fs.writeFileSync('src/components/ChatDrawer.tsx', code);
console.log("ChatDrawer patched!");
