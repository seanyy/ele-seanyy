<template>
	<div class="center">
		<ul class="ul1">
			<router-link to="/" tag="li">商品</router-link>
			<router-link to="/pingjia" tag="li">评价</router-link>
			<router-link to="/shangjia" tag="li">商家</router-link>
		</ul>
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
		methods:{
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
	@import url("../assets/css/center.css");
	.router-link-exact-active{
	   color: red;
	 }
</style>
