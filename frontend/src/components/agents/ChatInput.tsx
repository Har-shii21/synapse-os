interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
}: ChatInputProps) {
  return (
    <div className="border-t border-zinc-800 p-5 flex gap-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="Ask your AI team..."
        className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 outline-none border border-zinc-800 focus:border-blue-500"
      />

      <button
        onClick={sendMessage}
        className="px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>
  );
}