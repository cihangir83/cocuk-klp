const tools = [
  {
    id: "tool_parcalara_ayirma",
    name: "Parçalara Ayırma",
    trizNumber: 1,
    description: "Bir nesneyi bağımsız parçalara ayır. Nesneyi kolayca parçalanabilir hale getir.",
    bioHint: "Yaprak Kesici Karınca — yükü parçalara böler, her parça ayrı taşınır.",
    shape: "screwdriver",
    initiallyAvailable: false
  },
  {
    id: "tool_asimetri",
    name: "Asimetri",
    trizNumber: 4,
    description: "Nesnenin simetrik formunu asimetrik yap. Zaten asimetrikse asimetri derecesini arttır.",
    bioHint: "Yengeç pençeleri — biri güçlü kırmak için, diğeri hassas tutmak için.",
    shape: "bent_wrench",
    initiallyAvailable: false
  },
  {
    id: "tool_birlestirme",
    name: "Birleştirme",
    trizNumber: 5,
    description: "Aynı veya benzer nesneleri/işlemleri birleştir. Paralel operasyonları tek adımda topla.",
    bioHint: "Bal arısı kovanı — binlerce hücre tek bir yapıda birleşir.",
    shape: "clamp",
    initiallyAvailable: false
  },
  {
    id: "tool_gozenekli_yapi",
    name: "Gözenekli Yapı",
    trizNumber: 31,
    description: "Nesneyi gözenekli hale getir. İç boşluklar yük taşır ama ağırlık azalır.",
    bioHint: "Kemik yapısı — dış katı, iç süngerimsi. Hem hafif hem güçlü.",
    shape: "honeycomb_key",
    initiallyAvailable: true
  },
  {
    id: "tool_homojenlik",
    name: "Homojenlik",
    trizNumber: 33,
    description: "Etkileşen nesneleri aynı veya benzer malzemeden yap. Yüzey yapısını malzemeyle uyumlu hale getir.",
    bioHint: "Lotus yaprağı — yüzey yapısı yaprak malzemesinin kendisi, ek kaplama yok.",
    shape: "ruler",
    initiallyAvailable: false
  },
  {
    id: "tool_bosaltma",
    name: "Boşaltma",
    trizNumber: 21,
    description: "Zararlı faktörleri hızla atla. Eksik kaynağı farklı bir yerden temin et.",
    bioHint: "Namib böceği — suyu havadan toplar, su kaynağına gitmez.",
    shape: "punch",
    initiallyAvailable: false
  },
  {
    id: "tool_boyut_degistirme",
    name: "Boyut Değiştirme",
    trizNumber: 17,
    description: "Nesneyi farklı bir boyuta taşı. 1D yerine 2D, 2D yerine 3D kullan.",
    bioHint: "Örümcek ağı — 2 boyutlu iplik, 3 boyutlu yapıya dönüşür.",
    shape: "caliper",
    initiallyAvailable: false
  },
  {
    id: "tool_aerodinamik_form",
    name: "Aerodinamik Form",
    trizNumber: 14,
    description: "Düz çizgiler yerine eğriler kullan. Küp formu yerine küre veya damla formu kullan.",
    bioHint: "Yunuslar — vücut şekli suyu minimum direnişle yarar.",
    shape: "curved_blade",
    initiallyAvailable: false
  },
  {
    id: "tool_ters_cevir",
    name: "Tersine Çevir",
    trizNumber: 13,
    description: "Sorunu çözmek için ters yönde düşün. Eylemi tersine çevir.",
    bioHint: "Yarasa — görmek yerine sesleri kullanarak yön bulur.",
    shape: "reverse_wrench",
    initiallyAvailable: false
  },
  {
    id: "tool_renk_degisimi",
    name: "Renk/Enerji Değişimi",
    trizNumber: 32,
    description: "Nesnenin rengini, saydamlığını veya enerji dönüşüm biçimini değiştir.",
    bioHint: "Ateş böceği — ısı yerine doğrudan ışık üretir.",
    shape: "prism",
    initiallyAvailable: false
  },
  {
    id: "tool_kuru_yapisma",
    name: "Kuru Yapışma",
    trizNumber: 30,
    description: "Esnek kabuk veya ince film kullan. Nesneyi çevresinden esnek bariyerle izole et.",
    bioHint: "Gecko ayakları — milyonlarca nano tüycük ile yapışır, izsiz bırakır.",
    shape: "suction_tool",
    initiallyAvailable: false
  },
  {
    id: "tool_ic_ice_gecirme",
    name: "İç İçe Geçirme",
    trizNumber: 7,
    description: "Bir nesneyi diğerinin içine yerleştir. Farklı katmanları birlikte çalıştır.",
    bioHint: "Soğan yapısı — her katman farklı görevde ama birlikte çalışır.",
    shape: "nesting_wrench",
    initiallyAvailable: false
  },
  {
    id: "tool_esnek_kabuk",
    name: "Esnek Kabuk",
    trizNumber: 30,
    description: "Esnek membranlar ve ince filmler kullan. Yüzey mikro yapısını değiştir.",
    bioHint: "Baykuş tüyü kenarları — testere dişi yapı türbülansı kırar.",
    shape: "flexible_blade",
    initiallyAvailable: false
  },
  {
    id: "tool_on_gerilme",
    name: "Ön Gerilme",
    trizNumber: 11,
    description: "Nesneye önceden gerilme/basınç uygula. Ön yükleme ile kapasiteyi artır.",
    bioHint: "Karınca dış iskeleti — ön gerilmeli yapı, devasa yükleri dağıtır.",
    shape: "tension_tool",
    initiallyAvailable: false
  },
  {
    id: "tool_periyodik_eylem",
    name: "Periyodik Eylem",
    trizNumber: 19,
    description: "Sürekli eylem yerine periyodik döngüler kullan. Doğal ritimlerden yararlan.",
    bioHint: "Termit yuvası — konveksiyon döngüsü ile sürekli soğutma.",
    shape: "cycle_wrench",
    initiallyAvailable: false
  },
  {
    id: "tool_kopya",
    name: "Kopya / Taklit",
    trizNumber: 26,
    description: "Pahalı veya kırılgan nesne yerine basit ve ucuz kopyasını kullan. Başka bir sistemin yeteneğini taklit et.",
    bioHint: "Derin deniz balığı — bakteriden ışık yeteneğini kopyalar.",
    shape: "copy_stamp",
    initiallyAvailable: false
  }
];

export default tools;
