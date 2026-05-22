import { useState } from "react";
import { 
  Building2, 
  Sparkles, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  Leaf, 
  ShieldCheck, 
  Tv, 
  Instagram, 
  ChevronDown, 
  ArrowRight, 
  Phone, 
  Map, 
  FileText,
  Star,
  Users,
  Menu,
  X,
  Smartphone,
  Maximize
} from "lucide-react";
import Interactive3DViewer from "./components/Interactive3DViewer";
import NeighborhoodSitePlan from "./components/NeighborhoodSitePlan";
import BookingSimulator from "./components/BookingSimulator";
import AIAssistant from "./components/AIAssistant";
import { RinokaLogoIcon, RinokaLogoBrand } from "./components/RinokaLogo";
import { AMENITIES_DATA, RINOKA_UNITS } from "./data";

// Import local image assets for secure Vite compilation and deployment routing
import rinokaHeroImg from "./assets/images/rinoka_hero_new_1779473426890.png";
import rinokaInteriorImg from "./assets/images/rinoka_interior_1779464256215.png";
import rinokaAmenitiesImg from "./assets/images/rinoka_amenities_1779464276424.png";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const FAQS = [
    {
      q: "Siapa developer di balik klaster RINOKA?",
      a: "Klaster RINOKA dikembangkan secara Joint Venture (Kemitraan Strategis) oleh Summarecon Makassar dan Sumitomo Forestry Indonesia. Kolaborasi ini menyatukan kehandalan sistem infrastruktur perkotaan Summarecon dengan teknologi wooden structure presisi tahan gempa khas Jepang."
    },
    {
      q: "Apa saja tipe unit yang dipasarkan di RINOKA?",
      a: "Saat ini dipasarkan 2 tipe unit utama bergaya arsitektur Klasik Prancis adaptif dengan pilihan 3 hingga 5 kamar tidur: Tipe Lyon (Lebar 7 x 14 m, LB 82 m², 3 Kamar Tidur luas) dan Tipe Paris (Lebar 9 x 14 m, LB 117 m², 4-5 Kamar Tidur adaptif, Double Carport)."
    },
    {
      q: "Apakah utility di RINOKA menggunakan kabel udara?",
      a: "Tidak. Sesuai dengan standar premium Summarecon Mutiara Makassar, seluruh utilitas termasuk kabel listrik, serat optik internet, sirkulasi drainase, dan instalasi air bersih ditanam secara rapi di bawah tanah (Underground Utilities)."
    },
    {
      q: "Bagaimana cara melakukan survey lokasi atau pemesanan?",
      a: "Anda dapat berkonsultasi langsung dengan Sari (Asisten virtual di pojok kanan bawah), atau menghitung sendiri estimasi angsuran di bagian Kalkulator Pemesanan kami. Klik tombol 'Hubungi Admin via WhatsApp' untuk menjadwalkan kunjungan mendampingi Anda langsung ke show unit."
    },
    {
      q: "Apakah ada promo khusus bulan ini?",
      a: "Ya! Kami sedang membuka penawaran terbatas berupa Free AC di seluruh kamar tidur serta penawaran sistem KPR ekspres dengan bunga instan bekerjasama dengan bank-bank nasional terkemuka."
    }
  ];

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text font-sans selection:bg-editorial-border selection:text-editorial-accent scroll-smooth">
      
      {/* 1. STICKY PREMIUM HEADER */}
      <header className="sticky top-0 z-40 bg-editorial-bg/95 backdrop-blur-md border-b border-editorial-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Direct branding Logo representing Summarecon partner */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-editorial-accent rounded-none flex items-center justify-center text-editorial-gold border border-editorial-border transition-all group-hover:border-editorial-gold">
                <RinokaLogoIcon className="w-7 h-6 text-editorial-gold" />
              </div>
              <div>
                <span className="font-serif font-medium text-editorial-accent text-lg tracking-[0.08em] block leading-none">
                  RINOKA
                </span>
                <span className="text-[7.5px] uppercase tracking-[0.18em] text-editorial-secondary font-bold block mt-1">
                  by Summarecon Mutiara
                </span>
              </div>
            </a>

            {/* Desktop Navigation links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#jv-story" className="text-xs uppercase tracking-widest text-[#8A8471] hover:text-[#1A2E35] transition-colors font-bold">
                Kemitraan
              </a>
              <a href="#amenities" className="text-xs uppercase tracking-widest text-[#8A8471] hover:text-[#1A2E35] transition-colors font-bold">
                Fasilitas
              </a>
              <a href="#3d-viewer" className="text-xs uppercase tracking-widest text-[#8A8471] hover:text-[#1A2E35] transition-colors font-bold">
                Tur Unit 3D
              </a>
              <a href="#cluster-map" className="text-xs uppercase tracking-widest text-[#8A8471] hover:text-[#1A2E35] transition-colors font-bold text-editorial-gold">
                Pilih Kavling
              </a>
              <a href="#booking-simulator" className="text-xs uppercase tracking-widest text-[#8A8471] hover:text-[#1A2E35] transition-colors font-bold">
                Kalkulator Sim
              </a>
              <a href="#faq" className="text-xs uppercase tracking-widest text-[#8A8471] hover:text-[#1A2E35] transition-colors font-bold">
                FAQ
              </a>
            </nav>

            {/* Direct WhatsApp Call Action Header widget */}
            <div className="hidden md:flex items-center gap-3.5">
              <a
                href="https://www.instagram.com/rinokamakassar?igsh=NmIwM3Vqa2dnbXUy&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 text-[#8A8471] hover:text-[#1A2E35] hover:bg-[#E0DBCF]/30 rounded-none transition-colors"
                title="Kunjungi Instagram RINOKA Makassar"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/628114178998?text=Halo%20Admin%20RINOKA,%20saya%20tertarik%20mengenai%20brosur%20terbaru%20dan%20pricelist%20Summarecon%20Mutiara%20Makassar."
                target="_blank"
                rel="noreferrer"
                className="bg-[#1B4541] text-[#FAFAF5] border border-[#E4DFD5] px-5 py-3 rounded-none text-[10px] uppercase tracking-widest font-bold hover:bg-[#2A3331] transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D5B277]" /> Konsultasi Admin
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="https://www.instagram.com/rinokamakassar?igsh=NmIwM3Vqa2dnbXUy&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[#8A8471]"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#1A2E35]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F5F0] border-b border-[#E0DBCF] px-4 py-4 space-y-3">
            <a
              href="#jv-story"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs uppercase tracking-wider font-bold text-[#8A8471]"
            >
              Kolaborasi JV
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs uppercase tracking-wider font-bold text-[#8A8471]"
            >
              Fasilitas
            </a>
            <a
              href="#3d-viewer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs uppercase tracking-wider font-bold text-[#8A8471]"
            >
              Tour Unit 3D
            </a>
            <a
              href="#cluster-map"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs uppercase tracking-wider font-bold text-editorial-gold"
            >
              Pilih Kavling (Interaktif)
            </a>
            <a
              href="#booking-simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs uppercase tracking-wider font-bold text-[#8A8471]"
            >
              Simulasi Booking
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs uppercase tracking-wider font-bold text-[#8A8471]"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-[#E0DBCF] flex gap-3">
              <a
                href="https://wa.me/628114178998?text=Halo%20Admin%20RINOKA..."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#1B4541] text-white py-3 rounded-none text-center text-[10px] uppercase tracking-widest font-bold"
              >
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. MAJESTIC HERO BANNER WITH REAL RENDER */}
      <section className="relative bg-[#0E1A1E] border-b border-editorial-border overflow-hidden">
        {/* Absolute Background Generated Architectural Reference */}
        <div className="absolute inset-0">
          <img
            src={rinokaHeroImg}
            alt="RINOKA Summarecon Mutiara Makassar Hero"
            className="w-full h-full object-cover opacity-35 filter brightness-95 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-editorial-accent/65 to-black/85"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col justify-center min-h-[640px]">
          <div className="max-w-3xl space-y-7">
            
            <div className="inline-flex items-center gap-2 bg-[#1B4541]/80 border border-editorial-gold/30 px-4 py-2 rounded-none text-editorial-gold glow-gold shimmer-premium">
              <span className="w-1.5 h-1.5 bg-editorial-gold rounded-none animate-pulse"></span>
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase font-sans">
                PROMO EKSKLUSIF: <span className="text-white font-extrabold underline">FREE AC DI SETIAP KAMAR TIDUR</span> & SUBSIDI SUBS KPR
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-serif text-white leading-tight tracking-tight">
              RINOKA <br />
              <span className="text-editorial-gold not-italic font-serif block mt-2 text-3xl md:text-4xl font-light">
                Summarecon Mutiara Makassar
              </span>
            </h1>

            <p className="text-editorial-bg/85 text-sm md:text-base max-w-2xl font-serif italic leading-relaxed font-light">
              Karya masterpieces hunian bergaya <span className="text-white font-medium underline decoration-editorial-gold/60">Klasik Prancis Modern</span>. Hasil kolaborasi global Joint-Venture di tengah jantung Summarecon Mutiara Makassar yang asri, berteknologi presisi tinggi, dan ramah lingkungan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#booking-simulator"
                className="bg-editorial-gold hover:bg-editorial-gold-hover text-editorial-accent py-4 px-8 rounded-none font-bold uppercase tracking-widest text-[10px] text-center border border-editorial-border transition-all duration-300 glow-gold"
              >
                Simulasi Booking Unit
              </a>
              <a
                href="#3d-viewer"
                className="bg-transparent hover:bg-white/5 text-white border border-white/20 py-4 px-8 rounded-none font-bold uppercase tracking-widest text-[10px] text-center transition-all duration-300"
              >
                Lihat Model Rumah 3D
              </a>
            </div>

            {/* Quick specifications icons summary using high-contrast highlight markers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 max-w-2xl">
              <div className="p-3 bg-white/5 border-l-2 border-editorial-gold">
                <span className="text-[9px] uppercase font-bold text-editorial-gold tracking-widest block mb-1">Harga Mulai</span>
                <span className="text-white font-serif italic text-base font-semibold">Rp 1.2 Milyar*</span>
              </div>
              <div className="p-3 bg-white/5 border-l-2 border-editorial-gold">
                <span className="text-[9px] uppercase font-bold text-editorial-gold tracking-widest block mb-1">Tipe Tersedia</span>
                <span className="text-white font-serif italic text-base font-semibold">Lyon & Paris</span>
              </div>
              <div className="p-3 bg-white/5 border-l-2 border-editorial-gold animate-pulse">
                <span className="text-[9px] uppercase font-bold text-editorial-gold tracking-widest block mb-1">Kemitraan JV</span>
                <span className="text-white font-serif italic text-base font-semibold">Sumitomo Forestry</span>
              </div>
              <div className="p-3 bg-white/5 border-l-2 border-editorial-gold">
                <span className="text-[9px] uppercase font-bold text-editorial-gold tracking-widest block mb-1">Arsitektur</span>
                <span className="text-white font-serif italic text-base font-semibold">Prancis Klasik</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EXQUISITE JOINT VENTURE COOPERATION STORY */}
      <section id="jv-story" className="py-24 bg-editorial-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Text storytelling Block */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-editorial-secondary text-[10px] uppercase tracking-[0.25em] font-bold block mb-1 font-sans">
                Kemitraan Kelas Dunia
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-editorial-accent leading-tight tracking-tight">
                Harmoni Sempurna Struktur Jepang & Desain Eropa Klasik
              </h2>
              <div className="w-20 h-[1px] bg-editorial-secondary"></div>
              
              <p className="text-editorial-secondary text-sm leading-relaxed font-serif italic">
                Ya, benar sekali! <strong className="editorial-highlight text-editorial-accent">RINOKA</strong> adalah klaster eksklusif hasil <span className="editorial-highlight text-editorial-accent">kemitraan strategis (Joint Venture) resmi</span> antara developer legendaris nasional <strong className="text-editorial-accent font-semibold">Summarecon Makassar</strong> dengan raksasa teknologi perkayuan dan sirkulasi ramah lingkungan global asal Jepang, <strong className="editorial-highlight text-editorial-accent">Sumitomo Forestry Indonesia</strong> (anak perusahaan resmi dari <strong className="font-semibold text-editorial-accent">Sumitomo Forestry Group Jepang</strong> yang didirikan sejak tahun <span className="font-mono text-editorial-accent font-bold">1691</span>).
              </p>
              <p className="text-editorial-secondary text-sm leading-relaxed font-serif italic">
                Kolaborasi ini menyatukan kehandalan prasarana kota mandiri Summarecon dengan <span className="editorial-highlight text-editorial-accent">teknologi rancangan kayu (wooden engineering) sangat presisi khas Jepang</span>. Menggunakan material bersertifikat hijau terbarukan, sistem seismik tahan gempa premium, serta desain tata udara yang sejuk nan higienis sepanjang hari.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4 p-5 bg-white border border-editorial-border rounded-none premium-highlight-box transition-all duration-300 hover:shadow-xs">
                  <div className="w-10 h-10 rounded-none bg-editorial-bg border border-editorial-border flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-editorial-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-editorial-accent uppercase tracking-wider text-xs font-sans">Fasad Arsitektur Prancis</h4>
                    <p className="text-xs text-editorial-secondary font-serif italic mt-1">Sentuhan kemewahan pilar anggun, atap slate abu-abu tinggi, dan ornamen French window yang estetik.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white border border-editorial-border rounded-none premium-highlight-box transition-all duration-300 hover:shadow-xs">
                  <div className="w-10 h-10 rounded-none bg-editorial-bg border border-editorial-border flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5 text-editorial-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-editorial-accent uppercase tracking-wider text-xs font-sans">Teknologi Struktur Jepang</h4>
                    <p className="text-xs text-editorial-secondary font-serif italic mt-1">Mengandalkan <strong className="text-editorial-accent font-semibold">structural integrity Sumitomo Forestry Group Jepang</strong> untuk sirkulasi rumah hemat energi, anti pecah, dan durabilitas tinggi.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white border border-editorial-border rounded-none premium-highlight-box transition-all duration-300 hover:shadow-xs">
                  <div className="w-10 h-10 rounded-none bg-editorial-bg border border-editorial-border flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-editorial-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-editorial-accent uppercase tracking-wider text-xs font-sans">Double Gate System</h4>
                    <p className="text-xs text-editorial-secondary font-serif italic mt-1">Sistem keamanan ganda elektrik terintegrasi untuk menjamin rasa aman dan privasi mutlak bagi keluarga Anda.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Visual Collage with Interior render & Official Brand Monogram Card */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-4">
              <div className="col-span-8 rounded-none overflow-hidden border border-editorial-border aspect-[4/3] relative">
                <img
                  src={rinokaInteriorImg}
                  alt="Rinoka Interior Showunit"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#D5B277] block uppercase">Show Unit Tipe Paris</span>
                  <p className="text-xs font-serif italic mt-1">Desain ruang santai lapang bernuansa Eropa fungsional.</p>
                </div>
              </div>

              <RinokaLogoBrand className="col-span-4 rounded-none aspect-[3/4] mt-12" />
            </div>

          </div>

        </div>
      </section>

      {/* 4. PREMIUM AMENITIES RESORT BENTO GRID */}
      <section id="amenities" className="py-24 bg-editorial-accent text-white relative overflow-hidden border-y border-editorial-border">
        
        {/* Background Visual render of tranquil Zen pool area */}
        <div className="absolute inset-0 opacity-15">
          <img
            src={rinokaAmenitiesImg}
            alt="Zen Amenities Background"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-editorial-gold text-[10px] uppercase tracking-[0.25em] font-bold block mb-3 font-sans">
              PREMIUM LUXURY FACILITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-4">
              Fasilitas Eksklusif Penunjang Gaya Hidup Terbaik
            </h2>
            <p className="text-[#FAFAF5]/80 text-sm leading-relaxed max-w-2xl font-serif italic">
              Summarecon Mutiara Makassar menghadirkan ekosistem kawasan hijau. Dirancang khusus untuk memanjakan istirahat akhir pekan Anda bersama keluarga tanpa perlu keluar dari kawasan klaster.
            </p>
          </div>

          {/* Amenities grid layout cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AMENITIES_DATA.map((amenity, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-none border border-editorial-border hover:border-editorial-gold transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-none bg-editorial-bg border border-editorial-border flex items-center justify-center text-editorial-accent mb-5 group-hover:bg-editorial-accent group-hover:text-white transition-all">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif italic text-editorial-accent text-base mb-2 group-hover:text-editorial-gold transition-colors font-semibold">
                  {amenity.title}
                </h4>
                <p className="text-editorial-secondary text-xs leading-relaxed font-serif italic">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>

          {/* Big contextual box highlighting Sumitomo garden features */}
          <div className="mt-12 bg-[#0E1A1E] p-8 md:p-10 rounded-none border border-editorial-border flex flex-col md:flex-row items-center justify-between gap-6 glow-gold">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-none text-[9px] font-bold text-editorial-gold uppercase tracking-[0.2em] block w-fit font-sans">
                Sumitomo Ecology Concept
              </span>
              <h3 className="text-lg md:text-2xl font-serif italic text-white">
                Eco Green Zen Yard Kolaborasi Jepang <span className="text-editorial-gold">★</span>
              </h3>
              <p className="text-[#FAFAF5]/75 text-xs max-w-2xl leading-relaxed italic font-serif">
                Menghadirkan harmoni alam asri melalui pemilihan rindang pepohonan penyerap karbon tinggi khas Jepang yang dirancang presisi sesuai kondisi iklim pesisir kota Makassar.
              </p>
            </div>
            <a
              href="#3d-viewer"
              className="bg-editorial-gold hover:bg-editorial-gold-hover px-6 py-4 rounded-none text-xs font-bold uppercase tracking-widest text-editorial-accent transition-colors shrink-0 flex items-center gap-2 font-sans glow-gold"
            >
              Uji Tour Kawasan <ArrowRight className="w-4 h-4 text-editorial-accent" />
            </a>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE 3D TOUR SECION */}
      <Interactive3DViewer />

      {/* 5.5 INTERACTIVE SITE PLAN / LOT MAP SECTION */}
      <NeighborhoodSitePlan />

      {/* 6. BOOKING SIMULATOR / KPR CALCULATOR SECTION */}
      <BookingSimulator />

      {/* 7. SUMMARECON MUTIARA AREA CONTEXT */}
      <section className="py-24 bg-editorial-bg border-t border-editorial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side parameters list */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-editorial-secondary text-[10px] uppercase tracking-[0.2em] font-bold block mb-1 font-sans">
                Lokasi & Konektivitas
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-editorial-accent mb-4">
                Pusat Pertumbuhan Baru di Makassar Timur
              </h2>
              <p className="text-editorial-secondary font-serif italic text-sm">
                Berlokasi di <strong>Summarecon Mutiara Makassar</strong>, kawasan kota mandiri masa depan seluas ratusan hektar di koridor pertumbuhan Makassar Timur yang terus berkembang pesat.
              </p>

              <div className="space-y-3 font-sans text-xs text-[#2A3331]">
                <div className="flex justify-between items-center p-4 bg-white rounded-none border border-editorial-border hover:border-editorial-gold transition-all duration-300">
                  <span className="font-serif italic text-editorial-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-editorial-secondary" /> SD Islam Al Azhar
                  </span>
                  <span className="font-bold text-editorial-accent text-right text-[11px] bg-editorial-gold/15 px-2 py-1 border border-editorial-gold font-mono">
                    <span className="editorial-highlight">Selangkah (Tak sampai semenit)</span>
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-none border border-editorial-border hover:border-editorial-gold transition-all duration-300">
                  <span className="font-serif italic text-editorial-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-editorial-secondary" /> Pasar Mandiri
                  </span>
                  <span className="font-bold text-editorial-accent text-right text-[11px] bg-editorial-gold/15 px-2 py-1 border border-editorial-gold font-mono">
                    <span className="editorial-highlight">Selangkah (Tak sampai semenit)</span>
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-none border border-editorial-border hover:border-editorial-gold transition-all duration-300">
                  <span className="font-serif italic text-editorial-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-editorial-secondary" /> Upcoming Summarecon Mall Makassar
                  </span>
                  <span className="font-bold text-editorial-accent text-right text-[11px] bg-editorial-gold/25 px-2 py-1 border border-editorial-gold font-mono glow-gold">
                    <span className="editorial-highlight font-semibold">Selangkah (Pasti Berkembang!)</span>
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-none border border-editorial-border hover:border-editorial-gold transition-all duration-300">
                  <span className="font-serif italic text-editorial-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-editorial-secondary" /> Akses Gerbang Tol Ir. Sutami
                  </span>
                  <span className="font-bold text-editorial-accent text-right font-mono text-[11px]">Hanya 5 Menit (3 km)</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-none border border-editorial-border hover:border-editorial-gold transition-all duration-300">
                  <span className="font-serif italic text-editorial-secondary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-editorial-secondary" /> Bandara Sultan Hasanuddin
                  </span>
                  <span className="font-bold text-editorial-accent text-right font-mono text-[11px]">Hanya 10 Menit</span>
                </div>
              </div>

              {/* Instagram link preview request banner */}
              <div className="bg-white p-6 rounded-none border border-editorial-border space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-editorial-accent flex items-center gap-2 font-sans">
                  <Instagram className="w-4 h-4 text-editorial-secondary" /> Ikuti Akun Instagram Resmi Kami
                </p>
                <p className="text-xs text-editorial-secondary font-serif italic leading-relaxed">
                  Dapatkan info diskon peluncuran perdana reguler, vlog show unit, perkembangan aspal jalan, dan dokumentasi terkini langsung dari lapangan Makassar.
                </p>
                <a
                  href="https://www.instagram.com/rinokamakassar?igsh=NmIwM3Vqa2dnbXUy&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-editorial-accent hover:bg-editorial-text text-white font-bold text-[10px] uppercase tracking-widest py-3 px-5 rounded-none border border-editorial-border transition-all cursor-pointer font-sans"
                >
                  Buka Instagram @rinokamakassar
                </a>
              </div>
            </div>

            {/* Right side illustrative Maps/Photos block */}
            <div className="lg:col-span-7 rounded-none overflow-hidden border border-editorial-border shadow-md bg-white p-5 space-y-4">
              <div className="h-64 bg-gray-200 rounded-none relative overflow-hidden">
                {/* Visual generated map mockup */}
                <img
                  src={rinokaAmenitiesImg}
                  alt="Summarecon Mutiara Makassar map context"
                  className="w-full h-full object-cover grayscale opacity-80 border border-editorial-border"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-editorial-gold block font-sans">MAP DIRECTION</span>
                      <p className="text-xs font-serif italic">Summarecon Mutiara Makassar Entrance</p>
                    </div>
                    <span className="px-3 py-1.5 bg-editorial-accent rounded-none border border-white/10 text-[9px] uppercase tracking-wider font-bold font-sans">
                      Buka Peta Asli
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-editorial-bg border border-editorial-border rounded-none">
                  <span className="text-lg font-serif italic font-bold text-editorial-accent block">Near Tol</span>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-editorial-secondary mt-1 font-sans">Akses langsung lingkar luar</p>
                </div>
                <div className="p-4 bg-editorial-bg border border-editorial-border rounded-none">
                  <span className="text-lg font-serif italic font-bold text-editorial-accent block"><span className="editorial-highlight">High Growth</span></span>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-editorial-secondary mt-1 font-sans">Nilai investasi naik up to 12% p.a</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. HELPFUL FAQ ACCORDION PANEL */}
      <section id="faq" className="py-24 bg-white border-y border-[#E0DBCF]">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-16">
            <span className="text-[#8A8471] text-[9px] uppercase tracking-[0.25em] font-bold block mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-[#1A2E35]">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-[#E0DBCF] rounded-none overflow-hidden text-xs"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-4 md:p-6 flex justify-between items-center bg-white hover:bg-[#F7F5F0]/50 transition-colors font-serif italic text-[#1A2E35] text-sm md:text-base leading-snug"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A8471] transition-transform duration-300 ${
                      faqOpenIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                {faqOpenIndex === i && (
                  <div className="p-4 md:p-6 border-t border-[#E0DBCF] bg-[#F7F5F0]/30 text-[#5A5440] leading-relaxed font-sans text-xs">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. VIP CONSULTATION CTA HERO FOOTER BAR */}
      <section className="bg-[#1A2E35] text-white py-24 text-center select-none relative overflow-hidden border-t border-[#E0DBCF]">
        <div className="absolute inset-0 opacity-10">
          <img
            src={rinokaHeroImg}
            alt="Interior Footer Decor Outline"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold block">
            LIMITED RELEASE OFFER
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
            Miliki Keanggunan Hidup di Klaster Rinoka Makassar
          </h2>
          <p className="text-[#E0DBCF]/80 text-sm max-w-2xl mx-auto leading-relaxed font-serif italic">
            Dapatkan Free AC untuk setiap kamar tidur Anda hari ini. Segera buat janji temu konsultasi dengan tim representatif Summarecon Makassar sebelum unit terfavorit habis.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="https://wa.me/628114178998?text=Halo%20Admin%20RINOKA,%20saya%20tertarik%20mengenai%20brosur%20terbaru%20dan%20pricelist%20Summarecon%20Mutiara%20Makassar."
              target="_blank"
              rel="noreferrer"
              className="bg-[#D5B277] hover:bg-[#C19F65] px-8 py-4 rounded-none font-bold text-xs tracking-widest uppercase text-[#1B4541] border border-[#E4DFD5] transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#1B4541]" /> Live Chat Admin WhatsApp
            </a>
            <a
              href="#booking-simulator"
              className="bg-transparent hover:bg-white/10 px-8 py-4 rounded-none font-bold text-xs tracking-widest uppercase text-white border border-white/20 transition-colors inline-block"
            >
              Hitung Cicilan Unit
            </a>
          </div>
        </div>
      </section>

      {/* 10. REAL BASE FOOTER OUTLINES */}
      <footer className="bg-[#0A1211] text-editorial-secondary py-16 text-xs border-t border-editorial-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-editorial-accent rounded-none flex items-center justify-center border border-editorial-border/20 text-editorial-gold">
                <RinokaLogoIcon className="w-6 h-5 text-editorial-gold" />
              </div>
              <div>
                <span className="font-serif font-semibold text-white text-base tracking-widest block leading-none">RINOKA</span>
                <span className="text-[7.2px] uppercase tracking-[0.18em] text-editorial-gold font-bold block mt-1">SUMMARECON & SUMITOMO FORESTRY</span>
              </div>
            </div>
            <p className="text-[#FAFAF5]/70 leading-relaxed max-w-sm italic font-serif">
              Cluster terbaru dengan mahakarya rancangan arsitektur Klasik Prancis Modern berpadu kehandalan presisi wooden system khas Sumitomo Forestry Jepang.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/rinokamakassar?igsh=NmIwM3Vqa2dnbXUy&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-white/5 border border-white/15 flex items-center justify-center text-[#8A8471] hover:text-white transition-colors"
                title="Instagram @rinokamakassar"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <span className="font-sans text-[#D5B277] uppercase text-[10px] tracking-[0.2em] font-bold block">INFORMASI PEMASARAN</span>
            <address className="not-italic text-[#FAFAF5]/80 leading-relaxed space-y-2 font-mono">
              <p>📍 Summarecon Mutiara Makassar, Kawasan Exit Tol Bandara KM.4, Makassar, Sulawesi Selatan, Indonesia.</p>
              <p>📱 Telepon / WhatsApp: 0811-4178-998</p>
              <p>🌐 Website Resmi: www.rinokamakassar.co.id</p>
            </address>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="font-sans text-[#D4AF37] uppercase text-[10px] tracking-[0.2em] font-bold block">JAM SURVEY SHOW UNIT</span>
            <ul className="text-[#E0DBCF]/80 space-y-2">
              <li className="font-mono">Senin - Jumat: 09:00 - 17:00 WITA</li>
              <li className="font-mono">Sabtu - Minggu: 09:00 - 18:00 WITA</li>
              <li className="text-[#D4AF37] font-serif italic text-xs font-semibold mt-2">Diharapkan reservasi terlebih dahulu.</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 text-center">
          <p>© {new Date().getFullYear()} Rinoka Summarecon Mutiara Makassar. All rights reserved.</p>
          <p className="mt-1 text-[#8A8471]/60">Seluruh foto rendering arsitektur di website ini bersumber dari asset rancangan klaster resmi untuk promosi.</p>
        </div>
      </footer>

      {/* FLOATING VIRTUAL ASSISTANT (SARI AI CHAT CONSULTANT) */}
      <AIAssistant />

    </div>
  );
}
