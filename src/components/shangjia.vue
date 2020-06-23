<template>
	<div class="shangjia" v-if="shop.seller">
		<div class="shangjia1">
			<h4>粥品香坊（大运村）</h4>
			<img src="../assets/img/star24_on@2x.png" />
			<img src="../assets/img/star24_on@2x.png" />
			<img src="../assets/img/star24_on@2x.png" />
			<img src="../assets/img/star24_on@2x.png" />
			<img src="../assets/img/star24_off@2x.png" />
			<hr />
			
			<div class="favorite" @click="toggleFavorite($event)">
				<span class="glyphicon glyphicon-heart-empty" :class="{'active':favorite}"></span>
				<br />
				<span class="text">{{favoriteText}}</span>
			</div>
			
			<ul>
				<li><p>起送价</p>
					<h1>{{shop.seller.minPrice}} <span>元</span></h1>
				</li>
				<li><p>商家配送</p>
					<h1>{{shop.seller.deliveryPrice}} <span>元</span></h1>
				</li>
				<li><p>平均配送时间</p>
					<h1>{{shop.seller.deliveryTime}} <span>分钟</span></h1>
				</li>
			</ul>
		</div>
		<div class="shangjia2">
			
		</div>
		<div class="shangjia3">
			<h4>公告与活动</h4>
			<p>{{shop.seller.bulletin}}</p>
			<ul>
				<li v-for="item in shop.seller.supports">
				<img :src="item.img" />
				{{item.description}}</li>
			</ul>
		</div>
		<div class="shangjia2">
			
		</div>
		<div class="shangjia4">
			<h4>商家实景</h4>
			<ul>
				<li v-for="item in shop.seller.pics">
					<img :src="item"/>
				</li>
			</ul>
		</div>
		<div class="shangjia2">
			
		</div>
		<div class="shangjia3">
			<h4>商家信息</h4>
			<ul>
				<li v-for="item in shop.seller.infos">
				{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"bottom",
		data(){
			return{
				shop:{
					
				},
				favorite: false,
			}
		},
		computed: {
			favoriteText(){
				return this.favorite? "已收藏" : "收藏"
			}
		},
		methods:{
			toggleFavorite(event){
				console.log(11)
				// if(!event._constructed){
				// 	return;
				// }
				// this.favorite = !this.favorite;
				$(".favorite>.glyphicon").css("color","red")
				$(".favorite>.text").text("已收藏")
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
	@import url("../assets/css/shangjia.css");
	@import url("../assets/css/bootstrap.css");
</style>
