<template>
    <div class="header">
        <h1>11111111</h1>
        <!-- <div class="content">
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
              <span class="icon"></span>
              <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div> -->
    </div>
</template>

<script>
    export default {

       // props : {
       //     seller : {
       //         type : Object
       //     }
       // }
    };
</script>

<style>
  .header{
    color: #fff;
    background: #000;
  }
  .header .content{
    padding: 24px 12px 18px 24px;
  }
  .header .content .avater{
    display: inline-block;
  }
  .header .content .bulletin{
    display: inline-block;
  }
</style>
