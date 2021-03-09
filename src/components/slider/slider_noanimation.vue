<template><div>
	<div class="slider-box" > 
     <div class="backgroundImage" v-bind:style="{ backgroundImage : bgurl }"></div>
		<div class="container">
			<div class="title">Top {{ pet_type[data[0].pet_type] }} of {{ timeDifference() }}</div>
			<div class="poof-box">
				<div class="pet-box" v-on:click="petGo(data[1].pet_id)" > 
					<div class="pet-headimg medium borderColor1">
						<div class="headimg-container" style="width:78.2px;height:78.2px;" v-bind:style="{ backgroundImage : 'url(' + data[1].avatar + ')' }" >
						</div>
					</div>
					<div class="hexagon" v-bind:style="{ backgroundImage : bgGray }" >
						 <div class="score-value">{{ data[1].score }}</div>
						 <div class="score-name">Score</div>
					</div>
					<div class="pet-name">{{ data[1].pet_name }}</div>
					<hr />
					<div class="pet-varieties">{{ data[1].breed | splitStr  }}</div> 
				</div>
				<div class="pet-box"  v-on:click="petGo(data[0].pet_id)" >
					<div class="pet-headimg max borderColor2">
						<div class="headimg-container" style="width:91px;height:91px;" v-bind:style="{ backgroundImage : 'url(' + data[0].avatar + ')' }" >
						</div>
					</div> 
					<div class="hexagon" v-bind:style="{ backgroundImage : bgYellow }" >
						 <div class="score-value">{{ data[0].score }}</div>
						 <div class="score-name">Score</div>
					</div>
					<div class="pet-name">{{ data[0].pet_name }}</div>
					<hr />
					<div class="pet-varieties">{{ data[0].breed | splitStr }}</div> 
				</div>
				<div class="pet-box"   v-on:click="petGo(data[2].pet_id)" >
					<div class="pet-headimg small borderColor3"> 
						<div class="headimg-container" style="width:65.1px;height:65.1px;" v-bind:style="{ backgroundImage : 'url(' + data[2].avatar + ')' }" >
						</div>
					</div>
					<div class="hexagon" v-bind:style="{ backgroundImage : bgDarkYellow }" >
						 <div class="score-value">{{ data[2].score }}</div>
						 <div class="score-name">Score</div>
					</div>
					<div class="pet-name">{{ data[2].pet_name }}</div>
					<hr />
					<div class="pet-varieties">{{ data[2].breed | splitStr }}</div> 
				</div>
			</div>
		</div> 
	</div> 
</div></template>

<script>
import publicConf from '../../common/public.conf.js';
const baseUrl = publicConf.currentBaseUrl;

export default {
	props : ['data', 'mydata'],
	data () {
		return {
			bgurl : "url(" + baseUrl + "background.png" + ")" ,
			bgGray : "url(" + baseUrl + "polygon-gray.png" + ")" ,
			bgYellow : "url(" + baseUrl + "polygon-yellow.png" + ")" ,
			bgDarkYellow : "url(" + baseUrl + "polygon-darkyellow.png" + ")",

			pet_type : [
				'dogs',
				'cats',
				'pets'
			]
		}
	},

	mounted() {  
	},

	filters : {
		splitStr (value) {  
			if (!value) return '';
		      value = value.toString()
		      if ( value.length >= 14 ) {
		      	  return value.substring(0,14) + "...";
		      } else {
		      	  return value;
		      }
		}
	},

	methods : {
		timeDifference () {
			let today = (new Date())+"";
			today = today.split(" ");
			today = today[1] + " " + today[2];
			let sevenDaysAgo = new Date( ((new Date()).getTime()-1000*60*60*24*6) )+"";
			sevenDaysAgo = sevenDaysAgo.split(" ");
			sevenDaysAgo = sevenDaysAgo[1] + " " + sevenDaysAgo[2];

			return sevenDaysAgo + " to " + today;
		}
	}
}
</script>

<style scoped>
	.score-value {
		width: 100%;
		text-align: center;
		font: 8px;
		transform: scale(1);
		color: #000;
		position: relative;
		top: 2px;
	}

	.score-name {
		width: 100%;
		text-align: center;
		font: 7px;
		transform: scale(0.7);
		position: relative;
		top: -2px;
		color: #fff; 
	}

	.hexagon {
		background-color: transparent;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; 
		position: relative;
		bottom: 15px;
		left: calc(50% - 15.5px);
		height:31px; 
		text-align: center;
		font-size: 10px; 
		margin-bottom: -10px;
		width:26.8px;
	}

	.pet-box { 
		text-align: center;
		z-index: 2
	}

	.max {
		height: 95px;
		width: 95px;
	}
	
	.medium {
		height: 82px;
		width: 82px;
	}

	.small {
		height: 69px;
		width: 69px;
	}

	.pet-headimg {
		background-size:cover;
		border-radius: 100%;
		display:flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.headimg-container {
		background-size: cover;
		background-repeat: no-repeat;
		border-radius:100%;
	}

	.slider-box {
		position: relative;
		height: 234px;
		width: 100%;
		background-color: #fff;
		padding: 10px;
		box-sizing: border-box;
	}

	.backgroundImage {
		position: absolute;
		height: 150px;
		width: calc(100% - 20px);
		bottom: 17px;
		left: (50% - 175px);
		background-size: 100% 100%;
		z-index: 1;
	}

	.container {
		height: 224px;
		width: 100%;
	}

	.title { 
		width:100%; 
		text-align: center; 
		font-size: 13px;
		font-weight: 300; 
		color: #8e99a8; 
	}

	.poof-box {
		margin-top: 10px;
		height: 190px;
		width: 100%; 
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: baseline;
	}

	.pet-name {  
		height: 16px; 
		font-size: 14px; 
		font-weight:bold;
		letter-spacing: -0.2px;
		text-align: center;
		color: #1d2733; 
		margin: auto;
	}

	.pet-varieties { 
		font-size: 11px; 
		letter-spacing: 0.1px;
		text-align: center;
		color: #8e99a8; 
		width: 70px;
		margin: auto;
	}

	hr {
		border : none;
		height: 1px;  
		background-color:#e8ebee;
		width: 70px;
	}

	.borderColor1 {
		border: solid 4px #fbe7f5;  
	}

	.borderColor2 { 
  		border: solid 5px #deeefa;
	}

	.borderColor3 { 
  		border: solid 3px #E7F3FB;
	}
</style>