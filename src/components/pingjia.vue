<template>
	<div class="pingjia" v-if="shop.seller">
		<div class="pingjia-top">
			<div class="left">
				<p class="p1">{{shop.seller.score}}</p>
				<h5>综合评分</h5>
				<p class="p2">高于周边商家{{shop.seller.rankRate}}%</p>
			</div>
			<div class="right">
				<ul>
					<li>服务态度
						<div>
							<span v-for="item in starArr" :class="item"></span>
							<!--主要通过  动态绑定class样式实现-->
							<span class="span1">{{shop.seller.serviceScore}}</span>
						</div>
					</li>
					<li>商品评分
						<div>
							<span v-for="item in starArr" :class="item"></span>
							<!--主要通过  动态绑定class样式实现-->
							<span class="span1">{{shop.seller.foodScore}}</span>
						</div>
					</li>
					<li>送达时间&nbsp;<span class="span2"> {{shop.seller.deliveryTime}}分钟</span></li>
				</ul>
			</div>
		</div>
		<div class="pingjia-center">
			<div class="center1">
				
			</div>
			<div class="center2">
				<button class="btn1" type="button" @click="quanbu">全部24</button>
				<button class="btn2" type="button" @click="manyi">满意18</button>
				<button class="btn3" type="button" @click="bumanyi">不满意6</button>
				<hr />
				<a><span class="
glyphicon glyphicon-ok" @click.private="neirong" :class="[neirongshow?'neirong':'spana']"></span>&nbsp;只看有内容的评价</a>
			</div>
			<div class="center3">
				<ul v-show="quanbushow" >
					<li v-for="item in shop.ratings"v-if="item.score>0">
						<div class="left" >
							<img :src="item.avatar" alt="">
						</div>
						<div class="right">
							<p style="display: inline-block;" v-text="item.username"></p>
							<p style="float: right;">{{formatDateTime(item)}}</p>
							<div>
								<span v-for="item2 in item.score" class="on_star"></span>
								<span v-for="item2 in (5-item.score)" class="off_star"></span>
								<span v-if="item.deliveryTime>1">{{item.deliveryTime}}分钟送达</span>
								<!--主要通过  动态绑定class样式实现-->
							</div>
							<h5 v-text="item.text" style="font-weight: bold;"></h5>
							<span class="span1" v-for="items in item.recommend">{{items}}</span>
						</div>
					</li>
				</ul>
				<ul v-show="manyishow">
					<li v-for="item in shop.ratings" v-if="item.score>=4">
						<div class="left" >
							<img :src="item.avatar" alt="">
						</div>
						<div class="right">
							<p style="display: inline-block;" v-text="item.username"></p>
							<p style="float: right;">{{formatDateTime(item)}}</p>
							<div>
								<span v-for="item2 in item.score" class="on_star"></span>
								<span v-for="item2 in (5-item.score)" class="off_star"></span>
								<span v-if="item.deliveryTime>1">{{item.deliveryTime}}分钟送达</span>
								<!--主要通过  动态绑定class样式实现-->
							</div>
							<h5 v-text="item.text" style="font-weight: bold;"></h5>
							<span class="span1" v-for="items in item.recommend">{{items}}</span>
						</div>
					</li>
				</ul>
				<ul v-show="bumanyishow">
					<li v-for="item in shop.ratings" v-if="item.score<=3">
						<div class="left" >
							<img :src="item.avatar" alt="">
						</div>
						<div class="right">
							<p style="display: inline-block;" v-text="item.username"></p>
							<p style="float: right;">{{formatDateTime(item)}}</p>
							<div>
								<span v-for="item2 in item.score" class="on_star"></span>
								<span v-for="item2 in (5-item.score)" class="off_star"></span>
								<span v-if="item.deliveryTime>1">{{item.deliveryTime}}分钟送达</span>
								<!--主要通过  动态绑定class样式实现-->
							</div>
							<h5 v-text="item.text" style="font-weight: bold;"></h5>
							<span class="span1" v-for="items in item.recommend">{{items}}</span>
						</div>
					</li>
				</ul>
				<ul v-show="neirongshow">
					<li v-for="item in shop.ratings" v-if="item.text!=''">
						<div class="left" >
							<img :src="item.avatar" alt="">
						</div>
						<div class="right">
							<p style="display: inline-block;" v-text="item.username"></p>
							<p style="float: right;">{{formatDateTime(item)}}</p>
							<div>
								<span v-for="item2 in item.score" class="on_star"></span>
								<span v-for="item2 in (5-item.score)" class="off_star"></span>
								<span v-if="item.deliveryTime>1">{{item.deliveryTime}}分钟送达</span>
								<!--主要通过  动态绑定class样式实现-->
							</div>
							<h5 v-text="item.text" style="font-weight: bold;"></h5>
							<span class="span1" v-for="items in item.recommend">{{items}}</span>
						</div>
					</li>
				</ul>
			</div>
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
			quanbushow:true,
			manyishow:false,
			bumanyishow:false,
			neirongshow:false,
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
		},
		//根据score定义计算属性
		starArr1(){
			//星级评分
			var starClass=[];
			var onstar;
			this.shop.ratings.forEach(function(item1,index1){
				onstar=item1.score;
			})
			// 满星
			console.log(onstar)
			for(let i=0;i<onstar;i++){
				starClass.push('on_star');
			}
			//灰色星星
			while(starClass.length<5){
				starClass.push('off_star');
			}
			return starClass;//["on_star","on_star","on_star",'off_star','off_star']
		},
	},
	methods:{
		formatDateTime: function(item) {
		        var date = new Date(item.rateTime);
		        var y = date.getFullYear();
		        var m = date.getMonth() + 1;
		        m = m < 10 ? ('0' + m) : m;
		        var d = date.getDate();
		        d = d < 10 ? ('0' + d) : d;
		        var h = date.getHours();
		        h = h < 10 ? ('0' + h) : h;
		        var minute = date.getMinutes();
		        var second = date.getSeconds();
		        minute = minute < 10 ? ('0' + minute) : minute;
		        second = second < 10 ? ('0' + second) : second;
		        return y+'-'+m+'-'+d+' '+' '+h+':'+minute+':'+second;
		    },
		quanbu(){
			this.quanbushow=true;
			this.mamyishow=false;
			this.bumanyishow=false;
			this.neirongshow=false;
			$(".btn1").css({
				"background":"#00a0dc",
				"color":"white"
			})
			$(".btn2").css({
				"background":"#ccecf8",
				"color":"black"
			})
			$(".btn3").css({
				"background":"#e9ebec",
				"color":"black"
			})
		},
		manyi(){
			this.manyishow=true;
			this.quanbushow=false;
			this.bumanyishow=false;
			this.neirongshow=false;
			$(".btn1").css({
				"background":"#ccecf8",
				"color":"black"
			})
			$(".btn2").css({
				"background":"#00a0dc",
				"color":"white"
			})
			$(".btn3").css({
				"background":"#e9ebec",
				"color":"black"
			})
		},
		bumanyi(){
			this.bumanyishow=true;
			this.manyishow=false;
			this.quanbushow=false;
			this.neirongshow=false;
			$(".btn1").css({
				"background":"#ccecf8",
				"color":"black"
			})
			$(".btn2").css({
				"background":"#ccecf8",
				"color":"black"
			})
			$(".btn3").css({
				"background":"#4d555d",
				"color":"white"
			})
		},
		neirong(){
			this.mamyishow=false;
			this.quanbushow=false;
			this.bumanyishow=false;
			this.neirongshow=true;
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
	@import url("../assets/css/pingjia.css");
	@import url("");
	.on_star{
		width:1.5rem;
		height:1.5rem;
		display: inline-block;
		background: url(../assets/img/star24_on@2x.png);
		background-size: 100%;
	}
	.off_star{
		width:1.5rem;
		height:1.5rem;
		display: inline-block;
		background: url(../assets/img/star24_off@2x.png);
		background-size: 100%;
	}
	.neirong{
		background: #00c850;
		width: 2rem;
		height: 2rem;
		color: white;
		text-align: center;
		display: inline-block;
		padding-top: 0.5rem;
		border-radius: 50%;
	}
</style>
