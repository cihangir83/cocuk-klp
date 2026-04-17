// 4 Vaka — Tam İçerik
const cases = [
  // ==========================================
  // VAKA #247 — KAŞ KAPLUMBAĞA KATLİAMI
  // ==========================================
  {
    id: "vaka_247",
    title: "Kaş Kaplumbağa Katliamı",
    caseNumber: "247",
    status: "active",
    ambientType: "coastal",
    symptom: "Kaş kıyılarında deniz kaplumbağası yuvalamaları 3 yılda %80 düştü.",
    openingNarrative: [
      "Kaş kıyılarında deniz kaplumbağası popülasyonu 3 yılda yüzde seksen düştü.",
      "Resmi açıklama yok. Soruşturma başlatıldı.",
      "Savcı olarak atandınız."
    ],
    rootCause: "Kıyı aydınlatmasının artışı dişi kaplumbağaların yuvalama alanlarını terk etmesine yol açmıştır.",
    rootCauseShort: "Işık kirliliği kaplumbağaların doğal navigasyonunu bozuyor",

    evidences: [
      {
        id: "ev_247_001",
        type: "witness",
        title: "Balıkçı Mehmet'in İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Son 3 yılda sahil boyunca turistik tesisler arttı. Geceleri kıyı çok aydınlık oluyor. Eskiden karanlıkta kaplumbağaları görebiliyorduk, şimdi geceleri gündüz gibi. Otellerin ışıkları sabaha kadar yanıyor.",
        witnessName: "Mehmet Yılmaz",
        witnessRole: "Balıkçı, 25 yıldır Kaş'ta",
        hiddenWords: ["tesisler", "aydınlık"],
        date: "14 Mart 2024",
        isRedHerring: false,
        connectsTo: ["ev_247_003"],
        unlocks: ["ev_247_005"],
        chainPosition: 1
      },
      {
        id: "ev_247_002",
        type: "misleading",
        title: "Su Sıcaklığı Raporu",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Akdeniz'in doğu kıyılarında su sıcaklığı son 3 yılda ortalama 0.3°C arttı. Bu artış, bazı deniz canlılarının göç paternlerini etkileyebilecek düzeydedir. Ancak kaplumbağa yuvalama alanlarıyla doğrudan bir korelasyon tespit edilememiştir.",
        chartData: [
          { year: "2021", value: 22.1 },
          { year: "2022", value: 22.3 },
          { year: "2023", value: 22.4 },
          { year: "2024", value: 22.4 }
        ],
        chartLabel: "Ortalama Su Sıcaklığı (°C)",
        stampText: "YANILTICI OLABİLİR",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_247_003",
        type: "report",
        title: "Belediye Aydınlatma Raporu",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Kaş Belediyesi 2021-2024 kıyı aydınlatma projesi kapsamında sahil şeridine 340 yeni LED aydınlatma direği yerleştirilmiştir. Toplam aydınlatma kapasitesi %400 artmıştır. Proje, turistik cazibe artırma amacıyla hayata geçirilmiştir.",
        highlightedLines: [1, 3],
        stampText: "DOĞRULANDI",
        date: "22 Kasım 2023",
        isRedHerring: false,
        connectsTo: ["ev_247_005"],
        unlocks: ["ev_247_006"],
        chainPosition: 2
      },
      {
        id: "ev_247_004",
        type: "misleading",
        title: "Turizm Gelir İstatistikleri",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Kaş ilçesi turizm gelirleri son 3 yılda %65 artış göstermiştir. Konaklama kapasitesi 2.400 yataktan 4.100 yatağa çıkmıştır. Restoran ve eğlence mekanları sayısı iki katına ulaşmıştır.",
        chartData: [
          { year: "2021", value: 42 },
          { year: "2022", value: 56 },
          { year: "2023", value: 68 },
          { year: "2024", value: 69 }
        ],
        chartLabel: "Turizm Geliri (Milyon ₺)",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_247_005",
        type: "data",
        title: "Kaplumbağa Biyolojisi Raporu",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "Caretta caretta türü dişi kaplumbağalar yuvalama için karanlık sahilleri tercih eder. Yapay ışık kaynakları, yeni doğan yavruların denize yönelme içgüdüsünü bozar. Yavru kaplumbağalar ay ışığının deniz yüzeyindeki yansımasını takip ederek denize ulaşır; yapay ışıklar bu doğal navigasyonu engeller.",
        highlightedLines: [0, 2],
        stampText: "KRİTİK KANIT",
        isRedHerring: false,
        connectsTo: ["ev_247_006"],
        unlocks: ["ev_247_007"],
        chainPosition: 3
      },
      {
        id: "ev_247_006",
        type: "photo",
        title: "GPS Takip Haritası",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "2024 yuvalama sezonu GPS takip verileri. Dişi kaplumbağaların %73'ü aydınlatılmış sahil bölgelerini terk ederek daha uzak, karanlık kıyılara yönelmiş. Bu göç, enerji kaybına ve düşük yuvalama başarısına neden oluyor.",
        coordinates: "36.1987°N, 29.6383°E",
        anomalyAreas: ["Sahil şeridi batı bölgesi", "Otel yoğunluk alanı"],
        date: "Haziran-Ağustos 2024",
        isRedHerring: false,
        connectsTo: ["ev_247_007"],
        unlocks: [],
        chainPosition: 4
      },
      {
        id: "ev_247_007",
        type: "data",
        title: "Nüfus İstatistikleri (5 Yıllık)",
        rarity: "common",
        pinColor: "blue",
        locked: true,
        content: "Kaş sahillerinde yuva sayısı: 2020: 847 yuva, 2021: 612 yuva, 2022: 389 yuva, 2023: 198 yuva, 2024: 167 yuva. Yavru denize ulaşma oranı: 2020: %78, 2024: %23. Yavruların büyük kısmı yapay ışıklara yönelerek sahilde telef oluyor.",
        chartData: [
          { year: "2020", value: 847 },
          { year: "2021", value: 612 },
          { year: "2022", value: 389 },
          { year: "2023", value: 198 },
          { year: "2024", value: 167 }
        ],
        chartLabel: "Yuva Sayısı",
        stampText: "KRİTİK VERİ",
        isRedHerring: false,
        connectsTo: ["ROOT"],
        unlocks: [],
        chainPosition: 5
      },
      {
        id: "ev_247_008",
        type: "witness",
        title: "Dr. Ayşe Yılmaz'ın İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Ben 15 yıldır bu kıyılarda kaplumbağa araştırması yapıyorum. Sorun su sıcaklığı değil. Sorun ışık. Yavru kaplumbağalar gece denize ulaşmaya çalışırken otellerin ışıklarına yöneliyor. Onlarca yavruyu sabahları sahilde ölü bulduk.",
        witnessName: "Dr. Ayşe Yılmaz",
        witnessRole: "Deniz Biyoloğu, Akdeniz Üniversitesi",
        hiddenWords: ["ışık", "otellerin ışıklarına"],
        date: "28 Mart 2024",
        isRedHerring: false,
        connectsTo: [],
        unlocks: []
      }
    ],

    chainLinks: [
      { position: 1, question: "Neden kaplumbağalar sahilden uzaklaşıyor?", answer: "Kıyı aydınlatması dramatik şekilde arttı", hint: "Balıkçının ifadesini ve belediye raporunu incele" },
      { position: 2, question: "Neden aydınlatma arttı?", answer: "Turizm amaçlı 340 yeni LED direk yerleştirildi", hint: "Belediye aydınlatma raporuna bak" },
      { position: 3, question: "Neden ışık kaplumbağaları etkiliyor?", answer: "Yapay ışık yavruların denize yönelme içgüdüsünü bozuyor", hint: "Kaplumbağa biyolojisi raporunu incele" },
      { position: 4, question: "Neden yuvalamaları azaldı?", answer: "Dişi kaplumbağalar aydınlık sahilleri terk ediyor", hint: "GPS takip verilerini analiz et" },
      { position: 5, rootCause: true, question: "KÖK NEDEN NEDİR?", answer: "Işık kirliliği kaplumbağaların doğal navigasyonunu bozuyor", hint: "Tüm kanıtları birleştir" }
    ]
  },

  // ==========================================
  // VAKA #312 — İZMİR ORMAN YANGINI ZİNCİRİ
  // ==========================================
  {
    id: "vaka_312",
    title: "İzmir Orman Yangını Zinciri",
    caseNumber: "312",
    status: "locked",
    ambientType: "forest",
    symptom: "3 yılda 12 farklı noktada orman yangını çıktı.",
    openingNarrative: [
      "İzmir'in kuzey ormanlarında 3 yılda 12 ayrı noktada yangın çıktı.",
      "İtfaiye raporları 'doğal neden' diyor. Ama desen çok düzenli.",
      "Savcı olarak yerinde inceleme emri verildi."
    ],
    rootCause: "Orman içi kaçak yapılaşma bölgelerinden geçen bakımsız enerji hatları kısa devre yaparak yangınlara neden olmaktadır.",
    rootCauseShort: "Kaçak yapılaşma + bakımsız enerji hatları yangın kaynağı",

    evidences: [
      {
        id: "ev_312_001",
        type: "witness",
        title: "Orman Bekçisi Hasan'ın İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Yangınlar hep aynı bölgelerde çıkıyor. Kaçak yapıların olduğu yerlerde. Enerji hatları ağaçlara değiyor, kimse budamıyor. Ben kaç kez rapor yazdım ama kimse ilgilenmedi.",
        witnessName: "Hasan Demir",
        witnessRole: "Orman Bekçisi, 18 yıl deneyimli",
        hiddenWords: ["kaçak yapıların", "enerji hatları"],
        date: "5 Temmuz 2024",
        isRedHerring: false,
        connectsTo: ["ev_312_003"],
        unlocks: ["ev_312_005"],
        chainPosition: 1
      },
      {
        id: "ev_312_002",
        type: "misleading",
        title: "Kuraklık Verileri",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "İzmir bölgesinde son 3 yılda yağış oranları %15 düştü. Toprak nem oranı kritik seviyenin altında. Kuraklık, yangın riskini artıran en önemli faktörlerden biridir.",
        chartData: [
          { year: "2021", value: 680 },
          { year: "2022", value: 590 },
          { year: "2023", value: 560 },
          { year: "2024", value: 580 }
        ],
        chartLabel: "Yıllık Yağış (mm)",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_312_003",
        type: "report",
        title: "Kaçak Yapılaşma Raporu",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "İzmir Kuzey Ormanları'nda 2019-2024 arasında 87 kaçak yapı tespit edilmiştir. Bu yapıların %64'ü orman içi enerji hatlarının 50 metre yakınındadır. Yıkım kararı çıkan 52 yapının sadece 8'i yıkılmıştır.",
        highlightedLines: [1, 2],
        stampText: "DOĞRULANDI",
        date: "15 Eylül 2023",
        isRedHerring: false,
        connectsTo: ["ev_312_005"],
        unlocks: ["ev_312_006"],
        chainPosition: 2
      },
      {
        id: "ev_312_004",
        type: "misleading",
        title: "İklim Değişikliği Raporu",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Küresel ısınma nedeniyle Ege bölgesinde ortalama sıcaklık 1.2°C arttı. Bu durum orman yangını riskini genel olarak artırmaktadır. Ancak bu, belirli noktalarda tekrarlayan yangınları açıklamada yetersizdir.",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_312_005",
        type: "data",
        title: "Enerji Hattı Bakım Kayıtları",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "TEDAŞ kayıtlarına göre İzmir Kuzey bölgesi enerji hatlarının son bakım tarihi 2019'dur. Kaçak yapılara çekilen izinsiz hatlar hiçbir bakım programında yer almamaktadır. 12 yangın noktasının 9'u izinsiz enerji bağlantısı olan kaçak yapıların 100 metre yakınındadır.",
        highlightedLines: [1, 2],
        stampText: "KRİTİK KANIT",
        isRedHerring: false,
        connectsTo: ["ev_312_006"],
        unlocks: ["ev_312_007"],
        chainPosition: 3
      },
      {
        id: "ev_312_006",
        type: "photo",
        title: "Yangın Noktaları Haritası",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "Uydu görüntülerinde 12 yangın noktası işaretlenmiştir. Noktaların %75'i kaçak yapılaşma bölgelerinde, enerji hatlarının geçiş güzergahında yer almaktadır. Yangın başlangıç noktaları enerji direklerine ortalama 30 metre mesafededir.",
        coordinates: "38.5120°N, 27.1428°E",
        anomalyAreas: ["Kaçak yapı bölgesi A", "Enerji hattı kesişim noktası"],
        date: "Ağustos 2024",
        isRedHerring: false,
        connectsTo: ["ev_312_007"],
        unlocks: [],
        chainPosition: 4
      },
      {
        id: "ev_312_007",
        type: "report",
        title: "İtfaiye Teknik Analiz Raporu",
        rarity: "common",
        pinColor: "blue",
        locked: true,
        content: "12 yangının 9'unda başlangıç noktası elektrik kaynaklı kısa devre olarak tespit edilmiştir. Kaçak çekilen hatlar standart dışı malzeme kullanılmış ve hiçbir sigorta sistemi bulunmamaktadır. Kuru dallarla temas eden hatlar aşırı ısınarak tutuşmaya neden olmuştur.",
        stampText: "KRİTİK VERİ",
        isRedHerring: false,
        connectsTo: ["ROOT"],
        unlocks: [],
        chainPosition: 5
      },
      {
        id: "ev_312_008",
        type: "witness",
        title: "Muhtar Kemal'in İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Herkes biliyor aslında. Kaçak evlere elektrik çekiyorlar, kimse bir şey demiyor. Ben belediyeye yazı yazdım ama cevap gelmedi. Yangınlar hep o evlerin yakınından başlıyor.",
        witnessName: "Kemal Öztürk",
        witnessRole: "Köy Muhtarı",
        hiddenWords: ["kaçak evlere", "elektrik çekiyorlar"],
        date: "12 Ağustos 2024",
        isRedHerring: false,
        connectsTo: [],
        unlocks: []
      }
    ],

    chainLinks: [
      { position: 1, question: "Neden yangınlar belirli noktalarda tekrarlıyor?", answer: "Kaçak yapılaşma bölgelerinde yoğunlaşıyor", hint: "Bekçinin ifadesini ve haritayı incele" },
      { position: 2, question: "Neden kaçak yapılar yangına neden olur?", answer: "İzinsiz enerji hatları bakımsız ve standart dışı", hint: "Kaçak yapılaşma raporunu incele" },
      { position: 3, question: "Neden enerji hatları yangına yol açıyor?", answer: "Kısa devre yapan hatlar kuru dallara temas ediyor", hint: "Enerji hattı bakım kayıtlarına bak" },
      { position: 4, question: "Neden bakım yapılmıyor?", answer: "Kaçak bağlantılar resmi kayıtlarda yok", hint: "Yangın noktaları haritasını analiz et" },
      { position: 5, rootCause: true, question: "KÖK NEDEN NEDİR?", answer: "Kaçak yapılaşma + bakımsız enerji hatları yangın kaynağı", hint: "Tüm kanıtları birleştir" }
    ]
  },

  // ==========================================
  // VAKA #089 — BURDUR GÖLÜ FLAMİNGO GÖÇÜ
  // ==========================================
  {
    id: "vaka_089",
    title: "Burdur Gölü Flamingo Göçü",
    caseNumber: "089",
    status: "locked",
    ambientType: "lake",
    symptom: "Flamingo popülasyonu 5 yılda %60 azaldı.",
    openingNarrative: [
      "Burdur Gölü'ndeki flamingo popülasyonu 5 yılda yüzde altmış azaldı.",
      "Kuşlar göçüyor ama nereye? Ve neden?",
      "Soruşturma dosyanız hazır, savcı."
    ],
    rootCause: "Tarımsal sulama için göl suyunun aşırı çekilmesi göl tuzluluğunu artırmış, flamingolar için besin kaynağı olan Artemia (tuzlu su karidesi) popülasyonunu yok etmiştir.",
    rootCauseShort: "Tarımsal sulama kaynaklı göl tuzluluğu artışı besin zincirini kırdı",

    evidences: [
      {
        id: "ev_089_001",
        type: "witness",
        title: "Göl Kenarı Çiftçi Ali'nin İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Göl her yıl biraz daha çekiliyor. Eskiden suyun kenarına 50 metre vardı, şimdi 300 metre. Biz kuyulardan suluyoruz ama yetmiyor, göle bağlı kanallar da var. Herkes çekiyor suyu.",
        witnessName: "Ali Kaya",
        witnessRole: "Çiftçi, 30 yıldır göl kenarında yaşıyor",
        hiddenWords: ["kuyulardan", "kanal"],
        date: "8 Mayıs 2024",
        isRedHerring: false,
        connectsTo: ["ev_089_003"],
        unlocks: ["ev_089_005"],
        chainPosition: 1
      },
      {
        id: "ev_089_002",
        type: "misleading",
        title: "İklim Değişikliği Raporları",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Burdur bölgesinde son 10 yılda ortalama sıcaklık 0.8°C artmıştır. Buharlaşma oranları yükselmiştir. Ancak göl seviyesindeki düşüş, buharlaşma artışından çok daha hızlı gerçekleşmektedir.",
        chartData: [
          { year: "2019", value: 12.4 },
          { year: "2020", value: 12.6 },
          { year: "2021", value: 12.8 },
          { year: "2022", value: 13.0 },
          { year: "2023", value: 13.2 }
        ],
        chartLabel: "Ortalama Sıcaklık (°C)",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_089_003",
        type: "data",
        title: "Tarımsal Sulama Verileri",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Burdur Gölü havzasındaki tarımsal sulama alanı son 10 yılda %180 artmıştır. Göl havzasından çekilen su miktarı yılda 95 milyon m³'e ulaşmıştır. Gölün yıllık doğal beslenmesi yaklaşık 60 milyon m³'tür.",
        chartData: [
          { year: "2019", value: 52 },
          { year: "2020", value: 61 },
          { year: "2021", value: 73 },
          { year: "2022", value: 85 },
          { year: "2023", value: 95 }
        ],
        chartLabel: "Çekilen Su (Milyon m³)",
        stampText: "DOĞRULANDI",
        isRedHerring: false,
        connectsTo: ["ev_089_005"],
        unlocks: ["ev_089_006"],
        chainPosition: 2
      },
      {
        id: "ev_089_004",
        type: "misleading",
        title: "Göç Rotası Analizi",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Flamingoların alternatif göç rotalarında değişiklik görülmüştür. Bazı sürüler Tuz Gölü ve Akgöl'e yönelmiştir. Bu durum bölgesel iklim değişikliği ile açıklanabilir.",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_089_005",
        type: "data",
        title: "Göl Tuzluluk Ölçümleri",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "Burdur Gölü tuzluluk seviyesi: 2019: %2.2, 2020: %2.8, 2021: %3.5, 2022: %4.1, 2023: %5.3. Artemia (tuzlu su karidesi) optimum yaşam aralığı: %1.5-%3.5. Mevcut tuzluluk Artemia popülasyonunu kritik seviyede etkilemektedir.",
        chartData: [
          { year: "2019", value: 2.2 },
          { year: "2020", value: 2.8 },
          { year: "2021", value: 3.5 },
          { year: "2022", value: 4.1 },
          { year: "2023", value: 5.3 }
        ],
        chartLabel: "Tuzluluk (%)",
        stampText: "KRİTİK KANIT",
        isRedHerring: false,
        connectsTo: ["ev_089_006"],
        unlocks: ["ev_089_007"],
        chainPosition: 3
      },
      {
        id: "ev_089_006",
        type: "report",
        title: "Artemia Popülasyon Raporu",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "Burdur Gölü'ndeki Artemia popülasyonu 5 yılda %85 düşmüştür. Artemia, flamingoların ana besin kaynağıdır. Tuzluluk artışı Artemia'nın üreme döngüsünü bozmuş, yumurta açılma oranı %90'dan %12'ye düşmüştür.",
        highlightedLines: [0, 1],
        stampText: "KRİTİK VERİ",
        isRedHerring: false,
        connectsTo: ["ev_089_007"],
        unlocks: [],
        chainPosition: 4
      },
      {
        id: "ev_089_007",
        type: "data",
        title: "Flamingo Nüfus Sayımı",
        rarity: "common",
        pinColor: "blue",
        locked: true,
        content: "Burdur Gölü flamingo popülasyonu: 2019: 15.200, 2020: 12.800, 2021: 9.400, 2022: 7.100, 2023: 6.080. Üreme başarısı: 2019'da 100 çiftlik koloni başına 78 yavru, 2023'te sadece 12 yavru.",
        chartData: [
          { year: "2019", value: 15200 },
          { year: "2020", value: 12800 },
          { year: "2021", value: 9400 },
          { year: "2022", value: 7100 },
          { year: "2023", value: 6080 }
        ],
        chartLabel: "Flamingo Sayısı",
        isRedHerring: false,
        connectsTo: ["ROOT"],
        unlocks: [],
        chainPosition: 5
      },
      {
        id: "ev_089_008",
        type: "witness",
        title: "Prof. Dr. Deniz Korkmaz İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Flamingolar aptal değil. Besin yoksa giderler. Artemia bitince onlar da bitti. Sorun iklim değil, sorun suyun aşırı çekilmesi. Göl kuruyor ve tuzlanıyor.",
        witnessName: "Prof. Dr. Deniz Korkmaz",
        witnessRole: "Ornitolog, Ankara Üniversitesi",
        hiddenWords: ["Artemia", "suyun aşırı çekilmesi"],
        date: "20 Haziran 2024",
        isRedHerring: false,
        connectsTo: [],
        unlocks: []
      }
    ],

    chainLinks: [
      { position: 1, question: "Neden flamingolar göl bölgesini terk ediyor?", answer: "Besin kaynakları azalıyor", hint: "Çiftçinin ifadesini ve sulama verilerini incele" },
      { position: 2, question: "Neden göl ekosistemi bozuluyor?", answer: "Aşırı su çekimi göl seviyesini düşürüyor", hint: "Tarımsal sulama verilerini kontrol et" },
      { position: 3, question: "Neden su çekilmesi flamingoları etkiliyor?", answer: "Tuzluluk artışı Artemia popülasyonunu yok ediyor", hint: "Tuzluluk ölçümlerini incele" },
      { position: 4, question: "Neden Artemia azalıyor?", answer: "Aşırı tuzluluk üreme döngüsünü bozuyor", hint: "Artemia popülasyon raporuna bak" },
      { position: 5, rootCause: true, question: "KÖK NEDEN NEDİR?", answer: "Tarımsal sulama kaynaklı göl tuzluluğu artışı besin zincirini kırdı", hint: "Tüm kanıtları birleştir" }
    ]
  },

  // ==========================================
  // VAKA #401 — ANKARA KENTSEL ISI ADASI
  // ==========================================
  {
    id: "vaka_401",
    title: "Ankara Kentsel Isı Adası",
    caseNumber: "401",
    status: "locked",
    ambientType: "city",
    symptom: "Şehir merkezi çevreden 4 derece daha sıcak.",
    openingNarrative: [
      "Ankara'nın merkezinde termometreler çevre ilçelerden 4 derece fazla gösteriyor.",
      "İnsanlar bunalıyor. Enerji faturaları fırlıyor. Ama neden sadece merkez?",
      "Soruşturma sizde, savcı."
    ],
    rootCause: "Son 20 yılda şehir merkezindeki yeşil alanların %60'ının betonlaşması ve yüksek katlı yapıların rüzgar koridorlarını kapatması kentsel ısı adası oluşturmuştur.",
    rootCauseShort: "Yeşil alan kaybı + beton yüzey artışı kentsel ısı adasına neden oluyor",

    evidences: [
      {
        id: "ev_401_001",
        type: "witness",
        title: "Eski Mahalleli Fatma Teyze'nin İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Eskiden burada büyük bir park vardı, çocuklar oynardı. Şimdi AVM yaptılar. Sokakta yürüyemiyoruz sıcaktan. 30 yıldır buradayım, hiç böyle sıcak olmamıştı. Ağaçları kesip beton döktüler her yere.",
        witnessName: "Fatma Aydın",
        witnessRole: "Mahalle Sakini, 30 yıldır Kızılay'da",
        hiddenWords: ["park", "ağaçları kesip", "beton"],
        date: "2 Ağustos 2024",
        isRedHerring: false,
        connectsTo: ["ev_401_003"],
        unlocks: ["ev_401_005"],
        chainPosition: 1
      },
      {
        id: "ev_401_002",
        type: "misleading",
        title: "Fabrika Emisyon Raporları",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Ankara Organize Sanayi Bölgesi'nde CO2 emisyonu son 5 yılda %12 artmıştır. Ancak sanayi bölgesi şehir merkezinden 25 km uzaktadır ve doğrudan ısı adası etkisi ölçülmemiştir.",
        chartData: [
          { year: "2020", value: 4.2 },
          { year: "2021", value: 4.4 },
          { year: "2022", value: 4.5 },
          { year: "2023", value: 4.6 },
          { year: "2024", value: 4.7 }
        ],
        chartLabel: "CO2 Emisyonu (Mt)",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_401_003",
        type: "data",
        title: "Yeşil Alan Değişim Raporu",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "Ankara şehir merkezi (Çankaya, Kızılay, Ulus) yeşil alan oranı: 2005: %32, 2010: %26, 2015: %19, 2020: %14, 2024: %11. 20 yılda yeşil alanların %60'ından fazlası kaybedilmiştir. Kaybedilen alanlar ağırlıklı olarak AVM, otopark ve yüksek katlı konut projelerine dönüştürülmüştür.",
        chartData: [
          { year: "2005", value: 32 },
          { year: "2010", value: 26 },
          { year: "2015", value: 19 },
          { year: "2020", value: 14 },
          { year: "2024", value: 11 }
        ],
        chartLabel: "Yeşil Alan Oranı (%)",
        stampText: "DOĞRULANDI",
        isRedHerring: false,
        connectsTo: ["ev_401_005"],
        unlocks: ["ev_401_006"],
        chainPosition: 2
      },
      {
        id: "ev_401_004",
        type: "misleading",
        title: "Araç Trafiği Yoğunluk Verileri",
        rarity: "common",
        pinColor: "red",
        locked: false,
        content: "Ankara merkezde günlük araç trafiği son 10 yılda %45 artmıştır. Motorlu araçlar ısı yayar ancak araştırmalar trafik kaynaklı ısı artışının toplam kentsel ısı adasının %8'inden azını oluşturduğunu göstermiştir.",
        isRedHerring: true,
        connectsTo: [],
        unlocks: []
      },
      {
        id: "ev_401_005",
        type: "data",
        title: "Yüzey Malzemesi Analizi",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "Şehir merkezi yüzey malzemesi dağılımı: Beton/asfalt: %72 (2005'te %41), Çatı: %17, Yeşil alan: %11. Beton ve asfalt güneş enerjisinin %80-95'ini emer ve gece geri yayar. Yeşil alanlar ise buharlaşma ile soğutma sağlar. Her %10'luk yeşil alan kaybı, yüzey sıcaklığını ortalama 1.2°C artırır.",
        highlightedLines: [0, 2],
        stampText: "KRİTİK KANIT",
        isRedHerring: false,
        connectsTo: ["ev_401_006"],
        unlocks: ["ev_401_007"],
        chainPosition: 3
      },
      {
        id: "ev_401_006",
        type: "photo",
        title: "Termal Uydu Görüntüsü",
        rarity: "rare",
        pinColor: "gold",
        locked: true,
        content: "Ankara termal uydu görüntüsü. Şehir merkezi yüzey sıcaklığı 42°C, çevre ilçeler 38°C. Isı yoğunluğu en yüksek bölgeler: büyük AVM'lerin ve otoparkların bulunduğu alanlar. Kalan park alanları belirgin şekilde daha soğuk (ısı adası yok).",
        coordinates: "39.9334°N, 32.8597°E",
        anomalyAreas: ["Kızılay merkez (42°C)", "AVM bölgesi (43°C)", "Otopark alanı (44°C)"],
        date: "15 Temmuz 2024",
        isRedHerring: false,
        connectsTo: ["ev_401_007"],
        unlocks: [],
        chainPosition: 4
      },
      {
        id: "ev_401_007",
        type: "report",
        title: "Rüzgar Koridoru Analizi",
        rarity: "common",
        pinColor: "blue",
        locked: true,
        content: "Ankara'nın doğal rüzgar koridorları yüksek katlı yapılarla kapatılmıştır. 2005'te 4 aktif rüzgar koridoru varken, 2024'te sadece 1 kalmıştır. Rüzgar koridorlarının kapanması gece soğumasını engellemekte, ısı gün boyu birikmektedir.",
        stampText: "KRİTİK VERİ",
        highlightedLines: [0, 2],
        isRedHerring: false,
        connectsTo: ["ROOT"],
        unlocks: [],
        chainPosition: 5
      },
      {
        id: "ev_401_008",
        type: "witness",
        title: "Şehir Plancısı Elif Hanım'ın İfadesi",
        rarity: "common",
        pinColor: "blue",
        locked: false,
        content: "İmar planlarında yeşil alan oranı minimum %25 olmalı. Ama istisnalar tanındı, projeler onaylandı. Şimdi sonuçlarını yaşıyoruz. Beton gece ısıyı geri veriyor, şehir soğuyamıyor.",
        witnessName: "Elif Şahin",
        witnessRole: "Şehir Plancısı, Gazi Üniversitesi",
        hiddenWords: ["yeşil alan", "beton"],
        date: "10 Eylül 2024",
        isRedHerring: false,
        connectsTo: [],
        unlocks: []
      }
    ],

    chainLinks: [
      { position: 1, question: "Neden şehir merkezi çevreden daha sıcak?", answer: "Yeşil alanlar betonlaşma ile yok edildi", hint: "Fatma Teyze'nin ifadesini ve yeşil alan raporunu incele" },
      { position: 2, question: "Neden yeşil alan kaybı sıcaklığı artırır?", answer: "Beton/asfalt güneş ısısını emer ve gece geri yayar", hint: "Yeşil alan değişim raporuna bak" },
      { position: 3, question: "Neden ısı birikimi bu kadar yoğun?", answer: "Yüzeyin %72'si beton/asfalt oldu, soğutma kapasitesi kalmadı", hint: "Yüzey malzemesi analizini incele" },
      { position: 4, question: "Neden şehir gece soğuyamıyor?", answer: "Yüksek katlı yapılar rüzgar koridorlarını kapattı", hint: "Termal uydu görüntüsünü analiz et" },
      { position: 5, rootCause: true, question: "KÖK NEDEN NEDİR?", answer: "Yeşil alan kaybı + beton yüzey artışı kentsel ısı adasına neden oluyor", hint: "Tüm kanıtları birleştir" }
    ]
  }
];

export default cases;
