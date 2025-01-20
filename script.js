//獎品項目
var prize_list = [
  {
    name: "專屬優惠",
    img: "https://cdn-icons-png.flaticon.com/512/1405/1405225.png",
  },
  {
    name: "變形金剛",
    img: "https://cdn-icons-png.flaticon.com/512/7926/7926936.png",
  },
  {
    name: "貝斯特鑄鐵鍋<br/>三件組",
    img: "https://cdn-icons-png.flaticon.com/512/3063/3063504.png",
  },
  {
    name: "麗克特<br/>格子吐司機",
    img: "https://cdn-icons-png.flaticon.com/512/4353/4353006.png",
  },
  {
    name: "折價券",
    img: "https://cdn-icons-png.flaticon.com/512/612/612885.png",
  },
  {
    name: "佩佩豬<br/>紅包袋",
    img: "https://cdn-icons-png.flaticon.com/512/677/677721.png",
  },
  {
    name: "迪士尼<br/>彩色隨手瓶",
    img: "https://cdn-icons-png.flaticon.com/512/4982/4982355.png",
  },
  {
    name: "美國濕式熟成<br/>牛排(五入組)",
    img: "https://cdn-icons-png.flaticon.com/512/5854/5854248.png",
  },
];

for (var i = 0; i <= 7; i++) {
  $(".list ul").append(
    "<li><p>" +
      prize_list[i].name +
      "</p><img src='" +
      prize_list[i].img +
      "'></li>"
  );
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
function showPrizePopup(prize) {
  // 建立底圖彈窗元素
  var $popup = $('<div class="prize-popup"></div>');
  var $popupContent = `
    <div class="popup-content">
      <h1>恭喜你中了</h1>
      <h2>${prize.replace("<br>", "")} 獎！</h2>
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