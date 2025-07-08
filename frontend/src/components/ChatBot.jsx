import React, { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // 🆕 New Chat Logic
  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await axiosInstance.post("/chatty", { message: input });
      const botReply = res.data.reply || "No response";

      setMessages((prev) => [...prev, { sender: "Kusii", text: botReply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ChatBot", text: "Bot error or server not responding." },
      ]);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-zinc-900 rounded-2xl shadow-lg h-[80vh] flex flex-col overflow-hidden border border-purple-700">
      {/* Chat Header */}
      <div className="flex justify-between items-center py-4 px-6 bg-purple-700 text-white text-xl font-semibold">
        💬 Kusii
        {/* 🆕 New Chat Button */}
        <button
          onClick={handleNewChat}
          className="bg-white text-purple-700 text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-200 transition"
          title="Start new chat"
        >
          ➕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-800">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-purple-400 italic text-lg">
            Welcome to{" "}
            <span className="mx-1 font-bold text-white"> Kusii </span> by{" "}
            <span className="text-blue-400 font-semibold"> AbhiTech </span>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                msg.sender === "You"
                  ? "bg-purple-600 text-black ml-auto text-right"
                  : "bg-yellow-200 text-black mr-auto text-left"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-700 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg p-3 text-sm bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={1}
        />
        <button
          onClick={handleSend}
          className="bg-purple-700 hover:bg-purple-600 transition px-5 py-2 rounded-lg text-white font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
