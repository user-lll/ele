<template>
  <div class="header">
    <div
      :style="{
        background: `url(${seller.avatar})`,
      }"
    >
      <div class="header-title">
        <img :src="seller.avatar" />
        <div class="header-text">
          <img src="../assets/img/brand@3x.png" />
          <span>粥品香坊(大运村)</span>
          <p>
            <span
              >{{ seller.description }}<span> / {{ seller.deliveryTime }}</span
              >分钟送达</span
            >
          </p>
          <div class="smallcop">
            <img src="../assets/img/decrease_1@3x.png" />
            在线支付满28减5，满50减10
            <span>5个 ></span>
          </div>
        </div>
      </div>
      <div class="header-notice" @click="isshow = !isshow">
        <img src="../assets/img/bulletin@3x.png" />
        <span>{{ seller.bulletin }}</span>
        <span>></span>
      </div>
    </div>
    <transition name="up"
      ><alert v-show="isshow" @ishidde="hidde"></alert
    ></transition>
  </div>
</template>
 <script>
import alert from "../views/alert";
export default {
  props: ["seller"],
  data() {
    return {
      isshow: false,
    };
  },
  methods: {
    hidde(val) {
      this.isshow = val;
    },
  },
  components: {
    alert,
  },
};
</script>
 
<style lang="less">
.header {
  color: rgb(255, 255, 255);
  > div {
    background-size: cover !important;
  }
}
.header-title {
  padding: 48/7.5vw 24/7.5vw 0 48/7.5vw;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  > img {
    width: 128/7.5vw;
    height: 128/7.5vw;
    border-radius: 4/7.5vw;
    margin: 0 32/7.5vw 36/7.5vw 0;
  }
  .header-text {
    width: 100%;
    > img {
      vertical-align: top;
      width: 58/7.5vw;
      height: 36/7.5vw;
      margin-right: 12/7.5vw;
    }
    > span {
      font-weight: bold;
      font-size: 32/7.5vw;
      line-height: 36/7.5vw;
    }

    > p {
      margin: 16/7.5vw 0 20/7.5vw 0;
      font-size: 24/7.5vw;
      font-weight: 200;
    }
    .smallcop {
      font-size: 20/7.5vw;
      img {
        width: 24/7.5vw;
        height: 24/7.5vw;
        margin-right: 8/7.5vw;
      }
      span {
        float: right;
        background: rgba(0, 0, 0, 0.2);
        line-height: 48/7.5vw;
        width: 85/7.5vw;
        text-align: center;
        border-radius: 30/7.5vw;
        margin-bottom: 30/7.5vw;
      }
    }
  }
}
.header-notice {
  display: flex;
  align-items: center;
  height: 57.5/7.5vw;
  font-size: 20/7.5vw;
  background-color: rgba(7, 17, 27, 0.6);
  padding: 0 24/7.5vw;
  img {
    width: 44/7.5vw;
    height: 22/7.5vw;
    margin-right: 8/7.5vw;
  }
  span {
    &:nth-of-type(1) {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.up-enter-active {
  animation: slideInRight 0.5s;
}

.up-leave-active {
  animation: slideOutUp 0.5s;
}
</style>