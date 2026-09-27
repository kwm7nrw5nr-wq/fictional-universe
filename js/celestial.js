/*
 * 虛構世界｜天體資料庫
 *
 * 負責：
 * - 恆星
 * - 棕矮星
 * - 白矮星
 * - 中子星
 * - 黑洞
 * - 白洞
 * - 蟲洞
 * - 其他特殊天體
 */


// ==============================
// 恆星
// ==============================

const STAR_TYPES = {

  // ==========================
  // 一般恆星光譜
  // ==========================

  O: {
    name: "O型",
    color: "藍色",
    temperature: "極高溫"
  },

  B: {
    name: "B型",
    color: "藍白色",
    temperature: "高溫"
  },

  A: {
    name: "A型",
    color: "白色",
    temperature: "較高溫"
  },

  F: {
    name: "F型",
    color: "黃白色",
    temperature: "中高溫"
  },

  G: {
    name: "G型",
    color: "黃色",
    temperature: "中等溫度"
  },

  K: {
    name: "K型",
    color: "橙色",
    temperature: "較低溫"
  },

  M: {
    name: "M型",
    color: "紅色",
    temperature: "低溫"
  }

};


// ==============================
// 棕矮星
// ==============================

const BROWN_DWARF_TYPES = {

  L: {
    name: "L型棕矮星",
    color: "深紅至紅外",
    temperature: "低溫"
  },

  T: {
    name: "T型棕矮星",
    color: "紅外",
    temperature: "極低溫"
  },

  Y: {
    name: "Y型棕矮星",
    color: "紅外",
    temperature: "超低溫"
  }

};


// ==============================
// MK 光譜次型規則
// ==============================
//
// 各光譜型使用自己的次型網格。
// 不強迫 O～M 全部使用 0～9。
// ==============================

const STAR_SPECTRAL_SUBTYPE_RULES = {
  O: {
    values: [
      { subtype: 2, weight: 1 },
      { subtype: 3, weight: 1 },
      { subtype: 4, weight: 1 },
      { subtype: 5, weight: 2 },
      { subtype: 6, weight: 3 },
      { subtype: 7, weight: 4 },
      { subtype: 8, weight: 5 },
      { subtype: 9, weight: 6 },
      { subtype: 9.2, weight: 4 },
      { subtype: 9.5, weight: 3 },
      { subtype: 9.7, weight: 2 }
    ]
  },

  B: {
    values: [
      { subtype: 0, weight: 2 },
      { subtype: 0.2, weight: 1 },
      { subtype: 0.5, weight: 2 },
      { subtype: 0.7, weight: 2 },
      { subtype: 1, weight: 3 },
      { subtype: 1.5, weight: 3 },
      { subtype: 2, weight: 4 },
      { subtype: 2.5, weight: 4 },
      { subtype: 3, weight: 5 },
      { subtype: 3.5, weight: 5 },
      { subtype: 4, weight: 6 },
      { subtype: 4.5, weight: 6 },
      { subtype: 5, weight: 7 },
      { subtype: 5.5, weight: 7 },
      { subtype: 6, weight: 8 },
      { subtype: 6.5, weight: 8 },
      { subtype: 7, weight: 9 },
      { subtype: 7.5, weight: 9 },
      { subtype: 8, weight: 10 },
      { subtype: 8.5, weight: 10 },
      { subtype: 9, weight: 11 }
    ]
  },

  A: {
    values: [
      { subtype: 0, weight: 1 },
      { subtype: 1, weight: 2 },
      { subtype: 2, weight: 3 },
      { subtype: 3, weight: 4 },
      { subtype: 4, weight: 5 },
      { subtype: 5, weight: 6 },
      { subtype: 6, weight: 7 },
      { subtype: 7, weight: 8 },
      { subtype: 8, weight: 9 },
      { subtype: 9, weight: 10 }
    ]
  },

  F: {
    values: [
      { subtype: 0, weight: 1 },
      { subtype: 1, weight: 2 },
      { subtype: 2, weight: 3 },
      { subtype: 3, weight: 4 },
      { subtype: 4, weight: 5 },
      { subtype: 5, weight: 6 },
      { subtype: 6, weight: 7 },
      { subtype: 7, weight: 8 },
      { subtype: 8, weight: 9 },
      { subtype: 9, weight: 10 }
    ]
  },

  G: {
    values: [
      { subtype: 0, weight: 2 },
      { subtype: 2, weight: 5 },
      { subtype: 5, weight: 7 },
      { subtype: 8, weight: 4 }
    ]
  },

  K: {
    values: [
      { subtype: 0, weight: 2 },
      { subtype: 2, weight: 4 },
      { subtype: 3, weight: 5 },
      { subtype: 5, weight: 7 },
      { subtype: 7, weight: 5 }
    ]
  },

  M: {
    values: [
      { subtype: 0, weight: 1 },
      { subtype: 1, weight: 2 },
      { subtype: 2, weight: 3 },
      { subtype: 3, weight: 4 },
      { subtype: 4, weight: 5 },
      { subtype: 5, weight: 6 },
      { subtype: 6, weight: 7 },
      { subtype: 7, weight: 8 },
      { subtype: 8, weight: 9 },
      { subtype: 9, weight: 10 }
    ]
  }
};

// ==============================
// 光度／體積級
// ==============================

const STAR_LUMINOSITY_CLASSES = {

  I: {
    name: "超巨星"
  },

  II: {
    name: "亮巨星"
  },

  III: {
    name: "巨星"
  },

  IV: {
    name: "次巨星"
  },

  V: {
    name: "主序星／矮星"
  },

  VI: {
    name: "次矮星"
  },

  VII: {
    name: "白矮星",
    deprecated: true,
    replacement: "D"
  }

};


// ==============================
// 光度級細分
// a：較大、較亮
// ab：中間
// b：較小、較暗
// + / -：進一步細分
// ==============================

const STAR_LUMINOSITY_SUBTYPES = {

  a: {
    name: "較大／較亮"
  },

  ab: {
    name: "中間"
  },

  b: {
    name: "較小／較暗"
  },

  "+": {
    name: "進一步偏大／偏亮"
  },

  "-": {
    name: "進一步偏小／偏暗"
  }

};


// ==============================
// 光譜特徵後綴
// ==============================

const STAR_SPECTRAL_SUFFIXES = {

  e: {
    name: "發射譜線",
    description: "具有明顯的發射譜線"
  },

  p: {
    name: "特異譜線",
    description: "具有異常或特殊的光譜特徵"
  },

  m: {
    name: "金屬譜線",
    description: "金屬吸收線特別強，常見於部分A型恆星"
  },

  n: {
    name: "模糊譜線",
    description: "光譜線較寬，通常與高速自轉造成的展寬有關"
  },

  s: {
    name: "銳利譜線",
    description: "光譜線較窄、較銳利"
  },

  v: {
    name: "變動譜線",
    description: "光譜特徵會隨時間發生變化"
  }

};


// ==============================
// 棕矮星光譜次型
// ==============================

const BROWN_DWARF_SPECTRAL_SUBTYPE = {

  L: {
    min: 0,
    max: 9,
    allowDecimal: true
  },

  T: {
    min: 0,
    max: 9,
    allowDecimal: true
  },

  Y: {
    min: 0,
    max: 4,
    allowDecimal: true
  }

};


// ==============================
// 恆星殘骸
// ==============================

const STELLAR_REMNANT_TYPES = {

  // ==============================
  // 白矮星
  // ==============================

  whiteDwarf: {

    DA: {
      name: "DA型白矮星",
      atmosphere: "氫",
      description: "具有氫主導的大氣層"
    },

    DB: {
      name: "DB型白矮星",
      atmosphere: "氦",
      description: "具有氦主導的大氣層"
    },

    DC: {
      name: "DC型白矮星",
      atmosphere: "無明顯譜線",
      description: "光譜中缺乏明顯吸收譜線"
    },

    DO: {
      name: "DO型白矮星",
      atmosphere: "氦",
      description: "高溫氦大氣白矮星"
    },

    DQ: {
      name: "DQ型白矮星",
      atmosphere: "碳",
      description: "光譜具有碳相關特徵"
    },

    DZ: {
      name: "DZ型白矮星",
      atmosphere: "金屬",
      description: "光譜中具有金屬元素特徵"
    },

    DX: {
      name: "DX型白矮星",
      atmosphere: "未分類",
      description: "目前無法明確歸入其他白矮星光譜類型"
    }

  },

  // ==============================
  // 中子星
  // ==============================

  neutronStar: {

    pulsar: {
      name: "脈衝星",
      description: "高速自轉並以規律脈衝形式發出電磁輻射的中子星"
    },

    magnetar: {
      name: "磁星",
      description: "具有極強磁場的中子星"
    },

    millisecondPulsar: {
      name: "毫秒脈衝星",
      description: "自轉週期極短、可達毫秒尺度的脈衝星"
    },

    xRayBinary: {
      name: "X射線雙星中子星",
      description: "與伴星形成雙星系統並透過吸積產生強烈X射線"
    },

    isolatedNeutronStar: {
      name: "孤立中子星",
      description: "沒有明顯伴星、獨立存在的中子星"
    }

  }

};


// ==============================
// 黑洞
// ==============================

const BLACK_HOLE_TYPES = {

  // ==============================
  // 黑洞時空幾何分類
  // ==============================

  schwarzschild: {
    name: "史瓦西黑洞",
    rotation: false,
    charge: false,
    description: "不旋轉且不帶電的理想黑洞"
  },

  kerr: {
    name: "克爾黑洞",
    rotation: true,
    charge: false,
    description: "具有自轉角動量但不帶電的黑洞"
  },

  reissnerNordstrom: {
    name: "萊斯納－諾德斯特倫黑洞",
    rotation: false,
    charge: true,
    description: "不旋轉但帶有電荷的理論黑洞"
  },

  kerrNewman: {
    name: "克爾－紐曼黑洞",
    rotation: true,
    charge: true,
    description: "同時具有自轉與電荷的理論黑洞"
  }

};


// ==============================
// 黑洞質量級別
// ==============================

const BLACK_HOLE_MASS_CLASSES = {

  micro: {
    name: "微型黑洞",
    description: "質量遠低於恆星級黑洞的黑洞"
  },

  stellar: {
    name: "恆星級黑洞",
    description: "質量約相當於數個至數十個太陽質量的黑洞"
  },

  intermediate: {
    name: "中等質量黑洞",
    description: "介於恆星級黑洞與超大質量黑洞之間"
  },

  supermassive: {
    name: "超大質量黑洞",
    description: "位於許多大型星系中心、具有極大質量的黑洞"
  }

};


// ==============================
// 白洞
// ==============================

const WHITE_HOLE_TYPES = {

  theoretical: {
    name: "理論白洞",
    description: "廣義相對論方程式中允許存在的白洞解"
  },

  eternal: {
    name: "永恆白洞",
    description: "假設長期存在並持續排出物質與能量的理論白洞"
  },

  transient: {
    name: "瞬態白洞",
    description: "假設僅在極短時間內出現的白洞"
  }

};


// ==============================
// 蟲洞
// ==============================

const WORMHOLE_TYPES = {

  natural: {

    stellar: {
      name: "天然蟲洞",
      description: "自然形成、未經文明建造的蟲洞"
    }

  },

  artificial: {

    constructed: {
      name: "人造蟲洞",
      description: "由高等文明利用技術建立或維持的蟲洞"
    }

  }

};


// ==============================
// 其他特殊天體
// ==============================

const SPECIAL_CELESTIAL_TYPES = {

  nebula: {

    emission: {
      name: "發射星雲",
      description: "受到附近高能輻射激發而發光的星雲"
    },

    reflection: {
      name: "反射星雲",
      description: "反射附近恆星光線而呈現亮度的星雲"
    },

    dark: {
      name: "暗星雲",
      description: "由濃密塵埃遮蔽背景光線的星雲"
    },

    planetary: {
      name: "行星狀星雲",
      description: "低至中等質量恆星演化晚期形成的膨脹氣體殼層"
    },

    supernovaRemnant: {
      name: "超新星殘骸",
      description: "恆星爆炸後向周圍空間擴散形成的結構"
    }

  }

};


// ==============================
// 星系年齡分類
// ==============================

const GALAXY_AGE_CLASSES = {

  young: {
    name: "年輕星系",
    description: "恆星形成活動旺盛，年輕大質量恆星比例較高",
    starFormationRate: "high"
  },

  intermediate: {
    name: "中年星系",
    description: "仍持續形成恆星，但恆星形成活動已較年輕星系低",
    starFormationRate: "medium"
  },

  old: {
    name: "老年星系",
    description: "恆星形成活動較低，低質量長壽命恆星占比較高",
    starFormationRate: "low"
  }

};


// ==============================
// 星系中的恆星相對權重
// 數值越高，代表相對生成權重越高
// ==============================

const GALAXY_STAR_WEIGHTS = {

  young: {
    O: 8,
    B: 20,
    A: 30,
    F: 40,
    G: 60,
    K: 80,
    M: 100
  },

  intermediate: {
    O: 2,
    B: 8,
    A: 20,
    F: 35,
    G: 60,
    K: 85,
    M: 100
  },

  old: {
    O: 0.1,
    B: 0.5,
    A: 5,
    F: 25,
    G: 60,
    K: 90,
    M: 100
  }

};


// ==============================
// 恆星形成活動等級
// ==============================

const STAR_FORMATION_LEVELS = {

  extreme: {
    name: "極高",
    multiplier: 2.0
  },

  high: {
    name: "高",
    multiplier: 1.5
  },

  medium: {
    name: "中",
    multiplier: 1.0
  },

  low: {
    name: "低",
    multiplier: 0.5
  },

  dormant: {
    name: "近乎停止",
    multiplier: 0.1
  }

};

const STAR_FORMATION_COUNT_RANGES = {
  extreme: { min: 8, max: 20 },
  high: { min: 5, max: 12 },
  medium: { min: 3, max: 8 },
  low: { min: 1, max: 4 },
  dormant: { min: 0, max: 1 }
};

const STAR_FORMATION_SPECTRAL_MODIFIERS = {
  extreme: {
    O: 2.5,
    B: 2.0,
    A: 1.5,
    F: 1.1,
    G: 1.0,
    K: 0.9,
    M: 0.8
  },

  high: {
    O: 1.8,
    B: 1.6,
    A: 1.3,
    F: 1.1,
    G: 1.0,
    K: 0.95,
    M: 0.9
  },

  medium: {
    O: 1.0,
    B: 1.0,
    A: 1.0,
    F: 1.0,
    G: 1.0,
    K: 1.0,
    M: 1.0
  },

  low: {
    O: 0.4,
    B: 0.6,
    A: 0.8,
    F: 0.95,
    G: 1.0,
    K: 1.1,
    M: 1.2
  },

  dormant: {
    O: 0.05,
    B: 0.15,
    A: 0.4,
    F: 0.8,
    G: 1.0,
    K: 1.2,
    M: 1.4
  }
};

// ==============================
// 星系類型
// ==============================

const GALAXY_TYPES = {

  spiral: {
    name: "螺旋星系",
    starFormation: "medium"
  },

  elliptical: {
    name: "橢圓星系",
    starFormation: "low"
  },

  irregular: {
    name: "不規則星系",
    starFormation: "high"
  },

  lenticular: {
    name: "透鏡星系",
    starFormation: "low"
  }

};


// ==============================
// 星系類型 × 年齡
// 恆星形成活動修正
// ==============================

const GALAXY_STAR_FORMATION_MODIFIERS = {

  spiral: {
    young: 1.4,
    intermediate: 1.0,
    old: 0.5
  },

  elliptical: {
    young: 0.8,
    intermediate: 0.4,
    old: 0.1
  },

  irregular: {
    young: 1.8,
    intermediate: 1.4,
    old: 0.8
  },

  lenticular: {
    young: 1.0,
    intermediate: 0.7,
    old: 0.3
  }

};


// ==============================
// 加權隨機選擇
// ==============================

function weightedRandom(weights, random) {

  const entries =
    Object.entries(weights);

  const total =
    entries.reduce(
      (sum, [, weight]) =>
        sum + weight,
      0
    );

  let value =
    random() * total;

  for (const [key, weight] of entries) {

    value -= weight;

    if (value < 0) {
      return key;
    }

  }

  return entries[
    entries.length - 1
  ][0];

}

function generateStarCount(formationLevel, random) {
  const range = STAR_FORMATION_COUNT_RANGES[formationLevel];

  if (!range) {
    return 0;
  }

  return (
    range.min +
    Math.floor(random() * (range.max - range.min + 1))
  );
}

// ==============================
// 計算星系環境下的恆星生成權重
// ==============================

function calculateStarGenerationWeights(galaxyType, galaxyAge, formationLevel) {
  const ageWeights = GALAXY_STAR_WEIGHTS[galaxyAge];
  const formationData = STAR_FORMATION_LEVELS[formationLevel];
  const formationSpectralModifiers =
    STAR_FORMATION_SPECTRAL_MODIFIERS[formationLevel];

  const galaxyModifier =
    GALAXY_STAR_FORMATION_MODIFIERS[galaxyType][galaxyAge];

  const weights = {};

  for (const type of Object.keys(STAR_TYPES)) {
    const ageWeight = ageWeights[type];
    const spectralModifier = formationSpectralModifiers[type];

    weights[type] =
      ageWeight *
      spectralModifier *
      formationData.multiplier *
      galaxyModifier;
  }

  return weights;
}


// ==============================
// 依星系環境生成恆星光譜型
// ==============================

function generateStarSpectralType(
  galaxyType,
  galaxyAge,
  formationLevel,
  random
) {

  const weights =
    calculateStarGenerationWeights(
      galaxyType,
      galaxyAge,
      formationLevel
    );

  return weightedRandom(
    weights,
    random
  );

}


// ==============================
// 恆星光譜次型生成
// ==============================

ffunction generateStarSpectralSubtype(spectralType, random) {
  const rule = STAR_SPECTRAL_SUBTYPE_RULES[spectralType];

  if (!rule || !rule.values.length) {
    return null;
  }

  const weights = {};
  for (const item of rule.values) {
    weights[item.subtype] = item.weight;
  }

  return weightedRandom(weights, random);
}

// ==============================
// 棕矮星光譜次型生成
// 暫時版本
// ==============================

function generateBrownDwarfSpectralSubtype(
  spectralType,
  random
) {

  const rule =
    BROWN_DWARF_SPECTRAL_SUBTYPE[
      spectralType
    ];

  if (!rule) {
    return null;
  }

  const subtype =
    rule.min +
    Math.floor(
      random() *
      (rule.max - rule.min + 1)
    );

  return subtype;

}


// ==============================
// 恆星生成器
// ==============================
//
// 注意：
// L / T / Y 已經從 STAR_TYPES 分離，
// 不會再被當成普通恆星生成。
// ==============================

function generateStar(
  galaxyType,
  galaxyAge,
  formationLevel,
  random
) {

  const spectralType =
    generateStarSpectralType(
      galaxyType,
      galaxyAge,
      formationLevel,
      random
    );

  const subtype =
    generateStarSpectralSubtype(
      spectralType,
      random
    );

  return {
    category: "star",
    type: spectralType,
    subtype: subtype
  };

}


// ==============================
// 棕矮星生成器
// ==============================

function generateBrownDwarf(
  random
) {

  const types =
    Object.keys(
      BROWN_DWARF_TYPES
    );

  const type =
    types[
      Math.floor(
        random() * types.length
      )
    ];

  const subtype =
    generateBrownDwarfSpectralSubtype(
      type,
      random
    );

  return {
    category: "brownDwarf",
    type: type,
    subtype: subtype
  };

}
