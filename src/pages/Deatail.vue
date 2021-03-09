<template>
<div style="background-color:#F9F9F9;">
    <TreatsHeader :model='2' :title="'Product Detail'" ></TreatsHeader>
    <loadingBox :isShow="isShowLoading" v-show="isShowLoading" :timeout="isTimeout" :data-timeout="timeout" :paddTop="isiOS ? '30' : '0'" >
        <div class="load-deatail-page"></div>
    </loadingBox> 
    <Mask1 v-if="isShowPrompt"></Mask1>
    <Prompt v-if="isShowPrompt" v-on:closeprompt="closePrompt" :goods="deatail"></Prompt> 

    <div class="top-slide"> 
        <sliderImage v-if="sliderImageList[0].src.toString().indexOf('default-product.png') === -1" :pages="sliderImageList" :sliderinit="sliderImageInit" @slide='handleImageSlide' v-bind:sty="sliderImageStyle">
        <!-- slot  -->
        </sliderImage>
        <div class="default-product-warp" v-if="sliderImageList[0].src.toString().indexOf('default-product.png') !== -1" >
             <img class="default-product" :src="default_product"  >
        </div> 
       
    </div>
    
    <div class="info-box"> 
        <div class="item-info-title-warp">
            <div class="item-info-title">{{ deatail['item-name'] }}</div> 
        </div>
        
        <div class="item-info-price-warp"> 
            <div>
                <span class="item-info-newprice" v-html="each(deatail['discount_price'])"></span> 
                <span class="item-info-oldprice">{{deatail['price'] === '' ? '' : deatail['price']}}</span>
            </div> 
            <div class="item-redeem-warp">
                <span class="item-redeem-icon"><img :src="treat_icon" alt=""></span>
                <span class="item-redeem-treatnum">{{ deatail['treats_worth'] }}</span>
            </div> 

        </div>

        <div class="item-proprice-warp" >
            <div class="item-promotion-warp" v-if="deatail['tag_is_show'] === 1">
                <span class="item-promotion" >{{deatail['tag']}}&nbsp;</span>
            </div>

        </div>
    
        <div class="info-box-date"><span style="color:#8e99a8;">Expiration Date: </span>{{ formatDate(deatail['end_date']) }}</div>

        <div class="info-box-description">
            <h1 >Promotion description</h1>  
            <p>{{ deatail['promotion_description'] }}</p>
        </div>

        <div class="button-box"><button  :class="{
                                    'product-detail-redeem-button' :  Number(userTRNum) >= Number(deatail['treats_worth']) ,
                                    'product-detail-redeem-unavailable-button' :  Number(userTRNum) < Number(deatail['treats_worth'])
                                }"
        @click="showPrompt" >Redeem</button></div>
    </div>
        
    <div class="description-tab-box" >
        <div class="header-button">
            <div class="deatail-button-active"  >Product description</div> 
        </div>

        <div class="description-content">
            <p v-html="deatail['item-description']" >  </p> 
        </div>
    </div>

    <div class="description-tab-box" v-if="false">
<!--         <div class="header-button">
            <div v-bind:class="{ 'active': (activeNum === 0)}" @click="turnTo(0)">Description</div>
            <div v-bind:class="{ 'active': (activeNum === 1)}" @click="turnTo(1)">Related</div>
            <div v-bind:class="{ 'active': (activeNum === 2)}" @click="turnTo(2)">Review</div>
            <div v-bind:class="{ 'active': (activeNum === 3)}" @click="turnTo(3)">FAQ</div>
        </div> -->


<!--         <sliderContent :contentType="1" :alldata="descriptionData" :pages="sliderContentList" :sliderinit="sliderContentinit" @slide='handleContentSlide' >
         
        </sliderContent> -->
    </div>
</div>
</template>
<script>
import loadingBox from '../components/loadingBox.vue'; 

import common from '../common/common.js';
import TreatsHeader from '../components/Header.vue';
import sliderImage from '../components/slider/slider_image.vue';
import sliderContent from '../components/slider/slider_content.vue';

import Prompt from '../components/Prompt.vue';
import Mask1 from '../components/Mask1.vue';

import publicConf from '../common/public.conf.js';
import API from '../common/public.api.js';

const baseUrl = publicConf.currentBaseUrl;
export default {  
     data () {

        return {
            isAndroid : false, 
            isiOS : false,
            isTimeout : false,
            isShowLoading : true,
            userTRNum : 0,
            activeNum : 0,
            treat_icon : baseUrl + "treat-icon.png",  
            default_product : baseUrl + "default-product.png",
            isShowPrompt : false,
            deatail : {
                'end_date' : "2017-03-15 08:10:00",
                'product-id' : "1",
                'image-url' : baseUrl + "default-product.png",
                'item-description' : "",
                'item-name' : "Discount on Dog Seat Belt Harness,Adjustable Pet Dog Cat Safety Leads Car Vehicle Seat Belt Harness Seatbelt,2 Pack Durable Nylon Dog Seat Belt Strap Designed by Friends Forever",
                'pid' : "3232",
                'promotion_description' : "Save 1% each on these items when you purchase 2 or more.",
                'promotion_type' : "Discount",
                'promotion_type_value' : "1%",
                'treats_worth' : "2",
                'discount_price' : ''
            }, 
            /* Image */
            sliderImageList:[
                {
                    src : baseUrl + "default-product.png" 
                }
            ],
            sliderImageInit: {
                currentPage: 0,
                start: {},
                end: {},
                tracking: false,
                thresholdTime: 500,//滑动判定距离
                thresholdDistance: 100,//滑动判定时间
                loop:false,//无限循环
                // autoplay:1000,//自动播放:时间[ms]
            },
            sliderImageStyle: {
                height : '360px',
                width : '100%'
            },

            /* Content */
            descriptionData : [ 
                {
                  id : "Description",
                  cover : baseUrl + "pr02.png"
                },
                {
                  id : "Related",
                  cover : baseUrl + "pr02.png"
                }, 
                {
                  id : "Review",
                  cover : baseUrl + "pr02.png"
                },
                {
                  id : "FAQ",
                  cover : baseUrl + "pr02.png"
                }
            ],

            sliderContentList:[
                {
                    title: '',
                    style:{
                         'background':'#fff',
                    },
                },
                {
                    title: '',
                    style:{
                         'background':'#fff',
                    },
                },
                {
                    title: '',
                    style:{
                         'background':'#fff',
                    },
                },
                {
                    title: '',
                    style:{
                         'background':'#fff',
                    },
                }
            ],

            sliderContentinit: {
                currentPage: 0,
                // start: {},
                // end: {},
                // tracking: false,
                thresholdTime: 500,//滑动时间阈值判定距离
                thresholdDistance: 100,//滑动距离阈值
                // direction:'vertical',//垂直滚动
                // loop:true,//无限循环
                // autoplay:1000,//自动播放:时间[ms]
            },

            sliderContentStyle: {
                height : '706px',
                width : '100%'
            }

        }
    },
 

    beforeMount () {  
        setTimeout(function () { 
            window.document.body.style.overflow = "auto";
        },100);

    },

    mounted () {
        if ( common.checkClient() === 0 ) this.isAndroid = true;
        if ( common.checkClient() === 1 ) this.isiOS = true;
        
        let deatailId = common.GET()['deatailId'];
        let pid = common.GET()['pid'];
        let userId = this.userId = common.GET()['userId'];  
        let me = this;

        common.request({
            url : API.TREATS.GET_TREATS_DETAIL + "/" + deatailId + "/" + pid,
            type : 'GET', 
            timeoutFn : function () { 
              this.isTimeout = true; 
            }.bind(me)
        }, function (data) {
            if ( data.code === 101 ) {
                window.location.href = '#/List'+"?userId="+userId;
                return false;
            }
            me.deatail = data.data[0];  
            let imageUrl = data.data[0]['image-url'].split(',');
            me.sliderImageList = [];
            imageUrl.forEach((itemUrl) => {
                me.sliderImageList.push({
                    src : itemUrl === "" ? me.default_product : itemUrl
                });
            });

            common.request({
                url : API.TREATS.GET_TREATS_USER_INFO + "/" + userId,
                type : 'GET', 
                timeoutFn : function () { 
                  this.isTimeout = true; 
                }.bind(me)
            },function (data) { 
                me.userTRNum = data.data[0].total_reward_points;  

                setTimeout(function () {
                    me.isShowLoading = false;
                },200);  
            });
                

        });





    },

    components: {
        sliderImage,
        sliderContent,
        Mask1,
        Prompt,
        TreatsHeader,
        loadingBox,
        Mask1
    },

    methods: {
        turnTo (num) {
            // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
            this.$children[1].$emit('slideTo', num); 
        },
        slideNext () {
            this.$children[0].$emit('slideNext');
        },
        slidePre () {
            this.$children[0].$emit('slidePre');
        },
        appendslider(){
            this.someList.push({
                title: 'slidernew',
                style:{
                    background:'#333',
                    color:'#fff'
                }
            });
        },
        // 监听事件也发生了变化,需要指向一个子组件实例
        handleContentSlide(pagenum) {
            this.activeNum = pagenum; 
        },

        handleImageSlide(pagenum) { 
        },

        showPrompt () {  
            if ( Number(this.userTRNum) >= Number(this.deatail['treats_worth']) ) { 
                this.isShowPrompt = true;  
                window.document.body.style.overflow = "hidden"; 
            }
        },

        closePrompt (info, item) { 
            this.isShowPrompt = false; 
            setTimeout(function () { 
                window.document.body.style.overflow = "auto";
            },100);
            if ( info === "success" && item !== '') {
                this.isShowLoading = true;
                this.go('/SuccessDetail?promotionCode='+ item.promotionCode + "&productId=" + item.productId);
            }
            if ( info === "tryagain" ) {
                this.reload();
            }
        },

        formatDate(nDate) {
            nDate = nDate.replace(" ", "T"); 
            let newDate = new Date(nDate);
            return newDate.toLocaleString();
        },

        each (str) { 
            var strArr = str.split(" ");
            if (strArr[1] === 'each' ) {
                return strArr[0] + "&nbsp;<span style='font-size:12px;'>each</span>"
            } else {
                return str;
            }
        }

    },

}
</script>

<style scoped>  

.description-content {
    margin-top: 10px;
    padding: 20px;
    background-color: #fff; 
    font-family: Helvetica;
    font-style: normal;
    font-stretch: normal;
    font-size: 14px;
}

.description-content p {  
    margin:0px;
    font-size: 14px;
    color: #232323;
    line-height: 1.5;
}  

.description-content ul {
    margin-top: 10px;
    list-style: none; 
    list-style-type:none;
    margin-left: 20px; 
}

.description-content ul li {
    position: relative;
}

.description-content ul li:before {
    position: absolute;
    left: -10px;
    content:"-";
}

.header-button {
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center; 
    margin-left: 10px;
    width:100%; 
    height:30px;
    box-sizing: border-box;
    background-color: #FAFBFD;
    font-family: Helvetica;
    font-size: 14px; 
    color:#cccccc;
}

.header-button div {
    line-height: 30px;
    height: 30px;
}

.deatail-button-active {
    color: #232323;
    border-bottom: 2px solid #31b9f2;
} 

.top-slide {
    width: 100%;
    height: 360px;
    box-shadow: inset 0 -1px 0 0 rgba(229, 229, 229, 0.5);
    background-color: #fff; 
}

.info-box {
    box-sizing: border-box;
    margin-top: 9px; 
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #fff;
}

.info-box-title {   
    font-size: 18px;
    color: #2f2f2f; 
}

.info-box-num img {
    height: 14px;
    width: 14px;
}

.info-box-num {
    height: 23px;
    width: 100%;
    display: flex; 
    flex-direction: row;
    justify-content: flex-start;
    align-items: center; 
    font-size: 14px; 
    color: #31b9f2; 
    font-weight: bold;
}

.info-box-date {
    width: 100%; 
    font-size: 12px;
    color: #233333;
}

.info-box-description {
    margin-top: 10px;
}

.info-box-description h1 {  
    width: 100%; 
    font-size: 12px; 
    color: #8e99a8; 
}

.info-box-description p {
    padding: 0px; 
    margin: 0px;
    width: 100%; 
    font-size: 12px; 
    color: #232323;
    line-height: 16px;
}

.button-box {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
 

.description-tab-box {
    margin: 10px; 
    width: calc(100% - 20px);
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


.item-redeem-icon {
    display:block;
    float: left; 
}

.item-redeem-icon img {
    height: 14px;
    width: 14px;
} 

.item-redeem-warp {
    margin-top: 3px; 
    display: flex;
    justify-content: flex-end;
}

.item-redeem-treatnum { 
    display:block; 
    float: left;
    padding-left: 5px; 
    font-size: 14px;
    font-weight: 600; 
    color: #ff896a;
}

.item-proprice-warp {
    margin-top: 5px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.item-promotion-warp {
    height: 24px;  
    line-height: 24px;
    position: relative;
}

.item-promotion {
    display: inline-block;
    padding-left: 10px;
    padding-right: 11px;
    height: 24px;
    background-color: #31b9f2; 
    line-height: 24px; 
    font-size: 12px; 
    color: #ffffff;
}

.item-promotion:after { 
    content: '';
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-right: 12px solid #fff;
    border-bottom: 12px solid transparent;
    position: absolute;  
}


.item-info-price-warp {  
    margin-top: 5px;
    height: 21px; 
    display: flex;
    justify-content: space-between;
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

.default-product { 
/*    height: 200px !important;
    width: 200px !important;*/
    height: 100%;
}

.default-product-warp {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>