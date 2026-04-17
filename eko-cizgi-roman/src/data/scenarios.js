export const scenarios = [
  {
    id: "gol_son_nefes",
    title: "Gölün Son Nefesi",
    subtitle: "Burdur Gölü'nde kaybolan flamingolar",
    difficulty: "Başlangıç",
    estimatedTime: "20-25 dk",
    colorTheme: "#3498DB",
    bioTrizPrinciples: ["goz_doku", "akiskanlik", "dongu"],
    suggestedStructure: [
      { panel: 0, role: "baslangic", hint: "Gölü ve flamingolarını tanıt" },
      { panel: 1, role: "sorun",     hint: "Tuzluluk artışını göster" },
      { panel: 2, role: "catisma",   hint: "Flamingolar göç ediyor" },
      { panel: 3, role: "donum",     hint: "Bio-TRIZ fikri doğuyor" },
      { panel: 4, role: "cozum",     hint: "Doğadan ilham alınan sistem" },
      { panel: 5, role: "sonuc",     hint: "Flamingolar geri dönüyor" }
    ],
    backgrounds: [
      { id: "lake_clean", label: "Sağlıklı Göl", url: "https://images.unsplash.com/photo-1542261642-eac668a69d7c?w=600&auto=format&fit=crop" },
      { id: "lake_toxic",  label: "Kirli Göl", url: "https://images.unsplash.com/photo-1507569106096-7bb22d251f2b?w=600&auto=format&fit=crop" },
      { id: "flamingos",    label: "Flamingo Sürüsü", url: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "sehrin_derisi",
    title: "Şehrin Derisi",
    subtitle: "Kentsel ısı adası sorunu",
    difficulty: "Orta",
    estimatedTime: "25-30 dk",
    colorTheme: "#E84545",
    bioTrizPrinciples: ["bilesik_yapi", "enerji_donusum", "simetri_kirma"],
    suggestedStructure: [
      { panel: 0, role: "baslangic", hint: "Beton şehri göster" },
      { panel: 1, role: "sorun",     hint: "Sıcaklık ve boğucu hava" },
      { panel: 2, role: "catisma",   hint: "Klimalar yetmiyor" },
      { panel: 3, role: "donum",     hint: "Termit yuvası ilkesi keşfi" },
      { panel: 4, role: "cozum",     hint: "Biyomimetik bina kaplaması" },
      { panel: 5, role: "sonuc",     hint: "Serin, yaşanabilir şehir" }
    ],
    backgrounds: [
      { id: "city_hot", label: "Kavurucu Şehir", url: "https://images.unsplash.com/photo-1510251197878-a2e6d2bc6bfa?w=600&auto=format&fit=crop" },
      { id: "city_night",  label: "Şehir Gece", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&auto=format&fit=crop" },
      { id: "building_close",    label: "Bina Yakın Çekim", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "gorunmez_ag",
    title: "Görünmez Ağ",
    subtitle: "Toprak erozyonu ve tarım alanı kaybı",
    difficulty: "Orta",
    estimatedTime: "30 dk",
    colorTheme: "#27AE60",
    bioTrizPrinciples: ["organik_buyume", "parcalara_ayirma"],
    suggestedStructure: [
      { panel: 0, role: "baslangic", hint: "Verimli görünen ama zayıf toprak" },
      { panel: 1, role: "sorun",     hint: "Rüzgar ve su erozyonu" },
      { panel: 2, role: "catisma",   hint: "Çiftçinin çaresizliği" },
      { panel: 3, role: "donum",     hint: "Mantar misel ağı felsefesi" },
      { panel: 4, role: "cozum",     hint: "Kökleri tutan yeni biyolojik ağ" },
      { panel: 5, role: "sonuc",     hint: "Toprak restorasyonu" }
    ],
    backgrounds: [
      { id: "farm_dry", label: "Kuru Çiftlik", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop" },
      { id: "soil_crack",  label: "Çatlamış Toprak", url: "https://images.unsplash.com/photo-1473656111867-aa63a0335e47?w=600&auto=format&fit=crop" },
      { id: "forest_aerial",    label: "Orman Havadan", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop" }
    ]
  },
  {
    id: "derin_sessizlik",
    title: "Derin Sessizlik",
    subtitle: "Okyanus gürültü kirliliği",
    difficulty: "İleri",
    estimatedTime: "35 dk",
    colorTheme: "#1A1B41",
    bioTrizPrinciples: ["gözenekli_yapi", "simetri_kirma"],
    suggestedStructure: [
      { panel: 0, role: "baslangic", hint: "Sakin sualtı yaşamı" },
      { panel: 1, role: "sorun",     hint: "Devasa gemi motoru gürültüsü" },
      { panel: 2, role: "catisma",   hint: "Balinaların yönünü kaybetmesi" },
      { panel: 3, role: "donum",     hint: "Baykuş tüyü yapısının incelenmesi" },
      { panel: 4, role: "cozum",     hint: "Sessiz pervanelerin tasarımı" },
      { panel: 5, role: "sonuc",     hint: "Huzurlu okyanus iletişimi" }
    ],
    backgrounds: [
      { id: "underwater_calm", label: "Sakin Sualtı", url: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&auto=format&fit=crop" },
      { id: "ship_propeller",  label: "Gemi Pervanesi", url: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&auto=format&fit=crop" },
      { id: "ocean_surface",    label: "Okyanus Yüzeyi", url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&auto=format&fit=crop" }
    ]
  }
];
