<template>
	<div class="container">
		<div class="alert">
			<img  class="alert-icon" :src="alert_icon" alt="">
			<span class="alert-text">Copied!</span>
		</div>
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
				alert_icon : baseUrl + 'alert_icon.png'
			}
		}
	}
</script>

<style scoped>
	.container {
		position: fixed;
		left: 0px;
		top:0px;
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 11;
		background-color: transparent;
	}

	.alert {
		width: 160px;
		height: 120px;
		border-radius: 9px;
		background:rgba(0, 0, 0, 0.6)!important;
		box-shadow: 0 2px 4px 0 rgba(221, 221, 221, 0.5); 
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.alert-icon {
		width: 36px;
		height: 36px;
	}

	.alert-text {
		margin-top: 20px;
		font-size: 16px;
		font-weight: bold; 
		color: #ffffff;
	}
</style>