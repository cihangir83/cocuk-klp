const machines = [
  {
    id: "machine_001",
    name: "Hafif Köprü Makinesi",
    category: "teknik_celiski",
    difficulty: 1,
    contradiction: {
      param1: { name: "Ağırlık", direction: "azalt" },
      param2: { name: "Dayanıklılık", direction: "arttır" },
      description: "Köprü hem hafif hem dayanıklı olmalı. Ama hafif malzeme dayanıksız, dayanıklı malzeme ağır."
    },
    correctTool: "tool_gozenekli_yapi",
    wrongTools: ["tool_parcalara_ayirma", "tool_asimetri", "tool_birlestirme"],
    bioExample: {
      creature: "Kartal Tüyü",
      emoji: "🦅",
      explanation: "İçi boş ama inanılmaz güçlü. Gram başına mukavemet açısından çeliği geçer.",
      detail: "Tüyün iç yapısı gözenekli — bu sayede kuş hem hafif kalır hem de uçuş sırasında devasa aerodinamik kuvvetlere dayanır.",
      trizConnection: "Gözenekli iç yapı ağırlığı minimize eder. Dış kabuk bükülme direncini maksimize eder."
    },
    unlocks: ["machine_002", "tool_aerodinamik_form"]
  },
  {
    id: "machine_002",
    name: "Yakıtsız Hız Makinesi",
    category: "teknik_celiski",
    difficulty: 1,
    contradiction: {
      param1: { name: "Hız", direction: "arttır" },
      param2: { name: "Yakıt Tüketimi", direction: "azalt" },
      description: "Araç hızlı gitmeli ama yakıt tükenmemeli. Hız arttıkça yakıt tüketimi katlanarak artıyor."
    },
    correctTool: "tool_aerodinamik_form",
    wrongTools: ["tool_gozenekli_yapi", "tool_homojenlik", "tool_bosaltma"],
    bioExample: {
      creature: "Şahin",
      emoji: "🦅",
      explanation: "Saatte 390 km hıza ulaşır — ama neredeyse hiç enerji harcamaz. Vücut şekli mükemmel aerodinamiktir.",
      detail: "Şahinin dalış pozisyonunda vücudu damla formuna bürünür. Bu form hava direncini %90 azaltır.",
      trizConnection: "Doğanın aerodinamik formu, enerjiyi minimumda tutarken hızı maksimuma çıkarır."
    },
    unlocks: ["machine_003", "tool_renk_degisimi"]
  },
  {
    id: "machine_003",
    name: "Soğuk Işık Makinesi",
    category: "fiziksel_celiski",
    difficulty: 1,
    contradiction: {
      param1: { name: "Parlaklık", direction: "arttır" },
      param2: { name: "Isı Üretimi", direction: "azalt" },
      description: "Işık kaynağı parlak olmalı ama ısı üretmemeli. Parlak ışık çok ısınıyor, serin olan ise sönük kalıyor."
    },
    correctTool: "tool_renk_degisimi",
    wrongTools: ["tool_parcalara_ayirma", "tool_boyut_degistirme", "tool_aerodinamik_form"],
    bioExample: {
      creature: "Ateş Böceği",
      emoji: "✨",
      explanation: "Lusiferin reaksiyonu ile %98 verimli ışık üretir — neredeyse hiç ısı açığa çıkmaz.",
      detail: "Ateş böceklerinin biyolüminesans sistemi, enerjinin tamamını ışığa çevirir. Bir akkor lamba %5 verimli iken, ateş böceği %98 verimlidir.",
      trizConnection: "Kimyasal enerjiyi doğrudan ışığa çevirmek, ısı ara adımını ortadan kaldırır."
    },
    unlocks: ["machine_004", "tool_kuru_yapisma"]
  },
  {
    id: "machine_004",
    name: "İzsiz Yapışkan Makinesi",
    category: "fiziksel_celiski",
    difficulty: 2,
    contradiction: {
      param1: { name: "Yapışma Gücü", direction: "arttır" },
      param2: { name: "Kalıntı", direction: "azalt" },
      description: "Malzeme güçlü yapışmalı ama söküldüğünde iz bırakmamalı. Güçlü yapıştırıcı kalıntı bırakır, temiz sökülen tutmaz."
    },
    correctTool: "tool_kuru_yapisma",
    wrongTools: ["tool_homojenlik", "tool_renk_degisimi", "tool_gozenekli_yapi"],
    bioExample: {
      creature: "Ahtapot Vantuz",
      emoji: "🐙",
      explanation: "Ahtapotun vantuzları ton kuvvetiyle yapışır ama anında ve izsiz bırakır.",
      detail: "Vantuz yüzeyinde minik kanallar vakum oluşturur. Kimyasal yapıştırıcı yok — sadece fiziksel basınç farkı. Bu yüzden kalıntı bırakmaz.",
      trizConnection: "Kuru yapışma prensibi: kimyasal bağ yerine fiziksel kuvvet kullanarak yapışma ve izsiz çözülme sağlanır."
    },
    unlocks: ["machine_005", "tool_ters_cevir"]
  },
  {
    id: "machine_005",
    name: "Görmeyen Pusula Makinesi",
    category: "sistem_celiskisi",
    difficulty: 2,
    contradiction: {
      param1: { name: "Yön Bulma Hassasiyeti", direction: "arttır" },
      param2: { name: "Görsel Bağımlılık", direction: "azalt" },
      description: "Navigasyon sistemi karanlıkta bile yön bulmalı. Ama optik sensörler ışık olmadan çalışmıyor."
    },
    correctTool: "tool_ters_cevir",
    wrongTools: ["tool_asimetri", "tool_boyut_degistirme", "tool_birlestirme"],
    bioExample: {
      creature: "Yarasa",
      emoji: "🦇",
      explanation: "Tam karanlıkta bir sineği bile yakalayabilir — gözlerini kullanmadan.",
      detail: "Ekolokasyon: yarasa ultrasonik ses dalgaları yayar, yansımayı analiz ederek 3 boyutlu harita oluşturur. Işığa ihtiyaç duymaz.",
      trizConnection: "Algılama biçimini tersine çevirmek: görmek yerine duymak. Farklı bir fiziksel prensip aynı sonuca ulaştırır."
    },
    unlocks: ["machine_006", "tool_bosaltma"]
  },
  {
    id: "machine_006",
    name: "Çöl Suyu Makinesi",
    category: "sistem_celiskisi",
    difficulty: 2,
    contradiction: {
      param1: { name: "Su Toplama Kapasitesi", direction: "arttır" },
      param2: { name: "Su Kaynağı İhtiyacı", direction: "azalt" },
      description: "Çölde su toplanmalı ama yakınlarda su kaynağı yok. Yoğuşma için soğuk yüzey gerekiyor ama çöl çok sıcak."
    },
    correctTool: "tool_bosaltma",
    wrongTools: ["tool_parcalara_ayirma", "tool_kuru_yapisma", "tool_aerodinamik_form"],
    bioExample: {
      creature: "Namib Çöl Böceği",
      emoji: "🪲",
      explanation: "Dünyanın en kurak çölünde havadan su toplar — hiçbir su kaynağına ihtiyaç duymadan.",
      detail: "Sırtındaki mikro tümsekler hidrofil (su çeken), aralarındaki oluklar hidrofob (su iten). Sis taneleri tümseklerde birikir, oluklardan ağzına akar.",
      trizConnection: "Yüzey yapısını değiştirerek havadaki nemi yakalama — su kaynağı yerine atmosferi kullanma."
    },
    unlocks: ["machine_007", "tool_ic_ice_gecirme"]
  },
  {
    id: "machine_007",
    name: "Bükülmez Sütun Makinesi",
    category: "teknik_celiski",
    difficulty: 2,
    contradiction: {
      param1: { name: "Esneklik", direction: "arttır" },
      param2: { name: "Dayanıklılık", direction: "arttır" },
      description: "Yapı hem esnek hem güçlü olmalı. Ama esnek malzeme zayıf, güçlü malzeme kırılgan."
    },
    correctTool: "tool_ic_ice_gecirme",
    wrongTools: ["tool_gozenekli_yapi", "tool_ters_cevir", "tool_homojenlik"],
    bioExample: {
      creature: "Bambu",
      emoji: "🎍",
      explanation: "Çelikten daha güçlü ama fırtınada kırılmak yerine eğilir.",
      detail: "Bambu elyaf yapısı: sert dış kabuk + esnek iç lifler. Katmanlar farklı yönlerde dizilerek hem bükülme hem kırılma direnci sağlar.",
      trizConnection: "İç içe geçmiş katmanlar: farklı özellikteki malzemeleri birleştirerek her iki parametre aynı anda optimize edilir."
    },
    unlocks: ["machine_008", "tool_on_gerilme"]
  },
  {
    id: "machine_008",
    name: "Dev Yük Taşıyıcı Makinesi",
    category: "fiziksel_celiski",
    difficulty: 3,
    contradiction: {
      param1: { name: "Taşıma Kapasitesi", direction: "arttır" },
      param2: { name: "Boyut", direction: "azalt" },
      description: "Küçük bir sistem büyük yükleri taşımalı. Ama küçük yapılar büyük yüklere dayanamaz."
    },
    correctTool: "tool_on_gerilme",
    wrongTools: ["tool_bosaltma", "tool_esnek_kabuk", "tool_parcalara_ayirma", "tool_birlestirme"],
    bioExample: {
      creature: "Karınca",
      emoji: "🐜",
      explanation: "Kendi ağırlığının 50 katını taşıyabilir. İnsan boyutunda olsa bir kamyon kaldırırdı.",
      detail: "Karıncanın kas lifleri vücut ağırlığına oranla devasa kuvvet üretir. Ayrıca dış iskelet yapısı, kuvveti tüm gövdeye dağıtır.",
      trizConnection: "Ön gerilme prensibi: yapıyı önceden gerilim altında tutarak yük kapasitesini boyuttan bağımsız hale getirmek."
    },
    unlocks: ["machine_009", "tool_esnek_kabuk"]
  },
  {
    id: "machine_009",
    name: "Sessiz Sürat Makinesi",
    category: "teknik_celiski",
    difficulty: 3,
    contradiction: {
      param1: { name: "Hız", direction: "arttır" },
      param2: { name: "Gürültü", direction: "azalt" },
      description: "Sistem hızlı çalışmalı ama sessiz olmalı. Hız arttıkça türbülans ve mekanik gürültü katlanıyor."
    },
    correctTool: "tool_esnek_kabuk",
    wrongTools: ["tool_aerodinamik_form", "tool_renk_degisimi", "tool_kuru_yapisma", "tool_ic_ice_gecirme"],
    bioExample: {
      creature: "Baykuş Tüyü",
      emoji: "🦉",
      explanation: "Baykuş tam karanlıkta avlanır — uçarken neredeyse sıfır ses çıkarır.",
      detail: "Tüy kenarlarında testere dişi şeklinde mikro yapılar var. Bu yapılar hava türbülansını kırar ve sesi absorbe eder.",
      trizConnection: "Esnek kabuk/yüzey yapısı: kenar geometrisini değiştirerek gürültüyü kaynağında yok etmek."
    },
    unlocks: ["machine_010", "tool_periyodik_eylem"]
  },
  {
    id: "machine_010",
    name: "Enerjisiz Soğutucu Makinesi",
    category: "ekolojik_celiski",
    difficulty: 3,
    contradiction: {
      param1: { name: "Soğutma Gücü", direction: "arttır" },
      param2: { name: "Enerji Tüketimi", direction: "azalt" },
      description: "Bina soğutulmalı ama enerji harcanmamalı. Klima çok enerji tüketiyor, doğal havalandırma yetersiz kalıyor."
    },
    correctTool: "tool_periyodik_eylem",
    wrongTools: ["tool_on_gerilme", "tool_ters_cevir", "tool_bosaltma", "tool_gozenekli_yapi"],
    bioExample: {
      creature: "Termit Yuvası",
      emoji: "🏗️",
      explanation: "Afrika sıcağında iç sıcaklık sabit 31°C — hiçbir enerji kaynağı kullanmadan.",
      detail: "Termitler yuva duvarlarında bacalar ve kanallar inşa eder. Sıcak hava yükselip çıkar, serin hava yeraltından çekilir — otomatik döngü.",
      trizConnection: "Periyodik eylem: doğal konveksiyon döngüsü ile sürekli soğutma — dış enerji kaynağına gerek yok."
    },
    unlocks: ["machine_011", "tool_homojenlik"]
  },
  {
    id: "machine_011",
    name: "Kaplamasız Kalkan Makinesi",
    category: "ekolojik_celiski",
    difficulty: 3,
    contradiction: {
      param1: { name: "Kir Direnci", direction: "arttır" },
      param2: { name: "Kimyasal Kaplama", direction: "azalt" },
      description: "Yüzey kendini temizlemeli ama kimyasal kaplama kullanılmamalı. Kimyasal kaplamalar çevreye zararlı ve zamanla aşınıyor."
    },
    correctTool: "tool_homojenlik",
    wrongTools: ["tool_kuru_yapisma", "tool_esnek_kabuk", "tool_periyodik_eylem", "tool_renk_degisimi"],
    bioExample: {
      creature: "Lotus Yaprağı",
      emoji: "🪷",
      explanation: "Bataklıkta yaşamasına rağmen yaprak yüzeyi her zaman tertemiz.",
      detail: "Yaprak yüzeyinde nano boyutta papiller var. Su damlaları bu yapıya tutunamaz, yuvarlanırken üstündeki kiri de alıp götürür — süper hidrofobik etki.",
      trizConnection: "Homojenlik: yüzey yapısını malzemeyle aynı maddeden mikro düzeyde şekillendirerek kaplama ihtiyacını ortadan kaldırmak."
    },
    unlocks: ["machine_012", "tool_kopya"]
  },
  {
    id: "machine_012",
    name: "Güneşsiz Fener Makinesi",
    category: "ekolojik_celiski",
    difficulty: 3,
    contradiction: {
      param1: { name: "Işık Üretimi", direction: "arttır" },
      param2: { name: "Güneş Bağımlılığı", direction: "azalt" },
      description: "Işık sistemi çalışmalı ama güneş enerjisine bağımlı olmamalı. Güneşsiz ortamda enerji üretmek çok zor."
    },
    correctTool: "tool_kopya",
    wrongTools: ["tool_birlestirme", "tool_on_gerilme", "tool_periyodik_eylem", "tool_parcalara_ayirma", "tool_asimetri"],
    bioExample: {
      creature: "Derin Deniz Balıkları",
      emoji: "🐟",
      explanation: "Okyanusun en karanlık noktalarında kendi ışıklarını üretirler — güneş ışığı asla ulaşmaz.",
      detail: "Anglerfish ve diğer derin deniz canlıları biyolüminesans bakterilerle simbiyoz yaşar. Bakteri ışık üretir, balık barınak sağlar.",
      trizConnection: "Kopya ilkesi: başka bir organizmadan \"ışık üretme yeteneğini\" kopyalayarak enerji bağımsız aydınlatma."
    },
    unlocks: []
  }
];

export default machines;
