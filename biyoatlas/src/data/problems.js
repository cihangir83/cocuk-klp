// Her problem kategorisi için birden fazla senaryo
// Her seferinde rastgele biri gösterilir — öğrenci ezberleyemez

export const problems = [
  {
    id: "plastik_kirliligi",
    label: "Plastik Kirlilik",
    icon: "🌊",
    color: "#4A90D9",
    description: "Her yıl 8 milyon ton plastik okyanuslara karışıyor. Doğanın bu soruna çözümü var mı?",
    scenarios: [
      {
        text: "Bir kıyı kasabasında balıkçı ağları plastik atıklarla tıkanıyor, balıklar azalıyor.",
        focus: "Plastik alternatifi"
      },
      {
        text: "Bir nehirde mikroplastikler su arıtma tesislerinin filtrelerinden geçiyor, içme suyuna karışıyor.",
        focus: "Filtreleme çözümü"
      },
      {
        text: "Bir market zinciri yılda 2 milyon plastik poşet kullanıyor, geri dönüşüm oranı %8.",
        focus: "Biyolojik ambalaj"
      },
      {
        text: "Okyanus dibinde plastik parçacıklar besin zincirine giriyor, deniz canlılarını zehirliyor.",
        focus: "Doğal parçalanma"
      }
    ]
  },
  {
    id: "su_kitligi",
    label: "Su Kıtlığı",
    icon: "💧",
    color: "#5DADE2",
    description: "Dünya nüfusunun %40'ı su kıtlığı riski altında. Doğa suyu nasıl buluyor?",
    scenarios: [
      {
        text: "Bir çöl köyünde en yakın su kaynağı 15 km uzakta, kadınlar her gün saatlerce yürüyor.",
        focus: "Su toplama"
      },
      {
        text: "Bir şehirde yaz aylarında baraj seviyesi %20'ye düşüyor, su kesintileri başlıyor.",
        focus: "Su depolama"
      },
      {
        text: "Tarım alanlarında sulama suyunun %60'ı buharlaşarak kayboluyor.",
        focus: "Verimli su kullanımı"
      },
      {
        text: "Bir adadaki tatlı su kaynakları tükeniyor, deniz suyu arıtması çok pahalı.",
        focus: "Alternatif su kaynağı"
      }
    ]
  },
  {
    id: "enerji_verimliligi",
    label: "Enerji Verimliliği",
    icon: "⚡",
    color: "#F5A623",
    description: "Enerji üretiminin %60'ı israf ediliyor. Doğa enerjiyi nasıl verimli kullanıyor?",
    scenarios: [
      {
        text: "Bir fabrika soğutma sistemi için elektrik faturasının %40'ını harcıyor.",
        focus: "Pasif soğutma"
      },
      {
        text: "Bir hastane jeneratörsüz 72 saat dayanmalı ama batarya kapasitesi yetersiz.",
        focus: "Enerji depolama"
      },
      {
        text: "Bir okulun kış aylarında ısıtma maliyeti bütçenin %30'unu yiyor.",
        focus: "Yalıtım ve ısı koruma"
      },
      {
        text: "Gece aydınlatması için kullanılan sokak lambalarının %70'i gereksiz yere yanıyor.",
        focus: "Akıllı enerji kullanımı"
      }
    ]
  },
  {
    id: "toprak_erozyonu",
    label: "Toprak Erozyonu",
    icon: "🏔️",
    color: "#8B6914",
    description: "Her yıl 24 milyar ton verimli toprak kaybediliyor. Doğa toprağı nasıl koruyor?",
    scenarios: [
      {
        text: "Bir yamaçtaki tarla her yağmurda biraz daha toprak kaybediyor, verim düşüyor.",
        focus: "Toprak tutma"
      },
      {
        text: "Rüzgar erozyonu bir çiftliğin üst toprak tabakasını 10 yılda 5 cm azalttı.",
        focus: "Rüzgar bariyeri"
      },
      {
        text: "Orman kesimi sonrası dağ yamacında toprak kaymaları başladı, köy tehlike altında.",
        focus: "Kök sistemi"
      },
      {
        text: "Bir nehir yatağı çevresinde betonlaşma nedeniyle doğal toprak tutucu bitkiler yok oldu.",
        focus: "Doğal drenaj"
      }
    ]
  },
  {
    id: "iklim_degisikligi",
    label: "İklim Değişikliği",
    icon: "🌡️",
    color: "#E84545",
    description: "Küresel sıcaklık her on yılda 0.2°C artıyor. Doğa ekstrem koşullara nasıl uyum sağlıyor?",
    scenarios: [
      {
        text: "Bir kıyı şehrinde deniz seviyesi yükseliyor, alçak mahalleler sular altında kalma riski taşıyor.",
        focus: "Adaptasyon"
      },
      {
        text: "Sıcak dalgaları nedeniyle bir şehirde yaz aylarında dış mekan işçileri çalışamıyor.",
        focus: "Isı dayanıklılığı"
      },
      {
        text: "Mevsim değişiklikleri nedeniyle çiftçiler ekim zamanını belirleyemiyor, hasat kaybı artıyor.",
        focus: "Adaptif algılama"
      },
      {
        text: "Kutuplardaki buzullar eriyor, soğuğa uyumlu türler yaşam alanı kaybediyor.",
        focus: "Ekstrem koşul koruması"
      }
    ]
  },
  {
    id: "biyocesitlilik_kaybi",
    label: "Biyoçeşitlilik Kaybı",
    icon: "🦋",
    color: "#9B59B6",
    description: "Her gün onlarca tür yok oluyor. Doğanın koruma stratejileri neler?",
    scenarios: [
      {
        text: "Bir ormandaki kuş türlerinin %30'u son 20 yılda gözlenemez hale geldi.",
        focus: "Habitat koruma"
      },
      {
        text: "Deniz ekosisteminde bir ana tür yok olunca besin zinciri çöktü, diğer türler de tehlikeye girdi.",
        focus: "Ekosistem dengesi"
      },
      {
        text: "Şehirleşme nedeniyle böcek popülasyonları azaldı, tarımda tozlaşma sorunu başladı.",
        focus: "Dağıtık koruma"
      },
      {
        text: "İstilacı bir tür yerel ekosistemdeki endemik türleri tehdit ediyor.",
        focus: "Kamuflaj ve adaptasyon"
      }
    ]
  }
];

/**
 * Verilen problem ID'si için rastgele bir senaryo seçer.
 * Her oynanışta farklı bir senaryo gelir.
 */
export function getRandomScenario(problemId) {
  const problem = problems.find(p => p.id === problemId);
  if (!problem || !problem.scenarios.length) return problem?.description || '';
  const idx = Math.floor(Math.random() * problem.scenarios.length);
  return problem.scenarios[idx].text;
}

/**
 * Zorluk seviyesine göre problem kartları hazırlar.
 * level 1: 1 doğru + 3 uzak yanlış (kolay)
 * level 2: 1 doğru + 1 yakın yanlış + 2 uzak yanlış (orta)
 * level 3: 1 doğru + 2 yakın yanlış + 1 uzak yanlış (zor)
 */
export function prepareProblemCards(correctProblemId, playerAnalogiesCount = 0) {
  // Determine difficulty based on player progress
  let level = 1;
  if (playerAnalogiesCount >= 8) level = 3;
  else if (playerAnalogiesCount >= 4) level = 2;

  const correct = problems.find(p => p.id === correctProblemId);
  if (!correct) return problems.slice(0, 4);

  const others = problems.filter(p => p.id !== correctProblemId);

  // Define "close" problems — categories that could seem related
  const closeProblems = {
    plastik_kirliligi: ['biyocesitlilik_kaybi', 'su_kitligi'],
    su_kitligi: ['toprak_erozyonu', 'iklim_degisikligi'],
    enerji_verimliligi: ['iklim_degisikligi', 'toprak_erozyonu'],
    toprak_erozyonu: ['su_kitligi', 'biyocesitlilik_kaybi'],
    iklim_degisikligi: ['enerji_verimliligi', 'su_kitligi'],
    biyocesitlilik_kaybi: ['plastik_kirliligi', 'iklim_degisikligi'],
  };

  const closeIds = closeProblems[correctProblemId] || [];
  const closeCandidates = others.filter(p => closeIds.includes(p.id));
  const farCandidates = others.filter(p => !closeIds.includes(p.id));

  let selected = [];

  if (level === 1) {
    // Easy: 3 far wrong
    selected = shuffleArray(farCandidates).slice(0, Math.min(3, farCandidates.length));
    if (selected.length < 3) {
      selected.push(...shuffleArray(closeCandidates).slice(0, 3 - selected.length));
    }
  } else if (level === 2) {
    // Medium: 1 close + 2 far
    const close = shuffleArray(closeCandidates).slice(0, 1);
    const far = shuffleArray(farCandidates).slice(0, 2);
    selected = [...close, ...far];
    if (selected.length < 3) {
      selected.push(...shuffleArray(others.filter(p => !selected.find(s => s.id === p.id))).slice(0, 3 - selected.length));
    }
  } else {
    // Hard: 2 close + 1 far
    const close = shuffleArray(closeCandidates).slice(0, 2);
    const far = shuffleArray(farCandidates).slice(0, 1);
    selected = [...close, ...far];
    if (selected.length < 3) {
      selected.push(...shuffleArray(others.filter(p => !selected.find(s => s.id === p.id))).slice(0, 3 - selected.length));
    }
  }

  // Assign random scenarios to each problem
  const result = [correct, ...selected].map(p => ({
    ...p,
    currentScenario: getRandomScenario(p.id),
    isScenarioBased: true
  }));

  return shuffleArray(result);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
