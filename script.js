//獎品項目
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

for (var i = 0; i < prize_list.length; i++) {
  $(".list ul").append("<li><p>" + prize_list[i].name + "</p><img src='" + prize_list[i].img + "'></li>");
}

// 音效設定
var spinSound = new Audio("./spin.mp3");
var winSound = new Audio("./win.mp3");

// 假設 iEnd 是請求獲得的獎品結果
var iEnd = -1;

$(".turntable_btn").on("click", function () {
  var $this = $(this);

  // 播放抽獎音效
  spinSound.currentTime = 0; // 確保從頭開始播放
  spinSound.volume = 1; // 重置音量
  spinSound.play();

  iEnd = Math.floor(Math.random() * 8);
  console.log(iEnd);
  var prize = $(".list").find("li").eq(iEnd).find("p").html();

  rotating();
  $this.attr("disabled", "disabled");

  // 3.8 秒後開始漸弱抽獎音效
  setTimeout(function () {
    fadeOutAudio(spinSound, 200); // 漸弱時間為 0.2 秒
  }, 3800);

  // 4.2 秒後顯示自訂彈窗並播放得獎音效
  setTimeout(function () {
    // 播放得獎音效
    winSound.currentTime = 0;
    winSound.play();

    // 顯示自訂底圖彈窗
    showPrizePopup(prize);

    // 恢復按鈕
    $this.removeAttr("disabled");
    $(".list ul").removeClass("go");
    $(".polyline").removeClass("go");
    $(".circle circle").removeClass("go");
  }, 4200); // 4.2 秒動畫結束後觸發
});

function rotating() {
  switch (iEnd) {
    case 0:
      $(".polyline").css("transform", "rotate(0deg)");
      $(".list ul").css("transform", "rotate(0deg)");
      break;
    case 1:
      $(".polyline").css("transform", "rotate(45deg)");
      $(".list ul").css("transform", "rotate(45deg)");
      break;
    case 2:
      $(".polyline").css("transform", "rotate(90deg)");
      $(".list ul").css("transform", "rotate(90deg)");
      break;
    case 3:
      $(".polyline").css("transform", "rotate(135deg)");
      $(".list ul").css("transform", "rotate(135deg)");
      break;
    case 4:
      $(".polyline").css("transform", "rotate(180deg)");
      $(".list ul").css("transform", "rotate(180deg)");
      break;
    case 5:
      $(".polyline").css("transform", "rotate(225deg)");
      $(".list ul").css("transform", "rotate(225deg)");
      break;
    case 6:
      $(".polyline").css("transform", "rotate(270deg)");
      $(".list ul").css("transform", "rotate(270deg)");
      break;
    case 7:
      $(".polyline").css("transform", "rotate(315deg)");
      $(".list ul").css("transform", "rotate(315deg)");
      break;
  }
  $(".list ul").addClass("go");
  $(".polyline").addClass("go");
  $(".circle circle").addClass("go");
}

// 音效漸弱函式
function fadeOutAudio(audio, duration) {
  var step = 0.1; // 每次減少的音量
  var interval = duration / (audio.volume / step); // 計算間隔
  var fade = setInterval(function () {
    if (audio.volume > step) {
      audio.volume -= step; // 降低音量
    } else {
      audio.volume = 0; // 確保音量設為 0
      audio.pause(); // 暫停音效
      clearInterval(fade); // 停止漸弱
    }
  }, interval);
}

// 顯示獎項彈窗函式
function showPrizePopup(prizeIndex) {
  // 獲取獎項名稱和說明
  var prizeName = prize_list[prizeIndex].name;
  var prizeDescription = prize_list[prizeIndex].description;

  // 建立底圖彈窗元素
  var $popup = $('<div class="prize-popup"></div>');
  var $popupContent = `
    <div class="popup-content">
      <h1>恭喜你中了</h1>
      <h2>${prizeName}</h2>
      <p>${prizeDescription}</p>
      <button class="close-popup">確定</button>
    </div>
  `;
  $popup.html($popupContent);
  $("body").append($popup);

  // 點擊關閉按鈕時移除彈窗
  $popup.find(".close-popup").on("click", function () {
    $popup.remove();
  });
}

// 在抽獎結果處顯示彈窗
setTimeout(function () {
  winSound.play();
  showPrizePopup(iEnd);
}, 4200);

function resizeTurntable(scale) {
  const turntable = document.querySelector("section.turntable");
  turntable.style.transform = `scale(${scale})`;
}
// resizeTurntable(1.08); 