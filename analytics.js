/**
 * FC Mehikari LP - 申込導線のクリック計測 (analytics.js)
 * --------------------------------------------------------------------------
 * 申込・問い合わせにつながるリンクのクリックを、GA4に名前付きイベントとして送る。
 * GA4管理画面でこれらを「キーイベント」に設定すると、申込数として集計できる。
 *
 *   booking_click     … 予約ページへ（LINEハーネス予約・reserve.fc-mehikari.org）
 *   line_friend_add   … LINE公式アカウントの友だち追加
 *   jfa_apply_click   … JFA Passport（講習会など）の申込
 *   email_click       … メール（mailto:）
 *   flyer_open        … チラシ画像・PDFを開く
 *   sns_click         … Facebook / Instagram / note / YouTube など
 *
 * 新しいページでも、gtagの下で <script src="(相対パス)/analytics.js" defer></script> を読めば動く。
 */
(function () {
  function classify(a) {
    var href = a.getAttribute("href") || "";
    var url = a.href || "";
    if (href.indexOf("mailto:") === 0) return "email_click";
    if (/line-harness-mehikari\..*page=event|reserve\.fc-mehikari\.org/.test(url)) return "booking_click";
    if (/line\.me\/|lin\.ee\//.test(url)) return "line_friend_add";
    if (/passport\.jfa\.jp/.test(url)) return "jfa_apply_click";
    if (/flyer|\.pdf($|\?)/i.test(href) || a.classList.contains("flyer-item") || a.classList.contains("flyer-preview")) return "flyer_open";
    if (/facebook\.com|instagram\.com|note\.com|youtube\.com|youtu\.be|lit\.link/.test(url)) return "sns_click";
    return null;
  }

  // クリックされた場所（どのボタン・どのセクションか）を短い文字列にする
  function locationOf(a) {
    if (a.className && typeof a.className === "string") {
      var c = a.className.split(/\s+/).filter(Boolean)[0];
      if (c) {
        // 同じクラスのボタンが複数あるとき（上の参加ボタン／下の参加ボタン）は何番目かを付ける
        var same = document.querySelectorAll("a." + CSS.escape(c));
        if (same.length > 1) return c + "_" + (Array.prototype.indexOf.call(same, a) + 1);
        return c;
      }
    }
    var sec = a.closest("[id]");
    return sec ? "#" + sec.id : "unknown";
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || typeof window.gtag !== "function") return;
      var name = classify(a);
      if (!name) return;
      window.gtag("event", name, {
        link_url: a.href,
        link_text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
        link_location: locationOf(a),
        transport_type: "beacon",
      });
    },
    true
  );
})();
