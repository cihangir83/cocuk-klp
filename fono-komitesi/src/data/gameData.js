export const projects = [
  {
    id: "aquafilter",
    name: "AquaFilter",
    tagline: "Su arıtma — Balina fitresi ilkesi",
    color: "#00A8FF",
    presenterType: "scientist",
    biomimeticSource: "Balina baleni",
    trizPrinciple: "Gözenekli Yapı + Filtrasyon",
    scores: {
      "maliyet_etkinligi": 8.2,
      "ekolojik_etki": 7.1,
      "uygulanabilirlik": 9.0,
      "yenilikcilik": 6.3,
      "surdurulebilirlik": 8.5,
      "olceklenebilirlik": 7.8,
      "sosyal_fayda": 8.0,
      "zaman_cercevesi": 9.2
    },
    presentationText: [
      "Balina ağzındaki balen plakaları saniyede tonlarca suyu filtreler.",
      "Enerji harcamadan. Kimyasal olmadan. Sadece geometri.",
      "AquaFilter bu yapıyı kentsel su arıtmada kullanıyor.",
      "Maliyet: Geleneksel sistemin %40'ı.",
      "Kapasite: Günde 500.000 litre.",
      "Atık: Sıfır kimyasal."
    ],
    holographicVisuals: [
      { text: "Doğal Balen Filtresi", type: "nature" },
      { text: "Mikro Gözenekler", type: "tech" }
    ]
  },
  {
    id: "solarskin",
    name: "SolarSkin",
    tagline: "Enerji üretimi — Kelebek kanat yapısı",
    color: "#FF6B35",
    presenterType: "businessman",
    biomimeticSource: "Morpho Kelebeği",
    trizPrinciple: "Yapısal Yüzey İnovasyonu",
    scores: {
      "maliyet_etkinligi": 5.1,
      "ekolojik_etki": 9.2,
      "uygulanabilirlik": 6.0,
      "yenilikcilik": 9.8,
      "surdurulebilirlik": 8.9,
      "olceklenebilirlik": 8.5,
      "sosyal_fayda": 7.5,
      "zaman_cercevesi": 6.8
    },
    presentationText: [
      "Geleneksel güneş paneli verimsiz. Düz. Sınırlı açı.",
      "Morpho kelebeği kanatları hiçbir açıdan ışık kaçırmıyor.",
      "Yapısal renk değil — yapısal enerji toplama.",
      "SolarSkin bina yüzeylerinin tamamını enerji kaynağına dönüştürüyor.",
      "Verimlilik artışı: %340.",
      "Kurulum süresi: 3 gün."
    ],
    holographicVisuals: [
      { text: "Morpho Kanadı", type: "nature" },
      { text: "3D Nano Yüzey Kaplaması", type: "tech" }
    ]
  },
  {
    id: "rootnet",
    name: "RootNet",
    tagline: "Toprak restorasyonu — Mantar misel ağı",
    color: "#00D68F",
    presenterType: "ecologist",
    biomimeticSource: "Mantar Misel Ağı",
    trizPrinciple: "Ağ ve Dağılım",
    scores: {
      "maliyet_etkinligi": 7.0,
      "ekolojik_etki": 9.9,
      "uygulanabilirlik": 7.3,
      "yenilikcilik": 7.5,
      "surdurulebilirlik": 9.8,
      "olceklenebilirlik": 6.5,
      "sosyal_fayda": 9.0,
      "zaman_cercevesi": 5.5
    },
    presentationText: [
      "Ormanlar birbirini besler.",
      "Mantar ağları sayesinde.",
      "Komşu ağaç hastalanınca diğerleri besini ona yönlendirir.",
      "RootNet bu ağı yapay olarak kuruyor.",
      "Erozyona uğramış arazileri 18 ayda restore ediyor.",
      "Bu sadece bir teknoloji değil. Bir ekosistem."
    ],
    holographicVisuals: [
      { text: "Yeraltı Misel Ağı", type: "nature" },
      { text: "Biyo-çözünür Sensör Ağı", type: "tech" }
    ]
  },
  {
    id: "windspine",
    name: "WindSpine",
    tagline: "Rüzgar enerjisi — Balina yüzgeci geometrisi",
    color: "#9B59FF",
    presenterType: "engineer",
    biomimeticSource: "Kambur Balina Yüzgeci",
    trizPrinciple: "Çıkıntılar ve Türbülans Kontrolü",
    scores: {
      "maliyet_etkinligi": 8.8,
      "ekolojik_etki": 7.8,
      "uygulanabilirlik": 9.1,
      "yenilikcilik": 7.9,
      "surdurulebilirlik": 8.1,
      "olceklenebilirlik": 9.4,
      "sosyal_fayda": 8.2,
      "zaman_cercevesi": 8.5
    },
    presentationText: [
      "Tubercle etkisi.",
      "Balina yüzgecinin önündeki tümsekler türbülansı önler.",
      "Standart rüzgar türbini bu geometriyi kullanmıyor.",
      "WindSpine kullanıyor.",
      "Verimlilik artışı: %32.",
      "Gürültü azalması: %72. Bakım devri: 2 kat."
    ],
    holographicVisuals: [
      { text: "Tubercle Tüberkül Tümsekleri", type: "nature" },
      { text: "Aerodinamik Rüzgar Akışı", type: "tech" }
    ]
  }
];

export const allCriteria = [
  { id: "maliyet_etkinligi", name: "Maliyet Etkinliği", description: "Birim başına maliyet ve ROI" },
  { id: "ekolojik_etki", name: "Ekolojik Etki", description: "Çevre üzerindeki pozitif etki" },
  { id: "uygulanabilirlik", name: "Uygulanabilirlik", description: "Gerçek dünyada uygulanma kolaylığı" },
  { id: "yenilikcilik", name: "Yenilikçilik", description: "Özgünlük ve teknolojik ilerleme" },
  { id: "surdurulebilirlik", name: "Sürdürülebilirlik", description: "Uzun vadeli kalıcılık" },
  { id: "olceklenebilirlik", name: "Ölçeklenebilirlik", description: "Büyüme ve yayılma potansiyeli" },
  { id: "sosyal_fayda", name: "Sosyal Fayda", description: "Topluma doğrudan faydası" },
  { id: "zaman_cercevesi", name: "Zaman Çerçevesi", description: "Sonuç görme süresi" }
];

export const badges = [
  { id: "first_decision", name: "İlk Karar", condition: "İlk kararını ver" },
  { id: "consistent", name: "Tutarlı Analist", condition: "CR < 0.10" },
  { id: "all_scenarios", name: "Senaryo Ustası", condition: "5 farklı senaryo dene" },
  { id: "full_notes", name: "Titiz Komiteci", condition: "4 projeye de not al" },
  { id: "long_justify", name: "Güçlü Savunma", condition: "200+ karakter gerekçe" }
];
