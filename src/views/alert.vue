<template>
  <div class="alert position">
    <p>粥品香坊 (大运村)</p>
    <div class="star">
      <img v-for="(t, i) in 5" :key="i" :src="i + 1 <= 4 ? img1 : img2" />
    </div>
    <ul class="msg">
      <li></li>
      <li>优惠信息</li>
      <li></li>
    </ul>
    <ul class="activity">
      <li>
        <img src="../assets/img/decrease_2@3x.png" />
        在线支付满28减5,满50减10
      </li>
      <li>
        <img src="../assets/img/discount_2@3x.png" />
        单人精彩赛
      </li>
      <li>
        <img src="../assets/img/discount_2@3x.png" />
        清脆雪梨8折抢购
      </li>
      <li>
        <img src="../assets/img/special_2@3x.png" />
        特价饮品8折抢购
      </li>
      <li>
        <img src="../assets/img/special_2@3x.png" />
        单人特色套餐
      </li>
    </ul>
    <ul class="msg">
      <li></li>
      <li>商家公告</li>
      <li></li>
    </ul>
    <p>
      粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，
      发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商
    </p>
    <img src="svg/close.svg" @click="hidde" />
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      img1: require("../assets/img/star48_on@3x.png"),
      img2: require("../assets/img/star48_off@3x.png"),
    };
  },
  methods: {
    hidde() {
      this.$emit("ishidde", false);
    },
  },
};
</script>


<style lang='less'>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert {
  color: white;
  padding: 128/7.5vw 70/6.5vw 64/7.5vw;
  > p {
    &:nth-of-type(1) {
      font-size: 32/7.5vw;
      font-weight: 700;
      text-align: center;
    }
    &:nth-of-type(2) {
      font-size: 24/7.5vw;
      font-weight: 200;
      line-height: 48/7.5vw;
    }
  }
  .star {
    .flex();
    margin-top: 32/7.5vw;
    img {
      margin-right: 30/7.5vw;
      width: 40/7.5vw;
      height: 40/7.5vw;
    }
  }
  .activity {
    font-size: 24/7.5vw;
    font-weight: 200;
    li {
      margin-bottom: 24/7.5vw;
      img {
        width: 32/7.5vw;
        margin-right: 12/7.5vw;
      }
    }
  }
  > img {
    position: fixed;
    left: 50%;
    bottom: 10%;
    width: 30/7.5vw;
    height: 30/7.5vw;
  }
}
.msg {
  .flex();
  margin: 56/7.5vw 0 48/7.5vw 0;
  font-size: 26/7.5vw;
  font-weight: 700;
  li {
    &:nth-of-type(1),
    &:nth-of-type(3) {
      width: 220/7.5vw;
      height: 2/7.5vw;
      background: rgba(255, 255, 255, 0.2);
    }
    &:nth-of-type(2) {
      margin: 0 20/7.5vw;
    }
  }
}
</style>
 
