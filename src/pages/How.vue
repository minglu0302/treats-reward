<template><div>
	<TreatsHeader :model='1' :title="'How to earn treats'" :href="href" ></TreatsHeader> 
<div class="container">
	<article>
		<h2>Earn treats for reward coupons!</h2>
		<section> 
		<p>Earn a treat every time you:</p>
		<ul class="how-list">
			<li>Sync your device to the app</li>
			<li>Comment on a post</li>
			<li>Receive treats from other members for posting photos</li>
			<li>Rank with a top score every weekend</li>
		</ul> 
		<p>Redeem your treats for reward coupons for select pet merchandise on Amazon.</p>
		</section>
		<h2>Boost your treat earnings!</h2>
		<section>  
			<table class="tg">
			  <tr>
			    <th>Earn</th>
			    <th class="right-box">Treats</th>
			  </tr>
			  <tr class="tg-title-box">
			    <td colspan="2" class="tg-title">Sync Activity</td> 
			  </tr>
			  <tr>
			    <td>First sync on Day 1</td>
			    <td>1</td>
			  </tr>
			  <tr>
			    <td>First sync on Day 2</td>
			    <td>3</td>
			  </tr>
			  <tr>
			    <td>First sync on Day 3 and on (4th,&nbsp;5th...)</td>
			    <td>5</td>
			  </tr>
			  <tr class="tg-title-box">
			    <td colspan="2" class="tg-title">Take part in NewsFeed</td> 
			  </tr>
			  <tr>
			    <td>Receive a treat for a post</td>
			    <td>1</td>
			  </tr>
			  <tr>
			    <td>Comment on a post</td>
			    <td>1</td>
			  </tr>
			  <tr class="tg-title-box">
			    <td colspan="2" class="tg-title">Get a higher average Score</td> 
			  </tr>
			  <tr>
			    <td>Every Sunday, you will receive treats equal to your pet’s average score for the last 7 days</td>
			    <td>Up to 100</td>
			  </tr>
			  <tr class="tg-title-box">
			    <td colspan="2" class="tg-title">Get a positon on Ranking every weekend</td> 
			  </tr>
			  <tr>
			    <td>1-50<sup>th</sup> place with a score > 70</td>
			    <td>20-200</td>
			  </tr>
			</table>
		</section>
	</article>
</div>
</div>
</template>

<script>
  import TreatsHeader from '../components/Header.vue';
  import loadingBox from '../components/loadingBox.vue'; 

  export default {
  	data () {
  		return {
  			href : '',
  			isShowLoading : true
  		}
  	},

    components: {
      	TreatsHeader,
      	loadingBox 
    },

    beforeMount () {
    	if ( window.location.href.split('?')[1] === "true" ) {
    		this.href = "menu://isBack=1";
    	}
    },

    mounted () {
    	let me = this;
    	setTimeout(function () {
            me.isShowLoading = false;
        },200);  
    }
  }
</script>

<style scoped>

	.how-list {
		list-style: none; 
		list-style-type:none;
		margin-left: 20px; 
	}

	.how-list li {
		position: relative;
	}
 	
 	.how-list li:before {
 		position: absolute;
 		left: -10px;
		content:"-";
	}

	.container {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		background-color: #FAFBFD;
	}
	article {
		display: block;
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
		background-color: #fff;
	}
	h2 {
		width: 100%; 
		font-family: Helvetica;
		font-size: 20px;
		font-weight: bold;
		text-align: justify;
		text-align: left;
		color: #ff896a; 
		padding-bottom: 5px;
	}
	section {
		margin-top: 10px;
		margin-bottom: 10px;
		width: 100;
		font-family: Helvetica;
		font-size: 14px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.5;
		color: #232323; 
	}

	.tg {
		width: 100%;
	}
	
	.right-box {
		width : 40%;
	}

</style>