<template>
  <div class="section">
    <h2>section父组件</h2>
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <p>{{currentIndex}}</p>
  </div>
</template>

<script>
  import comArticle from './article'
  export default {
    name: 'sectionOne',
    components: { comArticle },
    data() {
      return {
        currentIndex: -1,
        articleList: ['红楼梦', '西游记', '三国演义']
      }
    },
    methods: {
      onEmitIndex(idx) {
        this.currentIndex = idx
      }
    }
  }
</script>

