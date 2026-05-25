/**
 * ==========================================================================
 * FC Mehikari LP - 写真カルーセル制御スクリプト (script.js)
 * ==========================================================================
 */

let currentSlide = 0;
const totalSlides = 3; // スライドの総数
const container = document.getElementById("carouselContainer");
const dots = document.querySelectorAll(".dot");
let autoSlideInterval;

/**
 * スライドの表示位置とインジケーター(ドット)の状態を最新に更新する関数
 */
function updateSlide() {
  // コンテナを左側にずらして該当のスライドを表示させる（1枚あたり33.3333%幅）
  container.style.transform = `translateX(-${currentSlide * 33.3333}%)`;

  // ドットの「active」クラスを付け替える
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

/**
 * 左右の矢印ボタンが押された時の処理
 * @param {number} direction - 次へは「1」、前へは「-1」
 */
function moveSlide(direction) {
  // 手動で操作された場合は、一瞬自動タイマーを止めてリセットする
  clearInterval(autoSlideInterval);

  currentSlide += direction;
  if (currentSlide >= totalSlides) {
    currentSlide = 0; // 最後まで行ったら最初に戻る
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // 最初より前に行ったら最後へ飛ぶ
  }

  updateSlide();
  startAutoSlide(); // 自動タイマーを再スタート
}

/**
 * 下部のドット（インジケーター）が直接クリックされた時の処理
 * @param {number} index - 移動したいスライドの番号 (0からスタート)
 */
function setSlide(index) {
  clearInterval(autoSlideInterval);
  currentSlide = index;
  updateSlide();
  startAutoSlide();
}

/**
 * 3秒(3000ms)ごとに自動で次のスライドへ進めるタイマー関数
 */
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    updateSlide();
  }, 3000);
}

// ページが読み込まれたら自動スライドショーを稼働させる
startAutoSlide();
