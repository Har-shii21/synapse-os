interface ChatMessageProps {
  sender: string;
  text: string;
}

export default function ChatMessage({
  sender,
  text,
}: ChatMessageProps) {
  const isUser = sender === "You";

  return (
    <div
      className={`max-w-2xl rounded-2xl p-4 transition-all ${
        isUser
          ? "ml-auto bg-blue-600 text-white"
          : "bg-zinc-800 text-white"
      }`}
    >
      <p className="font-semibold text-sm mb-1">
        {sender}
      </p>

      <p className="leading-7 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}