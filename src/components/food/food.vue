<template>
	<transition name='flag'>
    <div class="food" v-show='showFlag' ref='food'>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" alt="">
				<div class="back" @click='hide'>
					<i class='icon-arrow_lift'></i>
				</div>
				
			</div>
			<div class="content">
				<h1 class="title"> {{food.name}} </h1>
				<div class="detail">
					<span class="sell-count"> 月售{{food.sellCount}} </span>
					<span class="rating"> 好评率{{food.rating}}% </span>

				</div>
				<div class="price">
					<span class="now">¥ {{food.price}} </span>
					<span class="old" v-show='food.oldPrice'> ¥{{food.oldPrice}} </span>
				</div>
				<div class="cartcontrol-wrapper">
				<cartcontrol :food='food'></cartcontrol>
			</div>
			<transition name='buy'>
				<div class="buy" v-show='!food.count || food.count===0' @click='addFirst($event)'> 加入购物车 </div>
			</transition>
			</div>
			
			<split v-show='food.info'></split>
			<div class="info" v-show='food.info'>
				<h1 class="title">商品信息</h1>
				<p class="text"> {{food.info}} </p>
			</div>
			<split ></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></ratingselect>
				<div class="rating-wrapper"  v-if='food.ratings' >
					<ul v-if='food.ratings' v-show='food.ratings && food.ratings.length'>
						<li v-show='needShow(rating.rateType,rating.text)' v-for='rating in food.ratings' class="rating-item">
							<div class="user">
								<span class="name"> {{rating.username}} </span>
								<img :src="rating.avatar" alt="" class="avatar" width="12" >
							</div>
							<div class="time"> {{rating.rateTime | formatDate}} </div>
							<p class="text">
								<span :class='{"icon-thumb_up":rating.rateType===0,"icon-thumb_down" : rating.rateType===1}'></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<!-- <h1> {{foodRatings.length}} </h1> -->
					<!-- <h1 > {{food.ratings}} </h1> -->
					<div class="no-rating" v-show='!food.ratings || !food.ratings.length'>
						暂无内容
					</div>
				</div>
			</div>
		</div>
    </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import Vue from'vue';
import {formatDate} from '../../common/js/date.js';
import cartcontrol from '../cartconcontrol/cartcontrol.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';

const POSITIVE = 0;
const NEGATIVE = 0;
const ALL = 2;
    export default {
    	
    	props:{
    		food : {
    			type : Object
    		}
    	},
    	filters : {
    		formatDate(time) {
    			let date = new Date(time);
    			return formatDate(date,'yyyy-MM-dd hh:mm');
    		}
    	},

    	data() {
    		return{
    			showFlag : false,
    			selectType : this.$store.state.selectType,
    			onlyContent : this.$store.state.onlyContent,
    			desc : {
    				all : '全部',
    				positive : '推荐',
    				negative : '吐槽'
    			},
    			
    		}
    	},
    	methods : {
    		show() {
    			console.log(11111)
    			this.$store.dispatch('selectType',ALL);
    			this.$store.dispatch('onlyContent',false);
    			// console.log(this.$store.state.onlyContent)
    			// this.selectType = ALL;
    			// this.onlyContent = true;
    			this.showFlag = true;
    			this.$nextTick(() => {
    				if(!this.scroll) {
    					this.scroll = new BScroll(this.$refs.food,{
    						click : true
    					});

    				} else {
    					this.scroll.refresh();
    				}
    			})
    			// console.log(typeof this.food.ratings.length)
    		},
    		hide() {
    			this.showFlag = false
    		},
    		addFirst($event) {
    			if(!event._constructed) {
    				return;
    			}
    			this.$emit('changeel',event.target);
    			Vue.set(this.food,'count',1);

    		},
    		needShow(type,text) {
    			console.log(this.$store.state.selectType)
    			if(this.$store.state.onlyContent && !text) {
    				return false;
    			}
    			if(this.$store.state.selectType === ALL) {
    				return true;
    			} else {
    				return type === this.$store.state.selectType;
    			}
    		}
    	},
    	
    	components : {
    		cartcontrol,
    		split,
    		ratingselect
    	}
    	  
      }
</script>

<style >
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
	}
	.flag-enter-active,
	.flag-leave-active{
		transition: all 0.2s linear;
		transform: translate3d(0,0,0);
	}
	.flag-enter,
	.flag-leave-to{
		transform: translate3d(100%,0,0);
	}
	.image-header{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.image-header img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		/*height: 100%;*/
	}
	.image-header .back{
		position: absolute;
		top: 10px;
		left: 0;

	}
	.image-header .back .icon-arrow_lift{
		display: block;
		padding: 10px;
		font-size: 20px;
		color: #fff;
	}
	.content{
		padding: 18px;
		position: relative;

	}
	.content .title{
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.content .detail{
		margin-bottom: 18px;
		line-height: 10px;
		font-size: 0
	}
	.content .detail .sell-count,
	.content .detail .rating{
		font-size: 14px;
		color: rgb(147,153,159);
	}
	.content .detail .sell-count{
		margin-right: 12px;
	}
	.content .price {
		font-weight: 700;
		line-height: 24px;
	}
	.content .price .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.content .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.cartcontrol-wrapper{
		position: absolute;
		right: 12px;
		bottom: 12px;
	}
    .buy{
		position: absolute;
		right: 18px;
		bottom: 18px;
		z-index: 10;
		height: 24px;
		line-height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		font-size: 10px;
		border-radius: 12px;
		color: #fff;
		background: rgb(0,160,220);
	}
	.buy-enter-active,
	.buy-leave-active{
		transition: all .2s;
		opacity: 1;
	}
	.buy-enter,
	.buy-leave-to{
		opacity: 0;
	}
	.food-content .info{
		padding: 18px;

	}
	.food-content .info .title{
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.food-content .info .text{
		color: rgb(77,85,93);
		line-height: 24px;
		font-size: 12px;
		padding: 0 8px;

	}
	.food-content .rating{
		padding: 18px;

	}
	.food-content .rating .title{
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.food-content .rating .rating-wrapper{
		padding: 0 18px;
	}
	.food-content .rating .rating-wrapper .rating-item{
		position: relative;
		padding: 16px 0;
		border-bottom:1px solid rgba(7,17,27,.1);
	}
	.food-content .rating .rating-wrapper .rating-item .user{
		position: absolute;
		right: 0;
		top: 16px;
		line-height: 12px;
		font-size: 0;
	}
	.food-content .rating .rating-wrapper .rating-item .user .name{
		display: inline-block;
		vertical-align: top;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-right: 6px;
	}
	.food-content .rating .rating-wrapper .rating-item .user .avatar{
		border-radius: 50%;
	}
	.food-content .rating .rating-wrapper .rating-item .time{
		margin-bottom: 6px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159); 
	}
	.food-content .rating .rating-wrapper .rating-item .text{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.icon-thumb_up,
	.icon-thumb_down
	{
		margin-right: 4px;
		line-height: 16px;
		font-size: 12px;
	}
	.icon-thumb_down{
		color: rgb(147,153,159);
	}
	.icon-thumb_up{
		color: rgb(0,160,220);
	}
	.no-rating {
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147,153,159);
	}
</style>
