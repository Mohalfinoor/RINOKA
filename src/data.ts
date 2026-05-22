export interface RoomDetail {
  id: string;
  name: string;
  floor: number;
  size: string;
  features: string[];
  description: string;
  isometricCoords: string; // coordinates or visual description for illustration
}

export interface UnitDetail {
  id: string;
  name: string;
  style: string;
  lt: number;
  lb: number;
  dimension: string;
  bedrooms: number;
  bathrooms: number;
  carports: number;
  price: number;
  tagline: string;
  description: string;
  advantages: string[];
  imageUrl: string;
  rooms: RoomDetail[];
}

export const RINOKA_UNITS: UnitDetail[] = [
  {
    id: "lyon",
    name: "Tipe Lyon",
    style: "Classic French Elegant",
    lt: 98,
    lb: 82,
    dimension: "7 x 14 m",
    bedrooms: 3,
    bathrooms: 2,
    carports: 1,
    price: 1200000000,
    tagline: "Hunian Klasik Prancis yang Compact & Elegan (7x14)",
    description: "Tipe Lyon menghadirkan keseimbangan sempurna antara kenyamanan modern dan estetika Eropa klasik. Didesain secara spasial dengan optimalisasi sirkulasi udara dan cahaya, memiliki 3 kamar tidur fungsional yang sangat ideal untuk keluarga dinamis.",
    advantages: [
      "Dimensi Luas 7 x 14 m dengan Layout Efisien",
      "Teknologi Struktur Kayu Presisi Sumitomo Forestry Indonesia",
      "Pencahayaan Alami Maksimal (High Ceiling)",
      "Area Taman Belakang Luas (Inner Court)",
      "Smart Home System & Smart Lock"
    ],
    imageUrl: "rinoka_hero",
    rooms: [
      {
        id: "lyon-living",
        name: "Ruang Keluarga & Tamu",
        floor: 1,
        size: "3.5m x 4.0m",
        features: ["Lantai Homogeneous Tile 60x60", "High Ceiling 3.2m", "Tall French Window"],
        description: "Ruang utama dengan pencahayaan luar biasa dari jendela kaca tinggi bergaya klasik Prancis. Menghubungkan area carport depan dan ruang makan dalam harmoni yang luas.",
        isometricCoords: "M 200,220 L 320,160 L 440,220 L 320,280 Z"
      },
      {
        id: "lyon-dining",
        name: "Ruang Makan & Dapur",
        floor: 1,
        size: "3.0m x 3.0m",
        features: ["Akses Langsung ke Taman Belakang", "Instalasi Air Bersih & Pembuangan Ganda", "Mini Island Bar Potensial"],
        description: "Didesain dengan konsep open-plan yang memaksimalkan sirkulasi. Menyantap hidangan kini lebih tenang berhadapan langsung dengan pemandangan inner courtyard hijau ramah lingkungan.",
        isometricCoords: "M 320,280 L 440,220 L 560,280 L 440,340 Z"
      },
      {
        id: "lyon-bed1",
        name: "Kamar Tidur Lt. 1",
        floor: 1,
        size: "3.0m x 2.6m",
        features: ["Ventilasi Udara Taman", "Stop Kontak Fleksibel", "Sangat Cocok untuk Kamar Anak/Kerja"],
        description: "Kamar tidur lantai bawah yang tenang dengan pemandangan langsung ke taman belakang, cocok untuk anak-anak atau difungsikan sebagai ruang kerja (WFH) yang produktif.",
        isometricCoords: "M 80,160 L 200,100 L 320,160 L 200,220 Z"
      },
      {
        id: "lyon-master",
        name: "Kamar Tidur Utama (Master Bedroom)",
        floor: 2,
        size: "4.2m x 3.5m",
        features: ["Private Balcony", "Walk-in Closet Space", "Koneksi Kamar Mandi Utama"],
        description: "Kamar utama yang mewah di lantai dua. Dilengkapi dengan pintu kaca tinggi yang membuka langsung ke balkon Prancis klasik, memberikan udara pagi Makassar yang menyegarkan.",
        isometricCoords: "M 200,220 L 320,160 L 440,220 L 320,280 Z"
      },
      {
        id: "lyon-bed2",
        name: "Kamar Tidur Anak Lt. 2",
        floor: 2,
        size: "3.0m x 2.8m",
        features: ["Jendela Lebar Menghadap Taman Belakang", "Sirkulasi Udara Silang", "Space Lemari Luas"],
        description: "Terletak di lantai dua bagian belakang, menawarkan privasi dan ketenangan yang pas untuk istirahat anak Anda yang aktif sepanjang hari.",
        isometricCoords: "M 80,160 L 200,100 L 320,160 L 200,220 Z"
      },
      {
        id: "lyon-carport",
        name: "Carport & Entrance Porch",
        floor: 1,
        size: "3.0m x 5.0m",
        features: ["Rabat Beton berpola", "Kanopi Klasik Siap Pasang", "Taman Depan Asri"],
        description: "Koneksi selamat datang yang elegan, mampu menampung mobil keluarga SUV besar secara aman lengkap dengan asri nuanasa pepohonan tropis di sampingnya.",
        isometricCoords: "M 320,340 L 440,280 L 560,340 L 440,400 Z"
      }
    ]
  },
  {
    id: "paris",
    name: "Tipe Paris",
    style: "Classic French Premium Accent",
    lt: 126,
    lb: 117,
    dimension: "9 x 14 m",
    bedrooms: 5,
    bathrooms: 3,
    carports: 2,
    price: 1850000000,
    tagline: "Kemewahan Klasik dengan Ruang Maksimal (9x14) & Double Carport",
    description: "Tipe Paris menyajikan kemewahan hunian berkelas dunia. Dengan fasad Prancis yang megah, pilar kokoh, kapasitas hingga 2 mobil carport, serta tata letak adaptif 4 hingga 5 kamar tidur yang lapang, menjadikannya puncak hunian premium di kawasan Summarecon Mutiara Makassar.",
    advantages: [
      "Dimensi Agung 9 x 14 m untuk Kemegahan Maksimal",
      "Kapasitas Double Carport untuk Keluarga Modern",
      "Kamar Tidur Utama Ekstra Luas dengan Area Cozy Lounge",
      "Struktur Kayu Tahan Gempa Sumitomo Forestry",
      "3-5 Pilihan Ruang Kamar Tidur Adaptif"
    ],
    imageUrl: "rinoka_interior",
    rooms: [
      {
        id: "paris-living",
        name: "Ruang Tamu Utama (Grand Living Room)",
        floor: 1,
        size: "4.5m x 4.5m",
        features: ["Lantai Homogeneous Tile Elegan 80x80", "Ceiling Height 3.5m", "Pintu Masuk Daun Ganda (Double Door)"],
        description: "Area luas bebas sekat yang menyambut tamu secara megah. Cocok untuk menggelar acara keluarga besar, ditunjang jendela lengkung Prancis klasik setinggi 3 meter.",
        isometricCoords: "M 200,220 L 320,160 L 440,220 L 320,280 Z"
      },
      {
        id: "paris-master",
        name: "Grand Master Bedroom Suite",
        floor: 2,
        size: "5.5m x 4.2m",
        features: ["Private Bathroom Inside", "French Juliet Balcony", "Double Wardrobe Area & Vanity Table"],
        description: "Suite utama yang luar biasa melimpahkan rasa kemewahan. Memiliki area bersantai membaca, kamar mandi dalam premium dengan bathtub/shower premium, dan pintu kaca ganda ke balkon.",
        isometricCoords: "M 200,220 L 320,160 L 440,220 L 320,280 Z"
      },
      {
        id: "paris-kitchen",
        name: "Dapur Utama & Dinette Bistro",
        floor: 1,
        size: "3.5m x 3.5m",
        features: ["Premium Solid Surface Worktop", "Jendela Udara Lebar", "Layout L-Shape"],
        description: "Ruang memasak premium yang fungsional dengan paduan bistro makan kecil di samping taman mini, membuat aktivitas kuliner pagi terasa menyenangkan.",
        isometricCoords: "M 320,280 L 440,220 L 560,280 L 440,340 Z"
      },
      {
        id: "paris-bed1",
        name: "Kamar Tidur Lt. 1 (Kamar Tamu/Lansia)",
        floor: 1,
        size: "3.2m x 3.0m",
        features: ["Mudah Diakses Tanpa Tangga", "Samping Kamar Mandi Utama", "Pemandangan Taman Inner-court"],
        description: "Kamar tidur lantai 1 yang dirancang ergonomis, ramah untuk lansia atau tamu sehingga mengedepankan keamanan gerak sirkulasi.",
        isometricCoords: "M 80,160 L 200,100 L 320,160 L 200,220 Z"
      },
      {
        id: "paris-kids1",
        name: "Kamar Tidur Anak Premium 1 (Lt. 2)",
        floor: 2,
        size: "3.5m x 3.0m",
        features: ["Jendela Besar Fasad Depan", "Pencahayaan Alami Optimal", "Desain Dinding Customizable"],
        description: "Kamar anak bernuansa cerah di lantai 2 yang menghadap ke jalan utama rindang, mendukung kreativitas belajar anak.",
        isometricCoords: "M 80,160 L 200,100 L 320,160 L 200,220 Z"
      },
      {
        id: "paris-kids2",
        name: "Kamar Tidur Anak Premium 2 (Lt. 2)",
        floor: 2,
        size: "3.2m x 3.0m",
        features: ["Menghadap Taman Belakang", "Tenang dan Tenang", "Space Meja Belajar Spesifik"],
        description: "Kamar tidur anak kedua di lantai atas yang menawarkan privasi dengan desain modern bergaya Prancis minimalis.",
        isometricCoords: "M 320,280 L 440,220 L 560,280 L 440,340 Z"
      },
      {
        id: "paris-carports",
        name: "Double Carport",
        floor: 1,
        size: "5.5m x 5.0m",
        features: ["Rabat Beton berpola Antislip", "Kapasitas 2 Mobil SUV + City Car", "Dinding Cluster Batu Alam"],
        description: "Area parkir ekstra luas untuk dua kendaraan keluarga. Dilindungi struktur kanopi estetis bawaan Summarecon yang senada dengan fasad rumah.",
        isometricCoords: "M 320,340 L 440,280 L 560,340 L 440,400 Z"
      }
    ]
  }
];

export const AMENITIES_DATA = [
  {
    title: "Club House Eksklusif",
    description: "Fasilitas kolam renang modern bergaya resort, ruang pertemuan VIP, dan area lounge rindang untuk sosialisasi santai bersama tetangga.",
    icon: "SwimmingPool"
  },
  {
    title: "Double Gate Security",
    description: "Keamanan ketat berlapis 24 jam dengan integrasi One-Gate System berbasis Smart Card Access guna kenyamanan total keluarga tercinta.",
    icon: "ShieldAlert"
  },
  {
    title: "Eco Green Zen Yard",
    description: "Kemitraan dengan Sumitomo Forestry menghadirkan taman bernuansa zen Jepang yang tenang, asri, dengan penataan vegetasi ekologis terbaik.",
    icon: "Leaf"
  },
  {
    title: "Underground Utilities",
    description: "Pemandangan bersih tanpa kabel listrik dan internet udara yang berantakan karena seluruh sistem utilitas ditanam rapi di bawah tanah.",
    icon: "Network"
  },
  {
    title: "Modern Smart Home",
    description: "Sentuhan teknologi mutakhir berupa Smart Lock, sensor gerak, IP Camera, gorden pintar, hingga kontrol AC nirkabel dari ponsel Anda.",
    icon: "Smartphone"
  },
  {
    title: "Lokasi Sangat Strategis",
    description: "Hanya 5 menit ke Gerbang Tol Bandara Sultan Hasanuddin, memudahkan mobilitas dinamis baik dalam maupun luar daerah Makassar.",
    icon: "MapPin"
  }
];
