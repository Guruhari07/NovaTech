/* ==========================================================================
   NovaTech Products Data Catalog
   ========================================================================== */

export const products = [
  {
    id: 1,
    name: "AeroMouse Pro Wireless",
    brand: "NovaTech",
    category: "input",
    description: "Sleek ergonomic wireless mouse featuring ultra-silent clicks, dual-mode connectivity (2.4GHz + Bluetooth 5.1), and an optical sensor adjustable up to 4000 DPI. Designed for creators and professionals seeking a quiet workspace.",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.8,
    reviewsCount: 142,
    stock: 12,
    specs: {
      "Connectivity": "2.4GHz USB Receiver & Bluetooth 5.1",
      "DPI Range": "800 / 1600 / 2400 / 4000 DPI",
      "Sensor": "High-Precision Optical",
      "Battery Life": "Up to 70 days on full charge",
      "Charging Port": "USB Type-C",
      "Weight": "78g"
    },
    // Crisp Nothing-inspired line vector SVG
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mouse-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.3" />
          </linearGradient>
        </defs>
        <!-- Background Glow -->
        <circle cx="50" cy="50" r="35" fill="url(#mouse-grad)"/>
        <!-- Main Mouse Body Outline -->
        <path d="M50 15 C33 15 30 35 30 55 C30 75 38 85 50 85 C62 85 70 75 70 55 C70 35 67 15 50 15 Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <!-- Scroll Wheel -->
        <rect x="47.5" y="27" width="5" height="12" rx="2.5" fill="none" stroke="#2563EB" stroke-width="2"/>
        <!-- DPI button -->
        <rect x="48.5" y="44" width="3" height="4" rx="1.5" fill="currentColor"/>
        <!-- Center seam line -->
        <line x1="50" y1="15" x2="50" y2="27" stroke="currentColor" stroke-width="1.5"/>
        <line x1="50" y1="39" x2="50" y2="52" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
        <!-- Hand grip details -->
        <path d="M30 50 C33 55 33 65 30 70" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M70 50 C67 55 67 65 70 70" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 2,
    name: "ApexType Carbon 65%",
    brand: "AeroType",
    category: "input",
    description: "Compact 65% hot-swappable mechanical keyboard. Built with a premium CNC aluminium chassis, carbon plate, lubed linear switches, and doubleshot PBT keycaps. Features fully customizable per-key RGB backlighting.",
    price: 129.99,
    oldPrice: 149.99,
    rating: 4.9,
    reviewsCount: 89,
    stock: 5,
    specs: {
      "Form Factor": "65% Compact Layout (68 Keys)",
      "Switches": "Lubed Linear Switches (Hot-Swappable)",
      "Chassis": "CNC Anodized Aluminium",
      "Backlight": "16.8M Color Per-Key RGB",
      "Stabilizers": "Screw-in PCB Stabilizers",
      "Cable": "Detachable Braided USB-C to A"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kbd-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#kbd-grad)"/>
        <!-- Keyboard Housing -->
        <rect x="15" y="32" width="70" height="36" rx="6" stroke="currentColor" stroke-width="2"/>
        <!-- Esc Key -->
        <rect x="19" y="36" width="6" height="6" rx="1.5" fill="#2563EB"/>
        <!-- Key Grids -->
        <rect x="27" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="35" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="43" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="51" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="59" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="67" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="75" y="36" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        
        <rect x="19" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="27" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="35" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="43" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="51" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="59" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="67" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <rect x="75" y="44" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        
        <rect x="19" y="52" width="8" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <!-- Spacebar -->
        <rect x="31" y="52" width="38" height="6" rx="1.5" stroke="#2563EB" stroke-width="1.5"/>
        <rect x="73" y="52" width="8" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    id: 3,
    name: "SonicWave H1 Headset",
    brand: "AuraSound",
    category: "audio",
    description: "Premium wireless gaming and music headset offering high-resolution spatial audio, hybrid Active Noise Cancellation (ANC), and a broadcast-quality detachable microphone. Features dual connectivity (2.4GHz + BT).",
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.7,
    reviewsCount: 211,
    stock: 8,
    specs: {
      "Drivers": "40mm Custom Dynamic Drivers",
      "Frequency Response": "10Hz - 40kHz",
      "Noise Isolation": "Hybrid ANC (Up to 35dB)",
      "Battery Life": "Up to 45 hours (ANC Off)",
      "Latency": "Ultra-Low Latency <20ms",
      "Microphone": "Detachable Cardioid Mic"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="audio-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="36" fill="url(#audio-grad)"/>
        <!-- Headband arch -->
        <path d="M26 48 C26 22, 74 22, 74 48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M30 40 C30 26, 70 26, 70 40" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
        <!-- Left Cup -->
        <rect x="20" y="44" width="10" height="24" rx="5" stroke="currentColor" stroke-width="2"/>
        <line x1="25" y1="44" x2="25" y2="68" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Right Cup -->
        <rect x="70" y="44" width="10" height="24" rx="5" stroke="currentColor" stroke-width="2"/>
        <line x1="75" y1="44" x2="75" y2="68" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Detachable microphone boom -->
        <path d="M25 60 Q25 76, 42 76" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="42" y="74" width="5" height="4" rx="1" fill="#2563EB"/>
      </svg>
    `
  },
  {
    id: 4,
    name: "MultiLink 8-in-1 USB-C Hub",
    brand: "NovaTech",
    category: "power",
    description: "Sleek aluminum USB-C hub adapter that expands a single port into 8. Features 4K HDMI @60Hz, 100W Power Delivery charging, 3 USB-A 3.2 ports, SD and MicroSD card readers, and a gigabit Ethernet port.",
    price: 49.99,
    oldPrice: 59.99,
    rating: 4.6,
    reviewsCount: 165,
    stock: 15,
    specs: {
      "Input Link": "Integrated USB Type-C Cable",
      "HDMI Port": "4K UHD (3840x2160) @ 60Hz",
      "Power Delivery": "Up to 100W Pass-Through",
      "Data Ports": "3 x USB-A 3.2 Gen 1 (5Gbps)",
      "Card Slots": "SD (UHS-I) & MicroSD",
      "Ethernet": "RJ45 Gigabit Ethernet (1000Mbps)"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hub-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#hub-grad)"/>
        <!-- Hub Body -->
        <rect x="35" y="20" width="30" height="52" rx="4" stroke="currentColor" stroke-width="2"/>
        <!-- Ports Outlines -->
        <rect x="42" y="28" width="16" height="3" rx="0.5" stroke="currentColor" stroke-width="1"/>
        <rect x="42" y="37" width="16" height="3" rx="0.5" stroke="currentColor" stroke-width="1"/>
        <rect x="42" y="46" width="16" height="3" rx="0.5" stroke="currentColor" stroke-width="1"/>
        <!-- SD Slot -->
        <line x1="42" y1="56" x2="58" y2="56" stroke="#2563EB" stroke-width="1.5"/>
        <line x1="42" y1="62" x2="52" y2="62" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Connected cable -->
        <path d="M50 72 C50 82, 30 82, 30 90" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <!-- USB-C Plug -->
        <rect x="27" y="90" width="6" height="7" rx="1.5" fill="#2563EB"/>
      </svg>
    `
  },
  {
    id: 5,
    name: "SwiftDrive 1TB Portable SSD",
    brand: "NovaTech",
    category: "storage",
    description: "High-speed external solid state drive encased in a shock-resistant pocket-sized aluminum case. Achieves blazing read/write speeds up to 1050 MB/s via USB 3.2 Gen 2 connectivity. IP55 dust and water resistant.",
    price: 119.99,
    oldPrice: 139.99,
    rating: 4.8,
    reviewsCount: 94,
    stock: 20,
    specs: {
      "Capacity": "1 Terabyte (1000GB)",
      "Read Transfer": "Up to 1050 MB/s",
      "Write Transfer": "Up to 1000 MB/s",
      "Interface": "USB 3.2 Gen 2 Type-C",
      "Durability": "IP55 Water/Dust Resistant & 2m Drop Proof",
      "Security": "256-bit AES Hardware Encryption"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ssd-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#ssd-grad)"/>
        <!-- Drive Shell -->
        <rect x="30" y="22" width="40" height="56" rx="6" stroke="currentColor" stroke-width="2"/>
        <!-- Stylized texture lines -->
        <line x1="36" y1="30" x2="64" y2="30" stroke="currentColor" stroke-width="1" stroke-dasharray="1 3"/>
        <line x1="36" y1="36" x2="64" y2="36" stroke="currentColor" stroke-width="1" stroke-dasharray="1 3"/>
        <!-- Status indicator LED -->
        <circle cx="50" cy="62" r="2" fill="#2563EB"/>
        <!-- Stylized brand mark -->
        <rect x="42" y="46" width="16" height="8" rx="2" stroke="#2563EB" stroke-width="1.5"/>
        <line x1="45" y1="50" x2="55" y2="50" stroke="#2563EB" stroke-width="1"/>
      </svg>
    `
  },
  {
    id: 6,
    name: "Elevate Ergonomic Stand",
    brand: "NovaTech",
    category: "input",
    description: "Premium aircraft-grade aluminium laptop stand designed to improve posture. Featuring fully adjustable height and angle settings, anti-slip silicone cushions, and an open layout that maximizes laptop ventilation.",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.7,
    reviewsCount: 118,
    stock: 0, // Mock out of stock to test stock handling!
    specs: {
      "Material": "Anodized Aircraft-Grade Aluminum Alloy",
      "Adjustability": "6 Ergonomic Angle Adjustments (15° - 45°)",
      "Compatibility": "All Laptops & Tablets from 10\" to 17.3\"",
      "Weight Capacity": "Supports up to 20kg (44lbs)",
      "Protection": "10 Anti-Skid Protective Rubber Pads",
      "Foldability": "Fully collapsible with carrying sleeve"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#stand-grad)"/>
        <!-- Stand Legs -->
        <path d="M25 72 L35 40 L65 40 L75 72" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <!-- Stand Arms (Upwards) -->
        <path d="M35 40 L45 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M65 40 L55 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <!-- Laptop Support shelf line -->
        <line x1="20" y1="68" x2="80" y2="68" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
        <!-- Bottom curved hooks -->
        <path d="M20 68 C20 72 23 72 23 68" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
        <path d="M80 68 C80 72 77 72 77 68" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/>
        <!-- Adjusting bar struts -->
        <line x1="35" y1="40" x2="50" y2="68" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="65" y1="40" x2="50" y2="68" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
      </svg>
    `
  },
  {
    id: 7,
    name: "AuraSound Pocket Speaker",
    brand: "AuraSound",
    category: "audio",
    description: "Compact 360-degree portable Bluetooth speaker. Features deep bass drivers, IPX7 waterproof rating, and a customizable circular ambient LED ring that syncs with your music. Includes 15 hours of battery life.",
    price: 69.99,
    oldPrice: 79.99,
    rating: 4.8,
    reviewsCount: 177,
    stock: 14,
    specs: {
      "Audio Output": "10W RMS (360° Omnidirectional)",
      "Wireless Standard": "Bluetooth 5.3 (Up to 20m range)",
      "Waterproofing": "IPX7 Waterproof (Submersible in 1m water)",
      "Battery Capacity": "2600mAh (Up to 15 hours runtime)",
      "LED Effects": "5 Ambient Color Sync Modes",
      "Stereo Link": "TWS Pairing (Connects 2 speakers)"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spk-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#spk-grad)"/>
        <!-- Cylinder Speaker Body -->
        <rect x="36" y="24" width="28" height="52" rx="10" stroke="currentColor" stroke-width="2"/>
        <!-- Metallic Top cap -->
        <path d="M36 34 C36 34, 50 38, 64 34" stroke="currentColor" stroke-width="1.5"/>
        <!-- Ambient LED Ring -->
        <ellipse cx="50" cy="30" rx="10" ry="3" stroke="#2563EB" stroke-width="2"/>
        <!-- Dot Grille Pattern -->
        <circle cx="44" cy="46" r="1" fill="currentColor"/>
        <circle cx="50" cy="46" r="1" fill="currentColor"/>
        <circle cx="56" cy="46" r="1" fill="currentColor"/>
        <circle cx="42" cy="52" r="1" fill="currentColor"/>
        <circle cx="48" cy="52" r="1" fill="currentColor"/>
        <circle cx="54" cy="52" r="1" fill="currentColor"/>
        <circle cx="60" cy="52" r="1" fill="currentColor"/>
        <circle cx="44" cy="58" r="1" fill="currentColor"/>
        <circle cx="50" cy="58" r="1" fill="currentColor"/>
        <circle cx="56" cy="58" r="1" fill="currentColor"/>
        <circle cx="48" cy="64" r="1" fill="currentColor"/>
        <circle cx="54" cy="64" r="1" fill="currentColor"/>
        <!-- Control buttons indicators -->
        <path d="M47 70 H53" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50 67 V73" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    id: 8,
    name: "MagCharge Duo Wireless Pad",
    brand: "MagCharge",
    category: "power",
    description: "Ultra-thin magnetic dual wireless charging station. Charge your compatible smartphone and wireless earbuds simultaneously at maximum speed. Styled in premium tempered glass and aluminum.",
    price: 34.99,
    oldPrice: 44.99,
    rating: 4.5,
    reviewsCount: 139,
    stock: 9,
    specs: {
      "Input Adapter": "USB-C PD 3.0 (Min 20W Recommended)",
      "Wireless Output": "15W Max (Phone) + 5W Max (Earbuds)",
      "Alignment": "MagSafe Compatible Magnetic Coils",
      "Protection": "Foreign Object Detection, Surge, Heat Control",
      "Material": "Anodized Base with Tempered Glass Face",
      "Dimensions": "160mm x 80mm x 6.5mm"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#chg-grad)"/>
        <!-- Duo Pad Base Oval -->
        <rect x="20" y="34" width="60" height="32" rx="16" stroke="currentColor" stroke-width="2"/>
        <!-- Left Magnetic Ring (Phone) -->
        <circle cx="38" cy="50" r="11" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="38" cy="50" r="7" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
        <!-- Right Charging Spot (Earbuds) -->
        <ellipse cx="62" cy="50" rx="9" ry="6" stroke="currentColor" stroke-width="1.5"/>
        <!-- Charging Lightning Bolts -->
        <path d="M38 46 L35 51 H40 L37 55" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M62 47 L60 51 H64 L62 54" stroke="#2563EB" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    id: 9,
    name: "NovaBand Active Smartwatch",
    brand: "NovaTech",
    category: "storage", // Grouped into storage/wearables
    description: "Sleek fitness smartwatch featuring an AMOLED display, continuous heart rate and SpO2 tracking, integrated GPS, and 12 exercise modes. Enjoy up to 10 days of battery life on a single charge.",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.6,
    reviewsCount: 154,
    stock: 11,
    specs: {
      "Display": "1.43\" AMOLED Touchscreen (326 PPI)",
      "Sensors": "Heart Rate, SpO2, Accelerometer, Gyroscope",
      "Tracking": "GPS, Glonass, Galileo Satellite Tracking",
      "Water Resistance": "5ATM Waterproof (Up to 50 meters)",
      "Battery Capacity": "300mAh (Up to 10 days normal use)",
      "Companion App": "iOS 12.0+ & Android 7.0+ Compatible"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="watch-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#watch-grad)"/>
        <!-- Watch Bands -->
        <path d="M36 26 H64 V15 H36 V26Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M36 74 H64 V85 H36 V74Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <!-- Watch Body casing -->
        <rect x="30" y="26" width="40" height="48" rx="10" stroke="currentColor" stroke-width="2"/>
        <rect x="33" y="29" width="34" height="42" rx="7" fill="var(--bg-primary)" stroke="currentColor" stroke-width="1"/>
        <!-- Screen interface outline -->
        <circle cx="50" cy="50" r="14" stroke="#2563EB" stroke-width="1.5"/>
        <path d="M46 50 H54" stroke="#2563EB" stroke-width="1.5"/>
        <path d="M50 46 V54" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Crown dial -->
        <rect x="70" y="44" width="2" height="12" rx="1" fill="currentColor"/>
      </svg>
    `
  },
  {
    id: 10,
    name: "StreamCam HD 1080P Webcam",
    brand: "NovaTech",
    category: "audio", // webcam is audio-visual
    description: "High-definition 1080P webcam recording fluid video at 60 FPS. Featuring advanced autofocus, exposure correction, dual noise-reducing stereo microphones, and a physical magnetic privacy shutter.",
    price: 44.99,
    oldPrice: 54.99,
    rating: 4.7,
    reviewsCount: 122,
    stock: 18,
    specs: {
      "Resolution": "1080P Full HD @ 60 FPS",
      "Field of View": "78° Wide Angle Lens",
      "Focus Type": "Smart Autofocus (7cm to infinity)",
      "Audio Capture": "Built-in Dual Stereo Omnidirectional Mics",
      "Mounting Option": "Universal Tripod-ready clip, 360° Swivel",
      "Connection": "Plug & Play USB 2.0 (1.5m Cable)"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cam-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#cam-grad)"/>
        <!-- Webcam spherical mount body -->
        <circle cx="50" cy="44" r="22" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="44" r="14" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
        <!-- Camera Lens Glass -->
        <circle cx="50" cy="44" r="8" stroke="#2563EB" stroke-width="2" fill="none"/>
        <circle cx="48" cy="42" r="2" fill="#2563EB"/>
        <!-- Indicator LED -->
        <circle cx="64" cy="38" r="1.5" fill="#10b981"/>
        <!-- Support Clamp mount stand -->
        <path d="M38 66 L50 60 L62 66" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M42 66 L42 80 H58 L58 74" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    id: 11,
    name: "Horizon Curved 34\" Monitor",
    brand: "NovaTech",
    category: "input",
    description: "Immersive 34-inch ultrawide curved monitor with a 1500R curvature radius, UWQHD resolution, and a fluid 144Hz refresh rate. Fully calibrated for sRGB color accuracy, designed to elevate visual design and productivity environments.",
    price: 349.99,
    oldPrice: 399.99,
    rating: 4.8,
    reviewsCount: 63,
    stock: 4,
    specs: {
      "Screen Size": "34 Inch (1500R Curvature)",
      "Resolution": "3440 x 1440 UWQHD (21:9 Aspect)",
      "Refresh Rate": "144Hz",
      "Panel Type": "VA Panel (sRGB 99%)",
      "Inputs": "2 x HDMI 2.0, 2 x DisplayPort 1.4",
      "Mounting": "VESA 100x100mm, Ergonomic stand included"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mon-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#mon-grad)"/>
        <!-- Curved Screen Bezel outline -->
        <path d="M15 32 C15 32, 50 36, 85 32 V58 C85 58, 50 62, 15 58 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <!-- Inner screen display edge -->
        <path d="M18 35 C18 35, 50 38, 82 35 V55 C82 55, 50 58, 18 55 Z" stroke="#2563EB" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Stand strut -->
        <path d="M48 60 L44 76 H56 L52 60" stroke="currentColor" stroke-width="2"/>
        <!-- Stand Base -->
        <path d="M35 78 Q50 75, 65 78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="18" y1="35" x2="35" y2="35" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      </svg>
    `
  },
  {
    id: 12,
    name: "DeskPad Felt wool Mat",
    brand: "NovaTech",
    category: "input",
    description: "Premium double-layer workspace desk mat made from biodegradable Merino wool felt. Features anti-fray stitching, a non-slip natural cork backing layer, and a dense texture that provides optimal mouse tracking and writing comfort.",
    price: 34.99,
    oldPrice: 44.99,
    rating: 4.7,
    reviewsCount: 151,
    stock: 22,
    specs: {
      "Material": "100% Merino Wool Felt top, Cork backing",
      "Dimensions": "800mm x 300mm (Medium Size)",
      "Thickness": "4mm Double Layered",
      "Stitching": "Anti-Fray Reinforced Border",
      "Maintenance": "Lint-roller safe, vacuum compatible",
      "Texture": "High-Density wool surface"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pad-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#pad-grad)"/>
        <!-- Felt Pad Rounded Rectangle -->
        <rect x="18" y="32" width="64" height="36" rx="6" stroke="currentColor" stroke-width="2"/>
        <!-- Stitching Border effect -->
        <rect x="21" y="35" width="58" height="30" rx="4" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1" opacity="0.6"/>
        <!-- Cozy coffee cup on mat visual -->
        <circle cx="30" cy="50" r="5" stroke="#2563EB" stroke-width="1.5"/>
        <path d="M35 48 C37 48 37 52 35 52" stroke="#2563EB" stroke-width="1.5"/>
        <!-- Cozy pen outline on mat visual -->
        <line x1="68" y1="42" x2="74" y2="48" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="75" cy="49" r="0.5" fill="#2563EB"/>
      </svg>
    `
  },
  {
    id: 13,
    name: "CushionGlide Wrist Rest",
    brand: "AeroType",
    category: "input",
    description: "Ergonomic keyboard wrist rest core-filled with cooling gel memory foam. Encased in a breathable spandex sleeve with a heavy-duty non-slip textured rubber base to align your hands and prevent wrist fatigue.",
    price: 24.99,
    oldPrice: 29.99,
    rating: 4.6,
    reviewsCount: 88,
    stock: 15,
    specs: {
      "Ergonomics": "Contoured Height Alignment (20mm)",
      "Core Material": "Slow-Rebound Memory Gel Foam",
      "Base Material": "Heavy Anti-Slip Textured PU Rubber",
      "Dimensions": "360mm x 80mm (Ideal for 65%/TKL)",
      "Fabric Cover": "Breathable cooling spandex weave",
      "Weight": "190g"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wrist-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#wrist-grad)"/>
        <!-- Wrist Rest Long rounded shape -->
        <rect x="15" y="44" width="70" height="12" rx="6" stroke="currentColor" stroke-width="2"/>
        <!-- Contour wave lines to represent soft gel support -->
        <path d="M22 50 C32 48 38 52 48 50 C58 48 64 52 74 50" stroke="#2563EB" stroke-width="1" stroke-linecap="round"/>
        <path d="M22 52 C32 50 38 54 48 52 C58 50 64 54 74 52" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
      </svg>
    `
  },
  {
    id: 14,
    name: "SonicBuds Pro ANC",
    brand: "AuraSound",
    category: "audio",
    description: "Next-gen true wireless active noise-cancelling earbuds. Delivers warm, expansive sound through custom graphene diaphragms. Features smart ambient transparency options and 28 hours total battery life.",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.8,
    reviewsCount: 119,
    stock: 14,
    specs: {
      "Noise Suppression": "Active ANC up to 40dB reduction",
      "Drivers": "11mm Dual Graphene Dynamic Drivers",
      "Battery Charge": "7 Hours (Buds) / 28 Hours (With Case)",
      "Wireless Link": "Bluetooth 5.2 (Fast Pair, AAC)",
      "Charging Base": "USB-C & Qi Wireless Charging compatible",
      "Weather rating": "IPX5 Sweat/Water Splash Resistant"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="buds-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#buds-grad)"/>
        <!-- Charging Case shell -->
        <rect x="34" y="32" width="32" height="36" rx="8" stroke="currentColor" stroke-width="2"/>
        <line x1="34" y1="44" x2="66" y2="44" stroke="currentColor" stroke-width="1.5"/>
        <!-- Charging indicator dot -->
        <circle cx="50" cy="54" r="1.5" fill="#10b981"/>
        <!-- Earbud Left -->
        <path d="M22 36 Q22 28, 28 28 A4 4 0 0 1 32 32 V38 Q28 40, 22 36 Z" stroke="#2563EB" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Earbud Right -->
        <path d="M78 36 Q78 28, 72 28 A4 4 0 0 0 68 32 V38 Q72 40, 78 36 Z" stroke="#2563EB" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    id: 15,
    name: "Lumina ScreenBar Light",
    brand: "NovaTech",
    category: "power",
    description: "Monitor light bar clip designed to mount onto screens. Casts asymmetrical downlight that illuminates your workspace desk area while creating zero screen glare. Adjustable temperature and auto-dimming features.",
    price: 49.99,
    oldPrice: 64.99,
    rating: 4.7,
    reviewsCount: 134,
    stock: 16,
    specs: {
      "Luminous Flux": "500 Lumens Max (Stepless dimming)",
      "Color Temperature": "2700K (Warm) - 6500K (Cool)",
      "Screen Fit": "Clamps monitors 1cm - 3cm thickness",
      "Power Connection": "USB-C Powered (5V 1A adapter included)",
      "Controls": "Smart Touch controls on right side cap",
      "Optics": "Asymmetric optical path (No Glare)"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="light-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="light-beam" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#light-grad)"/>
        <!-- Light rays beam downward -->
        <polygon points="15,42 85,42 95,85 5,85" fill="url(#light-beam)"/>
        <!-- Light bar thin cylinder -->
        <rect x="20" y="38" width="60" height="4" rx="2" stroke="currentColor" stroke-width="2" fill="var(--bg-secondary)"/>
        <!-- Middle mount bracket -->
        <rect x="47" y="32" width="6" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        <line x1="50" y1="24" x2="50" y2="32" stroke="currentColor" stroke-width="1.5"/>
        <!-- Light highlight -->
        <line x1="24" y1="40" x2="76" y2="40" stroke="#F59E0B" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    id: 16,
    name: "ErgoVertical Silent Mouse",
    brand: "NovaTech",
    category: "input",
    description: "Vertical wireless ergonomic mouse featuring a unique 57-degree natural handshake grip angle. Completely reduces forearm tension and muscle strain while silent switches make it perfect for quiet workspaces.",
    price: 44.99,
    oldPrice: 59.99,
    rating: 4.6,
    reviewsCount: 95,
    stock: 12,
    specs: {
      "Hand Angle": "57° Handshake Position",
      "Switches": "Silent Microswitches (Tactile, Silent)",
      "Sensor Resolution": "1000 / 1600 / 2400 DPI",
      "Wireless Channels": "Bluetooth 5.0 + 2.4G Dual channel",
      "Charging Port": "USB Type-C (500mAh built-in battery)",
      "Weight": "115g"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vmouse-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#vmouse-grad)"/>
        <!-- Vertical Mouse side slope contour outline -->
        <path d="M38 80 C32 80 28 65 34 50 C40 35 48 20 60 22 C72 24 70 45 68 60 C66 75 50 80 38 80 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <!-- Curved Thumb indent slot -->
        <path d="M34 58 C38 58 44 64 42 70" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Primary side clicks seam -->
        <path d="M60 22 Q60 38, 54 48" stroke="#2563EB" stroke-width="1.5"/>
        <rect x="58" y="28" width="3" height="8" rx="1.5" fill="none" stroke="#2563EB" stroke-width="1" style="transform: rotate(5deg);"/>
      </svg>
    `
  },
  {
    id: 17,
    name: "ThunderLink USB4 Cable",
    brand: "NovaTech",
    category: "power",
    description: "Premium braided Thunderbolt 4 and USB4 certified Type-C to C cable. Capable of transferring data up to 40Gbps and delivering up to 240W of Power Delivery for high-performance displays and charging rigs.",
    price: 29.99,
    oldPrice: 34.99,
    rating: 4.8,
    reviewsCount: 79,
    stock: 25,
    specs: {
      "Standards Certs": "USB4, Thunderbolt 4 & DP Alternate Mode",
      "Data Transfer": "Blazing fast up to 40Gbps speed",
      "Power Handling": "240W Extended Power Range (48V 5A)",
      "Cable Length": "1.5 Meters (5 Feet)",
      "Connector Shell": "Anodized space-grey aluminium housing",
      "Conductors": "Coaxial silver plated copper wires"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cable-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#cable-grad)"/>
        <!-- Coiled braided cable circles -->
        <circle cx="50" cy="50" r="22" stroke="currentColor" stroke-width="3" stroke-dasharray="4 2"/>
        <circle cx="50" cy="50" r="16" stroke="currentColor" stroke-width="3" stroke-dasharray="2 4" opacity="0.6"/>
        <!-- Connector plugs -->
        <rect x="20" y="32" width="6" height="12" rx="1.5" fill="#2563EB" style="transform: rotate(35deg);"/>
        <rect x="68" y="58" width="6" height="12" rx="1.5" fill="#2563EB" style="transform: rotate(-35deg);"/>
        <!-- Thunderbolt Bolt logo detail -->
        <path d="M48 45 L45 50 H51 L48 55" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  },
  {
    id: 18,
    name: "ApexSlim Scissor Keyboard",
    brand: "AeroType",
    category: "input",
    description: "Ultra-slim wireless scissor keyboard with a modern Tenkeyless layout. Pair and swap between 3 devices instantly. Perfect low-profile option with silent switches and a premium anodized metal frame.",
    price: 79.99,
    oldPrice: 89.99,
    rating: 4.7,
    reviewsCount: 110,
    stock: 9,
    specs: {
      "Form Factor": "Ultra-thin Tenkeyless (TKL) layout",
      "Switch Type": "Low-profile Scissor Switches (1.8mm travel)",
      "Multi-Device": "Bluetooth 5.0 (3 Channels) & 2.4G USB",
      "Battery Life": "Up to 90 days recharge cycle",
      "Structure": "Anodized Space-Aluminium faceplate",
      "Weight": "420g"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="slim-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#slim-grad)"/>
        <!-- Thin Keyboard Housing -->
        <rect x="18" y="38" width="64" height="24" rx="4" stroke="currentColor" stroke-width="2"/>
        <line x1="18" y1="41" x2="82" y2="41" stroke="#2563EB" stroke-width="1"/>
        <!-- Micro key grid rows -->
        <rect x="22" y="44" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="30" y="44" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="38" y="44" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="46" y="44" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="54" y="44" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="62" y="44" width="6" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="70" y="44" width="8" height="4" rx="1" stroke="#2563EB" stroke-width="1"/>
        
        <rect x="22" y="52" width="8" height="4" rx="1" stroke="#2563EB" stroke-width="1"/>
        <rect x="32" y="52" width="36" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
        <rect x="70" y="52" width="8" height="4" rx="1" stroke="currentColor" stroke-width="1"/>
      </svg>
    `
  },
  {
    id: 19,
    name: "SwiftKeys 256GB USB Drive",
    brand: "NovaTech",
    category: "storage",
    description: "Compact dual-connector flash drive with high-grade metal zinc casing. Seamlessly move files at high speed (400MB/s) between USB-A and USB-C computers, smartphones, and tablets.",
    price: 34.99,
    oldPrice: 39.99,
    rating: 4.5,
    reviewsCount: 145,
    stock: 30,
    specs: {
      "Memory Space": "256 Gigabytes (High-Density NAND)",
      "Read Rate": "Up to 400 Megabytes per second",
      "Write Rate": "Up to 150 Megabytes per second",
      "Ports link": "Dual Connectors (Type-C & Type-A ports)",
      "Construction": "Solid Zinc Alloy slide casing",
      "Keychain hook": "Integrated secure loop hole"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fld-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#fld-grad)"/>
        <!-- Flash Drive body -->
        <rect x="36" y="30" width="28" height="40" rx="3" stroke="currentColor" stroke-width="2" fill="var(--bg-secondary)"/>
        <!-- Port plug details -->
        <rect x="42" y="24" width="16" height="6" rx="1" stroke="currentColor" stroke-width="1.5" fill="#2563EB"/>
        <!-- Swivel metal cover outline -->
        <path d="M30 46 H44 V68 Q44 74, 38 74 Q32 74, 30 68 Z" stroke="currentColor" stroke-width="1.5" fill="none" style="transform: rotate(35deg); transform-origin: 37px 46px;"/>
        <circle cx="50" cy="55" r="3" stroke="#2563EB" stroke-width="1.5"/>
      </svg>
    `
  },
  {
    id: 20,
    name: "StreamCam Ultra 4K Webcam",
    brand: "NovaTech",
    category: "audio",
    description: "Professional grade 4K Ultra HD webcam with a premium glass lens and a high-fidelity quad microphone array. Includes AI auto-framing, smart light correction, and a sturdy desktop tripod mount accessory.",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.9,
    reviewsCount: 45,
    stock: 8,
    specs: {
      "Video Output": "4K Ultra HD @ 30 FPS / 1080P @ 60 FPS",
      "Lens Element": "Premium glass lens with anti-reflection coating",
      "Field View Angle": "90° Diagonal wide angle capture",
      "Smart Focus": "AI Face detection tracking autofocus",
      "Mic Capture": "Quad omnidirectional microphones with noise-cancel",
      "Tripod Support": "Professional 3-legged mini tripod included"
    },
    imageSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cam4k-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#cam4k-grad)"/>
        <!-- Main cylinder camera face horizontal -->
        <rect x="25" y="32" width="50" height="24" rx="12" stroke="currentColor" stroke-width="2" fill="var(--bg-secondary)"/>
        <!-- Large center lens ring -->
        <circle cx="50" cy="44" r="10" stroke="#2563EB" stroke-width="2"/>
        <circle cx="50" cy="44" r="6" stroke="currentColor" stroke-width="1"/>
        <circle cx="52" cy="42" r="1.5" fill="#2563EB"/>
        <!-- Small details (indicator lights) -->
        <circle cx="34" cy="44" r="1" fill="#10b981"/>
        <!-- Tripod mount legs -->
        <path d="M50 56 V68 L36 84" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 68 L64 84" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 68 V85" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  }
];

