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


console.log("exploration.js 已載入");
