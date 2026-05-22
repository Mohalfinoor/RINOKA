import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Compass, Send, Bot, User, Sparkles, RefreshCw, MessageCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Halo! Saya **Sari**, asisten virtual Klaster RINOKA by Summarecon Mutiara Makassar. \n\nAda yang bisa saya bantu diskusikan tentang tipe unit Lyon/Paris, keunggulan kayu ramah lingkungan Sumitomo Forestry, promo free AC, fasilitas eksklusif, atau lokasi strategis kami? Silakan tanyakan apa saja!",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const presetQuestions = [
    "Bagaimana kolaborasi dengan Sumitomo Forestry?",
    "Berapa harga & spesifikasi Tipe Paris?",
    "Fasilitas eksklusif di cluster Rinoka?",
    "Lokasi strategis & jarak ke tol bandara?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Build request body matching server format
      const chatHistoryForAPI = [...messages, userMessage].map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: chatHistoryForAPI })
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any = {};
      
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const textError = await res.text();
        if (textError.includes("<html") || textError.includes("<!DOCTYPE") || textError.includes("The page c") || textError.includes("Not Found")) {
          throw new Error("Layanan API AI Sari mendeteksi respons HTML (Kemungkinan environment variable GEMINI_API_KEY belum ditambahkan pada Vercel Dashboard, atau serverless configuration Anda belum dimuat)");
        }
        throw new Error(textError.slice(0, 150) || "Server tidak mengembalikan respons JSON");
      }
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengoneksikan dengan asisten Sari");
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text: `Maaf, terjadi gangguan koneksi untuk menghubungi virtual assistant Sari: **${err.message}**. \n\n**💡 Panduan Solusi di Vercel:**\n1. Buka dashboard proyek Anda di **vercel.com**.\n2. Masuk ke tab **Settings** > **Environment Variables**.\n3. Tambahkan nama key: \`GEMINI_API_KEY\` dan masukkan nilai Kunci API Gemini Anda.\n4. Klik **Save**.\n5. Masuk ke tab **Deployments**, pilih deployment terakhir, klik titik tiga dan klik **Redeploy** agar konfigurasi baru dimuat secara permanen.\n\nJika diputar lokal, pastikan Secrets di workspace Anda sudah terisi dengan benar.`,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: "Halo! Saya **Sari**, asisten virtual Klaster RINOKA by Summarecon Mutiara Makassar. \n\nAda yang bisa saya bantu diskusikan tentang tipe unit Lyon/Paris, keunggulan kayu ramah lingkungan Sumitomo Forestry, promo free AC, fasilitas eksklusif, atau lokasi strategis kami? Silakan tanyakan apa saja!",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-editorial-accent hover:bg-editorial-text shadow-2xl rounded-none p-4 text-white z-50 flex items-center gap-2 hover:translate-y-[-2px] transition-all duration-300 border border-editorial-border cursor-pointer font-sans"
        id="assistant-trigger"
      >
        <MessageCircle className="w-5 h-5 text-editorial-gold" />
        <span className="text-[10px] uppercase tracking-widest font-bold pr-1 hidden sm:inline font-sans">Tanya Sari (AI)</span>
      </button>

      {/* Expanded Virtual Assistant Dialogue Widget Panel */}
      {isOpen && (
        <div
          id="assistant-panel"
          className="fixed bottom-6 right-6 w-full max-w-[420px] h-[580px] bg-white rounded-none shadow-2xl border border-editorial-border z-50 overflow-hidden flex flex-col justify-between transition-all duration-300"
        >
          {/* Header Panel */}
          <div className="bg-editorial-accent p-4 flex items-center justify-between text-white border-b border-editorial-border shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-none flex items-center justify-center border border-white/10">
                <Bot className="w-5 h-5 text-editorial-gold" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif italic text-sm text-white font-medium">Asisten Sari</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-ping"></span>
                </div>
                <span className="text-[9px] text-editorial-gold uppercase tracking-[0.15em] font-bold block font-sans">AI Property Assistant Rinoka</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Percakapan"
                className="p-1.5 hover:bg-white/5 rounded-none text-[#E0DBCF] hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup Panel"
                className="p-1.5 hover:bg-white/5 rounded-none text-[#E0DBCF] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-editorial-bg">
            {messages.map((m) => {
              const ChatIcon = m.sender === "user" ? User : Bot;
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-none shrink-0 flex items-center justify-center text-xs border ${
                      m.sender === "user"
                        ? "bg-editorial-accent text-white border-white/10"
                        : "bg-white text-editorial-accent border-editorial-border"
                    }`}
                  >
                    <ChatIcon className="w-3.5 h-3.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <div
                      className={`p-3 rounded-none text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-editorial-accent text-white font-sans text-xs border border-white/5"
                          : "bg-white text-editorial-text border border-editorial-border font-serif italic text-[13px] whitespace-pre-line"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[8px] text-[#8A8471] block px-1 text-right font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 mr-auto max-w-[85%]">
                <div className="w-7 h-7 rounded-none shrink-0 flex items-center justify-center text-xs bg-white text-editorial-accent border border-editorial-border">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white text-editorial-secondary border border-editorial-border rounded-none p-3 text-xs italic flex items-center gap-1 font-serif">
                  <span>Sari sedang mengetik</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Presets and inputs panel */}
          <div className="p-4 border-t border-editorial-border bg-white shrink-0 space-y-3">
            
            {/* Show presets helper if list is simple */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-[9px] text-editorial-secondary font-bold uppercase tracking-widest px-1 font-sans">
                  Rekomendasi Pertanyaan:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {presetQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] bg-editorial-bg hover:bg-editorial-border/30 border border-editorial-border text-editorial-accent px-3 py-1.5 rounded-none transition-all text-left font-serif italic cursor-pointer font-sans"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2 pt-1 font-sans"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tanyakan detail spesifikasi, rute jalan tol..."
                className="flex-1 bg-editorial-bg rounded-none py-2.5 px-4 text-xs text-editorial-text border border-editorial-border focus:outline-hidden focus:border-editorial-accent focus:bg-white"
              />
              <button
                type="submit"
                className="bg-editorial-accent hover:bg-editorial-text text-white rounded-none p-3 transition-all cursor-pointer shrink-0 border border-editorial-border"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
