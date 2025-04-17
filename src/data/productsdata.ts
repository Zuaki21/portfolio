// src/data/productsdata.ts

export interface Product {
  title: string;
  date: string;
  languages: string[];
  reason: string;
  description: string;
  link?: string;
  image?: string;
}

export const products: Product[] = [
  {
    title: "Webサイト「Zuaki’s Portfolio」",
    date: "2025年4月 (1週間)",
    languages: ["React", "TypeScript", "MaterialUI", "Vite"],
    reason: "趣味 (個人制作)",
    description: "このサイトです。レスポンシブデザイン対応。",
    link: "https://github.com/Zuaki21/portfolio?tab=readme-ov-file",
    image: "Portfolio2.webp",
  },
  {
    title: "拡張機能「エモクロアキャラシ画像ダウンローダー」",
    date: "2025年4月 (1日間)",
    languages: ["JavaScript", "HTML", "CSS"],
    reason: "趣味 (個人制作)",
    description:
      "エモクロアキャラシ画像をダウンロードするためのChrome拡張機能。",
    link: "https://chromewebstore.google.com/detail/%E3%82%A8%E3%83%A2%E3%82%AF%E3%83%AD%E3%82%A2%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%B7%E7%94%BB%E5%83%8F%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%80%E3%83%BC/bfppmgmpcbmhmhmabjngnncnaemljkph?authuser=0&hl=ja",
    image: "CharacterSheet.webp",
  },
  {
    title: "布教特化型Vtuberプラットフォーム「FAVE」",
    date: "2024年9月 (1週間)",
    languages: ["React", "TypeScript", "MaterialUI", "Vite"],
    reason: "趣味 (個人制作)",
    description:
      "推しを推し合うファンコミュニティSNS。\nドコモハッカソン(2024/9/10-2024/9/13) 最優秀賞受賞作品。\n主にフロントエンドのUIデザインを担当。",
    link: "https://github.com/docomo-KOSAMAX/FAVE",
    image: "FAVE.webp",
  },
  {
    title: "魚眼カメラ補正ソフト『WebcamRealtimeDewarper』",
    date: "2024年4月 (2日間)",
    languages: ["Python"],
    reason: "趣味 (個人制作)",
    description:
      "魚眼感の強いWebカメラを補正し、\n仮想カメラ入力を可能にするソフト。補正強度の調整機能付き。",
    link: "https://github.com/Zuaki21/WebcamRealtimeDewarper",
    image: "WebCam.webp",
  },
  {
    title: "リング署名認証アプリケーション",
    date: "2024年1月 (1か月間)",
    languages: ["C#", "Unity"],
    reason: "研究 (個人制作)",
    description:
      "匿名性を保った事前登録者の認証アプリ。\n端末間通信と独自ライブラリECDL_DLLを使用。",
    image: "laboapp.webp",
  },
  {
    title: "暗号ライブラリ『ECDL_DLL』",
    date: "2023年11月 ～ 12月 (2か月間)",
    languages: ["C", "C++", "OpenSSL"],
    reason: "研究",
    description:
      "リング署名のための高速楕円曲線暗号ライブラリ。楕円点操作を実装。",
    link: "https://github.com/Zuaki21/ECDL_DLL",
    image: "library.webp",
  },
  {
    title: "ゲーム『CHIASMA』",
    date: "2023年1月 ～ 10月 (10ヵ月間)",
    languages: ["C#", "Unity"],
    reason: "サークル (チーム制作)",
    description:
      "クロスする2つのレーンのリズムゲーム。UI、エディタ、\nデータ暗号化、オンラインランキング（NCMB）を担当。",
    image: "chiasma.webp",
  },
  {
    title: "不良品検知システム",
    date: "2023年9月 (2週間間)",
    languages: ["Python"],
    reason: "インターン",
    description:
      "マツダさんでのインターンで実装。f-anoGanを用いた画像不良品判定システム。前処理とモデル調整を担当。",
    image: "Default.webp",
  },
  {
    title: "配信補助ツール『DiscordCommentFlow』",
    date: "2023年9月 ～ 10月 (1か月)",
    languages: ["C#", "Unity", "Selenium"],
    reason: "趣味 (個人制作)",
    description:
      "Discordコメントを画面上に流す配信支援ツール。フォントを変えられる他、VOICEVOXの読み上げ・ChatGPTでのコメント自演機能付き。",
    link: "https://github.com/Zuaki21/DiscordCommentFlow",
    image: "comment.webp",
  },
  {
    title: "ゲーム『スローウォーズ』",
    date: "2022年6月 (1ヵ月間)",
    languages: ["C#", "Unity"],
    reason: "サークル (個人制作)",
    description:
      "操作していない間は時間が遅くなる見下ろし型シューティング。 \n インタラクティブミュージック対応。全6ステージ。",
    image: "slowwars.webp",
  },
  {
    title: "Chrome拡張『KakomonDojoEx』",
    date: "2022年4月 (1週間)",
    languages: ["JavaScript"],
    reason: "趣味 (個人制作)",
    description:
      "過去問道場の問題にキーボードで回答できるようにするChrome拡張。",
    image: "add-on.webp",
  },
  {
    title: "ゲーム『ハビタブルライフ』",
    date: "2022年5月 (1週間)",
    languages: ["C#", "Unity"],
    reason: "サークル (チーム制作)",
    description:
      "Unityroomゲームジャム参加作品。育成・図鑑・ショップUIを担当。",
    link: "https://unityroom.com/games/habitable-life750",
    image: "habitable2.webp",
  },
  {
    title: "ゲーム『ダンシング☆サムライ』",
    date: "2022年3月 (1ヵ月間)",
    languages: ["C#", "Unity"],
    reason: "サークル (個人制作)",
    description: "忍者をタイミングよく切るリズムアクション。",
    image: "samuraidance.webp",
  },
  {
    title: "ゲーム『クリスマスデリバリー』",
    date: "2021年12月 (1ヵ月間)",
    languages: ["C#", "Unity"],
    reason: "サークル (チーム制作)",
    description: "サンタになって家にプレゼントを届けるタスク管理ゲーム。",
    link: "https://unityroom.com/games/christmasdelivery",
    image: "Christmas.webp",
  },
  {
    title: "ゲーム『千の間』",
    date: "2021年8月 (1週間)",
    languages: ["C#", "Unity"],
    reason: "サークル (チーム制作)",
    description:
      "殿様を導くアクションパズル。\nドット絵・キャラ操作・ステージ設計を担当。",
    image: "sennoma.webp",
  },
  {
    title: "ゲーム『幽霊と宝の塔』",
    date: "2021年5月 (1ヵ月間)",
    languages: ["C#", "Unity"],
    reason: "サークル (チーム制作)",
    description: "重力反転アクションゲーム。ドット絵素材を含む全体制作を担当。",
    link: "https://unityroom.com/games/yurei_to_takara_no_tou",
    image: "Yurei.webp",
  },
];
