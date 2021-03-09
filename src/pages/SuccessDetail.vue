<template>
	<div> 
		
		<Alert v-show="isShowAlert"></Alert>
		<loadingBox  :isShow="isShowLoading" v-show="isShowLoading" :timeout="isTimeout" :paddTop="isiOS ? '30' : '0'" >
			<div class="load-success-deatail-page"></div>
		</loadingBox>
		<TreatsHeader :model='2' :title="''" ></TreatsHeader> 
		<div class="cover-warp">
		 	<img :src="splitImg(item['image-url'])" :onerror="'this.style.height=\'180px\';this.style.width=\'180px\';this.src=\''+default_product+'\''"/>
		</div>
		<div class="info-warp">
			<div class="item-info-title-warp">
				<div class="item-info-title">{{item['item-name']}}</div> 
			</div>
			<div class="item-info-price-warp"> 
				<div>
					<span class="item-info-newprice">{{item['discount_price']}}</span>
					<span class="item-info-oldprice">{{item['price'] === '' ? '' : item['price']}}</span>
				</div>
				
				<div class="item-redeem-warp">
					<span class="item-redeem-icon"><img :src="treat_icon" alt=""></span>
					<span class="item-redeem-treatnum">{{item['treats_worth']}}</span>
				</div>
			</div>
			<div class="item-info-prodes-warp">
				<div class="item-info-typename">Promotion description </div> 
				<div class="item-info-prodes">{{item['promotion_description']}}</div>
			</div>
			<div class="item-info-date-warp">
				<div class="">
					<div class="item-info-typename">Redeem date </div> 
					<div class="item-info-date">{{formatDate(item['redeem_date'])}}</div>
				</div>
				<div class="">
					<div class="item-info-typename">Expiration date</div> 
					<div class="item-info-date">{{formatDate(item['end_date'])}}</div>
				</div>
			</div> 
			<div class="item-info-date-procode"> 
				<div class="item-info-typename">Promotion code:</div> 
				<div class="item-info-code">
					<div class="code-warp">{{promotionCode.split('-')[0]}}</div>
					<div class="code-line">-</div>
					<div class="code-warp">{{promotionCode.split('-')[1]}}</div>
					<div class="code-line">-</div>
					<div class="code-warp">{{promotionCode.split('-')[2]}}</div>
				</div>
			</div>
		</div>
		<div class="horizontal-line"></div>
		<div class="foot-button-warp"> 
			<button class="copy-code-button" :id="'copyButton'+item['product-id']"  :data-clipboard-target="'#code'+item['product-id']" v-on:click="showAlert" >Copy code</button>
			<button class="buy-amazon-button" @click="amazonGo(item['asin'])" >Buy on Amazon</button>
		</div>
		<input :id="'code' + item['product-id']" v-model="promotionCode" style="opacity:0;position: fixed;left: -10000px;top:-10000px;">
	</div>
</template>

<script> 
	import loadingBox from '../components/loadingBox.vue'; 
	import Mask1 from '../components/Mask1.vue';
	import Alert from '../components/Alert.vue';
	import common from '../common/common.js';
	import TreatsHeader from '../components/Header.vue';
	import sliderImage from '../components/slider/slider_image.vue';
	import sliderContent from '../components/slider/slider_content.vue'; 

	import publicConf from '../common/public.conf.js';
	import API from '../common/public.api.js';
 
	const baseUrl = publicConf.currentBaseUrl;

	export default { 
		data () {
			return {
				isAndroid : false, 
				isiOS : false,
				formatDate : common.formatDate,
				default_product : baseUrl + "default-product.png",

				treat_icon : baseUrl + "treat-icon.png",
				isShowLoading : true,
				isShowAlert : false,
				isTimeout : false,
				promotionCode : '',
				item : {
					'image-url' : baseUrl + "default-product.png",
					'redeem_date' : '2017-03-15 08:10:00',
					'end_date' : '2017-03-15 08:10:00',
					'product-id' : '0'
				}
			}
			
		},

		components: { 
			loadingBox,
			Mask1,
			TreatsHeader,
			Alert
		},

		mounted () {
			if ( common.checkClient() === 0 ) this.isAndroid = true;
			if ( common.checkClient() === 1 ) this.isiOS = true;

			let me = this;
			this.promotionCode = common.GET()['promotionCode']; 
			let productId =  common.GET()['productId'];
			common.request({
			    url : API.TREATS.GET_TREATS_DETAIL_AFTER + "/" + productId + "/" + me.promotionCode ,
			    type : 'GET',
			    timeoutFn : function () { 
			      this.isTimeout = true;  
			    }.bind(me)
			},function (data) {
				me.item = data.data[0];

			    setTimeout(function () {
			    	me.isShowLoading = false;
			    },200);

			    new Clipboard('#copyButton' + me.item['product-id']);
			});

			$('#code' + this.item['product-id']).focus(function() {
				setTimeout(function () {
					window.document.activeElement.blur();
				}, 100);
			});
		},

		methods : {
			splitImg (urls) {
				return urls.split(",")[0];
			},

			showAlert() {
				this.isShowAlert = true; 
				setTimeout (() => {
				     this.isShowAlert = false;
				},700); 
			},

			splitImg (urls){
				return urls.split(",")[0];
			}
		}
	}
</script>

<style scoped>
	.cover-warp {
		height: 263px;
		width: 100%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cover-warp img {
		width: 260px;
  		height: 260px;
	}

	.info-warp {
		box-sizing: border-box;
		margin-top: 20px;
		width: 100%;
		background-color: #fff;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 30px;
		padding-right: 30px;
	}

	.item-info-title-warp {
		box-sizing: border-box;
		width: 100%;
		display: flex; 
		justify-content: space-between;
	}

	.item-info-title { 
		font-size: 18px; 
		color: #2f2f2f;
	}

	.item-redeem-warp {
		margin-top: 3px;
		min-width: 43px;
	}

	.item-redeem-treatnum { 
		display:block; 
		float: left;
		padding-left: 5px; 
		font-size: 14px;
		font-weight: 600; 
		color: #ff896a;
	}

	.item-redeem-icon {
		display:block;
		float: left; 
	}

	.item-redeem-icon img {
		height: 14px;
   	 	width: 14px;
	}

	.item-info-price-warp { 
		margin-top: 10px;
		margin-bottom: 15px;
		height: 21px;
		width: 100%;
		display: flex;
		justify-content:space-between;
		align-items: baseline;
	}

	.item-info-newprice {  
		height: 100%; 
		font-size: 18px; 
		color: #31b9f2;
	}

	.item-info-oldprice { 
		margin-left: 5px;
		height: 100%;  
		color: #c9c9c9;
		font-size: 14px;
		text-decoration:line-through;
	}

	.item-info-typename {
		color: #8e99a8;
		font-size: 12px;
	}

	.item-info-prodes { 
		font-size: 12px; 
		color: #233333;
	}

	.item-info-date-warp {
		margin-top: 15px;
		width: 100%;
		display: flex;
		justify-content:space-between;
	}

	.item-info-date {
		font-size: 12px;
	}

	.code-warp { 
		padding-left: 5px;
		padding-right: 5px;
		height: 24px;
		font-size: 14px;
		background-color: #fafafa;
		color: #1e2c49;
		border: solid 1px #eeeeee;
		line-height: 24px; 
		text-align: center;
	}
	.code-line {
		width: 20px;
		line-height: 20px;
		text-align: center;
	}

	.item-info-code {
		margin-top: 10px;
		display: flex;
		justify-content: flex-start;
	}

	.item-info-date-procode {
		margin-top: 18px;
	}

	.horizontal-line {
		width: calc(100% - 14px);
		margin: auto;
		height: 1px; 
		background-color: #fafafa;
	}

	.foot-button-warp {
		background-color: #fff;
		display: flex;
		padding: 15px;
		box-sizing: border-box;
		justify-content: space-between;
		height: 61px;
		width: 100%;
		margin-bottom: 20px;
	}
</style>