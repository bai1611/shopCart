<template>
    <div class="goods">
    	<div class="menu-wrapper" ref='menuWrapper'>
    		<ul>
    			<li v-for='(item,index) in goods' class="menu-item" :class="{'current':currentIndex===index}" @click='selectMenu(index,$event)'>
    				<span class='text'>
						<span v-show='item.type>0' class="icon" :class='classMap[item.type]'>
							
						</span>{{item.name}} 		 
    				 </span>
    			</li>
    		</ul>
    	</div>

    	<div class="foods-wrapper" ref="foodsWrapper">
    		<ul>
    			<li v-for='item in goods' class="food-list food-list-hook" >
    				<h1 class="title"> {{item.name}} </h1>
    				<ul>
    					<li v-for='food in item.foods' class="food-item" @click='selectFood(food,$event)'>
    						<div class="icon">
    							<img :src="food.icon" alt="" width="57" height="57">
    						</div>
    						<div class="conent">
    							<h2 class="name"> {{food.name}} </h2>
    							<p class="desc"> {{food.description}} </p>
    							<div class="extra">
    								<span class="count">月售 {{food.sellCount}}份 </span><span>好评率 {{food.rating}}% </span>
    							</div>
    							<div class="price">
    								<span class="now"> ¥{{food.price}} </span><span v-show='food.oldPrice' class="old"> ¥{{food.oldPrice}} </span>
    							</div>
    							<div class="cartcontrol-wrapper">
    								<cartcontrol :food='food' v-on:changeel='changeEL'></cartcontrol>
    							</div>
    						</div>
    					</li>
    				</ul>
    			</li>
    		</ul>
    	</div>
    	<shopcart ref='shopcart' :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcart>
		<foods :food='selectedFood' ref='foods'></foods>
    </div>
    
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue'
import cartcontrol from '../cartconcontrol/cartcontrol.vue'
import foods from '../food/food.vue'
	const  ERR_OK = 0
    export default {
    	data() {
    		return {
    			goods : [],
    			listHeight : [],
    			scrollY : 0,
    			selectedFood:{}
    		}
    	},
    	props : {
    		seller : {
    			type : Object
    		}
    	},
    	created(){
    		this.classMap = ['decrease','discount','guarantee','invoice','special'],
    		this.$http.get('/api/goods').then((response) => {
    			console.log(1111111);
    			console.log(response.body)
    				response = response.body;
    				if(response.errno == ERR_OK) {
    					this.goods = response.data;
    					this.$nextTick(()=>{
    						this._initScroll();
    						this._calculateHeight();
    					})
    					
    					console.log(this.goods)
    				}
    		})
    	},
    	computed : {
    		currentIndex() {
    			for(let i = 0 ; i < this.listHeight.length; i++){
    				let height1 = this.listHeight[i];
    				let height2 = this.listHeight[i+1];
    				if((this.scrollY >= height1 && this.scrollY < height2) || !height2){
    					return i;
    				}
    			}
    			return 0;
    		},
    		selectFoods() {
    			let foods = [];
    			this.goods.forEach((good)=>{
    				good.foods.forEach((food)=>{
    					if(food.count){
    						foods.push(food)
    					}
    				})
    			})
    			return foods;
    		}
    	},
    	methods : {
    		_initScroll() {
    			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
    				click : true
    			});
    			this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
    				click : true,
    				probeType : 3
    			});
    			this.foodsScroll.on('scroll',(pos)=>{
    				this.scrollY = Math.abs(Math.round(pos.y));
    			})
    		},
    		_calculateHeight() {
    			let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
    			let height = 0;
    			this.listHeight.push(height);
    			for(let i = 0;i < foodList.length; i++){
    				let item = foodList[i];
    				height += item.clientHeight;
    				this.listHeight.push(height)
    			}
    		},
    		selectMenu(index,event) {
    			if(!event._constructed){
    				return;
    			}
    			let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
    			let el = foodList[index];
    			this.foodsScroll.scrollToElement(el,300);
    			console.log(index)
    		},
    		changeEL (target){
    			// console.log(target)
    			this.$nextTick(()=>{
    				this.$refs.shopcart.drop(target)
    			})
    			
    		},
    		selectFood(food,event) {
    			if(!event._constructed){
    				return;
    			}
    			this.selectedFood = food;
    			this.$refs.foods.show();
    		} 
    	},
    	components : {
    		shopcart : shopcart,
    		cartcontrol : cartcontrol,
    		foods
    	}
    	// events : {
    	// 	'cart.add'(target){
    	// 		this._drop(target)
    	// 	}
    	// }
    }
</script>

<style >
	.goods {
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		display: flex;
		overflow: hidden;

	}
	.goods .menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.goods .foods{
		flex: 1;
	}
	.goods .menu-wrapper .menu-item{
		display: table;
		width: 56px;
		padding: 0 12px;
		height: 54px;
		line-height: 14px;
		color: 
	}
	.goods .menu-wrapper .menu-item.current{
		position: relative;
		z-index: 10;
		margin-top: -1px;
		background: #fff;
		font-weight: 700;
	}
	.goods .menu-wrapper .menu-item.current .text{
		border-bottom: none;
	}
	.goods .menu-wrapper .menu-item .text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		border-bottom: 1px solid rgba(7,17,27,.1);
	} 

.goods .menu-wrapper .menu-item .icon{
	display: inline-block;
   width:12px;
   height:12px;
   vertical-align: top;
   margin-right:6px;
   background-size:12px 12px;
   background-repeat: no-repeat;
}
.goods .menu-wrapper .menu-item .icon.decrease{
   background-image: url(decrease_3@2x.png);
 }
 .goods .menu-wrapper .menu-item .icon.discount{
   background-image: url(discount_3@2x.png);
 }
 .goods .menu-wrapper .menu-item .icon.guarantee{
   background-image: url(guarantee_3@2x.png);

 }
 .goods .menu-wrapper .menu-item .icon.invoice{
   background-image: url(invoice_3@2x.png);
 }
 .goods .menu-wrapper .menu-item .icon.special{
   background-image: url(special_3@2x.png);
 }


 .goods .foods-wrapper .title{
 	padding-left: 14px;
 	height: 26px;
 	line-height: 26px;
 	border-left: 2px solid #d9dde1;
 	font-size: 12px;
 	color: rgb(147,153,159);
 	background: #f3f5f7;
 }
 .goods .foods-wrapper .food-item{
 	display: flex;
 	margin: 18px;
 	border-bottom: 1px solid rgba(7,17,27,.1);
 	padding-bottom: 18px;
 }
 .goods .foods-wrapper .food-item:last-child{
 	border-bottom: 0;
 	margin-bottom: 0;
 }
 .goods .foods-wrapper .food-item .icon{
 	flex:  0 0 57px;
 	margin-right: 10px;
 }
 .goods .foods-wrapper .food-item .conent{
 	flex: 1;
 	position: relative;
 }
 .goods .foods-wrapper .food-item .conent .name{
 	margin: 2px 0 8px 0;
 	height: 14px;
 	line-height: 14px;
 	font-size: 14px;
 	color: rgb(7,17,27);
 }
 .goods .foods-wrapper .food-item .conent .desc{
 	margin-bottom: 8px;
 	line-height: 12px;
 	font-size: 10px;
 	color: rgb(147,153,159);

 }
 .goods .foods-wrapper .food-item .conent .extra{
 	font-size: 10px;
 	line-height: 10px;
 	color: rgb(147,153,159);

 }
 .goods .foods-wrapper .food-item .conent .extra .count{
 	margin-right: 12px;
 }
 .goods .foods-wrapper .food-item .conent .price{
 	font-weight: 700;
 	line-height: 24px;
 }
 .goods .foods-wrapper .food-item .conent .price .now{
 	margin-right: 18px;
 	font-size: 14px;
 	color: rgb(240,20,20);

 }
 .goods .foods-wrapper .food-item .conent .price .old{
 	text-decoration: line-through;
 	font-size: 10px;
 	color: rgb(147,153,159);
 }
 .goods .foods-wrapper .food-item .conent .cartcontrol-wrapper{
 	position: absolute;
 	right: 0;
 	bottom: 0px;
 }
</style>
