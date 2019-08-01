<template>
  <div>
    <h1>this is component C</h1>
    <p>{{demo}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['for'],
    data () {
      return {
        demo: this.for
      }
    }
  }
</script>
