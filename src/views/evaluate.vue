<template>
  <div class="evaluate">
    <div class="evaluate-header">
      <div class="evaluate-header-left">
        <span>{{ seller.score }}</span>
        <span>综合评分</span>
        <span>高于周边商家{{ seller.rankRate }}%</span>
      </div>
      <ul class="evaluate-header-right">
        <li>
          <span>服务态度</span>
          <div class="imgs">
            <img
              v-for="(i, n) of 5"
              :key="n"
              :src="i + 1 <= Math.ceil(seller.serviceScore) ? img1 : img2"
            />
          </div>
          <span>{{ seller.serviceScore }}</span>
        </li>
        <li>
          <span>菜品口味</span>
          <div class="imgs">
            <img
              v-for="(i, n) of 5"
              :key="n"
              :src="i + 1 <= Math.ceil(seller.serviceScore) ? img1 : img2"
            />
          </div>
          <span>{{ seller.foodScore }}</span>
        </li>
        <li>
          送达时间
          <span class="time">{{ seller.deliveryTime }}分钟</span>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <list :data="ratings"></list>
  </div>
</template>

<script>
import list from "../components/list";

export default {
  props: ["ratings", "seller"],
  data() {
    return {
      img1: require("../assets/img/star36_on@3x.png"),
      img2: require("../assets/img/star36_off@3x.png"),
    };
  },
  components: {
    list,
  },
};
</script>


<style lang="less">
.font {
  color: rgb(7, 17, 27);
  font-size: 24/7.5vw;
}

.evaluate-header {
  display: flex;
  padding: 36/7.5vw 0;
  border-bottom: 2px solid rgba(7, 17, 27, 0.1);
  .evaluate-header-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      &:nth-of-type(1) {
        color: rgb(255, 153, 0);
        font-size: 40/7.5vw;
      }
      &:nth-of-type(2) {
        .font();
        margin: 12/7.5vw 0 16/7.5vw 0;
      }
      &:nth-of-type(3) {
        color: rgb(147, 153, 159);
        font-size: 20/7.5vw;
      }
    }
  }
  .evaluate-header-right {
    flex: 1;
    padding: 0 42/7.5vw;
    .font();
    li {
      &:nth-of-type(2) {
        margin: 16/7.5vw 0;
      }
      display: flex;
      align-items: center;
      .imgs {
        margin: 0 24/7.5vw;
        img {
          width: 30/7.5vw;
          height: 30/7.5vw;
        }
      }
      .time {
        margin-left: 24/7.5vw;
      }
      span {
        &:nth-of-type(2) {
          color: rgb(255, 153, 0);
        }
      }
    }
  }
}
</style>