<template>
  <div>
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
    <input v-model="idNumber"/>
    {{idNumber}}
    <button @click="idNumberValidator">验证</button>
    {{msg}}
  </div>
</template>

<script>
  import showNumCom from './showNum'
  import additionNumCom from './addtionNum'
  export default {
    name: 'bus',
    components: { showNumCom, additionNumCom },
    data(){
      return {
        idNumber: '',
        msg: ''
      }
    },
    methods:{
      idNumberValidator: function (val) {
        let regex =  /^(^[1-9][0-9]{7}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])[0-9]{3}$)|(^[1-9][0-9]{5}[1-9][0-9]{3}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])(([0-9]{4})|[0-9]{3}[X|x])$)$/ // 身份证
        const VALIDATE_COEFFICIENT = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2] // 系数范围
        const remainderArr = [0,1,2,3,4,5,6,7,8,9,10] //余数范围
        const VALIDATE_CHECK_CODE = ['1','0','X','9','8','7','6','5','4','3','2'] //身份证最后一位范围
        const DIVISOR = 11 // 固定除数

        if (!regex.test(val)) return false

        let valArr = Array.form(val)
        let endVal = valArr[valArr.length - 1]
        let starArr = valArr.splice(0, valArr.length - 1)

        let yushu = starArr.reduce((pre, cur, i) => {
          return pre + cur * VALIDATE_COEFFICIENT[i]
        }, 0)%DIVISOR

        let yushuIndex = remainderArr.indexOf(yushu)
        if (yushuIndex === -1 || VALIDATE_CHECK_CODE[yushuIndex] !== endVal) {
          return false
        }
        return true
      }
    }
  }
</script>
