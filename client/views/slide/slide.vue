<template>
  <!--https://github.com/surmon-china/vue-awesome-swiper-->
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img :src="slide" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: 'carrousel',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperSlides: ['https://hyzjdev.oss-cn-hangzhou.aliyuncs.com/images/a13DLld6rng.png', 'https://hyzjdev.oss-cn-hangzhou.aliyuncs.com/images/a14ADMlSPaO.png', 'https://hyzjdev.oss-cn-hangzhou.aliyuncs.com/images/a14lzNboLLZ.png', 'https://hyzjdev.oss-cn-hangzhou.aliyuncs.com/images/a15SGkNFnjp.png', 'https://hyzjdev.oss-cn-hangzhou.aliyuncs.com/images/a15tdfWG1MV.png']
    }
  }
  // mounted () {
  //   setInterval(() => {
  //     console.log('simulate async data')
  //     if (this.swiperSlides.length < 10) {
  //       this.swiperSlides.push(this.swiperSlides.length + 1)
  //     }
  //   }, 3000)
  // }
}
</script>

<style scoped>

</style>
