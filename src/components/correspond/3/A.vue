<template>
  <div>
    <B></B>
    {{this.cp}}
  </div>
</template>

<script>
  import B from './B'
  export default {
    name: 'A',
    provide: {
      for: "provide by A"
    },
    components: {
      B
    },
    data () {
      return {
        cp: "A's data"
      }
    }
  }
</script>
