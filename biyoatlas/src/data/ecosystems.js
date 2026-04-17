export const ecosystems = [
  {
    id: "amazon",
    name: "Amazon Yağmur Ormanları",
    coordinates: { x: 28, y: 62 },
    unlocked: true,
    ambientSound: "rainforest",
    backgroundColor: "#0A2E1A",
    color: "#00C896",
    description: "Dünyanın en büyük tropik yağmur ormanı",
    creatures: [
      {
        id: "morpho_butterfly",
        name: "Morpho Kelebeği",
        latinName: "Morpho menelaus",
        rarity: "rare",
        superpower: "Kanatlarında pigment yok. Işığı kıran nano yapılar sayesinde renk üretir. Doğanın en gelişmiş optik teknolojisi.",
        trizPrinciple: "Fiziksel etki — yapısal renk",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Işığı kıran mikro yapılar, boya gerektirmeyen yüzey teknolojilerine ilham verebilir. Boyasız renk üretimi, kimyasal atığı sıfıra indirir.",
        curiosityQuestion: "Boya olmadan renk üretebilseydin hangi endüstriler değişirdi?",
        image: null,
        silhouette: "🦋"
      },
      {
        id: "electric_eel",
        name: "Elektrikli Yılan Balığı",
        latinName: "Electrophorus electricus",
        rarity: "common",
        superpower: "Vücudundaki 6.000 elektrosit hücresi ile 860 volta kadar elektrik üretebilir. Canlı bir batarya.",
        trizPrinciple: "Enerji dönüşümü — biyoelektrik",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Biyoelektrik üretim mekanizması, çevre dostu enerji depolama sistemlerine ilham olabilir.",
        curiosityQuestion: "Kendi elektriğini üreten bir şehir nasıl çalışırdı?",
        image: null,
        silhouette: "🐍"
      },
      {
        id: "leafcutter_ant",
        name: "Yaprak Kesici Karınca",
        latinName: "Atta cephalotes",
        rarity: "common",
        superpower: "Kendi ağırlığının 50 katını taşır. Milyonlarca bireyle kusursuz lojistik sistemi kurar. Doğanın süper bilgisayarı.",
        trizPrinciple: "Kolektif zeka — dağıtık sistem",
        ecologicalProblemMatch: "toprak_erozyonu",
        analogyText: "Karıncaların toprak altı tünel ağları, erozyonu önleyen doğal drenaj sistemlerine model olabilir.",
        curiosityQuestion: "Bir şehrin ulaşım ağını karıncalar tasarlasaydı nasıl görünürdü?",
        image: null,
        silhouette: "🐜"
      }
    ]
  },
  {
    id: "sahara",
    name: "Sahra Çölü",
    coordinates: { x: 50, y: 42 },
    unlocked: false,
    ambientSound: "desert",
    backgroundColor: "#2E1A0A",
    color: "#D4A843",
    description: "Dünyanın en büyük sıcak çölü",
    creatures: [
      {
        id: "namib_beetle",
        name: "Namib Böceği",
        latinName: "Stenocara gracilipes",
        rarity: "rare",
        superpower: "Kabuğundaki mikro yapılarla havadaki sisten su toplar. Çölde su fabrikası.",
        trizPrinciple: "Yüzey yapısı — su yoğuşturma",
        ecologicalProblemMatch: "su_kitligi",
        analogyText: "Böceğin su toplama yüzeyi, kurak bölgelerde havadan su elde eden teknolojilere ilham kaynağı.",
        curiosityQuestion: "Havadan su toplayan binalar olsaydı hangi sorunlar çözülürdü?",
        image: null,
        silhouette: "🪲"
      },
      {
        id: "fennec_fox",
        name: "Fennec Tilkisi",
        latinName: "Vulpes zerda",
        rarity: "common",
        superpower: "Dev kulakları vücut ısısını düzenler. Doğanın klima sistemi — sıfır enerji tüketimi.",
        trizPrinciple: "Yüzey alanı — termal regülasyon",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Fennec'in kulak tasarımı, enerji harcamadan soğutan bina cephe sistemlerine uygulanabilir.",
        curiosityQuestion: "Elektriksiz soğuyan bir bina tasarlasaydın nereden başlardın?",
        image: null,
        silhouette: "🦊"
      },
      {
        id: "camel",
        name: "Deve",
        latinName: "Camelus dromedarius",
        rarity: "common",
        superpower: "Hörgücünde 36 kg yağ depolar, bu yağ metabolize olduğunda su üretir. Çölün su tankeri.",
        trizPrinciple: "Enerji depolama — metabolik su üretimi",
        ecologicalProblemMatch: "su_kitligi",
        analogyText: "Devenin metabolik su üretimi, uzun süreli su depolama sistemlerine yeni bir yaklaşım sunabilir.",
        curiosityQuestion: "Su kıtlığı yaşayan bir şehir, enerjisini suya dönüştürebilseydi ne olurdu?",
        image: null,
        silhouette: "🐫"
      }
    ]
  },
  {
    id: "arctic",
    name: "Arktik Buz Çölü",
    coordinates: { x: 55, y: 15 },
    unlocked: false,
    ambientSound: "arctic",
    backgroundColor: "#0A1A2E",
    color: "#5DADE2",
    description: "Dünyanın en soğuk yaşam alanı",
    creatures: [
      {
        id: "polar_bear",
        name: "Kutup Ayısı",
        latinName: "Ursus maritimus",
        rarity: "common",
        superpower: "Tüyleri içi boş tüplerden oluşur. Güneş ışığını deri yüzeyine taşır ve ısı kaybını önler. Doğanın fiber optik yalıtımı.",
        trizPrinciple: "Yapısal yalıtım — ışık iletimi",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Kutup ayısının tüy yapısı, güneş enerjisini yakalayan yalıtım malzemeleri için model olabilir.",
        curiosityQuestion: "Bir bina kendi tüy tabakasına sahip olsaydı enerji faturası ne olurdu?",
        image: null,
        silhouette: "🐻‍❄️"
      },
      {
        id: "icefish",
        name: "Buz Balığı",
        latinName: "Channichthyidae",
        rarity: "rare",
        superpower: "Kanında antifriz protein var. -2°C'de bile kanı donmaz. Biyolojik antifriz sistemi.",
        trizPrinciple: "Kimyasal koruma — antifriz protein",
        ecologicalProblemMatch: "iklim_degisikligi",
        analogyText: "Buz Balığı'nın antifriz proteini, donma koşullarında çalışan endüstriyel sistemlere biyolojik çözüm sunabilir.",
        curiosityQuestion: "Doğal antifriz kullanan makineler enerji tasarrufu sağlar mıydı?",
        image: null,
        silhouette: "🐟"
      },
      {
        id: "reindeer",
        name: "Ren Geyiği",
        latinName: "Rangifer tarandus",
        rarity: "common",
        superpower: "Gözleri mevsime göre renk değiştirir. Kışın UV ışığı görerek karda yiyecek bulur. Adaptive optik sistem.",
        trizPrinciple: "Adaptif algılama — UV görüş",
        ecologicalProblemMatch: "iklim_degisikligi",
        analogyText: "Ren geyiğinin adaptif göz yapısı, değişen iklim koşullarına uyum sağlayan sensör teknolojilerine ilham verebilir.",
        curiosityQuestion: "Gözlerin otomatik olarak farklı ışık türlerini algılasaydı dünyayı nasıl görürdün?",
        image: null,
        silhouette: "🦌"
      }
    ]
  },
  {
    id: "deep_ocean",
    name: "Derin Okyanus",
    coordinates: { x: 70, y: 55 },
    unlocked: false,
    ambientSound: "ocean",
    backgroundColor: "#050D1F",
    color: "#1A6B8A",
    description: "Karanlık ve basıncın hüküm sürdüğü derinlikler",
    creatures: [
      {
        id: "anglerfish",
        name: "Fener Balığı",
        latinName: "Lophiiformes",
        rarity: "ultra-rare",
        superpower: "Kafasındaki biyolüminesan ışık organı ile karanlıkta kendi ışığını üretir. Canlı bir fener.",
        trizPrinciple: "Biyolüminesans — kimyasal ışık",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Fener Balığı'nın kimyasal ışık üretimi, elektrik gerektirmeyen aydınlatma sistemlerine ilham olabilir.",
        curiosityQuestion: "Sokak lambaları elektrik yerine biyolojik ışık kullansaydı şehirler nasıl görünürdü?",
        image: null,
        silhouette: "🐡"
      },
      {
        id: "giant_squid",
        name: "Dev Kalamar",
        latinName: "Architeuthis dux",
        rarity: "rare",
        superpower: "Derisindeki kromatofor hücreleri ile milisaniyeler içinde renk ve doku değiştirir. Canlı kamuflaj ekranı.",
        trizPrinciple: "Adaptif yüzey — kromatofor",
        ecologicalProblemMatch: "biyocesitlilik_kaybi",
        analogyText: "Kalamarın renk değiştirme yeteneği, çevreye duyarlı adaptif malzemelere ilham kaynağı olabilir.",
        curiosityQuestion: "Kıyafetlerin çevreye göre renk değiştirseydi bunu ne için kullanırdın?",
        image: null,
        silhouette: "🦑"
      },
      {
        id: "pompeii_worm",
        name: "Pompeii Solucanı",
        latinName: "Alvinella pompejana",
        rarity: "ultra-rare",
        superpower: "80°C'ye kadar dayanır. Sırtındaki bakteriler termal kalkan oluşturur. Dünyanın en ısıya dayanıklı hayvanı.",
        trizPrinciple: "Simbiyotik koruma — termal kalkan",
        ecologicalProblemMatch: "iklim_degisikligi",
        analogyText: "Pompeii Solucanı'nın bakteri kalkanı, aşırı ısıya dayanıklı biyolojik kaplama malzemeleri geliştirilmesine ilham verebilir.",
        curiosityQuestion: "Binalar kendi bakteriyel kalkanını oluşturabilseydi iklim değişikliğine nasıl dayanırdı?",
        image: null,
        silhouette: "🪱"
      }
    ]
  },
  {
    id: "blacksea_forests",
    name: "Karadeniz Ormanları",
    coordinates: { x: 56, y: 38 },
    unlocked: false,
    ambientSound: "forest",
    backgroundColor: "#0A1E0A",
    color: "#2ECC71",
    description: "Türkiye'nin yeşil cenneti, antik ormanlar",
    creatures: [
      {
        id: "honeybee",
        name: "Arı",
        latinName: "Apis mellifera",
        rarity: "common",
        superpower: "Altıgen petek yapısı ile minimum malzemeyle maksimum alan kaplar. Doğanın mühendislik harikası.",
        trizPrinciple: "Geometrik optimizasyon — altıgen yapı",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Arının altıgen yapısı, en az malzemeyle en güçlü yapıları oluşturmak için inşaat sektöründe kullanılabilir.",
        curiosityQuestion: "Tüm binalar altıgen yapılardan oluşsaydı ne kadar malzeme tasarruf edilirdi?",
        image: null,
        silhouette: "🐝"
      },
      {
        id: "spider",
        name: "Örümcek",
        latinName: "Araneae",
        rarity: "common",
        superpower: "İpeği çelikten 5 kat daha güçlü ama çok daha hafif. Doğanın süper malzemesi.",
        trizPrinciple: "Malzeme bilimi — biyopolimer",
        ecologicalProblemMatch: "plastik_kirliligi",
        analogyText: "Örümcek ipeğinin yapısı, biyolojik olarak parçalanabilen süper güçlü malzemelerin geliştirilmesine model olabilir.",
        curiosityQuestion: "Plastik yerine örümcek ipeği kullanılsaydı okyanuslar nasıl görünürdü?",
        image: null,
        silhouette: "🕷️"
      },
      {
        id: "fern",
        name: "Eğreltiotu",
        latinName: "Polypodiopsida",
        rarity: "common",
        superpower: "Yaprak yüzeyi mikro kanallarla kaplı. Havadaki nemi yakalayıp köklere iletir. Canlı bir su toplama ağı.",
        trizPrinciple: "Kapilarite — mikro kanal su iletimi",
        ecologicalProblemMatch: "su_kitligi",
        analogyText: "Eğreltiotu'nun mikro kanal sistemi, kurak bölgelerde nemi yakalayan yüzey teknolojilerine uygulanabilir.",
        curiosityQuestion: "Binaların duvarları havadaki nemi toplasaydı su sorunu çözülür müydü?",
        image: null,
        silhouette: "🌿"
      }
    ]
  },
  {
    id: "indian_monsoon",
    name: "Hint Musonu",
    coordinates: { x: 72, y: 48 },
    unlocked: false,
    ambientSound: "monsoon",
    backgroundColor: "#1A0A2E",
    color: "#9B59B6",
    description: "Muson yağmurlarının şekillendirdiği yaşam",
    creatures: [
      {
        id: "lotus",
        name: "Lotus Çiçeği",
        latinName: "Nelumbo nucifera",
        rarity: "rare",
        superpower: "Yaprak yüzeyindeki nano tümsekler suyu ve kiri iter. Çamurda yetişir ama asla kirlenmez. Kendi kendini temizleyen yüzey.",
        trizPrinciple: "Nano yüzey — hidrofobik etki",
        ecologicalProblemMatch: "plastik_kirliligi",
        analogyText: "Lotus etkisi, kendi kendini temizleyen yüzeyler sayesinde temizlik kimyasallarına olan ihtiyacı ortadan kaldırabilir.",
        curiosityQuestion: "Hiç kirlenmeyen bir materyal olsaydı hangi ürünlerde kullanırdın?",
        image: null,
        silhouette: "🪷"
      },
      {
        id: "termite",
        name: "Termit",
        latinName: "Isoptera",
        rarity: "common",
        superpower: "Höyükleri iç sıcaklığı ±1°C hassasiyetle kontrol eder. Klimasız doğal havalandırma mimarisi.",
        trizPrinciple: "Pasif havalandırma — termal sirkülasyon",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Termit höyüğünün havalandırma sistemi, klimasız bina tasarımına doğrudan uygulanabilir model sunuyor.",
        curiosityQuestion: "Bir gökdelen termit höyüğü gibi tasarlansaydı ne kadar enerji tasarruf edilirdi?",
        image: null,
        silhouette: "🐛"
      },
      {
        id: "swiftlet",
        name: "Salangane (Bülbül Kuşu)",
        latinName: "Aerodramus",
        rarity: "common",
        superpower: "Tükürüğünden yuva yapar. Doğanın biyolojik yapıştırıcısı — su geçirmez, güçlü, hafif.",
        trizPrinciple: "Biyoyapıştırıcı — doğal polimer",
        ecologicalProblemMatch: "plastik_kirliligi",
        analogyText: "Salangane'nin biyolojik yapıştırıcısı, sentetik yapıştırıcılara doğal ve çevre dostu alternatif olabilir.",
        curiosityQuestion: "Tüm yapıştırıcılar biyolojik olsaydı çevre kirliliği ne kadar azalırdı?",
        image: null,
        silhouette: "🐦"
      }
    ]
  },
  {
    id: "african_savanna",
    name: "Afrika Savanası",
    coordinates: { x: 53, y: 60 },
    unlocked: false,
    ambientSound: "savanna",
    backgroundColor: "#2E1E0A",
    color: "#E67E22",
    description: "Büyük göçlerin ve dev memelilerin vatanı",
    creatures: [
      {
        id: "giraffe",
        name: "Zürafa",
        latinName: "Giraffa camelopardalis",
        rarity: "common",
        superpower: "2 metrelik boynu boyunca kanı beyne pompalamak için özel basınç sistemi var. Doğanın hidrolik mühendisliği.",
        trizPrinciple: "Hidrolik basınç yönetimi",
        ecologicalProblemMatch: "su_kitligi",
        analogyText: "Zürafanın basınç yönetim sistemi, yüksek binalarda su ve sıvı iletim sistemlerine model olabilir.",
        curiosityQuestion: "100 katlı bir binanın su sistemi zürafanınki gibi çalışsaydı ne değişirdi?",
        image: null,
        silhouette: "🦒"
      },
      {
        id: "gazelle",
        name: "Boz Geyik",
        latinName: "Gazella gazella",
        rarity: "common",
        superpower: "Koşarken enerji geri kazanım sistemi var. Tendonları yay gibi enerji depolar ve serbest bırakır.",
        trizPrinciple: "Elastik enerji depolama",
        ecologicalProblemMatch: "enerji_verimliligi",
        analogyText: "Gazellin tendon yapısı, hareket enerjisini geri kazanan ulaşım ve robotik sistemlere ilham verebilir.",
        curiosityQuestion: "Araçlar frenleme enerjisini tamamen geri kazanabilseydi yakıt tüketimi ne olurdu?",
        image: null,
        silhouette: "🦌"
      },
      {
        id: "meerkat",
        name: "Mirket",
        latinName: "Suricata suricatta",
        rarity: "common",
        superpower: "Nöbetçi sistemi ile 360° gözetleme yapar. Rotasyonlu güvenlik ağı — hiç kimse sürekli nöbetçi değil.",
        trizPrinciple: "Dağıtık gözetleme — rotasyon sistemi",
        ecologicalProblemMatch: "biyocesitlilik_kaybi",
        analogyText: "Mirketin nöbetçi sistemi, doğal alanları koruyan dağıtık sensör ağlarına model olabilir.",
        curiosityQuestion: "Ormanları koruyan bir 'mirket sensör ağı' nasıl çalışırdı?",
        image: null,
        silhouette: "🦫"
      }
    ]
  },
  {
    id: "australia",
    name: "Avustralya",
    coordinates: { x: 83, y: 68 },
    unlocked: false,
    ambientSound: "outback",
    backgroundColor: "#2E0A0A",
    color: "#E74C3C",
    description: "Eşsiz türlerin izole kıtası",
    creatures: [
      {
        id: "thorny_devil",
        name: "Dikenli Ejderha",
        latinName: "Moloch horridus",
        rarity: "rare",
        superpower: "Derisi mikro kanallarla kaplı. Vücuduna düşen herhangi bir su damlası otomatik olarak ağzına ulaşır.",
        trizPrinciple: "Kapilarite ağı — yüzey su iletimi",
        ecologicalProblemMatch: "su_kitligi",
        analogyText: "Dikenli Ejderha'nın deri yapısı, çöl bölgelerinde yağmur suyunu toplayan akıllı yüzey malzemeleri için model.",
        curiosityQuestion: "Binaların dış cephesi yağmur suyunu otomatik toplasaydı ne kadar su kazanılırdı?",
        image: null,
        silhouette: "🦎"
      },
      {
        id: "honeypot_ant",
        name: "Bal Karıncası",
        latinName: "Myrmecocystus",
        rarity: "common",
        superpower: "Bazı bireyler canlı depo olur. Karınları şişene kadar besin depolar ve koloni için yaşayan bir ambar olur.",
        trizPrinciple: "Canlı depolama — biyolojik rezervuar",
        ecologicalProblemMatch: "toprak_erozyonu",
        analogyText: "Bal karıncasının depolama stratejisi, dağıtık gıda depolama ve toprak besin döngüsü sistemlerine ilham olabilir.",
        curiosityQuestion: "Bir topluluk enerjiyi canlı sistemlerde depolasaydı ne avantajlar olurdu?",
        image: null,
        silhouette: "🐜"
      },
      {
        id: "tree_kangaroo",
        name: "Ağaç Kangurusu",
        latinName: "Dendrolagus",
        rarity: "ultra-rare",
        superpower: "15 metreden atlayıp zarar görmeden yere inebilir. Arka ayaklarındaki özel yapı şoku emer. Biyolojik amortisör.",
        trizPrinciple: "Şok emilimi — biyolojik amortisör",
        ecologicalProblemMatch: "toprak_erozyonu",
        analogyText: "Ağaç Kangurusu'nun şok emme sistemi, depreme dayanıklı yapı tasarımlarına biyolojik model olabilir.",
        curiosityQuestion: "Binalar deprem şokunu kanguru gibi emebilseydi mimari nasıl değişirdi?",
        image: null,
        silhouette: "🦘"
      }
    ]
  }
];
