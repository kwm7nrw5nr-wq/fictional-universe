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
  // 主序星／一般恆星光譜
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
  },

  // ==========================
  // 棕矮星光譜
  // ==========================

  L: {
    name: "L型",
    color: "紅色至紅外",
    temperature: "極低溫"
  },

  T: {
    name: "T型",
    color: "紅外",
    temperature: "極低溫"
  },

  Y: {
    name: "Y型",
    color: "紅外",
    temperature: "超低溫"
  }

};

// ==============================
// 光譜溫度細分
// 0 最熱，9 最冷
// ==============================

const STAR_SPECTRAL_SUBTYPE = {
  min: 0,
  max: 9,
  allowDecimal: true
};

const STAR_SPECTRAL_SUBTYPE = {
  min: 0,
  max: 9,
  allowDecimal: true
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
// 恆星殘骸
// ==============================

const STELLAR_REMNANT_TYPES = {
  whiteDwarf: {},
  neutronStar: {}
};


// ==============================
// 黑洞
// ==============================

const BLACK_HOLE_TYPES = {};


// ==============================
// 白洞
// ==============================

const WHITE_HOLE_TYPES = {};


// ==============================
// 蟲洞
// ==============================

const WORMHOLE_TYPES = {
  natural: {},
  artificial: {}
};


// ==============================
// 其他特殊天體
// ==============================

const SPECIAL_CELESTIAL_TYPES = {};
