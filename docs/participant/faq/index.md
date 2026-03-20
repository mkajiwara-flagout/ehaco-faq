<script setup>
import LinkCard from '../../.vitepress/theme/components/LinkCard.vue'
import SearchTags from '../../.vitepress/theme/components/SearchTags.vue'
</script>

# 参加者向け よくある質問

ehaco! をご利用中にお困りのことがありましたら、以下のよくある質問をご確認ください。

<SearchTags
  label="よく検索されるキーワード"
  :tags="[
    'ログイン',
    'パスワードリセット',
    'キャンセル',
    'メールが届かない',
    'お問い合わせ',
    '推奨ブラウザ',
  ]"
/>

## 📋 質問一覧

<LinkCard :links="[
  { icon: '❌', title: 'イベントへの参加を取り止めたい', description: 'キャンセル方法・注意事項をご案内します', link: '/participant/faq/cancel-event' },
  { icon: '🔒', title: 'アカウント登録情報の用途', description: '登録情報がどこで使用されるかをご説明します', link: '/participant/faq/account-info-usage' },
  { icon: '📞', title: '主催企業へのお問い合わせ', description: 'イベント主催企業への問い合わせ方法', link: '/participant/faq/contact' },
  { icon: '🏛️', title: '運営へのお問い合わせ', description: 'ehaco! 運営事務局へのお問い合わせフォーム', link: '/participant/faq/contact-support' },
  { icon: '🔄', title: 'パスワードリセット方法', description: 'パスワードを忘れた場合の対処法', link: '/participant/faq/password-reset' },
  { icon: '🔧', title: 'よくあるトラブルと解決方法', description: 'ログインできない・メールが届かない等', link: '/participant/faq/troubleshooting' },
  { icon: '🖥️', title: '推奨ブラウザ・動作環境', description: '対応ブラウザ・スマートフォンでの利用', link: '/participant/faq/system-requirements' },
  { icon: '💡', title: 'ehaco! とは', description: 'サービス概要・ご利用の流れ', link: '/participant/faq/about-ehaco' },
  { icon: '📜', title: '利用規約・プライバシーポリシー', description: '規約・個人情報の取り扱いについて', link: '/participant/faq/terms' },
]" />

## 解決しない場合

上記で解決しない場合は、[運営へのお問い合わせ](/participant/faq/contact-support)よりご連絡ください。
