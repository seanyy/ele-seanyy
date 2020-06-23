<template>
	<div id="app">
		<top></top>
		<center>
		</center>
		<router-view></router-view>
	</div>
</template>

<script>

import top from '@/components/top'
import center from '@/components/center'
	
export default {
	name: 'App',
	components:{
	  top,
	  center
  },
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
/* #app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
