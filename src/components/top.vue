<template>
	<div class="top" v-if="shop.seller">
		<div class="img"><img v-bind:src="shop.seller.avatar"></img></div>
		<div class="bg">
			<div class="head-left">
				<img v-bind:src="shop['seller']['avatar']"></img>
			</div>
			<div class="head-center">
				<ul>
					<li><img class="img1" src="../assets/img/brand@2x.png" alt=""><span class="span1">粥品香坊（大运村）</span></li>
					<!-- <li><p v-for="item in shop.seller.supports">{{item}}</p></li> -->
					<li><h5>蜂鸟专送/28分钟到达</h5></li>
					<li><img class="img2" src="../assets/img/decrease_1@2x.png" alt=""><span class="span3">在线支付满28减5，满50减10</span></li>
				</ul>
			</div>
			<div class="head-right">
				<router-link to="/gonggao" tag="a">5个></router-link>
				<!-- <a href="javascript:void(0)">5个></a> -->
			</div>
		</div>
		<div class="top-bottom">
			<p><span class="span1">公告</span><span class="span2" v-text="shop.seller.bulletin"></span></p>
		</div>
		<div class="tt"></div>
	</div>
</template>

<script>
export default{
	name:"top",
	data(){
		return{
			shop:{
				
			}
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
	@import url("../assets/css/top.css");
</style>
