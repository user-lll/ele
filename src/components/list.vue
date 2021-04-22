<template>
  <div>
    <slot name="title"></slot>
    <ul class="choose-item">
      <li @click="all">
        全部<span><slot name="b1">24</slot></span>
      </li>
      <li @click="yes">
        <slot name="b2">满意 <span>22</span></slot>
      </li>
      <li @click="no">
        <slot name="b3">不满意<span>2</span> </slot>
      </li>
    </ul>
    <div
      class="choose-item"
      @click="hascontent"
      :style="{ color: has ? ' rgb(0, 160, 220)' : '' }"
    >
      <img :src="has ? svg2 : svg1" />
      只看有内容的评价
    </div>
    <ul class="all">
      <li v-for="(item, index) of datas" :key="index">
        <img :src="item.avatar" />
        <div class="all-text">
          <div class="user">
            <span>{{ item.username }}</span
            ><span>{{ new Date().toLocaleString() }}</span>
          </div>
          <slot name="star" :score="item.score"></slot>
          <p>{{ item.text }}</p>
          <div class="all-list">
            <img :src="item.rateType == 1 ? down : up" />
            <span v-for="(i, n) of item.recommend" :key="n">{{ i }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      datas: [],
      istext: true,
      svg1: require("../assets/img/check_circle.svg"),
      svg2: require("../assets/img/check_circle2.svg"),
      has: false,
      down: require("../assets/img/thumb_down.svg"),
      up: require("../assets/img/thumb_up.svg"),
      img1: require("../assets/img/star36_on@3x.png"),
      img2: require("../assets/img/star36_off@3x.png"),
    };
  },
  methods: {
    all() {
      this.datas = this.data;
    },
    no() {
      let arr = this.data.filter((item) => item.rateType == 1);
      this.datas = arr;
    },
    yes() {
      let arr = this.data.filter((item) => item.rateType == 0);
      this.datas = arr;
    },
    hascontent() {
      if (this.istext) {
        let arr = this.data.filter((item) => item.text != "");
        this.datas = arr;
        this.istext = !this.istext;
      } else {
        this.datas = this.data;
        this.istext = !this.istext;
      }
      this.has = !this.has;
    },
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.datas = this.data;
      },
    },
  },
  created() {
    this.datas = this.data;
  },
};
</script>


<style lang='less'>
.choose-item {
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  padding: 36/7.5vw;
  font-size: 30/7.5vw;
  color: gray;

  li {
    padding: 20/7.5vw;
    margin-right: 15/7.5vw;
    &:nth-of-type(1) {
      color: white;
      background: rgb(0, 160, 220);
    }
    &:nth-of-type(2) {
      background: rgb(204, 236, 248);
    }
    &:nth-of-type(3) {
      background: rgb(233, 235, 236);
    }
  }
  span {
    font-size: 20/7.5vw;
  }
  img {
    width: 44/7.5vw;
    height: 44/7.5vw;
    margin-right: 15/7.5vw;
  }
}
.all {
  padding: 0 36/7.5vw;
  li {
    span {
      color: rgb(147, 153, 159);
      font-size: 20/7.5vw;
      font-weight: 200;
    }
    display: flex;
    padding: 36/7.5vw 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    > img {
      width: 56/7.5vw;
      height: 56/7.5vw;
      border-radius: 50%;
      margin-right: 24/7.5vw;
    }
  }
}
.all-text {
  flex: 1;
  .stars {
    > img {
      width: 25/7.5vw;
      height: 25/7.5vw;
      margin-right: 10/7.5vw;
    }
  }
  p {
    font-size: 24/7.5vw;
    margin: 12/7.5vw 0 16/7.5vw 0;
  }
}
.user {
  span {
    &:nth-child(2) {
      float: right;
    }
  }
}
.all-list {
  img {
    width: 25/7.5vw;
    height: 25/7.5vw;
  }
  span {
    display: inline-block;
    color: rgb(147, 153, 159);
    border: 1px solid rgba(7, 17, 27, 0.1);
    width: 125/7.5vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    overflow: hidden;
    line-height: 32/7.5vw;
    font-size: 18/7.5vw;
    margin-left: 16/7.5vw;
  }
}
</style>