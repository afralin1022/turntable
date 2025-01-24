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

// 動態生成獎品列表
prize_list.forEach(function (prize) {
  $(".list ul").append("<li><p>" + prize.name + "</p><img src='" + prize.img + "'></li>");
});

// 預加載音效
var spinSound = new Audio("./spin.mp3");
var winSound = new Audio("./win.mp3");
spinSound.load();
winSound.load();

var iEnd = -1; // 紀錄獎項索引

$(".turntable_btn").on("click", function () {
  var $this = $(this);
  $this.attr("disabled", "disabled"); // 禁用按鈕

  // 播放抽獎音效
  spinSound.currentTime = 0;
  spinSound.play();

  iEnd = Math.floor(Math.random() * 8); // 隨機選擇獎品
  console.log("中獎索引:", iEnd);

  rotating(); // 執行轉盤動畫

  // 3.8 秒後開始漸弱音效
  setTimeout(function () {
    fadeOutAudio(spinSound, 200); // 0.2 秒內漸弱音效
  }, 3800);

  // 4 秒後顯示彈窗並播放中獎音樂
  setTimeout(function () {
    winSound.currentTime = 0;
    winSound.play();
    showPrizePopup(iEnd);
    $this.removeAttr("disabled"); // 恢復按鈕
  }, 4000);
});

// 執行轉盤動畫
function rotating() {
  var rotation = iEnd * 45; // 計算旋轉角度
  $(".polyline, .list ul").css("transform", `rotate(${rotation}deg)`);
  $(".list ul, .polyline, .circle circle").addClass("go");
}

// 音效漸弱函式
function fadeOutAudio(audio, duration) {
  var step = 0.1;
  var interval = duration / (audio.volume / step);
  var fade = setInterval(function () {
    if (audio.volume > step) {
      audio.volume -= step;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fade);
    }
  }, interval);
}

// 顯示中獎彈窗
function showPrizePopup(prizeIndex) {
  var prize = prize_list[prizeIndex];
  var $popup = $(`
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
  $popup.find(".close-popup").on("click", function () {
    $popup.remove();
  });
}

// 動態調整轉盤大小
function resizeTurntable(scale) {
  document.querySelector("section.turntable").style.transform = `scale(${scale})`;
}