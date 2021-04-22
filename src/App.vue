<template>
  <div id="app">
    <eleheader :seller="seller"></eleheader>

    <ul class="list">
      <router-link to="/goods" tag="li">商品</router-link>
      <router-link to="/evaluate" tag="li">评价</router-link>
      <router-link to="/business" tag="li">商家</router-link>
    </ul>

    <router-view
      :goods="goods"
      :ratings="ratings"
      :seller="seller"
    ></router-view>

    <!-- 购物车 -->
    <car></car>
  </div>
</template>
<script>
import header from "./components/header";
import axios from "axios";
import car from "./components/car";

export default {
  data() {
    return {
      seller: {},
      goods: [],
      ratings: [],
    };
  },
  components: {
    eleheader: header,
    car,
  },
  methods: {
    getcar(brr) {
      this.arr = brr;
    },
  },
  created() {
    axios
      .get("mock/data.json")
      .then((value) => {
        this.seller = value.data.seller;
        this.goods = value.data.goods;
        this.ratings = value.data.ratings;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  ul.list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 28/7.5vw;
    height: 80/7.5vw;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    li.class {
      color: red;
    }
  }
}
</style>
