<template>
	<div class="Mask1" @touchstart.stop="stop" ></div>
</template>
<script>
	export default {
		data () {
			return {

			}
		},
		methods : {
			stop(message, event) {
    			if (event) {
    				event.preventDefault() 
    				event.stopPropagation();
    			}
			}
		} 
	}
</script>
<style scoped>
	.Mask1 {
		height: 100vh;
		width: 100%;
		opacity: 0.8;
		background-color: #000;
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 20;
	}
</style>