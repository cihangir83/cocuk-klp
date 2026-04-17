export const questions = {
  tur1: [
    {
      id: "q1_001",
      type: "multiple_choice",
      question: "Kartal kanatlarındaki tüylerin ucunun yukarı kıvrılması hangi TRIZ ilkesiyle açıklanır?",
      options: [
        { id: "A", text: "Parçalara Ayırma", correct: false },
        { id: "B", text: "Aerodinamik Form", correct: false },
        { id: "C", text: "Asimetri", correct: true },
        { id: "D", text: "Boyut Değiştirme", correct: false }
      ],
      timeLimit: 30,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/800px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg",
      difficulty: "medium",
      bioTrizPrinciple: "Asimetri",
      points: { base: 500, speedBonus: { fast: 200, medium: 100, slow: 50 } }
    },
    {
      id: "q1_002",
      type: "multiple_choice",
      question: "Lotus yapraklarının suyu itmesi ve kendi kendini temizlemesi hangi TRIZ ilkesine ilham vermiştir?",
      options: [
        { id: "A", text: "Gözenekli Yapı", correct: true },
        { id: "B", text: "Önceden Eylem", correct: false },
        { id: "C", text: "Dinamiklik", correct: false },
        { id: "D", text: "Faz Geçişleri", correct: false }
      ],
      timeLimit: 30,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/800px-Sacred_lotus_Nelumbo_nucifera.jpg",
      difficulty: "easy",
      bioTrizPrinciple: "Gözenekli Yapı / Kendini Temizleme",
      points: { base: 500, speedBonus: { fast: 200, medium: 100, slow: 50 } }
    },
    {
      id: "q1_003",
      type: "multiple_choice",
      question: "Termit yuvalarının sabit sıcaklık sağlamak için kullandığı bacalı sistem hangi TRIZ yaklaşımını kullanır?",
      options: [
        { id: "A", text: "Tersine Çevirme", correct: false },
        { id: "B", text: "Yerel Kalite", correct: true },
        { id: "C", text: "Pnömatik Yapı", correct: false },
        { id: "D", text: "Ara Bulucu", correct: false }
      ],
      timeLimit: 30,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg/800px-Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg",
      difficulty: "hard",
      bioTrizPrinciple: "Yerel Kalite",
      points: { base: 500, speedBonus: { fast: 200, medium: 100, slow: 50 } }
    },
    {
      id: "q1_004",
      type: "multiple_choice",
      question: "Köpek balığı derisindeki mikroskobik pulların (riblet) sürtünmeyi azaltması, gemi kaplamalarında hangi ilke ile kullanılır?",
      options: [
        { id: "A", text: "Kopyalama", correct: false },
        { id: "B", text: "Yüzey Özelliklerinin Değiştirilmesi", correct: true },
        { id: "C", text: "Eğrisellik", correct: false },
        { id: "D", text: "Titreşim", correct: false }
      ],
      timeLimit: 30,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Corl0207_%2828225976491%29.jpg/800px-Corl0207_%2828225976491%29.jpg",
      difficulty: "medium",
      bioTrizPrinciple: "Yüzey Özellikleri",
      points: { base: 500, speedBonus: { fast: 200, medium: 100, slow: 50 } }
    },
    {
      id: "q1_005",
      type: "multiple_choice",
      question: "Ağaçkakanların başlarını sarsıntıdan koruyan süngerimsi kemik yapıları kask tasarımında hangi ilke ile eşleşir?",
      options: [
        { id: "A", text: "Özel Ortam", correct: false },
        { id: "B", text: "Kompozit Malzemeler", correct: false },
        { id: "C", text: "Esneme / Yumuşatma", correct: false },
        { id: "D", text: "Gözenekli Yapı / Şok Emilimi", correct: true }
      ],
      timeLimit: 30,
      backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/PileatedWoodpeckerFeedingonTree%2C_crop.jpg/800px-PileatedWoodpeckerFeedingonTree%2C_crop.jpg",
      difficulty: "medium",
      bioTrizPrinciple: "Şok Emilimi",
      points: { base: 500, speedBonus: { fast: 200, medium: 100, slow: 50 } }
    }
  ],
  tur2: [
    {
      id: "q2_001",
      type: "scenario",
      scenario: "Kaş kıyılarında plastik kirlilik deniz kaplumbağalarının yumurtlama alanlarını tehdit ediyor. Mevcut filtrasyon sistemleri verimsiz ve pahalı. Bir Bio-TRIZ çözümü öneriliyor.",
      scenarioImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Pathway-of-plastic-to-ocean.png/800px-Pathway-of-plastic-to-ocean.png",
      options: [
        { id: "A", text: "Balina baleni filtrasyon prensibiyle düşük enerjili pasif filtre sistemi", correct: true },
        { id: "B", text: "Kimyasal çöktürme ile plastik parçacıkları dibe indirme", correct: false },
        { id: "C", text: "Drone ile plastik toplama robotları", correct: false }
      ],
      timeLimit: 60,
      hasJustification: true,
      justificationBonus: 200,
      points: { base: 500 }
    },
    {
      id: "q2_002",
      type: "scenario",
      scenario: "Büyük bir sanayi şehrinde aşırı ısı adası etkisi yaşanıyor. Şehrin soğutulması için yapay klimalar yerine biyomimetik bir yaklaşım gerekiyor.",
      scenarioImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Air_pollution3.jpg/800px-Air_pollution3.jpg",
      options: [
        { id: "A", text: "Binaları yüksek yansıtıcılı beyaz veya gümüş boyalarla boyamak", correct: false },
        { id: "B", text: "Fil kulakları gibi geniş yüzeyli, hava akımını yönlendiren gölgelik yapı ağları kurmak", correct: true },
        { id: "C", text: "Şehir merkezine devasa endüstriyel soğutma fanları yerleştirmek", correct: false }
      ],
      timeLimit: 60,
      hasJustification: true,
      justificationBonus: 200,
      points: { base: 500 }
    },
    {
      id: "q2_003",
      type: "scenario",
      scenario: "Kurak bir tarım bölgesinde bitkilerin sulanması için yer altı suları tükenmek üzere. Atmosferdeki nemden faydalanmak için yeni bir donanım tasarlanmalı.",
      scenarioImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Rub_al_Khali_002.JPG/800px-Rub_al_Khali_002.JPG",
      options: [
        { id: "A", text: "Gökyüzüne suni bulut tohumlama füzeleri fırlatarak yağmur yağdırmak", correct: false },
        { id: "B", text: "Uzaktan başka şehirlerden yeraltı borularıyla su taşıyan bir sistem kurmak", correct: false },
        { id: "C", text: "Namib Çölü böceğinin sırt yapkısını taklit eden mikro çıkıntılı su toplama ağları germek", correct: true }
      ],
      timeLimit: 60,
      hasJustification: true,
      justificationBonus: 200,
      points: { base: 500 }
    }
  ],
  tur3: [
    {
      id: "q3_001",
      type: "visual",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/800px-Sacred_lotus_Nelumbo_nucifera.jpg",
      imageAlt: "Lotus yaprağı makro",
      correctAnswers: ["gözenekli yapı", "kendini temizleme", "superhydrofobik"],
      timeLimit: null,
      points: { first: 1000, second: 500, third: 250, fourth: 100 }
    },
    {
      id: "q3_002",
      type: "visual",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg/800px-Bald_eagle_about_to_fly_in_Alaska_%282016%29.jpg",
      imageAlt: "Kartal kanat kesit",
      correctAnswers: ["aerodinamik", "asimetri", "rüzgar yönetimi"],
      timeLimit: null,
      points: { first: 1000, second: 500, third: 250, fourth: 100 }
    },
    {
      id: "q3_003",
      type: "visual",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg/800px-Coptotermes_formosanus_shiraki_USGov_k8204-7.jpg",
      imageAlt: "Termit yuvası",
      correctAnswers: ["döngüsel sistem", "pasif havalandırma", "yerel kalite", "baca"],
      timeLimit: null,
      points: { first: 1000, second: 500, third: 250, fourth: 100 }
    },
    {
      id: "q3_004",
      type: "visual",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Stenocara_gracilipes.jpg/800px-Stenocara_gracilipes.jpg",
      imageAlt: "Namib böceği",
      correctAnswers: ["su toplama", "yüzey gerilimi", "asimetri", "hidrofilik"],
      timeLimit: null,
      points: { first: 1000, second: 500, third: 250, fourth: 100 }
    },
    {
      id: "q3_005",
      type: "visual",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Iceberg_in_the_Arctic_with_its_underside_exposed.jpg/800px-Iceberg_in_the_Arctic_with_its_underside_exposed.jpg",
      imageAlt: "Buz balığı",
      correctAnswers: ["kimyasal bariyer", "antifriz", "faz geçişi"],
      timeLimit: null,
      points: { first: 1000, second: 500, third: 250, fourth: 100 }
    }
  ],
  final: {
    id: "q_final",
    type: "open",
    question: "Ekrandaki canlı görseline bakarak: Bu canlının hangi özelliği, hangi TRIZ ilkesine ilham verir ve bu ilke ekrandaki ekolojik krizi nasıl çözebilir? Takımınızın yanıtını yazın.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/SEM_image_of_Milnesium_tardigradum_in_active_state_-_journal.pone.0045682.g001-2_%28white_background%29.png/800px-SEM_image_of_Milnesium_tardigradum_in_active_state_-_journal.pone.0045682.g001-2_%28white_background%29.png",
    ecocrisis: "Arktik buzulların erimesiyle ortaya çıkan aşırı sıcaklık dalgalanması",
    timeLimit: 60,
    scoring: "manual",
    maxPoints: 1000
  }
};

export const defaultBadges = [
  { id: "champion",      name: "Şampiyon",        condition: "Turnuvayı kazan" },
  { id: "streak_3",      name: "Streak Ustası",    condition: "3 soruyu arka arkaya doğru" },
  { id: "first_finder",  name: "İlk Bulucu",       condition: "Görsel turda ilk doğru" },
  { id: "no_joker",      name: "Joker Kullanmadı", condition: "Hiç joker kullanmadan bitir" },
  { id: "scenario_ace",  name: "Senaryo Eksperi",  condition: "3 senaryonun tamamı doğru" },
  { id: "speed_demon",   name: "Hız Şeytanı",      condition: "5 soruyu ilk 10 saniyede cevapla" },
  { id: "justifier",     name: "Gerekçe Yazarı",   condition: "3 gerekçe yaz ve bonus al" },
  { id: "bio_master",    name: "Bio-TRIZ Hakimi",  condition: "Tüm ilke sorularını doğru cevapla" },
];
