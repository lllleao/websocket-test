"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { text: string; self: boolean; to: string; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") as string;

    const socket = new WebSocket("wwss://www.cidadeclipsebackend.com.br:8443/ws");

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "register", email: userEmail }));
      console.log("Conectado ao servidor WebSocket");
    };

    const toMessage = localStorage.getItem("userEmailTo") as string;

    socket.onmessage = (event) => {
      console.log(event)
      setMessages((prev) => [
        ...prev,
        {
          text: event.data,
          self: false,
          to: toMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    socket.onclose = () => {
      console.log("Conexão fechada");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const toMessage = localStorage.getItem("userEmailTo") as string;
    if (ws && input.trim() !== "") {
      const message = {
        input,
        toMessage,
      };

      ws.send(JSON.stringify(message));

      setMessages((prev) => [
        ...prev,
        {
          text: input,
          self: true,
          to: toMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setInput("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-2xl h-[85vh] bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
        {/* Header */}
        <header className="bg-slate-800 p-4 border-b border-slate-700">
          <h1 className="text-white font-semibold text-lg">
            💬 Chat em tempo real
          </h1>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.self ? "justify-end" : "justify-start"
              } animate-fadeIn`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow-md ${
                  msg.self
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-700 text-gray-100 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[10px] opacity-70 mt-1 text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </main>

        {/* Input */}
        <footer className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-slate-700 text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all duration-200 active:scale-95"
          >
            Enviar
          </button>
        </footer>
      </div>
    </div>
  );
}
