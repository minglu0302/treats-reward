<template>
<div style="height:100%;width:100%;position:relative;" id="body">
	<TreatsHeader :model="0" :title="'Treats rewards'"></TreatsHeader> 
	<div :class="{'android-float':isAndroid, 
				  'ios-float':isiOS, 
				  'treats-info-warp-normal':!isShowTopBar,
				  'treats-info-warp-small' : isShowTopBar}" style="-webkit-transform: translateZ(0);"> 
		<img class="treats-icon" v-bind:src="treat_icon">
		<div class="treats-num">{{userTRNum}}</div> 
		<div class="treats-name">treats</div>
	</div>
	<div class="header-warp">
		<div style="height:43px;"></div>
		<div class="treats-guide" @click="go('/How?userId='+ userId)" >How to earn treats?</div>
		<div class="treats-history-button">
			<button class="button1" @click="go('/History?userId='+ userId )" >Rewards redeemed</button>
		</div>
	</div>
	<loadingBox :isShow="isShowLoading" v-show="isShowLoading" :timeout="isTimeout" :paddTop="isiOS ? '70' : '50'" >
		<div class="load-list-page-header"></div>
		<div class="load-list-page-item"></div>
		<div class="load-list-page-item load-list-page-item-marginl"></div>
		<div class="load-list-page-item"></div>
		<div class="load-list-page-item load-list-page-item-marginl"></div>
	</loadingBox>
	<Mask1 v-if="isShowPrompt"></Mask1>
	<Prompt v-if="isShowPrompt" v-on:closeprompt="closePrompt" :goods="goods"></Prompt>  
	<div v-show="isShowListRefresh" class="down-fresh-warp"><ListLoadingBox  :nodata="false"></ListLoadingBox></div>
	<div class="wrapper">
		<div class="container" v-bind:class="{ 'boxhidden': isShowPrompt}" v-on:ontouchmove.stop.prevent="isListenScroll=true">  
			<alertNodata v-if="items.length===0"></alertNodata>
			<ProductListItem v-for="(item, index) in items" :item="item" :index="index" :count="items.length" v-on:showprompt="showPrompt" :userTRNum="userTRNum">
			</ProductListItem>
			<ListLoadingBox v-show="isShowListLoading" :nodata="isNoData"></ListLoadingBox> 
		</div>
	</div>
</div>
</template>

<script>
	import alertNodata from '../components/alertNodata.vue';
	import ListLoadingBox from '../components/ListLoading.vue';
	import TreatsHeader from '../components/Header.vue';
	import ProductListItem from '../components/ProductListItem.vue'; 
	import loadingBox from '../components/loadingBox.vue';
	import Mask1 from '../components/Mask1.vue';
	import Prompt from '../components/Prompt.vue';
	import common from '../common/common.js';
	import API from '../common/public.api.js';
	import publicConf from '../common/public.conf.js';
	import Crefresh from '../plugins/crefresh.js'

	const baseUrl = publicConf.currentBaseUrl;


	function transform(obj){
	    var arr = [];
	    for(var item in obj){
	    	if (typeof obj[item] != "number") {
	    		arr.push(obj[item]);
	    	}
	    }
	    return arr;
	}

	function toEnd() {
		var containerObj = document.getElementsByClassName('container')[0];
		setTimeout(function () {
		  $(".container").animate({scrollTop: ( containerObj.scrollHeight - containerObj.clientHeight - 1 )   + "px"}); 
		},1);  
	}

	export default {

		data () {
			return {
				 isAndroid : false, 
				 doScroll : true,
				 isiOS : false,

				 itemsShowNum : 6,
				 itemsCurrentPage : 0,
				 itemsTotal : 0,
				 items : [],
				 treat_icon : baseUrl + "treat-icon.png",
				 isShowPrompt : false,
				 isShowTopBar : false,
				 isShowLoading : true,	
				 isShowListLoading : false,
				 isShowListRefresh : false,
				 isTimeout : false,
				 isNoData : false,
				 isListenScroll : true,
				 scrollTop : 0,
				 userId : 0, 
				 minHeight : -(1110 - 440), 
				 disHeight : 420,
				 userTRNum : 0, 
				 goods : {}

			}
		},

		destroyed () { 
			let me = this;
			if ( document.getElementById("body") ) document.getElementById("body").style.overflow = "auto";
			setTimeout(function () {
				window.document.body.style.overflow = "auto"; 
			},100); 
			
			if ( window.localStorage ) localStorage.itemsCurrentPage = me.itemsCurrentPage;
			window.onscroll = undefined;
			document.ontouchmove = undefined; 
			window.scrollTo(0, 0);
			//if ( window.localStorage ) localStorage.scrollTop = me.scrollTop; 
		},
		
		mounted () {
			let me = this; 

			if ( common.checkClient() === 0 ) this.isAndroid = true;
			if ( common.checkClient() === 1 ) this.isiOS = true;

			this.loadInitTRpoints(me.bindRefresh);

			// let userId = this.userId = common.GET()['userId']; 

			// common.request({
			//     url : API.TREATS.GET_TREATS_USER_INFO + "/" + userId,
			//     type : 'GET',
			//     timeoutFn : function () { 
			//     	this.isTimeout = true;  
			//     }.bind(me)
			// },function (data) {  
			//     me.userTRNum = data.data[0].total_reward_points;  
			//     me.loadInitData(me.bindRefresh); 
			// }); 

			// window.onscroll = function (e) {
			// 	if ( window.document.body.scrollTop !== 0 && me.doScroll === true) {
			// 		me.scrollTop = window.document.body.scrollTop; 
			// 		window.localStorage.scrollTop = window.document.body.scrollTop + ''; 

			// 		if ( window.document.body.scrollTop >= 80 ) { 
			// 			if ( me.isShowTopBar !== true ) {
			// 				me.isShowTopBar = true;
			// 				$(".header-warp").css("opacity", "0");
			// 				$(".header-warp").css("height", "40.8px");
			// 			}
			// 		} else {
			// 			if ( me.isShowTopBar !== false ) {
			// 				me.isShowTopBar = false;
			// 				$(".header-warp").css("opacity", "1");
			// 				$(".header-warp").css("height", "");
			// 			}
			// 		} 

			// 		if ( window.document.body.scrollTop >= (window.document.body.offsetHeight  -  window.screen.availHeight ) &&  ( me.isShowListLoading === false) 
			// 		   ) { 
			// 			me.isShowListLoading = true; 
			// 			common.request({
			// 			    url : API.TREATS.GET_TREATS_LIST + "/" + me.itemsCurrentPage + "/" + me.itemsShowNum,
			// 			    type : 'GET',
			// 			    timeoutFn : function () { 
			// 			    	this.isTimeout = true;  
			// 			    }.bind(me)
			// 			},function (data) { 
			// 				let dataArr = transform(data.data);
			// 				if ( dataArr.length === 0 ) { 
			// 					me.isShowListLoading = true;
			// 					me.isNoData = true;
			// 				} else {  
			// 					me.itemsCurrentPage++; 
			// 					setTimeout(function () { 
			// 						me.items = me.items.concat(dataArr); 
			// 						me.isShowListLoading = false;
			// 					},500);
			// 				} 
			// 			}); 
			// 		}
			// 	}
			// };

			document.getElementById("body").style.overflow = "hidden";
			window.document.body.style.overflow = "hidden"; 

			document.ontouchmove = function (evt) {
			    evt.preventDefault();
			};

		},

		methods : {
			closePrompt (info, item) {
				this.isShowPrompt = false; 
				window.document.body.style.overflow = "hidden";
				if ( info === "success" && item !== '') {
					this.isShowLoading = true;
					this.go('/SuccessDetail?promotionCode='+ item.promotionCode + "&productId=" + item.productId);
				}
				if ( info === "tryagain" ) {
					this.reload();
				}
			},

			showPrompt (goods) { 
				this.goods = goods;
				this.isShowPrompt = true;   
			}, 

			scrollTo(val) {  
				this.doScroll = false;
				setTimeout(()=>{
					window.document.body.scrollTop = Number(val);   
					this.doScroll = true;
				}, 10);
			}, 

			loadInitTRpoints (callback) { 
				let me = this;
				let userId = this.userId = common.GET()['userId'];  
				common.request({
				    url : API.TREATS.GET_TREATS_USER_INFO + "/" + userId,
				    type : 'GET',
				    timeoutFn : function () { 
				    	this.isTimeout = true;  
				    }.bind(me)
				},function (data) {

				    me.userTRNum = data.data[0].total_reward_points;
                    if(userId.length ==0 && data.data[0].total_reward_points==0){
                        history.go(-1);
                    }
				    me.loadInitData(callback);
				}); 

			},

			loadInitData(callback) {
				let me = this;
			    let itemsCurrentPage = 0;
			    let itemsShowNum = me.itemsShowNum;

			    if ( window.localStorage ) { 
			    	if ( localStorage.itemsCurrentPage == 'undefined' ) {
			    		itemsCurrentPage = 0;
			    		itemsShowNum = me.itemsShowNum;
			    		me.itemsCurrentPage = 0;
			    	} else {
			    		itemsCurrentPage = Number(localStorage.itemsCurrentPage); 
			    		itemsShowNum = Number(localStorage.itemsCurrentPage) * me.itemsShowNum; 
			    		if ( itemsShowNum <= 0 ) itemsShowNum = me.itemsShowNum;
			    		// if ( me.itemsCurrentPage > 0 ) me.itemsCurrentPage = itemsCurrentPage - 1;
			    		me.itemsCurrentPage = itemsCurrentPage - 1;
			    		itemsCurrentPage = 0;
			    	}
			    } else {
			    	itemsCurrentPage = 0;
			    	itemsShowNum = me.itemsShowNum; 
			    	me.itemsCurrentPage = 0;
			    }

			    common.request({
			        url : API.TREATS.GET_TREATS_LIST + "/" + itemsCurrentPage + "/" + itemsShowNum,
			        type : 'GET',
			        async : false,
			        timeoutFn : function () {
			        	this.isTimeout = true;  
			        }.bind(me) 
			    },function (data) { 
			        me.items = transform(data.data);  
			        if ( me.items.length === 0 ) {
			        	me.isShowLoading = false;
			        	me.isShowListLoading = false;
			        	me.isNoData = true; 
			        } else {
			        	me.itemsTotal = data.data.total_rows;  
			        	me.isShowLoading = false;  
			        	me.itemsCurrentPage ++;   
			        }
			        setTimeout(function () {
			        	let devHeight = me.isiOS ? 70 : 55;
			        	if ( window.document && window.document.documentElement ) {
			        		if ( me.items.length < 1 ) {
			        			me.minHeight = -0;
			        		} else {
			        			if ( document.querySelector(".wrapper") ) {
			        				me.minHeight = window.document.documentElement.clientHeight - ( document.querySelector(".wrapper").clientHeight + devHeight + 50 );
			        			} 
			        		} 			        		
			        		if ( me.items.length === 1 ) {
			        			me.minHeight = -100;
			        		}
			        	}
			        	// if ( window.document.body.offsetWidth <= 320 ) { 
			        	// 	me.minHeight = window.innerHeight - ( 3000 + 216 ) 
			        	// } 
			        	if ( callback ) callback();   
			        },500);
			    });
			},

			loadNewData(at) {
				let me = this;
				me.isShowListLoading = true;
				common.request({
				    url : API.TREATS.GET_TREATS_LIST + "/" + me.itemsCurrentPage + "/" + me.itemsShowNum,
				    type : 'GET',
				    timeoutFn : function () { 
				    	this.isTimeout = true;  
				    }.bind(me)
				},function (data) { 
					let dataArr = transform(data.data);
					if ( dataArr.length === 0 ) {
						//me.isShowListLoading = false; 
						me.isNoData = true;
					} else {  
						me.itemsCurrentPage++;  
						setTimeout(() => {
							me.items = me.items.concat(dataArr); 
							me.isShowListLoading = false; 
							setTimeout(()=>{ 
								let devHeight = me.isiOS ? 70 : 55;
					        	if ( window.document && window.document.documentElement ) {
					        		if ( document.querySelector(".wrapper") ) {
					        			me.minHeight = window.document.documentElement.clientHeight - ( document.querySelector(".wrapper").clientHeight + devHeight + 50 );
					        		}
					        	}
								at.min = me.minHeight;
							},200);
						},500);
					}
				}); 
			},

			bindRefresh () {

				let me = this;
				let target = document.querySelector(".container");  
				if ( !target ) return false;
				let initialValue = 0;
				if ( window.localStorage && !isNaN(localStorage.scrollTop) && localStorage.scrollTop != 0) {
					initialValue = Number(localStorage.scrollTop);
					if (initialValue >= 0) {
						initialValue = 0;
					}
				}
				
				//给element注入transform属性
				Transform(target,true); 
				let at = null;
				window.at = at = new AlloyTouch({
				    touch:"#body",//反馈触摸的dom
				    vertical: true,//不必需，默认是true代表监听竖直方向touch
				    target: target, //运动的对象
				    property: "translateY",  //被滚动的属性
				    sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
				    factor: 1,//不必需,默认值是1代表touch区域的1px的对应target.y的1 
				    max: 0, //不必需,滚动属性的最大值 
				    min : me.minHeight,
				    initialValue : 0,
				    step: 40,
				    change : function (value) {	 	    
			        	if ( value < -80 ) {
			    			if ( me.isShowTopBar !== true ) {
			    				me.isShowTopBar = true;
			    				$(".header-warp").css("opacity", "0");
			    				$(".header-warp").css("height", "40.8px");
			    			}
			    		} else {
			    			if ( me.isShowTopBar !== false ) {
			    				me.isShowTopBar = false;
			    				$(".header-warp").css("opacity", "1");
			    				$(".header-warp").css("height", "");
			    			}
			    		} 
			    		if ( window.localStorage ) { 
			    			if ( value < me.minHeight ) {
			    				localStorage.scrollTop = me.minHeight;  
			    			} else {
			    				localStorage.scrollTop = value;
			    			}
			    		}
				    },
				    touchMove: function (evt, value) { 
				    	if ( (value < me.minHeight ) &&  ( me.isShowListLoading === false)  ) {
				    		if ( me.items.length > 0 ) {
				    			me.loadNewData(at)
				    		}
				    	}
				    	if ( value > 70 ) {
				    		me.isShowListRefresh = true;
				    	}

	 			    }, 
				    touchEnd: function (evt, value) { 
				        if (value > 70) {  
				        	me.loadInitTRpoints(); 
				        	this.to(40);
				        	setTimeout(() => {
				        		at.to(0);
				        		at.min = me.minHeight;
				        		me.isShowListRefresh = false;    
				        		me.isShowListLoading = false; 
				        	}, 1000);
				        	return false; 
				        }
				    }
				});  	  
				
        		if ( Number(localStorage.scrollTop) <= me.minHeight ) {
        			window.at.to(me.minHeight);
        		} else {
        			window.at.to( Number(localStorage.scrollTop) );
        		} 

		    	if ( window.at.getValue() < -80 ) {
					if ( me.isShowTopBar !== true ) {
						me.isShowTopBar = true;
						$(".header-warp").css("opacity", "0");
						$(".header-warp").css("height", "40.8px");
					}
				} else {
					if ( me.isShowTopBar !== false ) {
						me.isShowTopBar = false;
						$(".header-warp").css("opacity", "1");
						$(".header-warp").css("height", "");
					}
				}

			}


			// listenDropDownFresh () {
			// 	let me = this;
			// 	let container = new Crefresh.Crefresh({
			// 		selector : '.container',
			// 		loadingHtml : ` 
			// 			<div class="spinner">
			// 			  <div class="spinner-container container1">
			// 			    <div class="circle1"></div>
			// 			    <div class="circle2"></div>
			// 			    <div class="circle3"></div>
			// 			    <div class="circle4"></div>
			// 			  </div>
			// 			  <div class="spinner-container container2">
			// 			    <div class="circle1"></div>
			// 			    <div class="circle2"></div>
			// 			    <div class="circle3"></div>
			// 			    <div class="circle4"></div>
			// 			  </div>
			// 			  <div class="spinner-container container3">
			// 			    <div class="circle1"></div>
			// 			    <div class="circle2"></div>
			// 			    <div class="circle3"></div>
			// 			    <div class="circle4"></div>
			// 			  </div>
			// 			</div> 
			// 		`,
			// 		done : function () {
			// 			if ( window.localStorage )  window.localStorage.itemsCurrentPage = undefined;
			// 			if ( window.localStorage )  window.localStorage.scrollTop = 0;

			//  		    let itemsCurrentPage = 0;
			//  		    let itemsShowNum = me.itemsShowNum;

			//  		    if ( window.localStorage ) { 
			//  		    	if ( localStorage.itemsCurrentPage == 'undefined' ) {
			//  		    		itemsCurrentPage = 0;
			//  		    		itemsShowNum = me.itemsShowNum;
			//  		    		me.itemsCurrentPage = 0;
			//  		    	} else {
			//  		    		itemsCurrentPage = Number(localStorage.itemsCurrentPage); 
			//  		    		itemsShowNum = Number(localStorage.itemsCurrentPage) * me.itemsShowNum; 
			//  		    		if ( itemsShowNum === 0 ) itemsShowNum = me.itemsShowNum;
			//  		    		me.itemsCurrentPage = itemsCurrentPage - 1;
			//  		    		itemsCurrentPage = 0;
			//  		    	}
			//  		    } else {
			//  		    	itemsCurrentPage = 0;
			//  		    	itemsShowNum = me.itemsShowNum; 
			//  		    	me.itemsCurrentPage = 0;
			//  		    }

			//  		    common.request({
			//  		        url : API.TREATS.GET_TREATS_LIST + "/" + itemsCurrentPage + "/" + itemsShowNum,
			//  		        type : 'GET',
			//  		        timeoutFn : function () { 
			//  		        	this.isTimeout = true;  
			//  		        }.bind(me) 
			//  		    },function (data) {   
			//  		        me.items = transform(data.data); 
			//  		        if ( me.items.length === 0 ) {
			//  		        	me.isShowListLoading = true;
			//  		        	me.isNoData = true;
			//  		        } else {
			//  		        	me.itemsTotal = data.data.total_rows;  
			//  		        	me.isShowLoading = false;  
			//  		        	me.itemsCurrentPage++; 
			//  		        	//me.listenDropDownFresh();
			//          	        if ( window.localStorage ) {
			//          		        if ( localStorage.itemsCurrentPage != 'undefined' ) {
			//          					scrollTo(localStorage.scrollTop); 
			//          		        }
			//          	    	}
			//  		        }
			//  		    });
			// 		}
			// 	}); 
			// }
		},

		components: {
			ProductListItem,
			Mask1,
			Prompt,
			TreatsHeader,
			loadingBox,
			ListLoadingBox,
			alertNodata
		}
	}
 

</script>

<style scoped>  
	.wrapper {
		height: calc(100% - 206px); 
		z-index: 8;
		top: 45px;
		bottom: 48px;
		left: 0;
		width: 100%; 
		overflow: hidden;
		background-color:  #fafbfd;
	}

	.down-fresh-warp {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
	}

	.topbar-android-top  {
		top: 55px;
	}
	.topbar-ios-top  {
		top: 70px;
	}

	.topbar { 
		position: fixed;
		left: 0px;
		width: 100%;
		background-color: #fff;
		height: 17.6px;
		line-height: 17.6px;
		text-align: center;   
  		box-shadow: inset 0 -1px 0 0 rgba(235, 235, 235, 0.5); 
		font-size: 12px; 
		color: #1e2c49;  
  		font-family: Helvetica;
  		z-index: 11;

	}

	.container{
		width: 100%;
		height: 100%;
		position: relative;
		background-color:  #fafbfd;
	}

	.container:after { 
		content: ""; 
		display:block; 
		height:0;
		visibility:hidden; 
		clear:both; 
	}


	.boxhidden {
		overflow: hidden;
	}

	.header-warp {
		height: 136px;
		width: 100%;
		background-color: #fff;
		display: block;
		transition : all 0.5s;
		padding-top: 8.8px;
		box-sizing: border-box;
	}

	.treats-info-warp-normal {
		margin: auto;
		background-color: #fff;
		height: 43px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: baseline;
		transition : all 0.5s; 
	}

	.treats-info-warp-normal > .treats-num {
		padding-left:6px;
		padding-right: 6px;
		font-size: 36px; 
		color: #1e2c49; 
		transition : all 0.5s; 
	}
	
	.treats-info-warp-normal > .treats-name {  
		font-size: 12px; 
		color: #8e99a8;
		transition : all 0.5s; 
	}

	.treats-info-warp-normal > .treats-icon {
		height: 22px;
		width: 22px;
		transition : all 0.5s; 
	}

	.treats-info-warp-small {
		margin: auto;
		background-color: #fff; 
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: baseline;
		transition : all 0.5s; 
		box-shadow : inset 0 -1px 0 0 rgba(235, 235, 235, 0.5);
	} 

	.treats-info-warp-small > .treats-num {
		padding-left:10px;
		padding-right: 10px;
		font-size: 20px; 
		color: #1e2c49; 
		transition : all 0.5s; 
	}
	
	.treats-info-warp-small > .treats-name {  
		font-size: 12px; 
		color: #8e99a8;
		transition : all 0.5s; 
	}

	.treats-info-warp-small > .treats-icon {
		height: 14px;
		width: 14px;
		transition : all 0.5s; 
	}

	.treats-guide {
		margin: auto;
		margin-top: 6.8px;
		text-align: center;
		height : 17.6px;
		line-height: 17.6px;
		font-size: 13px; 
		color: #8e99a8;   
	}

	.list-warp { 
		width: 100%;
		background-color:#FAFBFD;
	}

	.list-warp:after { 
		content:"."; 
		display:block; 
		height:0;
		visibility:hidden; 
		clear:both; 
	}

	.treats-history-button {
		margin-top: 9.8px;
		text-align: center;
	}

	.ios-float {
		position: fixed; 
		top: 70px;
		left: 0px;
		z-index: 10;
		width: 100%;
		padding-top: 9.8px;
		padding-bottom: 8px;
		background-color: #fff;
	}

	.android-float {
		position: fixed; 
		top: 55px;
		left: 0px;
		z-index: 10;
		width: 100%;
		padding-top: 9.8px;
		padding-bottom: 8px;
		background-color: #fff;
	}

</style>