<script setup>
import LinkCard from '../../.vitepress/theme/components/LinkCard.vue'
import SearchTags from '../../.vitepress/theme/components/SearchTags.vue'
</script>

# 主催者向け よくある質問

ehaco! をご利用中にお困りのことがありましたら、以下のよくある質問をご確認ください。

<SearchTags
  label="よく検索されるキーワード"
  :tags="[
    'イベント作成',
    'アンケート',
    'ターゲット',
    'パスワードリセット',
    'お問い合わせ',
    '担当者',
  ]"
/>

## 📋 質問一覧

<LinkCard :links="[
  { icon: '📞', title: '参加者からの問い合わせ受付', description: 'お問い合わせURLの設定方法', link: '/organizer/faq/contact' },
  { icon: '🏛️', title: '運営へのお問い合わせ', description: 'ehaco! 運営事務局へのお問い合わせフォーム', link: '/organizer/faq/contact-support' },
  { icon: '🔄', title: 'パスワードリセット方法', description: 'パスワードを忘れた場合の対処法', link: '/organizer/faq/password-reset' },
  { icon: '💡', title: 'イベント作成のコツ', description: '参加者に見つけてもらうためのポイント', link: '/organizer/faq/event-tips' },
  { icon: '💡', title: 'ehaco! とは', description: 'サービス概要・ご利用の流れ', link: '/participant/faq/about-ehaco' },
  { icon: '📜', title: '利用規約・プライバシーポリシー', description: '規約・個人情報の取り扱いについて', link: '/participant/faq/terms' },
]" />

## 解決しない場合

上記で解決しない場合は、[運営へのお問い合わせ](/organizer/faq/contact-support)よりご連絡ください。
