<template>
	<div class="gonggao" v-if="shop.seller">
		<div class="gonggao-top">
			<h4>粥品香坊（大运村）</h4>
			<div>
				<span v-for="item in starArr" :class="item"></span>
				<!--主要通过  动态绑定class样式实现-->
			</div>
		</div>
		<div class="gonggao-center">
			<p>优惠信息</p>
			<ul>
				<li v-for="item in shop.seller.supports">
					<img :src="item.img" />
					{{item.description}}
				</li>
			</ul>
		</div>
		<div class="gonggao-bottom">
			<p class="p1">商家公告</p>
			<p class="p2" v-text="shop.seller.bulletin"></p>
		</div>
		<router-link to="/" tag="a" class="a1"><span class="glyphicon glyphicon-remove"></span></router-link>
	</div>
</template>

<script>
	export default{
		name:"bottom",
		data(){
			return{
				shop:{
					
				},
			}
		},
		props:{star:String},
		computed:{
			starArr(){
				//星级评分
				var starClass=[];
				var onstar=Math.round(this.shop.seller.score)
				// 满星
				for(let i=0;i<onstar;i++){
					starClass.push('on_star')
				}
				//灰色星星
				while(starClass.length<5){
					starClass.push('off_star')
				}
				return starClass;
			}
		},
		mounted:function(){
			this.axios
			.get("/static/data/data.json")
			.then((response)=>{
				this.shop=response.data;
			})
			.catch(function(error){
				console.log(error);
			})
		}
	}
</script>

<style>
	@import url("../assets/css/gongao.css");
	@import url("../assets/css/bootstrap.css");
	.on_star{
		width:2rem;
		height:2rem;
		display: inline-block;
		background: url(../assets/img/star24_on@2x.png);
		background-size: 100%;
	}
	.off_star{
		width:2rem;
		height:2rem;
		display: inline-block;
		background: url(../assets/img/star24_off@2x.png);
		background-size: 100%;
	}
</style>
