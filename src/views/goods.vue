<template>
  <div class="goods">
    <ul class="goods-sidbar">
      <li
        v-for="(item, index) of goods"
        :key="index"
        @click="changecolor(index)"
        :class="{ current: index == i ? true : false }"
        ref="color"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="goods-content" ref="content" @scroll="siderscroll">
      <li v-for="(item, index) of goods" :key="index">
        <p>{{ item.name }}</p>
        <div v-for="(i, n) of item.foods" :key="n">
          <img :src="i.icon" @click="showfoods(item.foods[n])" />
          <div>
            <p>{{ i.name }}</p>
            <p>{{ i.description }}</p>
            <span>月售{{ i.sellCount }}份</span>
            <span class="good">好评率{{ i.rating }}%</span>
            <div class="content-footer">
              <span>￥{{ i.price }}</span>
              <span v-show="i.oldPrice ? true : false">￥{{ i.oldPrice }}</span>
              <div class="choose">
                <img
                  src="SVG/remove_circle_outline.svg"
                  @click="add(n, -1, i)"
                  v-show="i.num > 0"
                />
                <span class="count" v-show="i.num > 0">{{ i.num }}</span>
                <img src="SVG/add.PNG" @click="add(n, 1, i)" />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- 详情 -->
    <transition>
      <detali
        :foods="foods"
        v-show="isshow"
        @hiddedetali="hidde"
        @add="addcar"
      ></detali>
    </transition>

    <!-- 购物车
    <car :price="arr"></car> -->
  </div>
</template>
<script>
import detali from "./detali";
// import car from "../components/car";
import bus from "../bus";

export default {
  props: ["goods"],
  data() {
    return {
      i: 0,
      isshow: false,
      foods: {},
    };
  },
  components: {
    detali,
    // car,
  },
  methods: {
    changecolor(index) {
      this.i = index;
      var stop = this.$refs.content.children[index].offsetTop;
      var top = this.$refs.content.scrollTop;
      var timer = setInterval(() => {
        if (this.$refs.content.scrollTop >= stop) {
          top -= 10;
          if (top <= stop) {
            clearInterval(timer);
          }
        } else {
          top += 10;
          if (top >= stop) {
            clearInterval(timer);
          }
        }
        this.$refs.content.scrollTop = top;
      }, 0.001);
    },

    showfoods(info) {
      this.foods = info;
      this.isshow = !this.isshow;
    },

    add(index, n, item) {
      // if (n == 1) {
      //   if (this.arr.includes(item)) {
      //     item.num++;
      //   } else {
      //     item.num++;
      //     this.arr.push(item);
      //   }
      // } else {
      //   item.num--;
      //   if (item.num <= 0) {
      //     item.num = 0;
      //     this.$delete(this.arr, index);
      //   }
      // }
      bus.$emit("sendcar", index, n, item);
    },

    hidde(val) {
      this.isshow = val;
    },

    // 滚动监听
    siderscroll() {
      [...this.$refs.content.children].forEach((item, index) => {
        if (item.offsetTop <= this.$refs.content.scrollTop) {
          this.i = index;
        }
      });
    },

    // 在详情页面加入购物车
    addcar(obj) {
      // if (this.arr.includes(obj)) {
      //   obj.num++;
      // } else {
      //   obj.num++;
      //   this.arr.push(obj);
      // }
      bus.$emit("sendcar2", obj);
    },
  },
};
</script>
<style lang='less'>
.v-enter-active {
  animation: bounceInRight 1s;
}
.v-leave-active {
  animation: slideOutRight 0.5s;
}
.goods {
  display: flex;
  height: 985/7.5vw;
  .goods-sidbar {
    overflow-y: scroll;
    li {
      position: relative;
      background: #f3f5f7;
      font-size: 24/7.5vw;
      font-weight: 200;
      padding: 45/7.5vw 0 45/7.5vw 24/7.5vw;
      width: 160/7.5vw;
      &::after {
        position: absolute;
        bottom: 0;
        display: block;
        content: "";
        width: 112/7.5vw;
        height: 1/7.5vw;
        background: rgba(7, 17, 27, 0.1);
      }
    }
    .current {
      color: rgb(240, 20, 20);
      font-weight: 600;
    }
  }
}
.goods-content {
  position: relative;
  flex: 1;
  overflow-y: scroll;
  > li {
    > p {
      font-size: 24/7.5vw;
      line-height: 52/7.5vw;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
      padding-left: 28/7.5vw;
      border-left: 2px solid #d9ddde;
    }
    > div {
      display: flex;
      padding: 36/7.5vw;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      img {
        width: 115/7.5vw;
        height: 115/7.5vw;
        margin-right: 20/7.5vw;
      }
      div {
        flex: 1;
        > span {
          font-size: 20/7.5vw;
          color: rgb(147, 153, 159);
        }
        > p {
          &:nth-of-type(1) {
            font-size: 28/7.5vw;
            color: rgb(7, 17, 27);
          }
          &:nth-of-type(2) {
            font-size: 20/7.5vw;
            color: rgb(147, 153, 159);
            margin: 16/7.5vw 0 16/7.5vw 0;
          }
        }
      }
    }
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
.content-footer {
  > span {
    &:nth-child(1) {
      .price();
    }
    &:nth-of-type(2) {
      .oldprice();
    }
  }
  .choose {
    float: right;
    img {
      width: 40/7.5vw;
      height: 40/7.5vw;
      margin-right: 0;
    }
    .count {
      margin: 0 24/7.5vw;
    }
  }
}
.good {
  margin-left: 24/7.5vw;
}

// 购物车

// .car-enter-active {
//   animation: fadeInUpBig 0.5s;
// }

// .car-leave-active {
//   animation: fadeOutDownBig 0.5s;
// }

// .car {
//   display: flex;
//   align-items: center;
//   position: fixed;
//   z-index: 1;
//   bottom: 0;
//   width: 100%;
//   background: #141d27;
//   font-weight: 700;
//   line-height: 95/7.5vw;
//   color: rgba(255, 255, 255, 0.4);
//   .icon-big {
//     position: relative;
//     top: -16/7.5vw;
//     width: 110/7.5vw;
//     height: 110/7.5vw;
//     margin: 0 36/7.5vw 0 36/7.5vw;
//     border-radius: 50%;
//     background: #141d27;
//   }
//   .icon-small {
//     width: 88/7.5vw;
//     height: 88/7.5vw;
//     border-radius: 50%;
//     text-align: center;
//     margin: 50% auto;
//     transform: translateY(-50%);
//     img {
//       width: 62/7.5vw;
//       height: 62/7.5vw;
//     }
//     > span {
//       position: absolute;
//       top: -15/7.5vw;
//       right: -5/7.5vw;
//       line-height: 45/7.5vw;
//       padding: 0 10/7.5vw;
//       color: white;
//       border-radius: 15/7.5vw;
//       background: red;
//     }
//   }
//   .moeny {
//     margin-left: 48/7.5vw;
//     font-weight: normal;
//   }
//   > span {
//     font-size: 28/7.5vw;
//     &:last-of-type {
//       margin-left: auto;
//       width: 210/7.5vw;
//       text-align: center;
//       background: rgba(255, 255, 255, 0.2);
//     }
//   }
// }
// .flex {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
// .car-list {
//   font-size: 28/7.5vw;
//   color: rgb(7, 17, 27);
//   ul {
//     padding: 0 36/7.5vw;
//     font-size: 25/7.5vw;
//     font-weight: 400;
//     li {
//       .flex();
//       + li {
//         border-top: 1px solid rgba(7, 17, 27, 0.1);
//       }
//     }
//   }
// }
// .position {
//   .car-content {
//     width: 100%;
//     position: absolute;
//     bottom: 0;
//     background: white;
//     .choose {
//       img {
//         width: 40/7.5vw;
//         height: 40/7.5vw;
//       }
//       .count {
//         margin: 0 24/7.5vw;
//       }
//     }
//   }
// }
// .tltle {
//   .flex();
//   background: #f3f5f7;
//   padding: 0 36/7.5vw;
//   span {
//     &:nth-child(2) {
//       color: rgb(0, 160, 220);
//     }
//   }
// }
</style>