// 獎品項目
const prizeList = [
  { name: "年獸征服者", description: "恭喜你成功驅趕了所有年獸！", img: "https://cdn-icons-png.flaticon.com/512/9087/9087851.png" },
  { name: "春聯書法家", description: "無論是字醜還是字美，都貼得上牆！", img: "https://cdn-icons-png.flaticon.com/512/3938/3938712.png" },
  { name: "鞭炮連放王", description: "你的鞭炮聲比隔壁還要響亮！", img: "https://cdn-icons-png.flaticon.com/512/2633/2633725.png" },
  { name: "紅包支配者", description: "你收到的紅包，比支出還要多！", img: "https://cdn-icons-png.flaticon.com/512/18141/18141440.png" },
  { name: "年夜飯掃盤王", description: "你是年夜飯的清盤小能手！", img: "https://cdn-icons-png.flaticon.com/512/1886/1886722.png" },
  { name: "財神附體", description: "今年財運滾滾，必發大財！", img: "https://cdn-icons-png.flaticon.com/512/2844/2844043.png" },
  { name: "撐爆新衣", description: "過年胖三斤，新衣都要買更大號！", img: "https://cdn-icons-png.flaticon.com/512/3703/3703380.png" },
  { name: "守歲勇士", description: "熬過凌晨，絕不提前睡！", img: "https://cdn-icons-png.flaticon.com/512/570/570682.png" },
];

// 初始化獎品列表
const prizeListContainer = $(".list ul");
prizeList.forEach((prize) => {
  prizeListContainer.append(`<li><p>${prize.name}</p><img src='${prize.img}'></li>`);
});

// 音效設定
const spinSound = new Audio("./spin.mp3");
const winSound = new Audio("./win.mp3");

// 抽獎結果索引
let iEnd = -1;

// 抽獎按鈕點擊事件
$(".turntable_btn").on("click", function () {
  const $button = $(this);

  // 禁用按鈕，避免重複點擊
  $button.attr("disabled", "disabled");

  // 播放抽獎音效
  spinSound.currentTime = 0;
  spinSound.play();

  // 隨機選擇獎品
  iEnd = Math.floor(Math.random() * prizeList.length);
  console.log("中獎索引:", iEnd);

  // 執行轉盤動畫
  rotating();

  // 音效漸弱（動畫播放 3.8 秒後開始）
  setTimeout(() => {
    fadeOutAudio(spinSound, 200); // 0.2 秒內漸弱音效
  }, 3800);

  // 4 秒後顯示彈窗並播放中獎音效
  setTimeout(() => {
    winSound.currentTime = 0;
    winSound.play();
    showPrizePopup(iEnd);

    // 恢復按鈕狀態，準備下一次操作
    $button.removeAttr("disabled");
  }, 4000);
});

// 轉盤動畫函式
function rotating() {
  // 計算旋轉角度
  const rotation = iEnd * 45; // 每個獎項 45 度
  $(".polyline, .list ul").css("transform", `rotate(${rotation}deg)`);

  // 清除動畫 class，重新觸發動畫
  $(".list ul, .polyline, .circle circle").removeClass("go");

  // 強制重繪，確保 class 重設有效
  setTimeout(() => {
    $(".list ul, .polyline, .circle circle").addClass("go");
  }, 10);
}

// 音效漸弱函式
function fadeOutAudio(audio, duration) {
  const step = 0.1;
  const interval = duration / (audio.volume / step);
  const fade = setInterval(() => {
    if (audio.volume > step) {
      audio.volume -= step;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fade);
    }
  }, interval);
}

// 顯示中獎彈窗函式
function showPrizePopup(prizeIndex) {
  const prize = prizeList[prizeIndex];
  const $popup = $(`
    <div class="prize-popup">
      <div class="popup-content">
        <h1>恭喜你中了</h1>
        <h2>${prize.name}</h2>
        <p>${prize.description}</p>
        <button class="close-popup">確定</button>
      </div>
    </div>
  `);

  $("body").append($popup);

  // 點擊按鈕關閉彈窗
  $popup.find(".close-popup").on("click", () => {
    $popup.remove();

    // 清除動畫 class，為下一次操作做準備
    $(".list ul, .polyline, .circle circle").removeClass("go");
  });
}

// 縮放轉盤函式（可根據需求調整）
function resizeTurntable(scale) {
  const turntable = document.querySelector("section.turntable");
  turntable.style.transform = `scale(${scale})`;
}
// resizeTurntable(1.08); // 範例
