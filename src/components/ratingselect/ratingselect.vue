<template>
    <div class="ratingselects">
        <div class="rating-type">
            <span @click='select(2,$event)' class="block positive" :class='{"active" : selecttype === 2}'> {{desc.all}} <span class="count"> {{ratings.length}} </span> </span>
            <span @click='select(0,$event)' class="block positive" :class='{"active" : selecttype === 0}'> {{desc.positive}} <span class="count"> {{positives.length}} </span> </span>
            <span @click='select(1,$event)' class="block negative" :class='{"active" : selecttype === 1}'> {{desc.negative}} <span class="count"> {{negatives.length}} </span> </span>
        </div>
        <div @click='toggleContent' class="switch" :class="{'on':onlycontent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 0;
    export default {
       data() {
          return {
            selecttype : this.$store.state.selectType,
            onlycontent : this.$store.state.onlyContent
          }
       },
       
        props:{
          ratings : {
             type : Array,
              default() {
                  return[];
              }
          },
          selectType : {
            type : Number,
            default : ALL
          },
          desc : {
            type : Object,
            default() {
              return {
                  all : '全部',
                  positive : '满意',
                  negative : '不满意'
              }

            }
          }
      

        },
        computed : {
          positives() {
            return this.ratings.filter((rating)=>{
              // console.log(rating.rateType)
              return rating.rateType === POSITIVE;
            })
          },
          negatives() {
            return this.ratings.filter((rating)=>{
              return rating.rateType === NEGATIVE;
            })
          },
          getselec() {
            return this.$store.state.selectType
          },
          getonly() {
            return this.$store.state.onlyContent
          }
        },
        methods : {
          select(type,event) {
            // console.log(this.onlyContent);
            // console.log(this.$store.state.onlyContent)
            if(!event._constructed) {
              return;
            }
            // this.selecttype = type;
            this.$store.dispatch('selectType',type);
            // console.log(this.$store.state.selectType)
            // this.$emit('ratingtype.select',type);
          },
          toggleContent(event) {
            if(!event._constructed) {
              return;
            }
            let onlyContent = !this.$store.state.onlyContent;
            // this.onlyContent = onlyContent
            // this.onlyContent = !this.onlyContent;
            // console.log(onlyContent)
            this.$store.dispatch('onlyContent',onlyContent)
            // console.log(this.$store.state.onlyContent)
            // console.log(this.onlyContent)
            // this.$emit('content.toggleContent',this.onlyContent)
          }
        },
        watch : {
          getonly(val){
            console.log(222222222)
            this.onlycontent = this.$store.state.onlyContent
          },
          getselec(val){
            console.log(11111111)
            this.selecttype = this.$store.state.selectType
          }
        }
      

    }
</script>

<style >
  .ratingselect{

  }
  .ratingselects .rating-type{
    padding:18px 0;
    margin: 0  18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    font-size: 0;
  }
  .ratingselects .rating-type .block{
    display: inline-block;
    padding: 8px 10px;
    margin-right: 8px;
    border-radius: 1px;
    color:rgb(77,85,93);
    font-size: 12px;
  }
  .ratingselects .rating-type .block.active{
    color: #fff;
  }
  .ratingselects .rating-type .block .count{
    font-size: 8px;
    margin-left: 2px;
    line-height: 16px;
  }
  .ratingselects .rating-type .positive{
    background: rgba(0,160,220,.2); 

  }
  .ratingselects .rating-type .positive.active{
     background: rgb(0,160,220); 
  }
  .ratingselects .rating-type .negative{
    background: rgba(77,85,93,.2);
  }
  .ratingselects .rating-type .negative.active{
    background: rgb(77,85,93);
  }
  .ratingselects .switch{
    padding:12px 18px;
    margin:0 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    color: rgb(147,153,159);
    font-size: 0;
  }
  .ratingselects .switch .icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .ratingselects .switch.on .icon-check_circle{
    color: #00c850;
  }
  .ratingselects .switch .text{
    font-size: 12px;
  }
</style>
