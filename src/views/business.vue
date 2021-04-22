<template>
  <div>
    <div class="satisfied-top">
      <div>
        <div class="top-left">
          <p>粥品香坊(大运村)</p>
          <img
            v-for="(i, n) of 5"
            :key="n"
            :src="i + 1 <= Math.ceil(seller.serviceScore) ? img1 : img2"
          />
          <span>({{ seller.sellCount }})</span>
          <span>月售{{ seller.ratingCount }}单</span>
        </div>
        <div class="top-right">
          <img :src="isCollection ? svg1 : svg2" @click="changesvg" /><br />
          <span v-show="isCollection">已收藏</span>
        </div>
      </div>
      <ul class="top-tips">
        <li>
          起送价<br />
          <span>{{ seller.minPrice }}</span> 元
        </li>
        <li>
          商家配送<br />
          <span>{{ seller.deliveryPrice }}</span> 元
        </li>
        <li>
          平均配送时间<br />
          <span>{{ seller.ratingCount }}</span> 分钟
        </li>
      </ul>
    </div>

    <div class="line"></div>

    <div class="satisfied-content">
      <h3>公告与活动</h3>
      <p>{{ seller.bulletin }}</p>
      <ul class="text-list">
        <li v-for="(item, index) of seller.supports" :key="index">
          <img :src="imgs[index]" />
          {{ item.description }}
        </li>
      </ul>
    </div>

    <div class="line"></div>

    <div class="satisfied-content satisfied-content2">
      <h3>商家实景</h3>
      <div
        class="satisfied-imgs"
        @touchmove="move"
        @touchstart="start"
        :style="{ left: `${left}px` }"
        ref="bar"
      >
        <img v-for="(item, index) of seller.pics" :key="index" :src="item" />
      </div>
    </div>

    <div class="line"></div>

    <div class="satisfied-content">
      <h3>公告与活动</h3>
      <ul class="text-list">
        <li v-for="(item, index) of seller.infos" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["seller"],
  data() {
    return {
      offsetX: 0,
      left: 0,
      isCollection: false,
      svg1: require("../assets/img/favorite2.svg"),
      svg2: require("../assets/img/favorite.svg"),
      img1: require("../assets/img/star36_on@3x.png"),
      img2: require("../assets/img/star36_off@3x.png"),
      imgs: [
        require("../assets/img/decrease_3@3x.png"),
        require("../assets/img/discount_3@3x.png"),
        require("../assets/img/discount_3@3x.png"),
        require("../assets/img/special_3@3x.png"),
        require("../assets/img/special_3@3x.png"),
        require("../assets/img/invoice_3@3x.png"),
        require("../assets/img/guarantee_4@3x.png"),
      ],
    };
  },
  methods: {
    changesvg() {
      this.isCollection = !this.isCollection;
    },
    start(e) {
      this.offsetX = e.touches[0].pageX;
    },
    move(e) {
      let fl = e.changedTouches[0].pageX - this.offsetX;
      let f2 = fl + this.$refs.bar.offsetLeft;
      let bl =
        this.$refs.bar.offsetWidth - this.$refs.bar.parentNode.clientWidth;
      if (f2 >= 0) f2 = 0;
      if (f2 <= -bl) f2 = -bl;
      this.left = f2;
    },
  },
};
</script>


<style  lang="less">
.border {
  border: 2px solid rgba(7, 17, 27, 0.1);
  border-left: 0;
  border-right: 0;
}
.span {
  font-size: 20/7.5vw;
  color: rgb(77, 85, 93);
}
.satisfied-top {
  padding: 0 36/7.5vw;
  > div,
  ul.top-tips {
    display: flex;
    padding: 36/7.5vw 0;
    &:nth-child(1) {
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
  }
}
.top-left {
  p {
    font-size: 28/7.5vw;
    color: rgb(7, 17, 27);
    margin-bottom: 16/7.5vw;
  }
  img {
    width: 36/7.5vw;
    height: 36/7.5vw;
    margin-right: 15/7.5vw;
  }
  span {
    &:nth-of-type(1) {
      margin-right: 24/7.5vw;
    }
    .span();
  }
}
.top-right {
  flex: 1;
  text-align: right;
  img {
    width: 45/7.5vw;
    height: 45/7.5vw;
  }
  .span();
}
.top-tips {
  justify-content: space-evenly;
  .span();
  span {
    font-size: 48/7.5vw;
    font-weight: 200;
  }
  li {
    text-align: center;
    flex: 1;
    + li {
      border-left: 1px solid rgba(7, 17, 27, 0.1);
    }
  }
}
.satisfied-content {
  padding: 36/7.5vw;
  font-size: 24/7.5vw;
  font-weight: 200;
  color: rgb(7, 17, 27);
  p {
    margin-bottom: 32/7.5vw;
    color: red;
  }
  h3 {
    margin-bottom: 24/7.5vw;
  }
  .text-list {
    li {
      padding: 32/7.5vw 24/7.5vw;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      img {
        width: 32/7.5vw;
        height: 32/7.5vw;
        margin-right: 12/7.5vw;
      }
    }
  }
}
.satisfied-content2 {
  position: relative;
  overflow: hidden;
  height: 340/7.5vw;
  .satisfied-imgs {
    padding: 0 36/7.5vw 36/7.5vw 36/7.5vw;
    position: absolute;
    display: flex;
    img {
      width: 240/7.5vw;
      height: 180/7.5vw;
      + img {
        margin-left: 12/7.5vw;
      }
    }
  }
}
</style>