import React, { useState, FormEvent } from "react";
import { RINOKA_UNITS, UnitDetail } from "../data";
import { PaymentMethod } from "../types";
import { Calculator, Wallet, Calendar, User, Smartphone, Send, Landmark, HelpCircle, Check, Sparkles } from "lucide-react";

export default function BookingSimulator() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>("lyon");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.KPR);
  const [dpPercent, setDpPercent] = useState<number>(10);
  const [tenorYears, setTenorYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  
  // Custom upgrades
  const [upgrades, setUpgrades] = useState({
    smartHome: false,
    canopy: false,
    kitchen: false,
    solar: false,
  });

  // Client details
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  const selectedUnit = RINOKA_UNITS.find((u) => u.id === selectedUnitId) || RINOKA_UNITS[0];

  // Upgrades prices
  const UPGRADE_PRICES = {
    smartHome: 15000000,
    canopy: 12000000,
    kitchen: 25000000,
    solar: 30000000,
  };

  // Compute values
  const upgradesTotal = 
    (upgrades.smartHome ? UPGRADE_PRICES.smartHome : 0) +
    (upgrades.canopy ? UPGRADE_PRICES.canopy : 0) +
    (upgrades.kitchen ? UPGRADE_PRICES.kitchen : 0) +
    (upgrades.solar ? UPGRADE_PRICES.solar : 0);

  const totalPrice = selectedUnit.price + upgradesTotal;
  const downPayment = (totalPrice * dpPercent) / 100;
  const loanAmount = totalPrice - downPayment;

  // Monthly installments calculation
  let monthlyInstallment = 0;
  let totalMonths = 0;

  if (paymentMethod === PaymentMethod.KPR) {
    totalMonths = tenorYears * 12;
    const monthlyRate = interestRate / 100 / 12;
    // PMT formula: P * r * (1+r)^n / ((1+r)^n - 1)
    if (monthlyRate > 0) {
      monthlyInstallment = 
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyInstallment = loanAmount / totalMonths;
    }
  } else if (paymentMethod === PaymentMethod.BERTALU) {
    // 12x or 24x installment
    totalMonths = tenorYears === 20 ? 24 : 12; // mapping some standard choices
    monthlyInstallment = loanAmount / totalMonths;
  }

  // Generate WhatsApp message and redirect
  const handleWhatsAppSend = (e: FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert("Harap isi Nama dan Nomor telepon Anda.");
      return;
    }

    const upgradeSelectedNames: string[] = [];
    if (upgrades.smartHome) upgradeSelectedNames.push("Smart Home Premium (+15jt)");
    if (upgrades.canopy) upgradeSelectedNames.push("Canopy Premium (+12jt)");
    if (upgrades.kitchen) upgradeSelectedNames.push("Deluxe Kitchen Set (+25jt)");
    if (upgrades.solar) upgradeSelectedNames.push("Solar Panel Eco Green (+30jt)");

    // Precompiled WA template
    const message = `Halo Admin RINOKA Summarecon Mutiara Makassar,
Saya ingin berkonsultasi mengenai simulasi pemesanan unit berikut:

*PROFIL CALON PEMBELI:*
- Nama: ${buyerName}
- Telepon: ${buyerPhone}
- Email: ${buyerEmail || "-"}

*UNIT PILIHAN:*
- Unit: ${selectedUnit.name} (${selectedUnit.style})
- Luas Tanah/Bangunan: ${selectedUnit.lt}m² / ${selectedUnit.lb}m²
- Harga Dasar: Rp ${selectedUnit.price.toLocaleString("id-ID")}

*UPGRADE TAMBAHAN:*
${upgradeSelectedNames.length > 0 ? upgradeSelectedNames.map(n => `• ${n}`).join("\n") : "Tidak ada"}

*ESTIMASI SIMULASI PEMBAYARAN:*
- Total Harga Rumah: Rp ${totalPrice.toLocaleString("id-ID")}
- Metode Pembayaran: ${paymentMethod}
${paymentMethod !== PaymentMethod.CASH ? `- Down Payment (DP ${dpPercent}%): Rp ${downPayment.toLocaleString("id-ID")}
- Nilai Pembiayaan: Rp ${loanAmount.toLocaleString("id-ID")}
${paymentMethod === PaymentMethod.KPR ? `- Tenor KPR: ${tenorYears} Tahun
- Suku Bunga: ${interestRate}% p.a (Estimasi)
- Angsuran Bulanan: Rp ${Math.round(monthlyInstallment).toLocaleString("id-ID")}/bulan` : `- Tenor Cash Bertahap: ${totalMonths} Bulan
- Angsuran Bulanan: Rp ${Math.round(monthlyInstallment).toLocaleString("id-ID")}/bulan`}` : "Metode CASH Keras (Pelunasan 1 Bulan setelah Booking)"}

Mohon info ketersediaan unit, jadwal survey lokasi, dan brosur terbaru. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/628114178998?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section id="booking-simulator" className="py-24 bg-editorial-bg border-t border-editorial-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-editorial-secondary text-[10px] uppercase tracking-[0.25em] font-bold block mb-3">
            Simulations & Booking
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-editorial-accent tracking-tight mb-4">
            Kalkulator Pembelian RINOKA
          </h2>
          <p className="text-editorial-secondary text-sm leading-relaxed max-w-2xl mx-auto italic font-light">
            Simulasikan kepemilikan hunian impian Anda secara mandiri. Sesuaikan metode pembayaran, tenor, dan upgrade rumah pintar untuk memperoleh estimasi cicilan instan.
          </p>
        </div>

        {/* Main interactive grid splitting calculations with inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Inputs (Cols 7) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-none border border-editorial-border flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* STAGE 1: Select Unit and specs */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-editorial-secondary block mb-3">
                  1. Pilih Tipe Rumah
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RINOKA_UNITS.map((unit) => (
                    <div
                      key={unit.id}
                      onClick={() => setSelectedUnitId(unit.id)}
                      className={`p-4 rounded-none border-2 cursor-pointer transition-all duration-300 relative bg-white ${
                        selectedUnitId === unit.id
                          ? "border-[#1B4541] bg-editorial-border/10 shadow-xs"
                          : "border-editorial-border hover:border-editorial-accent"
                      }`}
                    >
                      {selectedUnitId === unit.id && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-editorial-gold text-white rounded-none flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <h4 className="font-serif italic font-bold text-base text-editorial-accent">{unit.name}</h4>
                      <p className="text-[10px] text-editorial-secondary uppercase tracking-wider font-semibold mt-0.5">{unit.style}</p>
                      <div className="mt-3 text-xs text-editorial-secondary space-y-1">
                        <p>📐 LT/LB: {unit.lt} m² / {unit.lb} m² ({unit.dimension})</p>
                        <p>🛌 {unit.bedrooms} KT | 🛁 {unit.bathrooms} KM</p>
                      </div>
                      <p className="text-base font-serif italic text-editorial-accent mt-3">
                        Rp {unit.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* STAGE 2: Payment Plan */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8A8471] block mb-3">
                  2. Metode Pembayaran & DP
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(PaymentMethod).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method);
                        // Default some values depending on chosen payment
                        if (method === PaymentMethod.CASH) {
                          setDpPercent(100);
                        } else if (method === PaymentMethod.BERTALU) {
                          setDpPercent(20);
                          setTenorYears(12);
                        } else {
                          setDpPercent(10);
                          setTenorYears(15);
                        }
                      }}
                      className={`px-3 py-2.5 text-[10px] uppercase font-bold tracking-widest rounded-none border ${
                        paymentMethod === method
                          ? "bg-[#1A2E35] border-[#1A2E35] text-white"
                          : "bg-white border-[#E0DBCF] text-[#8A8471] hover:bg-[#F7F5F0]"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {/* Direct Dynamic DP slide controls for KPR & Bertahap */}
                {paymentMethod !== PaymentMethod.CASH && (
                  <div className="mt-4 bg-[#F7F5F0] p-4 rounded-none border border-[#E0DBCF] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5A5440] font-medium font-serif italic">Uang Muka (DP %):</span>
                      <span className="font-serif italic font-bold text-[#1A2E35] text-sm">{dpPercent}% (Rp {downPayment.toLocaleString("id-ID")})</span>
                    </div>
                    <input
                      type="range"
                      min={paymentMethod === PaymentMethod.BERTALU ? 20 : 10}
                      max={80}
                      step={5}
                      value={dpPercent}
                      onChange={(e) => setDpPercent(Number(e.target.value))}
                      className="w-full accent-[#1A2E35] h-1.5 bg-white/70 rounded-none cursor-pointer border border-[#E0DBCF]"
                    />
                    <div className="flex justify-between text-[10px] text-[#8A8471] font-mono">
                      <span>Min DP {paymentMethod === PaymentMethod.BERTALU ? "20%" : "10%"}</span>
                      <span>Sisa Pembiayaan: Rp {loanAmount.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* STAGE 3: KPR Parameters */}
              {paymentMethod === PaymentMethod.KPR && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F7F5F0] p-4 rounded-none border border-[#E0DBCF] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5A5440] font-serif italic font-medium">Tenor KPR:</span>
                      <span className="font-serif font-bold text-[#1A2E35]">{tenorYears} Tahun ({tenorYears*12}x Cicilan)</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={25}
                      step={5}
                      value={tenorYears}
                      onChange={(e) => setTenorYears(Number(e.target.value))}
                      className="w-full accent-[#1A2E35] h-1.5 bg-white/70 rounded-none cursor-pointer border border-[#E0DBCF]"
                    />
                    <div className="flex justify-between text-[10px] text-[#8A8471] font-mono">
                      <span>5 Tahun</span>
                      <span>25 Tahun Max</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F5F0] p-4 rounded-none border border-[#E0DBCF] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5A5440] font-serif italic font-medium flex items-center gap-1">
                        Suku Bunga Estimasi: <HelpCircle className="w-3.5 h-3.5 text-[#8A8471]" title="Suku sebanding promo bank kerja sama" />
                      </span>
                      <span className="font-serif font-bold text-[#1A2E35]">{interestRate}% p.a</span>
                    </div>
                    <input
                      type="range"
                      min={3.5}
                      max={9.5}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#1A2E35] h-1.5 bg-white/70 rounded-none cursor-pointer border border-[#E0DBCF]"
                    />
                    <div className="flex justify-between text-[10px] text-[#8A8471] font-mono">
                      <span>3.5% (Promo)</span>
                      <span>9.5%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 4: Cash Bertahap custom tenor options */}
              {paymentMethod === PaymentMethod.BERTALU && (
                <div className="bg-[#F7F5F0] p-4 rounded-none border border-[#E0DBCF]">
                  <span className="text-xs text-[#5A5440] font-serif italic block mb-3">Pilih Tenor Bertahap</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTenorYears(12)}
                      className={`p-2.5 rounded-none text-[10px] uppercase font-bold tracking-wider border ${
                        tenorYears === 12
                          ? "bg-[#1A2E35] border-[#1A2E35] text-white"
                          : "bg-white border-[#E0DBCF] text-[#8A8471] hover:bg-[#F7F5F0]"
                      }`}
                    >
                      12 Bulan (1 Tahun)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTenorYears(20)}
                      className={`p-2.5 rounded-none text-[10px] uppercase font-bold tracking-wider border ${
                        tenorYears === 20
                          ? "bg-[#1A2E35] border-[#1A2E35] text-white"
                          : "bg-white border-[#E0DBCF] text-[#8A8471] hover:bg-[#F7F5F0]"
                      }`}
                    >
                      24 Bulan (2 Tahun)
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 5: Custom Premium Upgrades */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8A8471] block mb-3 flex items-center gap-1.5">
                  3. Peningkatan Unit Premium <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUpgrades(u => ({ ...u, smartHome: !u.smartHome }))}
                    className={`p-4 rounded-none text-left border text-xs flex justify-between items-center transition-all bg-white ${
                      upgrades.smartHome ? "bg-[#E0ECE6]/30 border-[#1A2E35]" : "border-[#E0DBCF] hover:bg-[#F7F5F0]/50"
                    }`}
                  >
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[11px] text-[#1A2E35]">Smart Home Suite Max</p>
                      <p className="text-[10px] text-[#8A8471] font-serif italic transition-all">Sensor, Gorden Pintar, IP Cam</p>
                    </div>
                    <span className="text-[#D4AF37] font-serif italic font-bold">+15jt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUpgrades(u => ({ ...u, canopy: !u.canopy }))}
                    className={`p-4 rounded-none text-left border text-xs flex justify-between items-center transition-all bg-white ${
                      upgrades.canopy ? "bg-[#E0ECE6]/30 border-[#1A2E35]" : "border-[#E0DBCF] hover:bg-[#F7F5F0]/50"
                    }`}
                  >
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[11px] text-[#1A2E35]">Canopy Premium Classic</p>
                      <p className="text-[10px] text-[#8A8471] font-serif italic transition-all">Baja, Atap Polycarbonate</p>
                    </div>
                    <span className="text-[#D4AF37] font-serif italic font-bold">+12jt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUpgrades(u => ({ ...u, kitchen: !u.kitchen }))}
                    className={`p-4 rounded-none text-left border text-xs flex justify-between items-center transition-all bg-white ${
                      upgrades.kitchen ? "bg-[#E0ECE6]/30 border-[#1A2E35]" : "border-[#E0DBCF] hover:bg-[#F7F5F0]/50"
                    }`}
                  >
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[11px] text-[#1A2E35]">Deluxe Classic Kitchen Set</p>
                      <p className="text-[10px] text-[#8A8471] font-serif italic transition-all">Solid surface, Kabinet Atas/Bawah</p>
                    </div>
                    <span className="text-[#D4AF37] font-serif italic font-bold">+25jt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUpgrades(u => ({ ...u, solar: !u.solar }))}
                    className={`p-4 rounded-none text-left border text-xs flex justify-between items-center transition-all bg-white ${
                      upgrades.solar ? "bg-[#E0ECE6]/30 border-[#1A2E35]" : "border-[#E0DBCF] hover:bg-[#F7F5F0]/50"
                    }`}
                  >
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[11px] text-[#1A2E35]">Solar Panel Eco Energized</p>
                      <p className="text-[10px] text-[#8A8471] font-serif italic transition-all">Kerja sama Sumitomo Forestry</p>
                    </div>
                    <span className="text-[#D4AF37] font-serif italic font-bold">+30jt</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Downside validation/informational rules disclaimer */}
            <div className="mt-8 border-t border-[#E0DBCF] pt-4 text-[10px] text-[#8A8471] leading-relaxed italic">
              *Simulasi di atas adalah prakiraan awal (ilustrasi). Angsuran KPR dipengaruhi histori riwayat kredit BI Checking dan progam bank kerja sama aktif di Makassar Timur.
            </div>

          </div>

          {/* RIGHT PANEL: Outputs & Booking Inquiry Form (Cols 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1A2E35] text-white rounded-none p-6 md:p-8 border border-[#E0DBCF] shadow-xl">
            
            <div className="space-y-6">
              
              <div className="border-b border-white/10 pb-4">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase bg-white/5 px-3 py-1.5 rounded-none border border-white/10">
                  <Calculator className="w-3.5 h-3.5" /> Ringkasan Simulasi Anda
                </span>
                <p className="text-sm text-[#E0DBCF]/80 font-serif italic mt-3">RINOKA by Summarecon Mutiara Makassar</p>
              </div>

              {/* Computations details breakdown */}
              <div className="space-y-4 font-sans text-xs">
                
                <div className="flex justify-between items-center">
                  <span className="text-[#E0DBCF]/80 uppercase tracking-widest text-[9px]">Unit Terpilih</span>
                  <span className="font-serif italic font-bold text-white text-base">{selectedUnit.name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#E0DBCF]/80 uppercase tracking-widest text-[9px]">Harga Dasar Unit</span>
                  <span className="font-serif italic font-bold text-white text-base">Rp {selectedUnit.price.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#E0DBCF]/80 uppercase tracking-widest text-[9px]">Total Upgrade Peningkatan</span>
                  <span className="font-serif italic font-bold text-white text-base">Rp {upgradesTotal.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[#E0DBCF] font-bold text-[10px] uppercase tracking-wider">TOTAL HARGA RUPIAH</span>
                  <span className="text-xl font-serif text-[#D4AF37] italic font-semibold">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[#E0DBCF]/80 uppercase tracking-widest text-[9px]">Lembaga Pembiayaan</span>
                  <span className="font-serif italic text-white text-sm flex items-center gap-1.5">{paymentMethod}</span>
                </div>

                {paymentMethod !== PaymentMethod.CASH && (
                  <div className="space-y-3 bg-black/20 p-5 rounded-none border border-white/5 mt-2">
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#E0DBCF]/75 font-serif italic">Uang Muka (DP {dpPercent}%)</span>
                      <span className="font-serif italic font-bold text-white">Rp {downPayment.toLocaleString("id-ID")}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#E0DBCF]/75 font-serif italic">Sisa Dibayarkan (Pokok Pinjaman)</span>
                      <span className="font-serif italic font-bold text-white">Rp {loanAmount.toLocaleString("id-ID")}</span>
                    </div>

                    {paymentMethod === PaymentMethod.KPR && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#E0DBCF]/75 font-serif italic">Tenor & Suku Bunga</span>
                        <span className="font-serif italic font-bold text-white">{tenorYears} Thn / {interestRate}% p.a</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <span className="text-[#E0DBCF]/85 font-bold text-[10px] uppercase tracking-wider">Estimasi Angsuran / Bln</span>
                      <span className="font-serif text-[#D4AF37] text-2xl font-bold italic">
                        Rp {Math.round(monthlyInstallment).toLocaleString("id-ID")}
                        <span className="text-[10px] font-sans not-italic text-[#8A8471] font-light"> /bulan</span>
                      </span>
                    </div>

                  </div>
                )}

              </div>

              {/* Inquiry details verification form */}
              <form onSubmit={handleWhatsAppSend} className="space-y-3 pt-6 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
                  Hubungi Personal Konsultan Partner
                </p>

                <div className="space-y-2">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8A8471] absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="Nama Lengkap Anda"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-none py-2.5 px-10 text-xs placeholder-white/30 text-white focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="relative">
                    <Smartphone className="w-3.5 h-3.5 text-[#8A8471] absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Nomor Telepon / WhatsApp (e.g. 081234)"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-none py-2.5 px-10 text-xs placeholder-white/30 text-white focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="relative">
                    <Landmark className="w-3.5 h-3.5 text-[#8A8471] absolute left-3 top-3.5" />
                    <input
                      type="email"
                      placeholder="Alamat Email (Opsional)"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-none py-2.5 px-10 text-xs placeholder-white/30 text-white focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#C09F30] transition-all text-xs py-4 px-4 font-bold uppercase tracking-widest text-[#1A2E35] rounded-none flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4 text-[#1A2E35]" /> Kirim Simulasi via WhatsApp
                </button>
              </form>

            </div>

            <div className="text-[10px] text-[#8A8471] text-center mt-6 font-serif italic">
              *Pelayanan cepat. Draft perhitungan diringkas secara otomatis & terkirim langsung ke admin representative Summarecon.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
