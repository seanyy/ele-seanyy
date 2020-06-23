<template>
	<div class="shangping" v-if="shop.goods">
		<div class="center-left">
			<ul>
				<li :class="isSelected==index?'li2':'nav'" @click="menuClick(index)" v-for="item,index in shop.goods">
				 <a :href="'#'+index">{{item.name}}</a>
				</li>
			</ul>
		</div>
		<div class="center-right">
			<ul v-for="item,index in shop.goods">
				<li class="li1" :id="index">{{item.name}}</li>
				<li v-for="items,index1 in item.foods">
					<div class="imgs">
						<img @click="oneshangping(items,index1)" :src="items.image" alt="">
					</div>
					<div class="text">
						<h2>{{items.name}}</h2>
						<p class="p1">月售{{items.sellCount}}份 好评率{{items.rating}}%</p>
						<p class="p2">￥{{items.price}} <span>{{items.oldPrice}}</span></p>
					</div>
					<div class="jia">
						<div v-show="items.num>0">
							<a @click.private="fun1(items,index1)" class="a1">-</a>
							<span>{{items.num}}</span>
						</div>
						<a @click.private="fun(items,index1)" class="a2">+</a>
					</div>
				</li>
			</ul>
		</div>
		<div v-show="isshow" class="all">			
			<span @click="isshow=false">x</span>
			<img :src="dangqian.image" alt="">
			<div class="content">
				<h4>{{dangqian.name}}</h4>
				<p class="p1">月售{{dangqian.sellCount}}份 &nbsp; &nbsp;好评率{{dangqian.rating}}%</p>
				<p class="p2">￥{{dangqian.price}} <span>{{dangqian.oldPrice}}</span></p>
				<button type="button" v-show="jiagou" @click.private="fun(dangqian)">加入购物车</button>
				<div class="jia" id="jia" v-show="jiajian">
					<div>
						<a @click.private="fun1(dangqian)" class="a1">-</a>
						<span>{{dangqian.num}}</span>
					</div>
					<a @click.private="fun(dangqian)" class="a2">+</a>
				</div>
			</div>
			<div class="kong"></div>
			<div class="content1">
				<h4>商品介绍</h4>
				<p>{{dangqian.info}}</p>
			</div>
			<div class="kong1"></div>
			<div class="content2">
				<h4>商品评价</h4>
				<button class="btn1" type="button" @click="quanbu">全部24</button>
				<button class="btn2" type="button" @click="manyi">满意18</button>
				<button class="btn3" type="button" @click="bumanyi">不满意6</button>
				<hr />
				<a><span class="
				glyphicon glyphicon-ok" @click.private="neirong" :class="[neirongshow?'neirong':'spana']"></span>&nbsp;只看有内容的评价</a>
			</div>
			<div class="content3">
				<ul>
					<li v-for="item11 in dangqian.ratings">
						<div>
							<p class="p2">{{formatDateTime(item11)}}</p>
							<p class="p1">{{item11.username}}
								<img :src="item11.avatar" alt="">
							</p>
						</div>
						<h5>{{item11.text}}</h5>
					</li>
				</ul>
			</div>
		</div>
		<div class="bottom">
			<ul>
				<li>
					<div class="tb">
						<p @click.private="gouwuchefun" :class="[isActive?'aa':'gouwu']">
							<span v-show="spanshow" class="span1">{{shuliang}}</span>
							<span class="glyphicon glyphicon-shopping-cart"></span>
						</p>
					</div>
				</li>
				<li>
					<p class="p1">￥{{sum}}</p>
				</li>
				<li>
					<p class="p2">另需配送费￥4</p>
				</li>
				<li>
					<a v-show="qisongshow" @click="gouwuchefun" tag="a" class="a2">
						还差￥{{qisongjia}}起送
					</a>
					<a v-show="jiesuanshow" @click="jiesuan" tag="a" class="a3">
						去结算
					</a>
				</li>
			</ul>
			<div v-show="gouwucheshow" class="gouwuche"  >
				<div class="gouwuche-head">
					<h5>购物车</h5>
					<p @click="qingkong()">清空</p>
					<ul>
						<li v-for="items in obj" v-if="items.num>0?true:false">
							<p style="color: #000000;">{{items.name}}</p>
							<p style="color: #000000;">{{items.price*items.num}}</p>
							<div class="jia">
								<div>
									<a @click.private="fun1(items)" class="a1">-</a>
									<span>{{items.num}}</span>
								</div>
								<a @click.private="fun(items)" class="a2">+</a>
							</div>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"shangping",
		data(){
			return{
				shop:{
					
				},
				// 点击加号显示减号
				isshow:false,
				isSelected:0,
				dangqian:{},
				// 购物车显示隐藏切换
				gouwucheshow:false,
				// 购物车红圈圈显示隐藏
				spanshow:false,
				// 超过20元切换结算
				jiesuanshow:false,
				// 没超过20元显示还差20起送
				qisongshow:true,
				// 商品详情购物车切换隐藏显示
				jiagou:true,
				// 商品详情的加减切换隐藏显示
				jiajian:false,
				// 购物车样式是否切换css
				isActive: true,
				obj:[],
				// 配送费
				peisongfei:4,
				quanbushow:true,
				manyishow:false,
				bumanyishow:false,
				neirongshow:false,
			}
		},
		computed:{
			sum(){
				let zong=0;
				this.shop.goods.forEach(function(item,index){
					item.foods.forEach(function(item2,index2){
						zong+=item2.price*item2.num;
					})
				})
				return zong;
			},
			shuliang(){
				let a=0;
				this.shop.goods.forEach(function(item,index){
					item.foods.forEach(function(item2,index2){
						a+=item2.num;
					})
				})
				if(a<1){
					this.spanshow=false;
					this.isActive = true;
				}
				return a;
			},
			qisongjia(){
				let b=0;
				this.shop.goods.forEach(function(item,index){
					item.foods.forEach(function(item2,index2){
						b+=item2.price*item2.num;
					})
				})
				if(b<20){
					this.jiesuanshow=false;
					this.qisongshow=true;
					return 20-b;
				}else{
					this.jiesuanshow=true;
					this.qisongshow=false;
				}
			},
			yunfei(){
				return this.sum+4;
			}
		},
		methods:{
			menuClick(index){
				this.isSelected=index 
			},
			// 加购方法
			fun(items,index1){
				items.isshow=true;
				items.num++;
				this.dangqian=items;
				this.spanshow=true;
				this.jiagou=false;
				this.jiajian=true;
				// this.obj.push(this.dangqian);
				this.isActive=false;
				
				let flag=0;//商品是否存在购物车
				this.obj.forEach(function(item2,index2){
					if(item2.name==items.name){
						flag=1;
					}
				})
				if(flag==0){
					items.num=1;
					this.obj.push(items)
				}else if(flag==1){
					this.obj.forEach(function(item2,index2){
						if(item2.name==items.name){
							this.obj[index2].num+=1;
							return;
						}
					})
				}
			},
			fun1(items,index1){
				if(items.num<=1){
					items.isshow=false;
					this.jiajian=false;
					this.jiagou=true;
					items.num=0;
				}else{
					items.num--;
				}
				if(this.shuliang<1){
					this.gouwucheshow=false
				}
			},
			oneshangping(items,index){
				this.isshow=true;
				this.dangqian=items;
			},
			formatDateTime: function(item11) {
		        var date = new Date(item11.rateTime);
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
			jiesuan(){
				alert("请支付"+this.yunfei+"元");
				},
			// 购物车清空
			qingkong(){
				console.log(this.isshow)
				this.isshow=false;
				this.obj=[];
				this.obj.num=0;
				this.gouwucheshow=false;
				this.shop['goods'].forEach(function(i){
					i['foods'].forEach(function(f){
						f.num=0;
					})
				})
			},
			gouwuchefun(){
				this.gouwucheshow=!this.gouwucheshow;
				if(this.shuliang<1){
					this.gouwucheshow=false;
				}
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
					"color":"black"
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
		},
	}
</script>

<style>
	@import url("../assets/css/shangping.css");
	@import url("../assets/css/bottom.css");
	@import url("../assets/css/bootstrap.css");
	.router-link-exact-active{
		   color: red;
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
