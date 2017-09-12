<template>
    <div class="cartcontrol">
    	<transition name='move'>
		<div class="cart-decrease icon-remove_circle_outline inner" v-show="food.count>0" @click.stop.prevent='decreaseCart' >
			<!-- <transition name='trn'> -->
				<!-- <span class="inner icon-remove_circle_outline" v-show="food.count>0"></span> -->
			<!-- </transition> -->
			
		</div>
		</transition>
		<div class="cart-count" v-show="food.count>0"> {{food.count}} </div>
		<div class="cart-add icon-add_circle" @click.stop='addCart'></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
    export default {
        props : {
            food : {
                type : Object
            }
        },
        created(){
        	// console.log(this.food)
        },
        methods:{
        	addCart(event) {
        		
        		if(!event._constructed){
        			return
        		}
        		if(!this.food.count){
        			Vue.set(this.food,'count',1)
        		} else {
        			this.food.count++
        		}

        		// this.$store.dispatch('changeEL',event.target);
        		// console.log(this.$store.state.el)
        		this.$emit('changeel',event.target);
        	},
        	decreaseCart(event) {
        		if(!event._constructed){
        			return
        		}
        		if(!this.food.count){
        			Vue.set(this.food,'count',1)
        		} else {
        			this.food.count--
        		}
        	}
        }
    }
</script>

<style >
	.cartcontrol{
		font-size: 0;
	}
	.cartcontrol .cart-decrease{
		display: inline-block;
		padding: 6px;
		transition:  all 0.4s linear
	}
	/*.cartcontrol .cart-decrease .inner{
		transition:  all 0.4s linear
	}*/
	.move-enter-active,
	.move-leave-active{
		transition:  all .4s linear;
		opacity: 1;
		transform: translate3d(0,0,0) rotate(0);
		
	}
	/*.trn-enter-active,
	.trn-leave-active{
		transition: all 0.4s linear;
		transform: rotate(0);
	}
	.trn-enter,
	.trn-leave{
		transform: rotate(180deg);
	}*/
	.move-enter,
	.move-leave{
		/*transition:  all 1s linear;*/
		opacity: 0;
		transform: translate3d(24px,0,0) rotate(180deg);
		
	}
	
	.cartcontrol .cart-count{
		display: inline-block;
	}
	.cartcontrol .cart-add{
		display: inline-block;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
		padding: 6px;
	}
	.cartcontrol .cart-count{
		font-size: 10px;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		color: rgb(147,153,159);
		vertical-align: top;
	}
	.cartcontrol .inner{
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
</style>
