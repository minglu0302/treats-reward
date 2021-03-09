<template>  
	<div class="loadingBox">
		<img :src="loading" class="loading" alt="" v-show="!nodata">
		<img :src="noData" class="no-data" v-show="nodata">
	</div>
</template>

<script>
	import publicConf from '../common/public.conf.js';
	import common from '../common/common.js';
	import API from '../common/public.api.js';  

	const baseUrl = publicConf.currentBaseUrl;
	
	export default {
		props : ['nodata'],
		data () {
			return {
				loading : baseUrl + "listLoading.gif",
				noData : baseUrl + "nodata_logo.png"
			}
		}
	}
</script>

<style scoped>
	.loadingBox {
		height: 40px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading {
		height: 20px;
		width: 20px;
	}

	.no-data {
		height: 20px;
		width: 55px;
	}
</style>