<template>
	<div> 
		<div class="filling" v-if="isiOS && (model === 2)" ></div>

		<div class="header"  :class="{'androidHeight':isAndroid, 'iosHeight':isiOS}" v-bind:style="isBottom()" v-if="v==='2'">
			<div class="header-menu" :class="{'direction-left':isAndroid, 'direction-between':isiOS}" v-bind:style="isBottom()">  
				<div class="menu-button" v-if="model===0 && isShowMenu">
					<!--<a href="menu://isShow=1"><img :src="menuImg" class="menu-img" ></a>-->
					<a href="menu://isShow=1"><img :src="backImg" class="back-img"></a>
				</div>
				<div class="menu-button" v-if="model===1">
					<a :href="href" v-if="href"><img :src="backImg" class="back-img"></a>
					<a href="javascript:history.go(-1);" v-if="!href"><img :src="backImg" class="back-img"></a>
				</div>
				<div class="menu-button" v-if="model===2">
					<a href="javascript:history.go(-1);" ><img :src="back2Img" class="back2-img"></a>
				</div>	
				<div class="menu-title" v-if="!(model===2)">{{ title }}</div>
				<div class="menu-button" v-if="!(v==='3'&&isiOS)" ></div>
			</div>
		</div>

		<div class="header"  :class="{'androidHeight':isAndroid, 'iosHeight':isiOS}" v-bind:style="isBottom()" v-if="v==='3'">
			<div class="header-menu" :class="{'direction-left':isAndroid, 'direction-center':isiOS}" v-bind:style="isBottom()">
				<div style="width:15px" v-if="isAndroid"></div>
				<div class="menu-title" v-if="!(model===2)">{{ title }}</div>
			</div>
		</div>

		<div style="background-color:#fff" :class="{'androidHeight':isAndroid, 'iosHeight':isiOS}" v-if="!(model===2)"></div>
	</div>
</template>

<style scoped> 
	.header {
		display: flex;
		align-items: flex-end;
		width: 100%;
		position: fixed;
		z-index: 13;
		border-bottom: 1px solid #E8EBEE; 
		background-color: #fff;
		pointer-events: none;
	}

	.direction-left {
		justify-content: flex-start;
	}

	.direction-between {
		justify-content: space-between;
	}

	.direction-center {
		justify-content: center;
	}

	.androidHeight {
		height: 55px;
	}

	.iosHeight {
		height: 70px;
	}

	.header-menu {  
		height: 55px;
		width: 100%; 
		display: flex; 
		background-color: #fff; 
		align-items: center;
		pointer-events:none;
	}

	.menu-title {
		font-size: 17px;
		color: #1e2c49;
	}

	.menu-button {
		height: 55px;
		width: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: auto;
	}

	.menu-img { 
		height: 15px;
		width: 17px;
	}

	.back-img {
	  	height: 15px;
	  	width: 18px;
	}

	.back2-img {
		height: 24px;
		width: 24px; 
	}

	.filling {
		height: 30px;
		width: 100%;
		background-color: #fff;
	}
</style>

<script>  
	import publicConf from '../common/public.conf.js';
	import common from '../common/common.js'; 

	const baseUrl = publicConf.currentBaseUrl;

	export default {
		props : ['model', 'title', 'href'],
		data () {
			return {
				menuImg : baseUrl + "menu.png",
				backImg : baseUrl + "back.png",
				back2Img : baseUrl + "back2.png",
				v : '2',
				isAndroid : false,
				isiOS : false
			}
		}, 

		methods : {
			isBottom () {
				if ( this.model === 2 ) { 
					return { 
						borderBottom : 'none',
						backgroundColor : 'transparent'
					}
				}

			}
		},

		beforeMount () { 
 			if ( common.checkClient() === 0 ) this.isAndroid = true;
 			if ( common.checkClient() === 1 ) this.isiOS = true; 
 			let v = this.v = common.GET()['v'] ? common.GET()['v'] : '2';
 			if ( v === '2' ) {
 				this.isShowMenu = true;
 			} else if ( v === '3' ) {
 				this.isShowMenu = false;
 			}
		}

	}
</script>