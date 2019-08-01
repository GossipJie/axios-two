<template>
  <div>
    <div style="cursor: pointer" v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
  </div>
</template>

<script>
  export default {
    props: ['articles'],
    methods: {
      emitIndex(index) {
        this.$emit('onEmitIndex', index)
      }
    }
  }
</script>
