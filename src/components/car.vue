<template>
  <div class="car">
    <div class="icon-big">
      <div
        class="icon-small"
        :style="{
          background: count > 0 ? '#00a0dc' : 'rgba(255, 255, 255, 0.3)',
        }"
      >
        <img src="SVG/shopping_cart.svg" @click="isshow2 = !isshow2" />
        <span v-show="count > 0">{{ count }}</span>
      </div>
    </div>
    <span>￥{{ allprice }}</span>
    <span class="moeny">另需配送费￥4元</span>
    <span>￥20起送</span>
    <transition name="car">
      <div v-show="isshow2" class="car-list position">
        <div class="car-content">
          <div class="tltle">
            <span @click="isshow2 = !isshow2">购物车</span>
            <span @click="del">清空</span>
          </div>
          <ul>
            <li v-for="(item, index) of arr" :key="index">
              <font>{{ item.name }}</font>
              <div class="choose">
                <img
                  src="SVG/remove_circle_outline.svg"
                  @click="add2(index, -1, item)"
                />
                <span class="count">{{ item.num }}</span>
                <img src="SVG/add.PNG" @click="add2(index, 1, item)" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import bus from "../bus";

export default {
  // props: ["price"],
  data() {
    return {
      arr: [],
      isshow2: false,
    };
  },
  methods: {
    add2(index, n, item) {
      if (n == 1) {
        item.num++;
      } else {
        item.num--;
        if (item.num <= 0) {
          item.num = 0;
          this.$delete(this.arr, index);
        }
      }
    },
    del() {
      setTimeout(() => {
        this.arr = [];
      }, 100);
      this.arr.forEach((item) => {
        item.num = 0;
      });
    },
  },
  computed: {
    count() {
      var n = 0;
      this.arr.forEach((item) => {
        n += parseInt(item.num);
      });
      return n;
    },
    allprice() {
      let moeny = 0;
      this.arr.forEach((p) => {
        moeny += p.price * parseInt(p.num);
      });
      return moeny;
    },
  },
  mounted() {
    // this.arr = this.price;
    bus.$on("sendcar", (index, n, item) => {
      if (n == 1) {
        if (this.arr.includes(item)) {
          item.num++;
        } else {
          item.num++;
          this.arr.push(item);
        }
      } else {
        item.num--;
        if (item.num <= 0) {
          item.num = 0;
          this.$delete(this.arr, index);
        }
      }
    });
    bus.$on("sendcar2", (data) => {
      if (this.arr.includes(data)) {
        data.num++;
      } else {
        data.num++;
        this.arr.push(data);
      }
    });
  },
};
</script>

<style lang="less">
.car-enter-active {
  animation: fadeInUpBig 0.5s;
}

.car-leave-active {
  animation: fadeOutDownBig 0.5s;
}

.car {
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 1;
  bottom: 0;
  width: 100%;
  background: #141d27;
  font-weight: 700;
  line-height: 95/7.5vw;
  color: rgba(255, 255, 255, 0.4);
  .icon-big {
    position: relative;
    top: -16/7.5vw;
    width: 110/7.5vw;
    height: 110/7.5vw;
    margin: 0 36/7.5vw 0 36/7.5vw;
    border-radius: 50%;
    background: #141d27;
  }
  .icon-small {
    width: 88/7.5vw;
    height: 88/7.5vw;
    border-radius: 50%;
    text-align: center;
    margin: 50% auto;
    transform: translateY(-50%);
    img {
      width: 62/7.5vw;
      height: 62/7.5vw;
    }
    > span {
      position: absolute;
      top: -15/7.5vw;
      right: -5/7.5vw;
      line-height: 45/7.5vw;
      padding: 0 10/7.5vw;
      color: white;
      border-radius: 15/7.5vw;
      background: red;
    }
  }
  .moeny {
    margin-left: 48/7.5vw;
    font-weight: normal;
  }
  > span {
    font-size: 28/7.5vw;
    &:last-of-type {
      margin-left: auto;
      width: 210/7.5vw;
      text-align: center;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.car-list {
  font-size: 28/7.5vw;
  color: rgb(7, 17, 27);
  ul {
    padding: 0 36/7.5vw;
    font-size: 25/7.5vw;
    font-weight: 400;
    li {
      .flex();
      + li {
        border-top: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }
}
.position {
  .car-content {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: white;
    .choose {
      img {
        width: 40/7.5vw;
        height: 40/7.5vw;
      }
      .count {
        margin: 0 24/7.5vw;
      }
    }
  }
}
.tltle {
  .flex();
  background: #f3f5f7;
  padding: 0 36/7.5vw;
  span {
    &:nth-child(2) {
      color: rgb(0, 160, 220);
    }
  }
}
</style>