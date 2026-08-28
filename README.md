# fc-mehikari-lp

FCメヒカリ（一般社団法人ふくしま健康デザイン ウォーキングフットボールクラブ）の公開LP一式。GitHub Pagesでホストし、`walking-football.fc-mehikari.org` にカスタムドメインを割り当てている。

## 構成

```
/                    トップページ（クラブ全体のLP）
  index.html
  style.css
  script.js
  img/
/events/<slug>/      個別イベント用のLP（1イベント1フォルダ）
  index.html         Hallmarkスキルで制作した自己完結型HTML（インラインCSS）
```

- トップページは既存の構成（`style.css` / `script.js` / `img/` を共有）をそのまま維持
- イベントページは `events/<slug>/index.html` に1ファイル完結で追加する（トップページの共有CSSには依存しない。イベントごとに別テーマで作ることが多いため）
- `<slug>` は英語表記のイベント名（例: `tomioka`）。日本語イベント名はページ内`<title>`・OGPで表現する
- 公開URLは `https://walking-football.fc-mehikari.org/events/<slug>/` になる
- OGP画像は専用素材がない場合、トップページの `img/samnail.png` を暫定流用してよい

## 既存イベントページ

| イベント | パス | 元ネタ |
|---|---|---|
| 避難者被災者心の復興ウォーキングフットボールin富岡（仮称） | `events/tomioka/` | `DesignForWell-being` リポジトリ `.company/marketing/content-plan/LP-富岡イベント.html`（Hallmarkスキルで制作） |
