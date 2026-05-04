import type { ChatMessage } from "@/types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
          🌍
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-xs shadow-lg shadow-indigo-500/20"
            : "bg-white/10 backdrop-blur-xs text-gray-100 border border-white/10 rounded-bl-xs"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
