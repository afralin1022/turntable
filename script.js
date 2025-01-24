// 獎品項目
var prize_list = [
  { name: "年獸征服者", description: "恭喜你成功驅趕了所有年獸！", img: "https://cdn-icons-png.flaticon.com/512/9087/9087851.png" },
  { name: "春聯書法家", description: "無論是字醜還是字美，都貼得上牆！", img: "https://cdn-icons-png.flaticon.com/512/3938/3938712.png" },
  { name: "鞭炮連放王", description: "你的鞭炮聲比隔壁還要響亮！", img: "https://cdn-icons-png.flaticon.com/512/2633/2633725.png" },
  { name: "紅包支配者", description: "你收到的紅包，比支出還要多！", img: "https://cdn-icons-png.flaticon.com/512/18141/18141440.png" },
  { name: "年夜飯掃盤王", description: "你是年夜飯的清盤小能手！", img: "https://cdn-icons-png.flaticon.com/512/1886/1886722.png" },
  { name: "財神附體", description: "今年財運滾滾，必發大財！", img: "https://cdn-icons-png.flaticon.com/512/2844/2844043.png" },
  { name: "撐爆新衣", description: "過年胖三斤，新衣都要買更大號！", img: "https://cdn-icons-png.flaticon.com/512/3703/3703380.png" },
  { name: "守歲勇士", description: "熬過凌晨，絕不提前睡！", img: "https://cdn-icons-png.flaticon.com/512/570/570682.png" },
];

// 渲染獎品列表
prize_list.forEach((prize) => {
  $(".list ul").append(`<li><p>${prize.name}</p><img src='${prize.img}'></li>`);
});

// 音效設定
var spinSound = new Audio("./spin.mp3");
var winSound = new Audio("./win.mp3");

// 抽獎相關變數
var iEnd = -1;
var isSpinning = false; // 防止重複觸發

$(".turntable_btn").on("click", function () {
  if (isSpinning) return; // 防止在轉動過程中多次點擊

  isSpinning = true; // 鎖定按鈕
  var $this = $(this);

  // 播放抽獎音效
  playAudio(spinSound);

  // 隨機選擇獎品
  iEnd = Math.floor(Math.random() * prize_list.length);
  console.log("中獎位置：", iEnd);

  // 啟動轉盤動畫
  rotateTurntable(iEnd);

  // 在動畫結束後觸發中獎邏輯
  setTimeout(() => {
    // 停止轉盤音效
    fadeOutAudio(spinSound, 500);

    // 播放中獎音效
    playAudio(winSound);

    // 顯示彈窗
    showPrizePopup(iEnd);

    // 解鎖按鈕並重置狀態
    resetTurntable($this);
    isSpinning = false;
  }, 4000); // 4 秒動畫結束
});

// 播放音效的函式
function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0; // 確保從頭播放
  audio.volume = 1;
  audio.play();
}

// 轉盤動畫
function rotateTurntable(index) {
  const degree = 360 / prize_list.length * index; // 每個獎品的旋轉角度
  const spins = 5 * 360; // 預設轉 5 圈
  const finalDegree = spins - degree;

  $(".list ul").css("transform", `rotate(-${finalDegree}deg)`);
  $(".list ul").addClass("go");
  $(".polyline").addClass("go");
  $(".circle circle").addClass("go");
}

// 音效漸弱函式
function fadeOutAudio(audio, duration) {
  let step = 0.05; // 每次減少的音量
  let interval = duration / (audio.volume / step);

  let fadeOut = setInterval(() => {
    if (audio.volume > step) {
      audio.volume -= step;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fadeOut);
    }
  }, interval);
}

// 顯示獎品彈窗
function showPrizePopup(index) {
  const prize = prize_list[index];

  const popup = $(`
    <div class="prize-popup">
      <div class="popup-content">
        <h1>恭喜你中了</h1>
        <h2>${prize.name}</h2>
        <p>${prize.description}</p>
        <button class="close-popup">確定</button>
      </div>
    </div>
  `);

  $("body").append(popup);

  // 關閉彈窗邏輯
  popup.find(".close-popup").on("click", () => {
    popup.remove();
  });
}

// 重置轉盤
function resetTurntable(button) {
  $(".list ul").removeClass("go");
  $(".polyline").removeClass("go");
  $(".circle circle").removeClass("go");
  button.removeAttr("disabled");
}