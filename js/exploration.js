/* ==================================================
   探索系統
   ================================================== */

let explorationStack = [

  {

    type:
      "universe",

    name:
      "宇宙",

    id:
      "universe"

  }

];


let explorationData = null;

/* ==================================================
   探索名稱
   ================================================== */

const explorationNames = {

  supercluster: {
    first: [
      "曙光",
      "永恆",
      "深藍",
      "赤曜",
      "寂靜",
      "星環",
      "遠古",
      "無垠",
      "蒼穹",
      "天河",
      "幽冥",
      "霜星",
      "熾光",
      "瀚海",
      "玄夜",
      "星墟"
    ],

    second: [
      "之環",
      "之冠",
      "深域",
      "星海",
      "天境",
      "長廊",
      "界域",
      "星原",
      "天穹",
      "古境",
      "幻境",
      "寂境",
      "星庭",
      "蒼域",
      "星境",
      "穹域"
    ]
  },


  cluster: {
    first: [
      "晨星",
      "天穹",
      "銀河",
      "霜原",
      "深空",
      "赤潮",
      "幽影",
      "星門",
      "星塵",
      "黎明",
      "暮光",
      "寒星"
    ],

    second: [
      "星群",
      "天域",
      "星海",
      "深域",
      "星原",
      "星境",
      "天門",
      "星環",
      "穹境",
      "星野",
      "銀域",
      "霜境"
    ]
  },


  galaxy: {
    first: [
      "曙光",
      "銀霧",
      "天穹",
      "燦星",
      "深淵",
      "永序",
      "夜幕",
      "星火",
      "蒼藍",
      "赤星",
      "幽星",
      "寂星"
    ],

    second: [
      "星系",
      "星域",
      "星海",
      "天域",
      "星環",
      "星境",
      "銀河",
      "深域",
      "星原",
      "天穹",
      "星野",
      "星庭"
    ]
  }

};

  starSystem: {
    first: [
      "曙光", "銀河", "天琴", "星河",
      "蒼穹", "赤曜", "幽藍", "霜月",
      "晨曦", "暮星", "深空", "燦星",
      "玄夜", "流光", "寂星", "遠星"
    ],
    second: [
      "星", "辰", "輝", "塵",
      "曜", "環", "瀾", "境",
      "原", "穹", "域", "庭",
      "灣", "冕", "序", "歌"
    ]
  },


function createExplorationName(type, index, seed) {

  const data =
    explorationNames[type];

  const suffix =
    type === "supercluster"
      ? "超星系團"
      : type === "cluster"
        ? "星系團"
        : "星系";

  const firstIndex =
    seededInteger(
      seed,
      type + "-first-" + index,
      0,
      data.first.length - 1
    );

  const secondIndex =
    seededInteger(
      seed,
      type + "-second-" + index,
      0,
      data.second.length - 1
    );

  const first =
    data.first[firstIndex];

  const second =
    data.second[secondIndex];

  return first + second + suffix;
}

/* ==================================================
   超星系團
   ================================================== */

function getSupercluster(
  index
) {

  const id =
    "sc_" +
    index;


  const seed =
    world.seed;


  const clusterCount =
    seededInteger(
      seed,
      id + "-cluster-count",
      30,
      500
    );


  return {

    id: id,

    index: index,

    name:
      createExplorationName(
        "supercluster",
        index,
        seed
      ),

    clusters:
      clusterCount,

    discovered:
      isDiscovered(id)

  };

}


/* ==================================================
   星系團
   ================================================== */

function getCluster(
  superclusterIndex,
  clusterIndex
) {

  const id =

    "sc_" +
    superclusterIndex +

    "_c_" +
    clusterIndex;


  const galaxyCount =
    seededInteger(
      world.seed,
      id + "-galaxy-count",
      20,
      300
    );


  return {

    id: id,

    index:
      clusterIndex,

    name:
      createExplorationName(
        "cluster",
        clusterIndex,
        world.seed +
        superclusterIndex
      ),

    galaxies:
      galaxyCount,

    discovered:
      isDiscovered(id)

  };

}


/* ==================================================
   星系
   ================================================== */

function getGalaxy(
  superclusterIndex,
  clusterIndex,
  galaxyIndex
) {

  const id =

    "sc_" +
    superclusterIndex +

    "_c_" +
    clusterIndex +

    "_g_" +
    galaxyIndex;


  const starSystemCount =
    seededInteger(
      world.seed,
      id + "-star-system-count",
      100,
      10000
    );


  return {

    id: id,

    index:
      galaxyIndex,

    name:
      createExplorationName(
        "galaxy",
        galaxyIndex,
        world.seed +
        superclusterIndex +
        clusterIndex
      ),

    starSystems:
      starSystemCount,

    discovered:
      isDiscovered(id)

  };

}

 

/* ==================================================
   已發現系統
   ================================================== */

function isDiscovered(id) {

  return Boolean(

    world
      .exploration
      .discoveredObjects[id]

  );

}


function discoverObject(id) {

  if (
    isDiscovered(id)
  ) {

    return;

  }


  world
    .exploration
    .discoveredObjects[id] =
      true;


  world
    .exploration
    .discovered++;


  saveWorld();

}

function updateDiscoveredCount() {

  if (!world) return;


  const element =
    document.getElementById(
      "discoveredCount"
    );


  if (!element) return;


  element.textContent =
    world.exploration.discovered
      .toLocaleString();

}

  
/* ==================================================
   初始化探索
   ================================================== */

function initializeExploration() {

  if (!world) return;


  if (
    !world.exploration
  ) {

    world.exploration = {

      discovered: 0,

      discoveredObjects: {},

      generated: {}

    };

  }


  explorationData =
    world.exploration;


  renderExploration();

}


/* ==================================================
   探索畫面
   ================================================== */

function renderExploration() {

  const grid =
    document.getElementById(
      "explorationGrid"
    );


  const title =
    document.getElementById(
      "explorationTitle"
    );


  const path =
    document.getElementById(
      "explorationPath"
    );


  const location =
    document.getElementById(
      "currentLocation"
    );


  const status =
    document.getElementById(
      "explorationStatus"
    );


  const back =
    document.getElementById(
      "explorationBack"
    );


  const empty =
    document.getElementById(
      "explorationEmpty"
    );


  if (!grid) return;


  grid.innerHTML = "";

  empty.style.display = "none";


  const current =
    explorationStack[
      explorationStack.length - 1
    ];


  title.textContent =

    getExplorationIcon(
      current.type
    ) +

    " " +

    current.name;


  location.textContent =
    current.name;


  path.textContent =

    "目前位置：" +

    explorationStack
      .map(
        item =>
          item.name
      )
      .join(" → ");


  back.disabled =
    explorationStack.length <= 1;


  if (
    current.type ===
    "universe"
  ) {

    status.textContent =
      "探索宇宙";


    renderSuperclusters(
      grid
    );

  }


  else if (
    current.type ===
    "supercluster"
  ) {

    status.textContent =
      "探索超星系團";


    renderClusters(
      grid,
      current
    );

  }


  else if (
    current.type ===
    "cluster"
  ) {

    status.textContent =
      "探索星系團";


    renderGalaxies(
      grid,
      current
    );

  }


  else if (
    current.type ===
    "galaxy"
  ) {

    status.textContent =
      "探索星系";


    renderGalaxyPlaceholder(
      grid,
      current
    );

  }


  updateDiscoveredCount();

}


/* ==================================================
   圖示
   ================================================== */

function getExplorationIcon(
  type
) {

  if (
    type === "universe"
  ) return "🌌";


  if (
    type === "supercluster"
  ) return "✨";


  if (
    type === "cluster"
  ) return "🌠";


  if (
    type === "galaxy"
  ) return "🌀";


  return "📍";

}


/* ==================================================
   顯示超星系團
   ================================================== */

function renderSuperclusters(
  grid
) {

  /*
   * 注意：
   *
   * 宇宙可能有非常多超星系團，
   * 不一次把全部幾千甚至更多項目塞進手機。
   *
   * 目前每次顯示最多 30 個。
   */

  const visibleCount =
    Math.min(
      world.superclusters,
      30
    );


  for (
    let i = 0;
    i < visibleCount;
    i++
  ) {

    const item =
      getSupercluster(i);


    const card =
      createExplorationCard(

        "✨",

        item.name,

        "超星系團",

        "包含約 " +
        item.clusters.toLocaleString() +
        " 個星系團",

        function () {

          discoverObject(
            item.id
          );


          explorationStack.push({

            type:
              "supercluster",

            name:
              item.name,

            id:
              item.id,

            index:
              item.index

          });


          renderExploration();

        }

      );


    grid.appendChild(
      card
    );

  }


  if (
    world.superclusters > 30
  ) {

    const notice =
      document.createElement(
        "div"
      );


    notice.className =
      "exploration-notice";


    notice.innerHTML =

      "🌌 這個宇宙共有 <strong>" +

      world.superclusters.toLocaleString() +

      "</strong> 個超星系團。<br>" +

      "目前顯示的是第一批探索區域。<br>" +

      "後續將加入真正的宇宙座標與區域探索。";


    grid.appendChild(
      notice
    );

  }

}


/* ==================================================
   顯示星系團
   ================================================== */

function renderClusters(
  grid,
  current
) {

  const superclusterIndex =
    current.index;


  const supercluster =
    getSupercluster(
      superclusterIndex
    );


  if (!supercluster) return;


  /*
   * 同樣不一次塞入全部。
   */

  const visibleCount =
    Math.min(
      supercluster.clusters,
      40
    );


  for (
    let i = 0;
    i < visibleCount;
    i++
  ) {

    const item =
      getCluster(
        superclusterIndex,
        i
      );


    const card =
      createExplorationCard(

        "🌠",

        item.name,

        "星系團",

        "包含約 " +
        item.galaxies.toLocaleString() +
        " 個星系",

        function () {

          discoverObject(
            item.id
          );


          explorationStack.push({

            type:
              "cluster",

            name:
              item.name,

            id:
              item.id,

            index:
              item.index,

            superclusterIndex:
              superclusterIndex

          });


          renderExploration();

        }

      );


    grid.appendChild(
      card
    );

  }


  if (
    supercluster.clusters > 40
  ) {

    const notice =
      document.createElement(
        "div"
      );


    notice.className =
      "exploration-notice";


    notice.innerHTML =

      "🌠 這個超星系團共有 <strong>" +

      supercluster.clusters.toLocaleString() +

      "</strong> 個星系團。<br>" +

      "目前顯示這個區域的第一批星系團。";


    grid.appendChild(
      notice
    );

  }

}

/* ==================================================
   恆星系資料
   ================================================== */

function getStarSystem(
  superclusterIndex,
  clusterIndex,
  galaxyIndex,
  starSystemIndex
) {

  const id =

    "sc_" +
    superclusterIndex +

    "_c_" +
    clusterIndex +

    "_g_" +
    galaxyIndex +

    "_s_" +
    starSystemIndex;


  const name =

    "第 " +
    (starSystemIndex + 1) +
    " 號恆星系";


  return {

    id: id,

    index:
      starSystemIndex,

    name:
      name,

    discovered:
      isDiscovered(id)

  };

}


/* ==================================================
   顯示星系
   ================================================== */

function renderGalaxies(
  grid,
  current
) {

  const superclusterIndex =
    current.superclusterIndex;


  const clusterIndex =
    current.index;


  const cluster =
    getCluster(
      superclusterIndex,
      clusterIndex
    );


  if (!cluster) return;


  const visibleCount =
    Math.min(
      cluster.galaxies,
      40
    );


  for (
    let i = 0;
    i < visibleCount;
    i++
  ) {

    const item =
      getGalaxy(
        superclusterIndex,
        clusterIndex,
        i
      );


    const card =
      createExplorationCard(

        "🌀",

        item.name,

        "星系",

        "恆星系：約 " +
        item.starSystems.toLocaleString() +
        " 個",

        function () {

          discoverObject(
            item.id
          );


          /*
 * 發現新的星系時，
 * 更新「已探索星系」數量。
 */

const wasNew =
  !world
    .exploration
    .discoveredObjects[
      item.id +
      "_counted"
    ];


if (wasNew) {

  world
    .exploration
    .discoveredGalaxies += 1;

  world
    .exploration
    .discoveredObjects[
      item.id +
      "_counted"
    ] = true;

}


          saveWorld();

          updateDisplay();


          explorationStack.push({

            type:
              "galaxy",

            name:
              item.name,

            id:
              item.id,

            index:
              item.index,

            clusterIndex:
              clusterIndex,

            superclusterIndex:
              superclusterIndex

          });


          renderExploration();

        }

      );


    grid.appendChild(
      card
    );

  }


  if (
    cluster.galaxies > 40
  ) {

    const notice =
      document.createElement(
        "div"
      );


    notice.className =
      "exploration-notice";


    notice.innerHTML =

      "🌀 這個星系團共有 <strong>" +

      cluster.galaxies.toLocaleString() +

      "</strong> 個星系。<br>" +

      "目前顯示這個區域的第一批星系。";


    grid.appendChild(
      notice
    );

  }

}


/* ==================================================
   顯示恆星系
   ================================================== */

function renderGalaxyPlaceholder(
  grid,
  galaxy
) {

  const superclusterIndex =
    galaxy.superclusterIndex;


  const clusterIndex =
    galaxy.clusterIndex;


  const galaxyIndex =
    galaxy.index;


  const starSystemCount =
    seededInteger(

      world.seed,

      galaxy.id +
      "-star-system-count",

      100,

      10000

    );


  /*
   * 目前每次最多顯示 30 個恆星系。
   */

  const visibleCount =
    Math.min(
      starSystemCount,
      30
    );


  for (
    let i = 0;
    i < visibleCount;
    i++
  ) {

    const starSystem =
      getStarSystem(

        superclusterIndex,

        clusterIndex,

        galaxyIndex,

        i

      );


    const card =
      createExplorationCard(

        "⭐",

        starSystem.name,

        "恆星系",

        "探索這個恆星系",

        function () {

          discoverObject(
            starSystem.id
          );


          alert(

            "⭐ 已進入「" +
            starSystem.name +
            "」。\n\n" +

            "下一階段將探索：\n" +

            "恆星 → 行星 → 衛星"

          );

        }

      );


    grid.appendChild(
      card
    );

  }


  const notice =
    document.createElement(
      "div"
    );


  notice.className =
    "exploration-notice";


  notice.innerHTML =

    "⭐ 「" +

    galaxy.name +

    "」共有約 <strong>" +

    starSystemCount.toLocaleString() +

    "</strong> 個恆星系。<br>" +

    "目前顯示這個星系的第一批恆星系。";


  grid.appendChild(
    notice
  );

}


/* ==================================================
   探索卡片
   ================================================== */

function createExplorationCard(
  icon,
  name,
  type,
  description,
  action
) {

  const card =
    document.createElement(
      "button"
    );


  card.className =
    "exploration-card";


  card.type =
    "button";


  card.innerHTML =

    '<div class="exploration-icon">' +
    icon +
    '</div>' +

    '<div class="exploration-card-content">' +

    '<div class="exploration-card-name">' +
    name +
    '</div>' +

    '<div class="exploration-card-type">' +
    type +
    '</div>' +

    '<div class="exploration-card-description">' +
    description +
    '</div>' +

    '</div>' +

    '<div class="exploration-arrow">›</div>';


  card.addEventListener(
    "click",
    action
  );


  return card;

}


/* ==================================================
   返回
   ================================================== */

function explorationBack() {

  if (
    explorationStack.length <= 1
  ) {

    return;

  }


  explorationStack.pop();


  renderExploration();

}

console.log("exploration.js 已載入");
