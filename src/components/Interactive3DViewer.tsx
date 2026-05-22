import { useState } from "react";
import { RINOKA_UNITS, UnitDetail, RoomDetail } from "../data";
import { Layout, Home, Compass, Maximize2, Layers, CheckCircle2 } from "lucide-react";

export default function Interactive3DViewer() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>("lyon");
  const [activeFloor, setActiveFloor] = useState<number>(1);
  const [activeRoomId, setActiveRoomId] = useState<string>("");

  const selectedUnit = RINOKA_UNITS.find((u) => u.id === selectedUnitId) || RINOKA_UNITS[0];
  
  // Filter rooms of the selected floor
  const visibleRooms = selectedUnit.rooms.filter((r) => r.floor === activeFloor);
  
  // Current active room or default to first in visible list
  const currentRoom = selectedUnit.rooms.find((r) => r.id === activeRoomId) || visibleRooms[0] || selectedUnit.rooms[0];

  // Map units to direct visual references generated for this project
  const getUnitImage = (unitId: string) => {
    if (unitId === "lyon") {
      return "/src/assets/images/rinoka_hero_1779464238876.png";
    }
    return "/src/assets/images/rinoka_interior_1779464256215.png";
  };

  return (
    <section id="3d-viewer" className="py-24 bg-editorial-bg border-y border-editorial-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-editorial-secondary text-[10px] uppercase tracking-[0.25em] font-bold block mb-3">
            Interactive Unit Tour
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-editorial-accent tracking-tight mb-4">
            Eksplorasi Unit & Tata Ruang 3D
          </h2>
          <p className="text-editorial-secondary text-sm leading-relaxed max-w-2xl mx-auto italic font-light">
            Rasakan simulasi penataan spasial premium kami. Pilih tipe unit, beralih antar lantai, dan ketahui karakteristik material terbaik hasil kolaborasi Summarecon dan Sumitomo Forestry.
          </p>
        </div>

        {/* Unit Selector & Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Unit selection & Specs Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-7 rounded-none border border-editorial-border">
              <h3 className="text-sm font-bold uppercase tracking-widest text-editorial-accent mb-5 flex items-center gap-2">
                <Home className="w-4 h-4 text-editorial-secondary" />
                Pilih Tipe Unit
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {RINOKA_UNITS.map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => {
                      setSelectedUnitId(unit.id);
                      setActiveFloor(1);
                      setActiveRoomId("");
                    }}
                    className={`p-3 rounded-none border text-left transition-all duration-300 ${
                      selectedUnitId === unit.id
                        ? "border-editorial-accent bg-[#E4DFD5]/20"
                        : "border-editorial-border hover:border-editorial-accent hover:bg-editorial-bg"
                    }`}
                  >
                    <div className="font-bold text-xs uppercase tracking-wider text-editorial-accent">{unit.name}</div>
                    <div className="text-[10px] text-editorial-secondary mt-1 font-mono">{unit.dimension}</div>
                  </button>
                ))}
              </div>

              {/* Specs Summary */}
              <div className="space-y-4 pt-5 border-t border-editorial-border">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-editorial-secondary uppercase tracking-wider font-bold text-[9px] flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-editorial-secondary" /> Luas Bangunan / Tanah
                  </span>
                  <span className="font-serif italic text-sm text-editorial-accent">
                    {selectedUnit.lb} m² / {selectedUnit.lt} m²
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-editorial-secondary uppercase tracking-wider font-bold text-[9px] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-editorial-secondary" /> Dimensi Ideal
                  </span>
                  <span className="font-serif italic text-sm text-editorial-accent">{selectedUnit.dimension}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-editorial-secondary uppercase tracking-wider font-bold text-[9px] flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5 text-editorial-secondary" /> Spesifikasi Utama
                  </span>
                  <span className="font-serif italic text-sm text-editorial-accent">
                    {selectedUnit.bedrooms} KT | {selectedUnit.bathrooms} KM | {selectedUnit.carports} Carport
                  </span>
                </div>

                <div className="bg-editorial-accent p-5 rounded-none border border-editorial-border text-white mt-4">
                  <p className="text-[9px] font-bold text-editorial-gold uppercase tracking-[0.2em] mb-1">
                    ESTIMASI HARGA PERDANA
                  </p>
                  <p className="text-2xl font-serif italic text-white">
                    Rp {selectedUnit.price.toLocaleString("id-ID")}
                    <span className="text-[11px] font-sans not-italic text-editorial-secondary"> (*Mulai)</span>
                  </p>
                  <p className="text-[9px] text-[#E4DFD5]/60 mt-2 leading-relaxed">
                    *Harga sewaktu-waktu dapat berubah tergantung ketersediaan unit dan promo perdana.
                  </p>
                </div>
              </div>
            </div>

            {/* Advantages and Sumitomo wooden build info */}
            <div className="bg-white p-6 rounded-none border border-editorial-border">
              <h4 className="font-bold text-editorial-accent text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-editorial-gold block"></span> Keunggulan Desain
              </h4>
              <ul className="space-y-3">
                {selectedUnit.advantages.map((advantage, i) => (
                  <li key={i} className="flex gap-2.5 text-xs text-[#2A3331] items-start">
                    <CheckCircle2 className="w-4 h-4 text-editorial-secondary shrink-0 mt-0.5" />
                    <span className="font-serif italic text-[13px] text-editorial-secondary">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MIDDLE: Interactive 3D Canvas / Perspective Schematic map */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full bg-white p-6 md:p-8 rounded-none border border-editorial-border text-center flex flex-col items-center relative min-h-[460px] justify-between">
              
              {/* Floor Switch Tabs */}
              <div className="flex bg-editorial-bg p-1 rounded-none border border-editorial-border w-fit mb-4">
                <button
                  onClick={() => {
                    setActiveFloor(1);
                    setActiveRoomId("");
                  }}
                  className={`px-4 py-2 rounded-none text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeFloor === 1
                      ? "bg-editorial-accent text-white"
                      : "text-editorial-secondary hover:text-editorial-accent"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Lantai 1
                </button>
                <button
                  onClick={() => {
                    setActiveFloor(2);
                    setActiveRoomId("");
                  }}
                  className={`px-4 py-2 rounded-none text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeFloor === 2
                      ? "bg-editorial-accent text-white"
                      : "text-editorial-secondary hover:text-editorial-accent"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 animate-pulse" /> Lantai 2 (High Roof)
                </button>
              </div>

              {/* 3D Perspective Graphic representing the isometric rooms plan */}
              <div className="relative w-full aspect-square max-w-[360px] flex items-center justify-center py-6">
                
                {/* 3D Base grid and gardens */}
                <div className="absolute inset-0 bg-radial from-slate-100 to-transparent scale-110 pointer-events-none -z-10 rounded-full"></div>
                
                {/* Visual SVG Perspective Tour block */}
                <svg
                  viewBox="0 0 640 480"
                  className="w-full h-full drop-shadow-lg transition-all duration-500"
                  style={{ transform: "rotateX(20deg) rotateY(0deg)" }}
                >
                  {/* Surrounding Plot Yard (Garden Outlines) */}
                  <polygon
                    points="60,240 320,110 580,240 320,370"
                    fill="#FAFAF5"
                    stroke="#837E70"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.9"
                  />
                  <text x="320" y="390" fill="#837E70" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-sans tracking-[0.2em]">
                    YARD BOUNDARY ({selectedUnit.dimension})
                  </text>
                  
                  {/* Grid Lines for 3D guide */}
                  <line x1="60" y1="240" x2="320" y2="370" stroke="#E4DFD5" strokeWidth="1" opacity="0.5" />
                  <line x1="580" y1="240" x2="320" y2="370" stroke="#E4DFD5" strokeWidth="1" opacity="0.5" />

                  {/* Dynamic Room Outlines mapping */}
                  {visibleRooms.map((room) => {
                    const isSelected = room.id === currentRoom.id;
                    return (
                      <g
                        key={room.id}
                        className="cursor-pointer group"
                        onClick={() => setActiveRoomId(room.id)}
                      >
                        {/* Hover & Active room glowing polygon block */}
                        <polygon
                          points={room.isometricCoords}
                          fill={isSelected ? "#1B4541" : "#ffffff"}
                          fillOpacity={isSelected ? "0.9" : "0.5"}
                          stroke={isSelected ? "#D5B277" : "#837E70"}
                          strokeWidth={isSelected ? "2.5" : "1"}
                          className="transition-all duration-300 group-hover:fill-[#E0ECE6] group-hover:fill-opacity-80 group-hover:stroke-[#1B4541]"
                        />
                        
                        {/* Interactive hotspot labels */}
                        <circle
                          cx={getRoomCentroid(room.isometricCoords).x}
                          cy={getRoomCentroid(room.isometricCoords).y}
                          r="12"
                          fill={isSelected ? "#D5B277" : "#1B4541"}
                          className="transition-transform duration-300 group-hover:scale-125"
                        />
                        <text
                          x={getRoomCentroid(room.isometricCoords).x}
                          y={getRoomCentroid(room.isometricCoords).y + 3}
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="pointer-events-none font-sans"
                        >
                          {visibleRooms.indexOf(room) + 1}
                        </text>
                      </g>
                    );
                  })}

                  {/* Elevation arrows style lines */}
                  <g transform="translate(480, 80)" className="opacity-90">
                    <line x1="0" y1="50" x2="0" y2="0" stroke="#837E70" strokeWidth="1" strokeDasharray="2 2" />
                    <polygon points="0,0 -4,8 4,8" fill="#837E70" />
                    <text x="12" y="24" fill="#1B4541" fontSize="10" className="font-bold tracking-wider font-sans">
                      HIL: {activeFloor === 1 ? "+0.00m (Lt.1)" : "+3.50m (Lt.2)"}
                    </text>
                  </g>
                </svg>
              </div>

              {/* Dynamic Legend Instructions */}
              <div className="w-full text-center">
                <span className="text-[10px] text-editorial-secondary block mb-3 font-serif italic">
                  💡 Klik area ruangan di peta isometrik untuk melihat spesifikasi premium detail
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {visibleRooms.map((room, i) => (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoomId(room.id)}
                      className={`px-3 py-1.5 rounded-none text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                        room.id === currentRoom.id
                          ? "bg-editorial-accent text-white"
                          : "bg-editorial-bg text-[#2A3331] border border-editorial-border hover:bg-editorial-border/30"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-none bg-black/5 inline-flex items-center justify-center text-[9px]">
                        {i + 1}
                      </span>
                      {room.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Selected Room Specifications Card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-none border border-editorial-border overflow-hidden h-full flex flex-col">
              
              {/* Context Image preview of selected layout (interior/exterior) */}
              <div className="h-40 bg-gray-200 relative overflow-hidden shrink-0 border-b border-editorial-border">
                <img
                  src={getUnitImage(selectedUnitId)}
                  alt="Unit Reference View"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#D5B277] block mb-0.5">
                    Lantai {currentRoom.floor}
                  </span>
                  <p className="text-base font-serif italic text-white leading-tight">
                    {currentRoom.name}
                  </p>
                </div>
              </div>

              {/* Room details specs */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pt-1">
                    <span className="text-[9px] font-bold tracking-widest text-[#837E70] uppercase">
                      Dimensi Ruangan
                    </span>
                    <span className="px-2.5 py-1 bg-[#1B4541] text-white text-[10px] font-bold tracking-wider rounded-none uppercase">
                      {currentRoom.size}
                    </span>
                  </div>

                  <p className="text-xs text-editorial-secondary leading-relaxed font-serif italic mb-5">
                    {currentRoom.description}
                  </p>

                  {/* Highlights Premium parameters list */}
                  <div className="border-t border-editorial-border pt-4">
                    <span className="text-[9px] font-bold tracking-widest text-editorial-secondary uppercase block mb-3">
                      Karakteristik Material & Fitur
                    </span>
                    <ul className="space-y-2">
                      {currentRoom.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-[#2A3331]">
                          <span className="w-1.5 h-1.5 bg-editorial-gold shrink-0"></span>
                          <span className="font-serif italic text-[12px]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Info Note directly stating JV aspects */}
                <div className="border-t border-editorial-border pt-4 mt-6">
                  <p className="text-[10px] text-[#837E70] leading-relaxed italic">
                    Seluruh struktur ruangan didukung material ramah lingkungan berteknologi anti gempa hasil supervisi teknis Sumitomo Forestry Jepang.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// Simple Helper to calculate visual centroid coordinates for SVG placement
function getRoomCentroid(coordsStr: string) {
  const points = coordsStr
    .trim()
    .toUpperCase()
    .replace(/[MLZ]/g, " ")
    .trim()
    .split(/\s+/)
    .map((p) => p.split(",").map(Number));

  const validPoints = points.filter((p) => p.length === 2 && !isNaN(p[0]) && !isNaN(p[1]));

  if (validPoints.length === 0) return { x: 320, y: 240 };

  const sum = validPoints.reduce(
    (acc, p) => ({ x: acc.x + p[0], y: acc.y + p[1] }),
    { x: 0, y: 0 }
  );

  return {
    x: Math.round(sum.x / validPoints.length),
    y: Math.round(sum.y / validPoints.length)
  };
}
