<template>
  <div>
    <h3>this is component B</h3>
    {{demo}}
    {{this.for}}
    <hr>
    <com-c></com-c>
  </div>
</template>

<script>
  import comC from './C'
  export default {
    components: {
      comC
    },
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>
