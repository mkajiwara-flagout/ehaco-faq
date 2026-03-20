<script setup lang="ts">
defineProps<{
  label?: string
  tags: string[]
}>()

function setSearchValue(keyword: string) {
  const input = document.querySelector('#localsearch-input') as HTMLInputElement
    || document.querySelector('.search-input') as HTMLInputElement
    || document.querySelector('input[type="search"]') as HTMLInputElement
  if (input) {
    // Native setter を使って Vue のリアクティビティを正しくトリガーする
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    )?.set
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, keyword)
    } else {
      input.value = keyword
    }
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
  }
}

function openSearch(keyword: string) {
  // VitePressのローカル検索ボタンを探してクリック
  const searchButton = document.querySelector('.DocSearch-Button') as HTMLElement
    || document.querySelector('#local-search button') as HTMLElement
    || document.querySelector('button[aria-label="検索"]') as HTMLElement

  if (searchButton) {
    searchButton.click()
    // 検索モーダルが開いた後にキーワードを入力（リトライ付き）
    let attempts = 0
    const trySetValue = () => {
      const input = document.querySelector('#localsearch-input') as HTMLInputElement
        || document.querySelector('.search-input') as HTMLInputElement
      if (input) {
        setSearchValue(keyword)
      } else if (attempts < 10) {
        attempts++
        setTimeout(trySetValue, 50)
      }
    }
    setTimeout(trySetValue, 100)
    return
  }

  // フォールバック：Ctrl+K でモーダルを開く
  document.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    ctrlKey: true,
    bubbles: true,
  }))
  let attempts = 0
  const trySetValue = () => {
    const input = document.querySelector('#localsearch-input') as HTMLInputElement
      || document.querySelector('.search-input') as HTMLInputElement
    if (input) {
      setSearchValue(keyword)
    } else if (attempts < 10) {
      attempts++
      setTimeout(trySetValue, 50)
    }
  }
  setTimeout(trySetValue, 100)
}
</script>

<template>
  <div class="search-tags-container">
    <div v-if="label" class="search-tags-label">🔍 {{ label }}</div>
    <div class="search-tags">
      <button
        v-for="tag in tags"
        :key="tag"
        class="search-tag"
        @click="openSearch(tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>
