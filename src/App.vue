<template>
  <div id="app">
  

    <eader :seller="seller"></eader>
    <!-- <hell></hell> -->
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
    <router-view :seller='seller' ></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {urlParse} from './common/js/uiil.js'
  import header from './components/Header/Header.vue'
  import hell from "./components/Hello.vue";
  const ERR_OK = 0;
export default {
  name: 'app',
  components : {
      eader : header,
      hell : hell

  },
  data() {
      return {
         seller:{
            id : (() => {
              let queryParam = urlParse();
              console.log(queryParam.id)
              return queryParam.id
            })()
         }
      }
  },
  created() {
    this.$http.get('/api/seller?id='+ this.seller.id).then((jsondata) => {
        if( jsondata.body.errno == ERR_OK ) {
            // console.log(22)
            // this.seller = jsondata.body.data;
            this.seller = Object.assign({},this.seller,jsondata.body.data)
            // console.log(this.seller.avatar)
            this.$nextTick(()=>{
              // console.log(this.seller)
            // this.$refs.seller._initScroll()
          })
        }
    })
  }
  
}
</script>
<style>
  /*@import url(./common/css/icon.css);*/
</style>
<style>
@import url(./common/icon.css);
@import url(./common/css/base.css);
  #app .tab{
    display: flex;
    width:100%;
    height:40px;
    line-height:40px;
    line-height: 40px;
  }
  #app .tab .tab-item{
    flex:1;
    text-align: center;
    position: relative;
  }

#app .tab .tab-item a{
  display: block;
  text-decoration: none;

  font-size : 14px;
  color : rgb(77,85,93);
  /*border-bottom: 1px solid #7e8c8d;*/
}
#app .tab .tab-item a.active{
  color: rgb(240,20,20);
}
#app .tab .tab-item:after{

  border-bottom: 1px solid #bfbfbf;

   content: ' ';

   display: block;

   width: 100%;

   position: absolute;

   left: 0;

   bottom: 0;

   -webkit-transform-origin: left bottom;

 }

@media only screen and (-webkit-min-device-pixel-ratio:2.0),

only screen and (min--moz-device-pixel-ratio: 2.0),

only screen and (-o-min-device-pixel-ratio: 200/100),

only screen and (min-device-pixel-ratio: 2.0) {

  #app .tab .tab-item:after{


    -webkit-transform: scaleY(0.5);

    transform: scaleY(0.5);

  }

}

@media only screen and (-webkit-min-device-pixel-ratio:2.5),

only screen and (min--moz-device-pixel-ratio: 2.5),

only screen and (-o-min-device-pixel-ratio: 250/100),

only screen and (min-device-pixel-ratio: 2.5) {

  #app .tab .tab-item:after {

    -webkit-transform:scaleY(0.33333334);

    transform: scaleY(0.33333334);

  }

}
</style>
