<template>
<div> 
	<div class="box" id="loadingBox" v-show="!timeout" >
		<!-- <img :src="loading" alt=""> -->
		<div class="content" :style="{marginTop : paddTop + 'px'}">
			<slot></slot>
		</div>
	</div>
	<div class="timeout" v-show="timeout">
		<p style="color:#8e99a8">The network is poor, please tap the button to reload.</p>
		<button class="reload-button" @click="reload()">Reload</button>
	</div>
</div>
</template>

<script>
	import publicConf from '../common/public.conf.js';
	import common from '../common/common.js';
	import API from '../common/public.api.js';  

	const baseUrl = publicConf.currentBaseUrl;
	
	export default {  
		props : ['timeout', 'paddTop', 'isShow'],
		data () {
			return { 
				loading : baseUrl + "loading.gif"
			}
		},

		watch : {
			isShow : function (val) {
				if ( val ) {
					window.document.body.style.overflow = 'hidden'; 
				}
			}
		},

		mounted () {
			if ( this.isShow ) {
				window.document.body.style.overflow = 'hidden';
			}
		}
	}

</script> 

<style scoped>
.content {
	width: 100%;
	height: 100vh;
	background-color:#FAFBFD;
	box-sizing: border-box;
	overflow: hidden;
}

.box { 
	position: fixed;
    z-index: 12;
    left: 0px;
    top: 0px; 
    height: 100vh;
    width: 100%; 
    background-color:transparent;
}

.box img {
    height: 100px;
    width: 100px;
}

.timeout {
	text-align: center;
	position: fixed;
	top:0px;
	left: 0px;
	padding: 50px;
	padding-top: 300px;
	box-sizing: border-box;
	height: 100vh;
	width: 100%;
	background-color: #FAFBFD;
	z-index: 8;
}

.timeout p {
	font-size: 14px;
}

.Mask1 {
	position: fixed;
	z-index: 20;
	height: 100vh;
	width: 100%;
	opacity: 0.8;
	background-color: #000; 
	left: 0px;
	top: 0px;
	
}
</style>
