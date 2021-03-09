<template>
<div class="warp"> 
	<img :src="alertCover" alt="">
	<p>No data available</p>
</div>
</template>

<script>
	import publicConf from '../common/public.conf.js';
	import common from '../common/common.js';
	import API from '../common/public.api.js'; 

	const baseUrl = publicConf.currentBaseUrl;
	
	export default {  
		data () {
			return { 
				alertCover : baseUrl + 'no-data.png'
			}
		}
	}

</script> 

<style scoped> 
	.warp {
		width: 100%;
		height: 450px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.warp img {
		width: 82px;
		height: 82px;
	}

	.warp p {
		color: #8e99a8;
	}

</style>
