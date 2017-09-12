<template>
    <div class="header">

        <div class="content">
          <div class="avater">
          <h1></h1>
            <img :src="seller.avatar" alt="" width="64" height="64">

          </div>

        <div class="bulletin">
          <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="supports">
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
              <!-- <h1>{{classMap[seller.supports[0].type]}}</h1> -->
              <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if='seller.supports' class="support-count" @click='showDetail'>
           <span class="count"> {{seller.supports.length}} 个 </span>
           <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletion-warpper" @click="showDetail">
          <span class="bulletion-title"></span><span class="bulletion-text"> {{seller.bulletin}} </span>
          <i class="icon-keyboard_arrow_right"></i>

      </div>
      <div class="background">
        <img :src="seller.avatar" alt="" width="100%" height="100%">
      </div>

      <div v-show='detailShow' class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
                <h1 class="name"> {{seller.name}} </h1>
                <div class="star-wrapper">
                  <star :size="48" :score="seller.score"></star>
                </div>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item , index ) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text"> {{seller.supports[index].description}} </span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content"> {{seller.bulletin}} </p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="hideDetail">
              <i class="icon-close"></i>
          </div>
      </div>
    </div>
</template>

<script>
  import star from '../star/star.vue'
    export default {

       props : {
           seller : {
               type : Object
           }
       },
       data() {
         return {
            detailShow : false
         }
       },
       methods : {
        showDetail() {
          this.detailShow = true
        },
         hideDetail() {
            this.detailShow = false
         }
       },
      created() {
          this.classMap = ['decrease','discount','guarantee','invoice','special']
       },
      components : {
           star : star
      }

    };
</script>

<style>
 /*@import url('../../common/css/icon.css');*/




  .header{
    color: #fff;
    /*background: #999;*/
    overflow: hidden;
    position: relative;
    background: rgba(7,17,27,.5);
  }
  .header .content{
    position: relative;
    font-size: 0;
    padding: 24px 12px 18px 24px;

  }
  .header .content .avater{
    font-size: 14px;
    display: inline-block;
  }
  .header .content .avater img{
    border-radius: 2px;
  }
  .header .content .bulletin{
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
  }
  .header .content .bulletin .title{
    margin: 2px 0 8px 0;
  }
  .header .content .bulletin .title .brand{
    width: 30px;
    height: 18px;
    display: inline-block;
    /*bg-image('brand');*/
    background: url(brand@2x.png);
    background-size: 30px 18px;
    vertical-align: middle;
  }
  .header .content .bulletin .title .name{
    font-size: 16px;
    line-height: 18px;
    margin-left: 6px;
    font-weight: bold;

  }
  .header .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;

  }
  .header .supports .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
   
  .header .supports .text{
    font-size: 12px;
    line-height: 10px;
  }
  .header .support-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    color:#fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0,0,0,.2);
  }
  .header .support-count .count{
    font-size: 10px;
    vertical-align: top;
  }
  .header .support-count .icon-keyboard_arrow_right{
    font-family: 'sell-icon' !important;
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;

  }
  .header .bulletion-warpper{
    position: relative;
    height : 28px;
    line-height: 28px;
    padding:  0 22px 0 12px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7,17,27,.2)
  }
 .header .bulletion-warpper .bulletion-title{
   display: inline-block;
   width:22px;
   height:12px;
   margin-top: 8px;
   background-image: url(bulletin@2x.png);
   -webkit-background-size:;
   background-size:22px 12px;
   background-repeat:no-repeat;
   vertical-align: top;
   /*line-height: 28px;*/
 }
 .header .bulletion-warpper .bulletion-text{
   vertical-align: top;
   font-size: 10px;
   margin: 0 4px ;
 }
 .header .bulletion-warpper .icon-keyboard_arrow_right{
   position: absolute;
   font-style: 10px;
   right:12px;
   top:8px;
 }

 .header .background{
   position: absolute;
   left:0;
   top:0;
   width: 100%;
   height: 100%;
   z-index:-1;

 }
 .header .background img{
   filter:blur(10px);
 }


 .header .detail{
    position: fixed;
    top:0;
   left:0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,.8);
 }
 .header .detail .detail-wrapper{
    min-height: 100%;
    width: 100%;
 }
 .header .detail .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;

 }
 .header .detail .detail-wrapper .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
 }
 .header .detail .detail-close{
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0;
  clear: both;
  font-size: 32px;
 }
 .header .star-wrapper{
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
 }


 .header .detail .detail-wrapper .detail-main .title{
   display: flex;
   width:80%;
   margin:30px auto 24px auto;
 }
 .header .detail .detail-wrapper .detail-main .title .line{
   flex:1;
   position: relative;
   top:-6px;
   border-bottom: 1px solid rgba(255,255,255,.2);
 }
 .header .detail .detail-wrapper .detail-main .title .text{
   padding:0 12px ;
   font-size:14px;
 }
 .header .detail .detail-wrapper .detail-main .supports{
   width: 80%;
   margin:0 auto;

 }
 .header .detail .detail-wrapper .detail-main .supports .support-item{
   padding:0 12px;
   margin-bottom:12px;
   font-size:0;
 }
 .header .detail .detail-wrapper .detail-main .supports .support-item:{
   margin-bottom:0;
 }
 .header .detail .detail-wrapper .detail-main .supports .support-item .icon{
   display: inline-block;
   width:16px;
   height:16px;
   vertical-align: top;
   margin-right:6px;
   backgrund-size:16px 16px ;
   background-repeat: no-repeat;
 }
 .header .supports  .support-item .icon.decrease{
   background-image: url(decrease_2@2x.png);
 }
 .header .supports .support-item .icon.discount{
   background-image: url(discount_2@2x.png);
 }
 .header .supports .support-item .icon.guarantee{
   background-image: url(guarantee_2@2x.png);

 }
 .header .supports .support-item .icon.invoice{
   background-image: url(invoice_2@2x.png);
 }
 .header .supports .support-item .icon.special{
   background-image: url(special_2@2x.png);
 }
 .header .detail .detail-wrapper .detail-main .bulletin{
   width:80%;
   margin:0 auto;
 }
 .header .detail .detail-wrapper .detail-main .bulletin .content{
   padding:0 12px;
   line-height:24px;
   font-size:12px;
 }
</style>
