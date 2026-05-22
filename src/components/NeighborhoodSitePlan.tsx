import React, { useState } from "react";
import { 
  Map, 
  CheckCircle2, 
  Users, 
  Eye, 
  Calendar, 
  Phone, 
  X, 
  Filter, 
  Info, 
  Tag, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  User,
  Clock
} from "lucide-react";
import { RINOKA_UNITS } from "../data";

interface Lot {
  id: string; // e.g., "A-01"
  block: string; // e.g., "Blok A"
  num: string; // e.g., "01"
  type: "lyon" | "paris";
  status: "tersedia" | "diminati" | "sedang-dicek" | "terjual";
  interestedCount: number;
  interestedPeople: string[];
  viewings: { date: string; time: string; name: string }[];
  price: number;
  buyerName?: string;
  // SVG coordinates for drawing the lot
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const INITIAL_LOTS: Lot[] = [
  // Blok A: Lyon (Green status / yellow / blue / red)
  { id: "A-01", block: "Blok A", num: "01", type: "lyon", status: "terjual", interestedCount: 0, interestedPeople: [], viewings: [], price: 1200000000, buyerName: "Bpk. H. Syamsuddin" },
  { id: "A-02", block: "Blok A", num: "02", type: "lyon", status: "tersedia", interestedCount: 1, interestedPeople: ["Ibu Rita"], viewings: [], price: 1200000000, x: 130, y: 150, width: 45, height: 75 },
  { id: "A-03", block: "Blok A", num: "03", type: "lyon", status: "diminati", interestedCount: 4, interestedPeople: ["Bpk. Kevin", "Ibu Amalia", "Bpk. Fachri", "Ibu Nina"], viewings: [], price: 1210000000, x: 180, y: 150, width: 45, height: 75 },
  { id: "A-04", block: "Blok A", num: "04", type: "lyon", status: "sedang-dicek", interestedCount: 2, interestedPeople: ["Bpk. Rudy", "Ibu Desi"], viewings: [{ date: "24 Mei 2026", time: "10:00 WITA", name: "Ibu Desi" }], price: 1200000000, x: 230, y: 150, width: 45, height: 75 },
  { id: "A-05", block: "Blok A", num: "05", type: "lyon", status: "tersedia", interestedCount: 0, interestedPeople: [], viewings: [], price: 1200000000, x: 280, y: 150, width: 45, height: 75 },
  { id: "A-06", block: "Blok A", num: "06", type: "lyon", status: "terjual", interestedCount: 0, interestedPeople: [], viewings: [], price: 1220000000, buyerName: "Ibu Dr. Sarah Amelia", x: 330, y: 150, width: 45, height: 75 },
  { id: "A-07", block: "Blok A", num: "07", type: "lyon", status: "diminati", interestedCount: 3, interestedPeople: ["Bpk. Andi", "Ibu Wulan", "Bpk. Reza"], viewings: [], price: 1200000000, x: 380, y: 150, width: 45, height: 75 },
  { id: "A-08", block: "Blok A", num: "08", type: "lyon", status: "tersedia", interestedCount: 0, interestedPeople: [], viewings: [], price: 1200000000, x: 430, y: 150, width: 45, height: 75 },
  { id: "A-09", block: "Blok A", num: "09", type: "lyon", status: "sedang-dicek", interestedCount: 1, interestedPeople: ["Bpk. Farhan"], viewings: [{ date: "25 Mei 2026", time: "14:00 WITA", name: "Bpk. Farhan" }], price: 1230000000, x: 480, y: 150, width: 45, height: 75 },

  // Blok B: Paris (Larger plots, dynamic status)
  { id: "B-01", block: "Blok B", num: "01", type: "paris", status: "terjual", interestedCount: 0, interestedPeople: [], viewings: [], price: 1850000000, buyerName: "Bpk. Ir. Gunawan", x: 80, y: 280, width: 55, height: 95 },
  { id: "B-02", block: "Blok B", num: "02", type: "paris", status: "diminati", interestedCount: 5, interestedPeople: ["Bpk. Edwin", "Ibu Kartika", "Bpk. Yusuf", "Ibu Diana", "Bpk. Surya"], viewings: [], price: 1850000000, x: 140, y: 280, width: 55, height: 95 },
  { id: "B-03", block: "Blok B", num: "03", type: "paris", status: "tersedia", interestedCount: 0, interestedPeople: [], viewings: [], price: 1850000000, x: 200, y: 280, width: 55, height: 95 },
  { id: "B-04", block: "Blok B", num: "04", type: "paris", status: "sedang-dicek", interestedCount: 3, interestedPeople: ["Ibu Novita", "Bpk. Teguh", "Ibu Cynthia"], viewings: [{ date: "23 Mei 2026", time: "09:30 WITA", name: "Bpk. Teguh" }], price: 1870000000, x: 260, y: 280, width: 55, height: 95 },
  { id: "B-05", block: "Blok B", num: "05", type: "paris", status: "terjual", interestedCount: 0, interestedPeople: [], viewings: [], price: 1850000000, buyerName: "H. Mustamin Daeng", x: 320, y: 280, width: 55, height: 95 },
  { id: "B-06", block: "Blok B", num: "06", type: "paris", status: "diminati", interestedCount: 3, interestedPeople: ["Bpk. Hendra", "Ibu Lina", "Bpk. Ari"], viewings: [], price: 1850000000, x: 380, y: 280, width: 55, height: 95 },
  { id: "B-07", block: "Blok B", num: "07", type: "paris", status: "tersedia", interestedCount: 1, interestedPeople: ["Bpk. Dody"], viewings: [], price: 1890000000, x: 440, y: 280, width: 55, height: 95 },
  { id: "B-08", block: "Blok B", num: "08", type: "paris", status: "tersedia", interestedCount: 0, interestedPeople: [], viewings: [], price: 1850000000, x: 500, y: 280, width: 55, height: 95 },
  { id: "B-09", block: "Blok B", num: "09", type: "paris", status: "terjual", interestedCount: 0, interestedPeople: [], viewings: [], price: 1910000000, buyerName: "Keluarga Handoko", x: 560, y: 280, width: 55, height: 95 },
];

export default function NeighborhoodSitePlan() {
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [selectedLotId, setSelectedLotId] = useState<string>("A-03");
  const [filterType, setFilterType] = useState<"all" | "lyon" | "paris">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "tersedia" | "diminati" | "sedang-dicek" | "terjual">("all");
  
  // Interaction form states
  const [interestName, setInterestName] = useState("");
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [surveyName, setSurveyName] = useState("");
  const [surveyDate, setSurveyDate] = useState("");
  const [surveyTime, setSurveyTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const selectedLot = lots.find(lot => lot.id === selectedLotId) || lots[0];
  const activeUnitSpecs = RINOKA_UNITS.find(unit => unit.id === selectedLot.type);

  // Filter lots based on type and status
  const filteredLots = lots.filter(lot => {
    const matchType = filterType === "all" || lot.type === filterType;
    const matchStatus = filterStatus === "all" || lot.status === filterStatus;
    return matchType && matchStatus;
  });

  // Handle adding name to interested list
  const handleRegisterInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestName.trim()) {
      showNotice("Silakan masukkan nama Anda terlebih dahulu.", "error");
      return;
    }

    const updatedLots = lots.map(lot => {
      if (lot.id === selectedLotId) {
        const alreadyListed = lot.interestedPeople.some(
          p => p.toLowerCase() === interestName.trim().toLowerCase()
        );
        if (alreadyListed) return lot;
        
        const newPeople = [...lot.interestedPeople, interestName.trim()];
        return {
          ...lot,
          interestedPeople: newPeople,
          interestedCount: newPeople.length,
          status: lot.status === "tersedia" ? "diminati" as const : lot.status
        };
      }
      return lot;
    });

    setLots(updatedLots);
    setInterestName("");
    setIsAddingInterest(false);
    showNotice(`Terima kasih, nama Anda telah didaftarkan sebagai peminat Blok ${selectedLotId}!`, "success");
  };

  // Handle scheduling virtual/on-site viewing
  const handleScheduleViewing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyName.trim() || !surveyDate || !surveyTime) {
      showNotice("Mohon lengkapi semua baris formulir jadwal survei.", "error");
      return;
    }

    const updatedLots = lots.map(lot => {
      if (lot.id === selectedLotId) {
        const newViewing = {
          name: surveyName.trim(),
          date: formatDate(surveyDate),
          time: surveyTime,
        };
        return {
          ...lot,
          viewings: [...lot.viewings, newViewing],
          status: "sedang-dicek" as const
        };
      }
      return lot;
    });

    setLots(updatedLots);
    setSurveyName("");
    setSurveyDate("");
    setSurveyTime("");
    setIsScheduling(false);
    showNotice(`Sukses! Jadwal survei lokasi Blok ${selectedLotId} telah diatur untuk Anda.`, "success");
  };

  const showNotice = (msg: string, type: "success" | "error") => {
    setNotification({ message: msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("id-ID", options);
  };

  // Status mapping functions for visual styles
  const getStatusColor = (status: Lot["status"]) => {
    switch (status) {
      case "tersedia":
        return "bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700";
      case "diminati":
        return "bg-amber-500 border-amber-600 text-[#2A1F07] hover:bg-amber-600";
      case "sedang-dicek":
        return "bg-sky-500 border-sky-600 text-white hover:bg-sky-600";
      case "terjual":
        return "bg-rose-600 border-rose-700 text-white cursor-not-allowed";
    }
  };

  const getStatusLabel = (status: Lot["status"]) => {
    switch (status) {
      case "tersedia": return "Tersedia / Siap Dipilih";
      case "diminati": return "Sangat Diminati";
      case "sedang-dicek": return "Ada Jadwal Cek / Survei";
      case "terjual": return "Sudah Terjual (Sold Out)";
    }
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(p);
  };

  return (
    <section id="cluster-map" className="py-24 bg-editorial-bg border-t border-editorial-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#8A8471] text-[10px] uppercase tracking-[0.25em] font-bold block mb-3 font-sans">
            Interactive Site Plan Mapper
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-editorial-accent mb-4">
            Pilih Kavling Impian Anda Secara Interaktif
          </h2>
          <p className="text-editorial-secondary text-xs sm:text-sm leading-relaxed font-serif italic">
            Klik pada kavling site plan kami di bawah untuk mengecek status ketersediaan secara real-time. Anda dapat melihat unit mana yang masih <span className="text-emerald-700 font-bold">Tersedia</span>, sedang <span className="text-sky-600 font-bold">Dicek survei</span>, <span className="text-amber-600 font-bold">Banyak Diminati</span>, atau telah <span className="text-rose-700 font-semibold">Dibeli</span>.
          </p>
        </div>

        {/* Dynamic Alert Banner */}
        {notification && (
          <div className={`p-4 mb-8 rounded-none border text-xs leading-relaxed font-sans flex items-center justify-between animate-fadeIn ${
            notification.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}>
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              {notification.message}
            </span>
            <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Master layout panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: MAP SVG CANVAS PANEL (col-span-8) */}
          <div className="lg:col-span-8 bg-white border border-editorial-border p-6 sm:p-8 space-y-6">
            
            {/* Filter Hub Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-6 border-b border-editorial-border">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] uppercase font-bold text-editorial-secondary font-sans tracking-wider flex items-center gap-1 mt-1">
                  <Filter className="w-3.5 h-3.5" /> Filter Unit:
                </span>
                
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold transition-all border ${
                    filterType === "all" 
                      ? "bg-[#1B2E35] text-[#FAFAF5] border-[#1B2E35]" 
                      : "bg-[#FAFAF5] text-editorial-secondary border-[#E0DBCF] hover:bg-[#E0DBCF]/30"
                  }`}
                >
                  Semua Tipe
                </button>
                <button
                  onClick={() => setFilterType("lyon")}
                  className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold transition-all border ${
                    filterType === "lyon" 
                      ? "bg-[#1B4541] text-[#FAFAF5] border-[#1B4541]" 
                      : "bg-[#FAFAF5] text-[#1B4541] border-[#E0DBCF] hover:bg-[#E0DBCF]/30"
                  }`}
                >
                  Tipe Lyon (Compact 7x14)
                </button>
                <button
                  onClick={() => setFilterType("paris")}
                  className={`px-3 py-1 text-[9px] uppercase tracking-wider font-bold transition-all border ${
                    filterType === "paris" 
                      ? "bg-[#8A7B5F] text-[#FAFAF5] border-[#8A7B5F]" 
                      : "bg-[#FAFAF5] text-[#8A7B5F] border-[#E0DBCF] hover:bg-[#E0DBCF]/30"
                  }`}
                >
                  Tipe Paris (Premium 9x14)
                </button>
              </div>

              {/* Status color definitions legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 sm:mt-0 text-[10px] font-sans font-medium text-editorial-secondary">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-3 bg-emerald-600 block rounded-none border border-emerald-700"></span>
                  <span>Tersedia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-3 bg-amber-500 block rounded-none border border-amber-600 animate-pulse"></span>
                  <span>Diminati</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-3 bg-sky-50 block rounded-none border border-sky-500"></span>
                  <span>Bisa Survei</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-3 bg-rose-600 block rounded-none border border-rose-700"></span>
                  <span>Terjual</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE VECTOR HOUSING MAP PLOT */}
            <div className="relative border border-editorial-border bg-[#FAFAF5] overflow-x-auto p-6 sm:p-8 flex justify-center shadow-xs">
              
              {/* Outer decorative borders and street plans */}
              <div className="min-w-[720px] h-[460px] relative">
                
                {/* Visual labels indicating streets & boundaries */}
                <div className="absolute top-6 left-8 py-1.5 px-4 bg-[#E0DBCF]/60 border border-editorial-border/65 text-[8.5px] tracking-widest text-[#8A8471] font-bold uppercase rounded-none">
                  ★ RINOKA RESORT CLUSTER - SITE MAP
                </div>

                <div className="absolute top-[244px] inset-x-8 h-8 bg-[#EFEEEA]/90 border-y border-editorial-border/80 text-center flex items-center justify-center">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#8A8471] font-bold flex items-center gap-2">
                    🛣️ Jalan Utama Boulevard Rinoka (ROW 12 Meter)
                  </span>
                </div>

                <div className="absolute top-6 right-8 text-right">
                  <span className="text-[8px] uppercase tracking-widest text-emerald-800 font-bold block">
                    🌳 Rindang Garden Area
                  </span>
                  <span className="text-[7.5px] italic text-[#8A8471] font-serif block">
                    Sumitomo Green Zen Yard
                  </span>
                </div>

                <div className="absolute bottom-6 left-8 flex gap-4 text-[8px] font-sans">
                  <div className="bg-[#1B4541]/10 px-2.5 py-1.5 border border-[#1B4541]/20">
                    <span className="font-bold text-[#1B4541] block">⛲ CLUB HOUSE & POOL</span>
                    <span className="text-[#8A8471]">Bersebelahan Blok A</span>
                  </div>
                  <div className="bg-[#1B4541]/10 px-2.5 py-1.5 border border-[#1B4541]/20">
                    <span className="font-bold text-[#1B4541] block">🏫 SEKOLAH AL AZHAR</span>
                    <span className="text-[#8A8471]">Berjarak 100m ke Gerbang</span>
                  </div>
                </div>

                {/* SVG Site Plan render wrapper */}
                <svg viewBox="0 0 750 440" className="w-full h-full select-none">
                  {/* Decorative backgrounds */}
                  {/* Forest top area */}
                  <path d="M 0,0 L 750,0 L 750,80 L 0,60 Z" fill="#E2EBE5" opacity="0.6" />
                  <path d="M 120,40 C 230,30 450,50 680,35" fill="none" stroke="#A7C2B0" strokeWidth="2" strokeDasharray="4 4" />
                  
                  <g transform="translate(30, 12)">
                    {/* Community Park/Clubhouse area */}
                    <rect x="15" y="110" width="80" height="110" fill="#E6EEEC" stroke="#CDD9D6" strokeWidth="1" />
                    <text x="55" y="150" fill="#4C6E65" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ZEN GARDEN</text>
                    <circle cx="55" cy="180" r="14" fill="#CDDFDC" opacity="0.8" />
                    <text x="55" y="183" fill="#3B5951" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">POOL</text>

                  {/* Lot groupings */}
                  {lots.map((lot) => {
                    // Coordinates determination algorithm for dynamic layouting if x,y values omitted
                    let lotX = lot.x;
                    let lotY = lot.y;
                    let lotWidth = lot.width;
                    let lotHeight = lot.height;

                    // Manual overrides for layouting beautiful aligned grids
                    if (lot.block === "Blok A") {
                      const idx = parseInt(lot.num) - 1;
                      lotX = 130 + idx * 58;
                      lotY = 110;
                      lotWidth = 52;
                      lotHeight = 100;
                    } else if (lot.block === "Blok B") {
                      const idx = parseInt(lot.num) - 1;
                      lotX = 130 + idx * 58;
                      lotY = 270;
                      lotWidth = 52;
                      lotHeight = 115;
                    }

                    // Check if filters match
                    const isFilteredOut = 
                      (filterType !== "all" && lot.type !== filterType) ||
                      (filterStatus !== "all" && lot.status !== filterStatus);

                    const isActive = selectedLotId === lot.id;

                    // Color assignment based on lot characteristics
                    let fillColor = "#10b981"; // tersedia green
                    let strokeColor = "#047857";
                    let glowClass = "";

                    if (lot.status === "terjual") {
                      fillColor = "#f43f5e"; // sold rose
                      strokeColor = "#be123c";
                    } else if (lot.status === "diminati") {
                      fillColor = "#f59e0b"; // golden warning
                      strokeColor = "#b45309";
                      glowClass = "animate-pulse";
                    } else if (lot.status === "sedang-dicek") {
                      fillColor = "#bae6fd"; // soft blue check
                      strokeColor = "#0284c7";
                    }

                    if (isFilteredOut) {
                      fillColor = "#EFEDE8";
                      strokeColor = "#DCD9D2";
                    }

                    return (
                      <g 
                        key={lot.id} 
                        className={`cursor-pointer transition-all duration-300 ${isFilteredOut ? "opacity-25" : "hover:scale-[1.01]"}`}
                        onClick={() => {
                          if (!isFilteredOut) setSelectedLotId(lot.id);
                        }}
                      >
                        {/* Lot Rectangle Area representing house space */}
                        <rect
                          x={lotX}
                          y={lotY}
                          width={lotWidth}
                          height={lotHeight}
                          fill={fillColor}
                          stroke={isActive ? "#D5B277" : strokeColor}
                          strokeWidth={isActive ? "3.5" : "1.5"}
                          rx="2"
                          className={`${glowClass} transition-shadow`}
                        />

                        {/* Top / Inner indicators of hot properties */}
                        {lot.status === "diminati" && !isFilteredOut && (
                          <g transform={`translate(${lotX + lotWidth - 12}, ${lotY + 6})`}>
                            <circle cx="6" cy="6" r="6" fill="#D97706" />
                            <text x="6" y="9" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                              ★
                            </text>
                          </g>
                        )}

                        {/* Text labels representing block names */}
                        <text
                          x={lotX + lotWidth / 2}
                          y={lotY + 40}
                          fill={lot.status === "sedang-dicek" ? "#0369a1" : "white"}
                          fontSize="9"
                          fontWeight="extrabold"
                          textAnchor="middle"
                          fontFamily="monospace"
                          className="drop-shadow-sm font-bold"
                        >
                          {lot.id}
                        </text>

                        {/* Small metadata text describing type internally */}
                        <text
                          x={lotX + lotWidth / 2}
                          y={lotY + 62}
                          fill={lot.status === "sedang-dicek" ? "#0e7490" : "white"}
                          fontSize="6.5"
                          letterSpacing="0.05em"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          opacity="0.8"
                        >
                          {lot.type === "lyon" ? "LYON" : "PARIS"}
                        </text>

                        {/* Buyer/peminat count quick badge indicator */}
                        {lot.interestedCount > 0 && lot.status !== "terjual" && !isFilteredOut && (
                          <g transform={`translate(${lotX + 4}, ${lotY + lotHeight - 16})`}>
                            <rect width="18" height="10" rx="1" fill="#1e293b" opacity="0.8" />
                            <text x="9" y="8" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                              🔥{lot.interestedCount}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                  </g>
                </svg>
              </div>
            </div>

            {/* Quick Map Guide Details Panel */}
            <div className="p-4 bg-[#F7F5F0] border border-editorial-border grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif italic text-editorial-secondary">
              <div className="space-y-1">
                <span className="font-bold text-editorial-accent uppercase tracking-wider text-[10px] font-sans flex items-center gap-1.5 not-italic">
                  <Sparkles className="w-4 h-4 text-editorial-gold" /> Rekomendasi Peminat Ramai
                </span>
                <p>
                  Unit dengan penanda bintang emas (seperti <strong className="text-editorial-accent not-italic">Blok A-03</strong> dan <strong className="text-editorial-accent not-italic">Blok B-02</strong>) adalah favorit survei pembeli yang baru saja mendaftarkan email serta visit log mereka pekan ini.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-editorial-accent uppercase tracking-wider text-[10px] font-sans flex items-center gap-1.5 not-italic">
                  <User className="w-4 h-4 text-editorial-secondary" /> Pembelian & Validasi Unit
                </span>
                <p>
                  Unit berkode <strong className="text-rose-700 not-italic">Merah (Terjual)</strong> diisi atas nama pembeli definitif berdasar PPJB dan nomor berkas pendaftaran di Summarecon Mutiara.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: PROPERTY PANEL DETAIL & INTERACTIVE ACTIONS (col-span-4) */}
          <div className="lg:col-span-4 bg-[#FDFDFB] border border-editorial-border p-6 shadow-xs sticky top-28 space-y-6">
            
            {/* Lot header naming inside selection box */}
            <div className="pb-4 border-b border-editorial-border flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8A8471] font-bold block mb-1">
                  KAVLING CLUSTER RINOKA
                </span>
                <h3 className="text-2xl font-serif text-editorial-accent flex items-center gap-2">
                  Unit {selectedLot.id} 
                  <span className="text-sm font-serif italic font-light text-editorial-secondary">
                    ({selectedLot.block})
                  </span>
                </h3>
              </div>
              
              {/* Type Badge */}
              <div className={`px-2.5 py-1 text-[8.5px] font-bold tracking-widest uppercase text-[#FAFAF5] ${
                selectedLot.type === "lyon" ? "bg-[#1B4541]" : "bg-[#8A7B5F]"
              }`}>
                Tipe {selectedLot.type === "lyon" ? "Lyon" : "Paris"}
              </div>
            </div>

            {/* Dynamic Status Display Card */}
            <div className={`p-4 border text-xs font-sans ${
              selectedLot.status === "tersedia" ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" :
              selectedLot.status === "diminati" ? "bg-amber-50/70 border-amber-200 text-amber-900" :
              selectedLot.status === "sedang-dicek" ? "bg-sky-50/90 border-sky-100 text-[#0369a1]" :
              "bg-rose-50 border-rose-100 text-rose-900"
            }`}>
              <div className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
                <span className={`w-2 h-2 rounded-none inline-block ${
                  selectedLot.status === "tersedia" ? "bg-emerald-600" :
                  selectedLot.status === "diminati" ? "bg-amber-500 animate-pulse" :
                  selectedLot.status === "sedang-dicek" ? "bg-sky-500" : "bg-rose-600"
                }`}></span>
                {getStatusLabel(selectedLot.status)}
              </div>
              <p className="font-serif italic text-xs mt-2 leading-relaxed">
                {selectedLot.status === "tersedia" && "Unit ini siap diproses untuk simulasi pemesanan KPR maupun kontan bertahap."}
                {selectedLot.status === "diminati" && `Unit ini sedang ramai diamati! Ada ${selectedLot.interestedCount} calon pembeli yang mendaftarkan ketertarikan mereka.`}
                {selectedLot.status === "sedang-dicek" && `Terdapat jadwal kunjungan lapangan yang diatur untuk mengecek kavling ini.`}
                {selectedLot.status === "terjual" && `Unit ini telah sah di-booking atas nama pembeli: ${selectedLot.buyerName || "Konsumen Summarecon"}.`}
              </p>
            </div>

            {/* Price section block */}
            <div className="space-y-2 py-2">
              <span className="text-[10px] uppercase text-[#8A8471] tracking-wider block font-sans">
                Estimasi Harga Kavling Unit:
              </span>
              <div className="text-xl sm:text-2xl font-serif text-editorial-accent font-bold tracking-tight">
                {formatPrice(selectedLot.price)}
                <span className="text-[10px] italic text-[#8A8471] font-normal block mt-1">
                  *Harga dasar belum termasuk PPN, BPHTB, & diskon AC promo.
                </span>
              </div>
            </div>

            {/* Lot specification lists */}
            {activeUnitSpecs && (
              <div className="bg-[#FAFAF5] p-4 border border-editorial-border space-y-3 font-sans text-xs">
                <span className="text-[9px] uppercase tracking-wider text-[#8A8471] font-bold block pb-1 border-b border-editorial-border">
                  Spesifikasi Standar Tipe {activeUnitSpecs.name.replace("Tipe ", "")}:
                </span>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-editorial-accent">
                  <div className="text-[#8A8471]">Dimensi Tanah:</div>
                  <div className="font-bold text-right font-mono">{activeUnitSpecs.dimension}</div>

                  <div className="text-[#8A8471]">Luas Bangunan (LB):</div>
                  <div className="font-bold text-right font-mono">{activeUnitSpecs.lb} m²</div>

                  <div className="text-[#8A8471]">Luas Tanah (LT):</div>
                  <div className="font-bold text-right font-mono">{activeUnitSpecs.lt} m²</div>

                  <div className="text-[#8A8471]">Kamar Tidur (KT):</div>
                  <div className="font-bold text-right font-mono">{activeUnitSpecs.bedrooms} Kamar</div>

                  <div className="text-[#8A8471]">Kamar Mandi (KM):</div>
                  <div className="font-bold text-right font-mono">{activeUnitSpecs.bathrooms} Toilet</div>

                  <div className="text-[#8A8471]">Kapasitas Carport:</div>
                  <div className="font-bold text-right font-mono">{activeUnitSpecs.carports} Mobil</div>
                </div>
              </div>
            )}

            {/* List of interested people (Daftar Peminat) */}
            {selectedLot.status !== "terjual" && (
              <div className="space-y-2.5">
                <h4 className="text-[10px] uppercase font-bold text-editorial-accent tracking-wider font-sans flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#8A8471]" /> Peminat Terdaftar saat ini ({selectedLot.interestedCount})
                </h4>
                {selectedLot.interestedCount > 0 ? (
                  <div className="flex flex-wrap gap-1.5 p-3 bg-white border border-editorial-border">
                    {selectedLot.interestedPeople.map((person, i) => (
                      <span 
                        key={i} 
                        className="bg-amber-100/60 text-[#8A6C2F] border border-amber-200 px-2 py-0.5 text-[9px] rounded-none font-sans font-medium hover:bg-amber-200/50 transition-colors flex items-center gap-1"
                      >
                        <User className="w-2.5 h-2.5 text-amber-700" />
                        {person}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] font-serif italic text-[#8A8471] px-1">
                    Belum ada konsumen mendaftarkan ketertarikan pekan ini. Jadilah yang pertama!
                  </p>
                )}
              </div>
            )}

            {/* Upcoming Viewings Schedules */}
            {selectedLot.status === "sedang-dicek" && selectedLot.viewings.length > 0 && (
              <div className="space-y-2 bg-[#F0F7FB] border border-[#BFDCEF] p-4 text-xs font-sans">
                <h4 className="text-[10px] uppercase font-bold text-[#0e7490] tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Agenda Survei Terdekat
                </h4>
                <div className="space-y-2 mt-2 font-sans">
                  {selectedLot.viewings.map((view, i) => (
                    <div key={i} className="flex justify-between items-center text-[#22576b] border-b border-[#BFDCEF]/40 pb-1.5 last:border-0 last:pb-0">
                      <div>
                        <span className="font-bold block">{view.name}</span>
                        <span className="text-[9.5px] italic text-[#487e94] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5" /> {view.time}
                        </span>
                      </div>
                      <span className="bg-[#BFDCEF] text-[#0e7490] px-2 py-1 text-[9px] font-bold">
                        {view.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COLLAPSIBLE INTERACTION FORMS (If not sold out) */}
            {selectedLot.status !== "terjual" ? (
              <div className="space-y-3 pt-2">
                
                {/* 1. Register Interest Action Trigger */}
                {!isAddingInterest && !isScheduling && (
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => setIsAddingInterest(true)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-[#2A1F07] py-3.5 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 font-sans hover:shadow-xs border border-amber-600"
                    >
                      <TrendingUp className="w-4 h-4 shrink-0" /> Nyatakan Saya Tertarik Unit Ini
                    </button>
                    
                    <button
                      onClick={() => setIsScheduling(true)}
                      className="w-full bg-[#FAFAF5] hover:bg-[#E0DBCF]/30 text-editorial-accent border border-editorial-border py-3.5 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 font-sans"
                    >
                      <Calendar className="w-4 h-4 shrink-0" /> Atur Jadwal Survei Show Unit
                    </button>
                  </div>
                )}

                {/* Form: Register Interest */}
                {isAddingInterest && (
                  <form onSubmit={handleRegisterInterest} className="border border-amber-200 bg-amber-50/35 p-4 space-y-3.5 animate-fadeIn">
                    <div className="flex justify-between items-center pb-1.5 border-b border-amber-200">
                      <span className="text-[9px] uppercase font-bold text-amber-900 tracking-wider font-sans">
                        Daftar Peminat Kavling
                      </span>
                      <button type="button" onClick={() => setIsAddingInterest(false)} className="text-amber-800 hover:opacity-70">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9.5px] uppercase font-bold text-editorial-secondary block font-sans">Nama Lengkap Anda</label>
                      <input 
                        type="text"
                        value={interestName}
                        onChange={(e) => setInterestName(e.target.value)}
                        placeholder="Contoh: Bpk. Moh. Alfinoor"
                        required
                        className="w-full p-2.5 text-xs bg-white border border-[#E0DBCF] focus:outline-none focus:border-editorial-accent rounded-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-[#2A1F07] py-2.5 rounded-none text-[9.5px] uppercase tracking-widest font-bold font-sans transition-colors border border-amber-600"
                    >
                      Simpan Ketertarikan Saya
                    </button>
                  </form>
                )}

                {/* Form: Schedule Viewing */}
                {isScheduling && (
                  <form onSubmit={handleScheduleViewing} className="border border-[#BFDCEF] bg-[#F0F7FB]/40 p-4 space-y-3.5 animate-fadeIn">
                    <div className="flex justify-between items-center pb-1.5 border-b border-[#BFDCEF]">
                      <span className="text-[9px] uppercase font-bold text-[#0e7490] tracking-wider font-sans">
                        Atur Survei Lokasi
                      </span>
                      <button type="button" onClick={() => setIsScheduling(false)} className="text-cyan-800 hover:opacity-70">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] uppercase font-bold text-editorial-secondary block font-sans">Nama Lengkap Anda</label>
                      <input 
                        type="text"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                        placeholder="Contoh: Ibu Rina Amalia"
                        required
                        className="w-full p-2.5 text-xs bg-white border border-[#E0DBCF] focus:outline-none focus:border-editorial-accent rounded-none font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9.5px] uppercase font-bold text-editorial-secondary block font-sans">Tanggal Survei</label>
                        <input 
                          type="date"
                          value={surveyDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setSurveyDate(e.target.value)}
                          required
                          className="w-full p-2 text-xs bg-white border border-[#E0DBCF] focus:outline-none focus:border-editorial-accent rounded-none font-sans"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9.5px] uppercase font-bold text-editorial-secondary block font-sans">Waktu Survei</label>
                        <select 
                          value={surveyTime}
                          onChange={(e) => setSurveyTime(e.target.value)}
                          required
                          className="w-full p-2 text-xs bg-white border border-[#E0DBCF] focus:outline-none focus:border-editorial-accent rounded-none font-sans"
                        >
                          <option value="">Pilih Jam</option>
                          <option value="09:00 WITA">09:00 WITA (Pagi)</option>
                          <option value="11:00 WITA">11:00 WITA (Pagi)</option>
                          <option value="13:30 WITA">13:30 WITA (Siang)</option>
                          <option value="15:30 WITA">15:30 WITA (Sore)</option>
                          <option value="16:30 WITA">16:30 WITA (Sore)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-none text-[9.5px] uppercase tracking-widest font-bold font-sans transition-colors border border-sky-600"
                    >
                      Konfirmasi Atur Survei
                    </button>
                  </form>
                )}

                {/* Direct Whatsapp inquiries shortcut */}
                <a
                  href={`https://wa.me/628114178998?text=Halo%20Admin%20RINOKA,%20saya%20tertarik%20dengan%20kavling%20Blok%20${selectedLot.id}%20(Tipe%20${selectedLot.type === "lyon" ? "Lyon" : "Paris"}).%20Berapa%20pricelist%20terbaru%20untuk%20unit%20ini?`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#1B4541] hover:bg-[#153532] text-white py-3.5 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 font-sans"
                >
                  <Phone className="w-3.5 h-3.5 text-editorial-gold shrink-0" /> Hubungi Sales Mengenai Unit Ini
                </a>

              </div>
            ) : (
              /* Already sold case */
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 py-3.5 rounded-none text-[10px] uppercase tracking-widest font-bold cursor-not-allowed border border-gray-200 flex items-center justify-center gap-2"
                >
                  Unit Sold Out
                </button>
                <p className="text-[10px] font-sans text-center text-gray-500">
                  Konsultasikan dengan sales perwakilan kami untuk pemesanan list tunggu (waiting list) atau opsi pembukaan kavling baru.
                </p>
                <a
                  href="https://wa.me/628114178998?text=Halo%20Admin%20RINOKA,%20saya%20ingin%20bertanya%20mengenai%20waiting%20list%20atau%20pembukaan%20kavling%20tipe%20terbaru%20di%20klaster%20Rinoka."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#FAFAF5] hover:bg-[#E0DBCF]/30 text-editorial-accent border border-editorial-border py-3.5 px-4 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 font-sans text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-editorial-secondary" /> Tanya Waiting List via WhatsApp
                </a>
              </div>
            )}

            {/* Quick specifications download disclaimer */}
            <div className="pt-4 border-t border-editorial-border flex items-center gap-2 text-[10.5px] italic text-[#8A8471] font-serif">
              <Info className="w-3.5 h-3.5 text-editorial-secondary shrink-0" />
              <span>Semua sirkulasi kavling diperbarui berkala secara otomatis.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
