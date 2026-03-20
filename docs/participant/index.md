<script setup>
import StepCard from '../.vitepress/theme/components/StepCard.vue'
import LinkCard from '../.vitepress/theme/components/LinkCard.vue'
import SearchTags from '../.vitepress/theme/components/SearchTags.vue'
</script>

# 参加者向けヘルプセンター

ehaco! をご利用いただきありがとうございます。こちらは参加者の方向けのヘルプセンターです。

<SearchTags
  label="よく検索されるキーワード"
  :tags="[
    'ログイン',
    'パスワードリセット',
    'イベント申込み',
    'キャンセル',
    'マイページ',
    'お問い合わせ',
    'メールが届かない',
    'アカウント登録',
    '利用規約',
    '推奨ブラウザ',
  ]"
/>

## 🚀 初めての方向け

ehaco! を初めてご利用になる方は、以下のステップガイドをご覧ください。

<StepCard :steps="[
  { number: 1, icon: '📝', title: '新規利用者登録', link: '/participant/getting-started/step1-registration' },
  { number: 2, icon: '🔑', title: 'ログインについて', link: '/participant/getting-started/step2-login' },
  { number: 3, icon: '🔍', title: 'イベント検索', link: '/participant/getting-started/step3-search' },
  { number: 4, icon: '📨', title: 'イベント申込み', link: '/participant/getting-started/step4-apply' },
  { number: 5, icon: '✅', title: '申し込み後の流れ', link: '/participant/getting-started/step5-after-apply' },
]" />

## 📖 機能別メニュー

各機能の詳しい使い方はこちらをご覧ください。

<LinkCard :links="[
  { icon: '🏠', title: 'TOPページの使い方', description: 'おすすめイベントや新着イベントの確認方法', link: '/participant/features/top-page' },
  { icon: '🔎', title: '検索による絞り込みの使い方', description: 'カテゴリ・日時・キーワードで絞り込み', link: '/participant/features/search-filter' },
  { icon: '📄', title: 'イベント詳細ページの使い方', description: 'イベント情報の確認・申し込み・共有', link: '/participant/features/event-detail' },
  { icon: '👤', title: 'マイページの使い方', description: '申込み済みイベントやプロフィールの管理', link: '/participant/features/my-page' },
  { icon: '🔖', title: 'お気に入り（ブックマーク）機能', description: '気になるイベントを保存して後から確認', link: '/participant/features/bookmark' },
  { icon: '📢', title: 'SNS共有機能の使い方', description: 'X・Facebook・LinkedInでイベントをシェア', link: '/participant/features/sns-share' },
]" />

## ❓ [よくある質問](/participant/faq/)

<LinkCard :links="[
  { icon: '❌', title: 'イベントへの参加を取り止めたい', description: 'キャンセル方法をご案内します', link: '/participant/faq/cancel-event' },
  { icon: '🔒', title: 'アカウント登録情報の用途', description: '登録情報がどこで使用されるかをご説明します', link: '/participant/faq/account-info-usage' },
  { icon: '📞', title: '主催企業へのお問い合わせ', description: 'イベント主催企業への問い合わせ方法', link: '/participant/faq/contact' },
  { icon: '🏛️', title: '運営へのお問い合わせ', description: 'ehaco! 運営事務局へのお問い合わせフォーム', link: '/participant/faq/contact-support' },
  { icon: '🔄', title: 'パスワードリセット方法', description: 'パスワードを忘れた場合の対処法', link: '/participant/faq/password-reset' },
  { icon: '🔧', title: 'よくあるトラブルと解決方法', description: 'ログインできない・メールが届かない等', link: '/participant/faq/troubleshooting' },
  { icon: '🖥️', title: '推奨ブラウザ・動作環境', description: '対応ブラウザ・スマートフォンでの利用', link: '/participant/faq/system-requirements' },
  { icon: '💡', title: 'ehaco! とは', description: 'サービス概要・ご利用の流れ', link: '/participant/faq/about-ehaco' },
  { icon: '📜', title: '利用規約・プライバシーポリシー', description: '規約・個人情報の取り扱いについて', link: '/participant/faq/terms' },
]" />

<div style="text-align: right; margin-top: 8px; font-size: 14px;">

[すべての質問を見る →](/participant/faq/)

</div>
