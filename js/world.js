/* ==================================================
   世界核心
   ================================================== */

const SAVE_KEY =
  "fictional_universe_save";


let world = null;

let timer = null;

let running = false;

let speed = 1;


/* ==================================================
   種子亂數系統
   ================================================== */

/*
 * 這不是 Math.random()。
 *
 * 同一個種子 + 同一個 ID
 * 永遠會得到相同結果。
 */

function hashString(text) {

  let hash = 2166136261;

  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    hash ^= text.charCodeAt(i);

    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);

  }

  return hash >>> 0;

}


function seededRandom(seed, key) {

  let value =
    hashString(
      String(seed) +
      ":" +
      String(key)
    );

  value += 0x6D2B79F5;

  value =
    Math.imul(
      value ^
      (value >>> 15),
      value | 1
    );

  value ^=
    value +
    Math.imul(
      value ^
      (value >>> 7),
      value | 61
    );

  return (
    (
      (value ^
        (value >>> 14))
      >>> 0
    ) /
    4294967296
  );

}


function seededInteger(
  seed,
  key,
  min,
  max
) {

  return Math.floor(

    seededRandom(
      seed,
      key
    ) *
    (max - min + 1)

  ) + min;

}


/* ==================================================
   世界生成
   ================================================== */

function randomSeed() {

  return Math.floor(
    Math.random() *
    4294967295
  );

}


function createWorld() {

  const seed =
    randomSeed();


  /*
   * 超星系團數量：
   *
   * 每個世界不同。
   *
   * 不是固定 3～10。
   *
   * 這裡先讓不同世界可以產生
   * 50～5000 個超星系團。
   *
   * 未來改成真正宇宙尺度程序生成時，
   * 可以再提高到更大的數量。
   */

  const superclusterCount =
    seededInteger(
      seed,
      "universe-supercluster-count",
      50,
      5000
    );


  return {

    year: 1,

    seed: seed,

    superclusters:
      superclusterCount,

    galaxies:
  getUniverseGalaxyCount(seed),

    civilizations:
      seededInteger(
        seed,
        "civilizations",
        3,
        15
      ),

    events: [],

    exploration: {

  discovered: 0,

  discoveredGalaxies: 0,

  /*
   * 不把所有宇宙內容全部存下來。
   *
   * 只記錄玩家真正探索過的部分。
   */

  discoveredObjects: {},

  generated: {}

}
  };

}


/* ==================================================
   存檔
   ================================================== */

function saveWorld() {

  if (!world) return;

  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(world)
  );

}


/* ==================================================
   載入世界
   ================================================== */

function loadWorld() {

  const saved =
    localStorage.getItem(
      SAVE_KEY
    );


  if (saved) {

    try {

      world =
        JSON.parse(saved);


/*
 * 舊版本存檔相容
 */

if (!world.exploration) {

  world.exploration = {

    discovered: 0,

    discoveredGalaxies: 0,

    discoveredObjects: {},

    generated: {}

  };

}


if (
  typeof world.exploration.discoveredGalaxies
  !== "number"
) {

  world.exploration.discoveredGalaxies = 0;

}


      if (
        typeof
        world.exploration.discovered
        !== "number"
      ) {

        world.exploration.discovered = 0;

      }


      if (
        !world.exploration.discoveredObjects
      ) {

        world.exploration.discoveredObjects = {};

      }


      if (
        !world.exploration.generated
      ) {

        world.exploration.generated = {};

      }


      /*
       * 舊版本如果只有 3～10 個超星系團，
       * 不直接修改舊世界。
       *
       * 只有「重置世界」後的新世界
       * 才使用 v0.2.0 的新生成規則。
       */


      addEvent(
        "世界存檔已載入。"
      );

    }

    catch {

      world =
        createWorld();

      addEvent(
        "存檔損壞，已建立新世界。"
      );

    }

  }

  else {

    world =
      createWorld();

    addEvent(
      "新的宇宙已生成。"
    );

    saveWorld();

  }


  updateDisplay();

}


/* ==================================================
   世界顯示
   ================================================== */

function updateDisplay() {

  if (!world) return;


  document.getElementById(
    "worldYear"
  ).textContent =
    "第 " +
    world.year +
    " 年";


  document.getElementById(
    "superclusters"
  ).textContent =
    world.superclusters.toLocaleString();


  /*
   * 目前星系總數會隨探索逐步建立。
   */

  document.getElementById(
    "galaxies"
  ).textContent =
    world.galaxies.toLocaleString();


  document.getElementById(
    "civilizations"
  ).textContent =
    world.civilizations.toLocaleString();


  document.getElementById(
    "worldSeed"
  ).textContent =
    world.seed;

}


/* ==================================================
   世界事件
   ================================================== */

function addEvent(text) {

  if (!world) return;


  world.events.unshift(

    "第 " +
    world.year +
    " 年： " +
    text

  );


  if (
    world.events.length > 50
  ) {

    world.events.pop();

  }


  const log =
    document.getElementById(
      "eventLog"
    );


  if (!log) return;


  log.innerHTML =
    world.events
      .map(
        event =>
          `<div class="event">${event}</div>`
      )
      .join("");

}


/* ==================================================
   世界時間
   ================================================== */

function simulateYears(years) {

  if (!world) return;

  /*
   * ================================================
   * 批次宇宙模擬
   * ================================================
   *
   * 不逐年執行，避免 ×1M 造成大量迴圈。
   *
   * years = 這一次宇宙實際經過的年份
   */


  const elapsedYears =
    Math.max(
      0,
      Math.floor(years)
    );


  if (elapsedYears <= 0) {
    return;
  }


  /*
   * ================================================
   * 1. 推進宇宙時間
   * ================================================
   */

  world.year += elapsedYears;


  /*
   * ================================================
   * 2. 文明演化
   * ================================================
   *
   * 每 100 年作為一個文明演化週期。
   *
   * 不是真的執行：
   *
   * 100 年 → 1 次
   * 1,000,000 年 → 10,000 次
   *
   * 而是直接用機率計算整段時間的結果。
   */

  const civilizationCycles =
    elapsedYears / 100;


  /*
   * 新文明形成率
   *
   * 平均每 100 年有 8% 的機會
   * 形成一個新文明。
   */

  const expectedBirths =
    civilizationCycles * 0.08;


  /*
   * 文明消失率
   *
   * 平均每 100 年有 4% 的機會
   * 發生一次文明消亡。
   */

  const expectedDeaths =
    civilizationCycles * 0.04;


  /*
   * 使用 Poisson 式批次抽樣。
   *
   * 這樣不需要真的執行幾千、幾萬甚至
   * 幾百萬次迴圈。
   */

  function randomPoisson(lambda) {

    if (lambda <= 0) {
      return 0;
    }


    /*
     * lambda 很大時，
     * 使用常態近似避免大量迴圈。
     */

    if (lambda > 30) {

      const u1 =
        Math.max(
          Math.random(),
          Number.EPSILON
        );

      const u2 =
        Math.random();

      const z =
        Math.sqrt(
          -2 *
          Math.log(u1)
        ) *
        Math.cos(
          2 *
          Math.PI *
          u2
        );

      return Math.max(
        0,
        Math.round(
          lambda +
          Math.sqrt(lambda) * z
        )
      );

    }


    /*
     * lambda 較小時使用
     * Knuth Poisson sampling。
     */

    const limit =
      Math.exp(-lambda);

    let product = 1;
    let count = 0;

    do {

      count++;

      product *=
        Math.random();

    } while (
      product > limit
    );

    return count - 1;
  }


  /*
   * 計算這段時間實際形成多少文明。
   */

  const births =
    randomPoisson(
      expectedBirths
    );


  /*
   * 計算這段時間實際消失多少文明。
   */

  const deaths =
    randomPoisson(
      expectedDeaths
    );


  /*
   * 更新文明數量。
   */

  world.civilizations =
    Math.max(
      1,
      world.civilizations +
      births -
      Math.min(
        deaths,
        Math.max(
          0,
          world.civilizations +
          births -
          1
        )
      )
    );


  /*
   * ================================================
   * 3. 宇宙事件
   * ================================================
   *
   * 每 100 年平均有 3% 的機會
   * 發生一次大型未知事件。
   */

  const eventLambda =
    civilizationCycles * 0.03;


  const eventCount =
    randomPoisson(
      eventLambda
    );


  /*
   * 不把幾千、幾萬個事件全部塞進畫面。
   *
   * 只顯示最多 5 個代表事件。
   */

  const displayedEvents =
    Math.min(
      eventCount,
      5
    );


  for (
    let i = 0;
    i < displayedEvents;
    i++
  ) {

    addEvent(
      "宇宙中發生了一次未知事件。"
    );

  }


  /*
   * 如果實際發生的事件很多，
   * 額外告訴玩家這是一批事件。
   */

  if (
    eventCount > displayedEvents
  ) {

    addEvent(
      `在這段時間內，宇宙還發生了 ${eventCount - displayedEvents} 次其他事件。`
    );

  }


  /*
   * ================================================
   * 4. 儲存與畫面更新
   * ================================================
   */

  saveWorld();

  updateDisplay();

}


/* ==================================================
   世界控制
   ================================================== */

function startWorld() {

  if (running) return;


  running = true;


  document.getElementById(
    "worldStatus"
  ).textContent =
    "世界正在運轉……";


  runTimer();

}


function pauseWorld() {

  running = false;


  clearTimeout(timer);


  document.getElementById(
    "worldStatus"
  ).textContent =
    "世界已暫停。";

}


function runTimer() {

  if (!running) return;


  simulateYears(
    speed
  );


  timer =
    setTimeout(
      runTimer,
      1000
    );

}


function setSpeed(newSpeed) {

  speed =
    newSpeed;


  document.getElementById(
    "worldStatus"
  ).textContent =
    "世界運轉速度：×" +
    speed.toLocaleString();

}
