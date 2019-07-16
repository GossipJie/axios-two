<template>
  <div class="hello">
    <h1>{{apione.mes}}</h1>
    <p>{{apitwo}}</p>
    <button @click="getApi2">请求</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      apione: '',
      apitwo: ''
    }
  },
  mounted() {
    this.a.v(this)
    this.a.apione({
      // success: function (res) {
      //   alert('请求成功')
      //   console.log(res)
      // }
    })
  },
  methods: {
    getApi2(){
      this.a.apitwo({
        isBlock: false
        // error: function (err) {
        //   alert('请求失败')
        //   console.log(err)
        // }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
