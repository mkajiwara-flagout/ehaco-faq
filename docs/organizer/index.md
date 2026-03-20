<script setup>
import StepCard from '../.vitepress/theme/components/StepCard.vue'
import LinkCard from '../.vitepress/theme/components/LinkCard.vue'
import SearchTags from '../.vitepress/theme/components/SearchTags.vue'
</script>

# 主催者向けヘルプセンター

ehaco! をご利用いただきありがとうございます。こちらは主催者の方向けのヘルプセンターです。

<SearchTags
  label="よく検索されるキーワード"
  :tags="[
    'イベント作成',
    'アンケート',
    'ターゲット',
    '担当者追加',
    '申込者一覧',
    '主催者情報',
    'パスワードリセット',
    'お問い合わせ',
    '管理画面',
    'イベント一覧',
  ]"
/>

## 🚀 初めての方向け

ehaco! で初めてイベントを主催される方は、以下のステップガイドをご覧ください。

<StepCard :steps="[
  { number: 1, icon: '📝', title: '新規主催者登録', link: '/organizer/getting-started/step1-registration' },
  { number: 2, icon: '👥', title: '担当者追加', link: '/organizer/getting-started/step2-add-staff' },
  { number: 3, icon: '📊', title: 'アンケート作成', link: '/organizer/getting-started/step3-survey' },
  { number: 4, icon: '🎯', title: 'ターゲット作成', link: '/organizer/getting-started/step4-target' },
  { number: 5, icon: '🎉', title: 'イベント作成', link: '/organizer/getting-started/step5-create-event' },
]" />

## 📖 メニュー別機能

各機能の詳しい使い方はこちらをご覧ください。

<LinkCard :links="[
  { icon: '🖥️', title: '管理画面の概要', description: 'ログイン後の管理画面メニューと基本フロー', link: '/organizer/features/dashboard' },
  { icon: '📋', title: 'イベント申込者一覧', description: '申込者の確認・検索・絞り込み', link: '/organizer/features/applicant-list' },
  { icon: '📅', title: 'イベントページ一覧', description: 'イベントの確認・編集・Excelダウンロード', link: '/organizer/features/event-list' },
  { icon: '📊', title: 'アンケートの機能', description: '事前アンケートの作成と管理', link: '/organizer/features/survey' },
  { icon: '🎯', title: 'ターゲットの機能', description: '対象者グループの作成と設定', link: '/organizer/features/target' },
  { icon: '🏢', title: '主催者情報の機能', description: 'プロフィール・公開情報の管理', link: '/organizer/features/organizer-info' },
  { icon: '👥', title: '担当者一覧の機能', description: '担当者の追加・管理', link: '/organizer/features/staff-list' },
]" />

## ❓ [よくある質問](/organizer/faq/)

<LinkCard :links="[
  { icon: '📞', title: '参加者からの問い合わせ受付', description: 'お問い合わせURLの設定方法', link: '/organizer/faq/contact' },
  { icon: '🏛️', title: '運営へのお問い合わせ', description: 'ehaco! 運営事務局へのお問い合わせフォーム', link: '/organizer/faq/contact-support' },
  { icon: '🔄', title: 'パスワードリセット方法', description: 'パスワードを忘れた場合の対処法', link: '/organizer/faq/password-reset' },
  { icon: '💡', title: 'イベント作成のコツ', description: '参加者に見つけてもらうためのポイント', link: '/organizer/faq/event-tips' },
  { icon: '💡', title: 'ehaco! とは', description: 'サービス概要・ご利用の流れ', link: '/participant/faq/about-ehaco' },
  { icon: '📜', title: '利用規約・プライバシーポリシー', description: '規約・個人情報の取り扱いについて', link: '/participant/faq/terms' },
]" />

<div style="text-align: right; margin-top: 8px; font-size: 14px;">

[すべての質問を見る →](/organizer/faq/)

</div>
