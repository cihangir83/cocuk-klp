/**
 * AHP (Analytic Hierarchy Process) Calculator
 */

// Random Index based on matrix size (n)
const RI_TABLE = {
  1: 0.00,
  2: 0.00,
  3: 0.58,
  4: 0.90,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41
};

export function calculateAHP(matrix, weights, projectsFullData, criteriaIds) {
  // Input sizes
  const n = projectsFullData.length;
  // Use project intrinsic scores combined with AHP pairwise if matrix was provided.
  // Wait, in this game context from the prompt:
  // "AHP Matrisi. Oyuncunun önünde yüzen veri panelleri... Her hücre tıklanabilir - değer girmek için: 1, 3, 5 vs."
  // Wait, the prompt says the matrix has dimensions AquaF x SolarS x RootN x WindS
  // This means the user creates one Pairwise Comparison matrix for the PROJECTS?
  // Wait. Standard AHP allows pairwise comparison of *projects* regarding *each criterion*. 
  // However, the prompt shows a SINGLE 4x4 matrix, titled "AHP MATRİSİ", with project names on rows and columns!
  // And the criteria weights are given by sliders directly.
  // This means the player is directly comparing the PROJECTS overall, OR they are tweaking a single matrix.
  // Wait, usually they would establish weights using matrix, but the prompt says:
  // "Kriter Ağırlıklandırma: ... Slider %35 %30" -> Weights are direct (not pairwise).
  // "Orta Panel — AHP MATRİSİ: AquaF x SolarS ... 4x4 matrix" -> This is a pairwise comparison of projects!
  // BUT projects already have absolute scores out of 10 for each criterion! 
  // How does the matrix relate to the absolute scores and the weights?
  // Maybe the absolute scores * weights = default score. 
  // If the user enters AHP matrix for projects, it gives a pure AHP ranking of projects based on user preference, 
  // which is then combined with the slider weights? 
  // Actually, standard AHP: Option scores * Criteria Weights.
  // Prompt: "Radar: Her kriterde 4 projenin karşılaştırması — renkli çizgiler."
  // "Bar: Nihai ağırlıklı skor sıralaması."
  // If the matrix is for PROJECTS overall preference, let's calculate the principal eigenvector of this 4x4 matrix 
  // and maybe multiply "Base Score" with "User Preference" or just show the matrix CR.
  // Let's implement calculateAHP that takes the 4x4 pairwise matrix to find CR and Project priorities.
  // Then we can use absolute scores * weights for the Bar chart! 
  
  if (!matrix || matrix.length !== n) return { consistencyRatio: 0, priorites: [], rankings: [] };

  // 1. Column sums
  const colSums = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      colSums[j] += matrix[i][j];
    }
  }

  // 2. Normalize and find row averages (eigenvector / priority vector)
  const normalizedMatrix = matrix.map(row => [...row]);
  const priorities = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let rowSum = 0;
    for (let j = 0; j < n; j++) {
      normalizedMatrix[i][j] /= colSums[j];
      rowSum += normalizedMatrix[i][j];
    }
    priorities[i] = rowSum / n;
  }

  // 3. Calculate Consistency Ratio (CR)
  // Calculate Aw (Matrix * priorities)
  const Aw = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      Aw[i] += matrix[i][j] * priorities[j];
    }
  }

  // Calculate Lambda Max (Aw[i] / priorities[i]) average
  let lambdaMax = 0;
  for (let i = 0; i < n; i++) {
    lambdaMax += Aw[i] / priorities[i];
  }
  lambdaMax /= n;

  // Calculate Consistency Index (CI)
  const CI = (lambdaMax - n) / (n - 1);

  // Calculate Consistency Ratio (CR)
  const RI = RI_TABLE[n] || 0.9;
  const CR = RI === 0 ? 0 : CI / RI;

  // Let's calculate the "Absolute Score" purely using weights and project intrinsic scores:
  let finalScores = projectsFullData.map(p => {
    let score = 0;
    Object.keys(weights).forEach(crit => {
       const weight = weights[crit] / 100;
       const pScore = p.scores[crit] || 0;
       score += pScore * weight;
    });
    return {
       id: p.id,
       name: p.name,
       absoluteScore: score,
       ahpPriority: priorities[projectsFullData.findIndex(x => x.id === p.id)]
    };
  });

  // Calculate a Final Unified Score (example: combining objective + subjective)
  // Or just use absolute scores for the overall 0-10 bar chart, and use Matrix CR as a gameplay feature (consistency check).
  // The prompt says: "Nihai Skor Farkı: 8.71 vs 7.93" which suggests a 0-10 scale.
  // We'll use the absolute score as requested: score += pScore * weight!

  finalScores.sort((a, b) => b.absoluteScore - a.absoluteScore);

  return {
    consistencyRatio: isNaN(CR) ? 0 : CR,
    matrixPriorities: priorities,
    rankings: finalScores
  };
}

export function generateDefaultMatrix(size) {
  const m = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i === j ? 1 : 1);
    }
    m.push(row);
  }
  return m;
}
