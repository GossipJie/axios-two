<template>
  <div>
    <child-com1
      :name="name"
      :age="age"
      :gender="gender"
      :height="height"
      title="程序员成长指北"
    ></child-com1>
  </div>
</template>
<script>
  const childCom1 = () => import("./childCom1.vue");
  export default {
    components: { childCom1 },
    data() {
      return {
        name: "zhang",
        age: "18",
        gender: "女",
        height: "158"
      };
    }
  };
</script>
