<template>
  <div class="content-hidde">
    <div class="img-box">
      <img :src="foods.image" class="img" />
      <img src="SVG/arrow_lift.svg" @click="hidde" />
    </div>
    <div class="satisfied-content">
      <h3>{{ foods.name }}</h3>
      <span>月售{{ foods.sellCount }}份 好评率{{ foods.rating }}%</span>
      <div class="hidde-list">
        <font>￥{{ foods.price }}</font>
        <span v-show="foods.oldPrice">￥{{ foods.oldPrice }}</span>
        <button
          :style="{ background: foods.num > 0 ? 'gray' : '' }"
          v-text="foods.num < 1 ? '加入购物车' : '已加入'"
          @click="addcar(foods)"
        ></button>
      </div>
    </div>

    <div class="line"></div>

    <div class="satisfied-content">
      <h3>商品介绍</h3>
      <p>{{ foods.info }}</p>
    </div>
    <div class="line"></div>
    <list :data="foods.ratings">
      <h3 slot="title" class="h3">商品评价</h3>
      <slot slot="b1"> 3 </slot>
      <slot slot="b2">推荐 2</slot>
      <slot slot="b3">吐槽 1</slot>
      <slot slot="star">
        <template slot-scope="finfo">
          <div class="stars">
            <img
              v-for="(i, n) of 5"
              :key="n"
              :src="i + 1 <= finfo.score ? img1 : img2"
            />
          </div>
        </template>
      </slot>
    </list>
  </div>
</template>

<script>
import list from "../components/list";
export default {
  props: ["foods"],
  components: {
    list,
  },
  data() {
    return {
      isshow: false,
    };
  },
  methods: {
    addcar(obj) {
      // 只允许加一次
      // if (obj.num < 1) {
      //   obj.num + 1;
      // }
      // 允许多次加
      obj.num + 1;
      this.$emit("add", obj);
    },
    hidde() {
      this.$emit("hiddedetali", false);
    },
  },
};
</script>

<style lang="less">
.content-hidde {
  position: fixed;
  overflow: scroll;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background: white;
}
.img-box {
  height: 750/7.5vw;
  .img {
    width: 100%;
    height: 100%;
  }
  > img {
    &:nth-child(2) {
      position: fixed;
      width: 60/7.5vw;
      height: 60/7.5vw;
      top: 40/7.5vw;
      left: 25/7.5vw;
    }
  }
}
.satisfied-content {
  padding: 36/7.5vw;
  font-size: 24/7.5vw;
  font-weight: 200;
  color: rgb(7, 17, 27);
  span {
    font-size: 20/7.5vw;
    color: rgb(77, 85, 93);
  }
  p {
    line-height: 48/7.5vw;
  }
  h3 {
    margin-bottom: 24/7.5vw;
  }
}
.price {
  color: rgb(240, 20, 20);
  font-size: 30/7.5vw;
  font-weight: 700;
}
.oldprice {
  text-decoration: line-through;
  margin-left: 16/7.5vw;
}
.hidde-list {
  display: flex;
  align-items: center;
  font {
    .price();
  }
  span {
    .oldprice();
  }
  button {
    margin-left: auto;
    font-size: 20/7.5vw;
    color: white;
    line-height: 48/7.5vw;
    border-radius: 24/7.5vw;
    background: rgb(0, 160, 220);
    padding: 0 24/7.5vw;
  }
}

.h3 {
  margin: 36/7.5vw 36/7.5vw 0 36/7.5vw;
  font-size: 28/7.5vw;
}

.car-enter-active {
  animation: fadeInUpBig 0.5s;
}

.car-leave-active {
  animation: fadeOutDownBig 0.5s;
}
</style>