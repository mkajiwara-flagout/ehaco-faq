import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ehaco! ヘルプセンター',
  description: 'ehaco! イベント検索サービスのヘルプセンター',
  lang: 'ja',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  ],

  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },
    siteTitle: 'ヘルプセンター',

    nav: [
      { text: 'ホーム', link: '/' },
      { text: '参加者向け', link: '/participant/' },
      { text: '主催者向け', link: '/organizer/' },
    ],

    sidebar: {
      '/participant/': [
        {
          text: '🚀 初めての方向け',
          collapsed: false,
          items: [
            { text: '📝 ステップ1：新規利用者登録', link: '/participant/getting-started/step1-registration' },
            { text: '🔑 ステップ2：ログインについて', link: '/participant/getting-started/step2-login' },
            { text: '🔍 ステップ3：イベント検索', link: '/participant/getting-started/step3-search' },
            { text: '📨 ステップ4：イベント申込み', link: '/participant/getting-started/step4-apply' },
            { text: '✅ ステップ5：申し込み後の流れ', link: '/participant/getting-started/step5-after-apply' },
          ],
        },
        {
          text: '📖 機能別メニュー',
          collapsed: false,
          items: [
            { text: '🏠 TOPページの使い方', link: '/participant/features/top-page' },
            { text: '🔎 検索による絞り込みの使い方', link: '/participant/features/search-filter' },
            { text: '📄 イベント詳細ページの使い方', link: '/participant/features/event-detail' },
            { text: '👤 マイページの使い方', link: '/participant/features/my-page' },
            { text: '🔖 お気に入り（ブックマーク）機能', link: '/participant/features/bookmark' },
            { text: '📢 SNS共有機能の使い方', link: '/participant/features/sns-share' },
          ],
        },
        {
          text: '❓ よくある質問',
          collapsed: false,
          items: [
            { text: '❌ イベントへの参加を取り止めたい', link: '/participant/faq/cancel-event' },
            { text: '🔒 アカウント登録情報の用途', link: '/participant/faq/account-info-usage' },
            { text: '📞 主催企業へのお問い合わせ', link: '/participant/faq/contact' },
            { text: '🏛️ 運営へのお問い合わせ', link: '/participant/faq/contact-support' },
            { text: '🔄 パスワードリセット方法', link: '/participant/faq/password-reset' },
            { text: '💡 ehaco! とは', link: '/participant/faq/about-ehaco' },
            { text: '📜 利用規約・プライバシーポリシー', link: '/participant/faq/terms' },
          ],
        },
      ],
      '/organizer/': [
        {
          text: '🚀 初めての方向け',
          collapsed: false,
          items: [
            { text: '📝 ステップ1：新規主催者登録', link: '/organizer/getting-started/step1-registration' },
            { text: '👥 ステップ2：担当者追加', link: '/organizer/getting-started/step2-add-staff' },
            { text: '📊 ステップ3：アンケート作成', link: '/organizer/getting-started/step3-survey' },
            { text: '🎯 ステップ4：ターゲット作成', link: '/organizer/getting-started/step4-target' },
            { text: '🎉 ステップ5：イベント作成', link: '/organizer/getting-started/step5-create-event' },
          ],
        },
        {
          text: '📖 メニュー別機能',
          collapsed: false,
          items: [
            { text: '📊 アンケートの機能', link: '/organizer/features/survey' },
            { text: '🎯 ターゲットの機能', link: '/organizer/features/target' },
            { text: '🏢 主催者情報の機能', link: '/organizer/features/organizer-info' },
            { text: '👥 担当者一覧の機能', link: '/organizer/features/staff-list' },
            { text: '📅 イベント一覧の機能', link: '/organizer/features/event-list' },
            { text: '📋 申し込み者一覧の機能', link: '/organizer/features/applicant-list' },
          ],
        },
        {
          text: '❓ よくある質問',
          collapsed: false,
          items: [
            { text: '📞 参加者からの問い合わせ受付', link: '/organizer/faq/contact' },
            { text: '🏛️ 運営へのお問い合わせ', link: '/organizer/faq/contact-support' },
            { text: '🔄 パスワードリセット方法', link: '/organizer/faq/password-reset' },
            { text: '💡 ehaco! とは', link: '/participant/faq/about-ehaco' },
            { text: '📜 利用規約・プライバシーポリシー', link: '/participant/faq/terms' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '検索',
            buttonAriaLabel: '検索',
          },
          modal: {
            noResultsText: '該当する結果がありません',
            resetButtonTitle: 'リセット',
            footer: {
              selectText: '選択',
              navigateText: '移動',
              closeText: '閉じる',
            },
          },
        },
      },
    },

    footer: {
      message: 'ehaco! ヘルプセンター',
      copyright: '© ehaco! All Rights Reserved.',
    },

    outline: {
      label: '目次',
    },

    lastUpdated: {
      text: '最終更新',
    },

    docFooter: {
      prev: '前のページ',
      next: '次のページ',
    },
  },
})
