import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "unknown-error": "An unknown error occurred",
          welcome:
            "Welcome to Peach Board Game, a free and open-source board game platform.",
          "change-avatar-title": "Set Up / Change Avatar",
          "change-avatar-desc":
            "Use Gravatar to set up your avatar and refresh the page after setting up",
          "change-avatar-btn": "Go to Gravatar",
          user: "user",
          guest: "guest",
          "name-changed-successfully": "Name changed successfully!",
          email: "email",
          verified: "verified",
          unverified: "unverified",
          played: "played",
          wins: "wins",
          "win-rate": "rate",
          rankking: "rank",
          credits: "credits",
          "to-next-rank": "to next rank",
          "in-total": "in total",
          "email-changed-successfully": "Email changed successfully!",
          "manage-users": "Manage Users",
          "manage-announcements": "Manage Announcements",
          "language-button": "Language",
          "main-title": "Peach Board Game",
          "short-title": "PBG",
          "github-button": "GitHub Repository",
          "notification-button": "Toggle notifications panel",
          "lightMode-button": "Switch to light mode",
          "darkMode-button": "Switch to dark mode",
          "no-account": "No account found, please login first.",
          home: "Home",
          games: "Games",
          lobby: "Lobby",
          rank: "Rank",
          account: "Account",
          admin: "Admin",
          logout: "Logout",
          "logout-confirm": "Are you sure you want to logout?",
          cancel: "Cancel",
          login: "Login",
          "auth-title": "PBG AUTH",
          "email-address": "Email Address",
          password: "Password",
          username: "Username",
          or: "or",
          "invalid-email": "Invalid email address",
          "please-input-email": "Please input email address",
          "login-with-email": "Login with email",
          "login-with-google": "Login with Google",
          "login-with-github": "Login with GitHub",
          "login-with-wechat": "Login with WeChat",
          "page-not-found": "Page not found",
          "page-not-found-desc":
            "Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.",
          "go-to-home": "Go to Home",
          "error-occured": "An error occurred",
          "refresh-page": "REFRESH",
          "unauthorized-desc":
            "This page is not authorized for guest users. Please login with an authorized account.",
          announcements: "Announcements",
          "have-fun": "Have fun!",
          avatar: "Avatar",
          name: "Name",
          level: "Level",
          score: "Score",
          anonymous: "Anonymous",
          "food-chain-magnate": "Food Chain Magnate",
          "food-chain-magnate-desc":
            "Food Chain Magnate is a heavy strategy game about building a fast food chain. The focus is on building your company using a card driven (human) resource management system. Players compete on a variable city map through purchasing, marketing and sales, and on a job market for key staff members. The game can be played by 2-5 serious gamers in 2-4 hours.",
          "play-alone": "Play Alone",
          "learn-more": "Learn More",
          "tic-tac-toe": "Tic-Tac-Toe",
          "tic-tac-toe-desc":
            "Tic Tac Toe is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner.",
          gomoku: "Gomoku",
          "gomoku-desc":
            "Gomoku is an abstract strategy board game. Also called Gobang or Five in a Row, it is traditionally played with Go pieces (black and white stones) on a go board with 19x19 intersections; however, because once placed, pieces are not moved or removed from the board, gomoku may also be played as a paper and pencil game. This game is known in several countries under different names.",
          "coming-soon": "Coming Soon",
          "coming-soon-desc":
            "We are working hard to bring more games to PBG. Stay tuned for updates!",
          "no-ai": "AI coming soon",
          "with-ai": "AI available !!",
          "check-your-email": "Check your email!",

          "check-your-email-desc":
            "We have sent an email to your address. Please check your inbox and click the link to verify your account.",
        },
      },
      zh: {
        translation: {
          "main-title": "桃之桌游",
          "short-title": "PBG",
          "github-button": "GitHub 仓库",
          "notification-button": "开启/关闭通知面板",
          "lightMode-button": "切换到浅色模式",
          "darkMode-button": "切换到深色模式",
          "no-account": "未找到账号，请先登录",
          home: "首页",
          games: "游戏",
          lobby: "大厅",
          rank: "排行榜",
          account: "账号",
          logout: "登出",
          "logout-confirm": "确定要登出吗？",
          cancel: "取消",
          login: "登录",
          "auth-title": "PBG 登录验证",
          "email-address": "邮箱地址",
          password: "密码",
          username: "用户名",
          or: "或",
          "invalid-email": "无效的邮箱地址",
          "please-input-email": "请输入邮箱地址",
          "login-with-email": "使用邮箱登录",
          "login-with-google": "使用 Google 登录",
          "login-with-github": "使用 GitHub 登录",
          "login-with-wechat": "使用微信登录",
          "page-not-found": "页面未找到",
          "page-not-found-desc":
            "抱歉，找不到您正在寻找的页面。请检查您的链接是否有误。",
          "go-to-home": "返回首页",
          "error-occured": "发生错误",
          "refresh-page": "刷新页面",
          "unauthorized-desc":
            "该页面仅限已登录用户访问。请使用已授权的账号登录。",
          "unknown-error": "发生未知错误",
          welcome: "欢迎来到桃之桌游，一个免费、开源的桌游平台。",
          "change-avatar-title": "设置 / 更换头像",
          "change-avatar-desc":
            "使用 Gravatar 设置您的头像，设置完成后请刷新页面",
          "change-avatar-btn": "前往 Gravatar",
          admin: "管理员",
          user: "用户",
          guest: "访客",
          "name-changed-successfully": "姓名修改成功！",
          email: "邮箱",
          verified: "已认证",
          unverified: "未认证",
          played: "游戏次数",
          wins: "胜利次数",
          "win-rate": "胜率",
          rankking: "排名",
          credits: "积分",
          "to-next-rank": "升级所需积分",
          "in-total": "总计",
          "email-changed-successfully": "邮箱修改成功！",
          "manage-users": "管理用户",
          "manage-announcements": "管理公告",
          "language-button": "语言",
          announcements: "公告",
          "have-fun": "尽情享受！",
          avatar: "头像",
          name: "姓名",
          level: "等级",
          score: "分数",
          anonymous: "匿名",
          "food-chain-magnate": "连锁快餐大亨",
          "food-chain-magnate-desc":
            "连锁快餐大亨是一款关于建立快速食品链的策略游戏。游戏围绕着使用人力资源管理系统来建立公司。玩家在城市地图上进行购买、营销和销售，并在职位市场上竞争关键员工。游戏可在 2-4 小时内由 2-5 名认真的游戏玩家进行。",
          "play-alone": "单机模式",
          "learn-more": "了解更多",
          "tic-tac-toe": "井字棋",
          "tic-tac-toe-desc":
            "井字棋是双人游戏，由 X 和 O 两名玩家轮流在 3x3 网格中标记空格。获胜者必须在一条对角线、水平或垂直方向上放置三个相同的棋子，获胜者即为胜利者。",
          gomoku: "五子棋",
          "gomoku-desc":
            "五子棋是一种抽象策略棋盘游戏。也被称为Gobang或五子连珠，是一种经典的纸牌游戏。棋盘由 19x19 交叉点组成，棋子可以是黑白两色。虽然棋子一旦落下，就不能移动或删除，但也可以用纸笔进行游戏。",
          "coming-soon": "即将推出",
          "coming-soon-desc":
            "我们正在努力推出更多游戏到 PBG。请持续关注我们的更新！",
          "no-ai": "即将推出 AI",
          "with-ai": "AI 可用 !!",
          "check-your-email": "请查收邮件！",
          "check-your-email-desc":
            "我们已向您发送了一封邮件。请查收您的邮箱并点击链接来验证您的账号。",
        },
      },
      jp: {
        translation: {
          "main-title": "桃の棋ゲーム",
          "short-title": "PBG",
          "github-button": "GitHub リポジトリ",
          "notification-button": "通知パネルをオン/オフにする",
          "lightMode-button": "ライトモードに切り替え",
          "darkMode-button": "ダークモードに切り替え",
          "no-account": "アカウントが見つかりません。ログインしてください。",
          home: "ホーム",
          games: "ゲーム",
          lobby: "ロビー",
          rank: "ランキング",
          account: "アカウント",
          admin: "管理者",
          logout: "ログアウト",
          "logout-confirm": "ログアウトしますか？",
          cancel: "キャンセル",
          login: "ログイン",
          "auth-title": "PBG 認証",
          "email-address": "メールアドレス",
          password: "パスワード",
          username: "ユーザー名",
          or: "または",
          "invalid-email": "無効なメールアドレス",
          "please-input-email": "メールアドレスを入力してください",
          "login-with-email": "メールアドレスでログイン",
          "login-with-google": "Google でログイン",
          "login-with-github": "GitHub でログイン",
          "login-with-wechat": "WeChat でログイン",
          "page-not-found": "ページが見つかりません",
          "page-not-found-desc":
            "申し訳ありません。要求されたページが見つかりませんでした。URLを確認してください。",
          "go-to-home": "ホームに戻る",
          "error-occured": "エラーが発生しました",
          "refresh-page": "ページを更新",
          "unauthorized-desc":
            "ゲストユーザーにはこのページへのアクセス権がありません。ログインしてください。",
          "unknown-error": "不明なエラーが発生しました",
          welcome:
            "桃の棋ゲームへようこそ。無料でオープンソースの棋ゲームプラットフォームです。",
          "change-avatar-title": "アバターを設定 / 変更",
          "change-avatar-desc":
            "Gravatar を使用してアバターを設定し、設定が完了したらページを更新してください",
          "change-avatar-btn": "Gravatar へ移動",
          user: "ユーザー",
          guest: "ゲスト",
          "name-changed-successfully": "名前の変更に成功しました！",
          email: "メールアドレス",
          verified: "認証済み",
          unverified: "未認証",
          played: "対局回数",
          wins: "勝利回数",
          "win-rate": "勝率",
          rankking: "順位",
          credits: "クレジット",
          "to-next-rank": "次のランクまでの必要クレジット",
          "in-total": "合計",
          "email-changed-successfully": "メールアドレスの変更に成功しました！",
          "manage-users": "ユーザー管理",
          "manage-announcements": "公告管理",
          "language-button": "言語",
          announcements: "お知らせ",
          "have-fun": "楽しんでください！",
          avatar: "アバター",
          name: "名前",
          level: "レベル",
          score: "スコア",
          anonymous: "匿名",
          "food-chain-magnate": "連鎖快餐大亨",

          "food-chain-magnate-desc":
            "連鎖快餐大亨は、人力資源管理システムを使用して、迅速な食品チェーンを構築する戦略ゲームです。プレイヤーはカード駆動の（人間の）資源管理システムを使用して、企業を構築し、販売、および販売を行います。ゲームは 2-4 時間で 2-5 人の認真なゲーマーが対戦できます。",
          "play-alone": "単独プレイ",
          "learn-more": "詳しくはこちら",
          "tic-tac-toe": "チェス",
          "tic-tac-toe-desc":
            "チェスは、2 人プレイヤーが 3x3 のボード上で交互に石を置くゲームです。勝利条件は、対角線、水平、または垂直の 3 つの石を置くことです。",
          gomoku: "五目並べ",
          "gomoku-desc":
            "五目並べは、抽象的な戦略棋盘ゲームです。Gobang または Five in a Row とも呼ばれ、19x19 の交点に置かれた黒白の石で構成されています。一度置いた石は移動または削除できませんが、紙とペンでも対局できます。",
          "coming-soon": "近日公開",
          "coming-soon-desc":
            "PBG では、さらに多くのゲームを提供する予定です。お待ちください！",
          "no-ai": "AI 予定",
          "with-ai": "AI あり !!",
          "check-your-email": "メールを確認してください！",
          "check-your-email-desc":
            "メールを送信しました。メールを確認し、リンクをクリックしてアカウントを認証してください。",
        },
      },
    },
  });

export default i18n;
