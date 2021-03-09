<style>
.sliderButton {
  text-align: center;
}
.sliderButton button {
  display: inline-block;
  background: #fff;
  border-radius: 3px;
  height: 30px;
  border: 1px solid #333;
  line-height: 30px;
  margin-left: 10px;
  padding: 0 15px;
  margin-top: 10px;
}
.header-button {
  height: 30px;
  margin-bottom: 10px;
}
.headerButton {
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width:100%;
  height:30px;
  background-color: #fff;
  font-family: Helvetica;
  font-size: 14px;
  color:#1e2c49;
}
.headerButton div {
  line-height: 30px;
  height: 30px;
}
.active {
  color: #ff896a;
  border-bottom: 2px solid #ff896a;
} 


  .header {
    display: flex;
    align-items: flex-end;
    width: 100%;
    position: fixed;
    background-color: #fff;   
    z-index: 13;
    border-bottom: 1px solid #E8EBEE;
  }
  .direction-left {
    justify-content: flex-start;
  }
  .direction-center {
    justify-content: space-between;
  }

  .androidHeight {
    height: 55px;
  }
  .iosHeight {
    height: 70px;
  }
  .header-menu {  
    height: 55px;
    width: 100%; 
    display: flex; 
    background-color: #fff; 
    align-items: center;
  }

  .menu-title {
    font-size: 17px;
    color: #1e2c49;
  }

  .menu-button {
    height: 55px;
    width: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-img { 
    height: 15px;
    width: 17px;
  }

  .back-img {
      height: 15px;
      width: 18px;
  }
</style>
</style>
<template> 

<div>
  <div>
    <div class="header"  :class="{'androidHeight':isAndroid, 'iosHeight':isiOS}">  
      <div class="header-menu" :class="{'direction-left':isAndroid, 'direction-center':isiOS}" > 
        <div class="menu-button">
          <a href="javascript:history.go(-1);"><img :src="backImg" class="back-img"></a>
        </div>
        <div class="menu-title" >Rewards redeemed</div>
        <div class="menu-button"></div>
      </div>
    </div>
    <div style="background-color:#fff" :class="{'androidHeight':isAndroid, 'iosHeight':isiOS}" ></div>
  </div>
  <div class="headerButton"> 
      <div v-bind:class="{ 'active': (activeNum === 0)}" @click="turnTo(0)">&nbsp;&nbsp;&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div v-bind:class="{ 'active': (activeNum === 1)}" @click="turnTo(1)">Available</div> 
      <div v-bind:class="{ 'active': (activeNum === 3)}" @click="turnTo(3)">Expired</div>
  </div>
  <div>
      <slider :contentType="0" :alldata="alldata" :datas="datas" :pages="someList" :sliderinit="sliderinit" @slide='slide' v-on:showAlert="showAlert" >
        <!-- slot  -->
      </slider>
  </div> 
  <!--   <div class="sliderButton">
      <button @click="slidePre">上一页</button>
      <button @click="slideNext">下一页</button>
      <button @click="appendslider">添加一页</button>
      <button @click="turnTo(2)">跳转到第三页</button>
    </div> --> 
    <Alert v-show="isShowAlert"></Alert>

    <loadingBox :isShow="isShowLoading"  v-show="isShowLoading" :timeout="isTimeout" :paddTop="isiOS ? '100' : '80'" >
        <div class="load-history-page-item"></div>
        <div class="load-history-page-item"></div>
    </loadingBox> 

</div>
</template> 
<script>
import TreatsHeader from '../components/Header.vue'; 
import loadingBox from '../components/loadingBox.vue';
import Mask1 from '../components/Mask1.vue';
import Alert from '../components/Alert.vue';

import slider from '../components/slider/slider_content.vue';
import publicConf from '../common/public.conf.js';
import API from '../common/public.api.js';
import common from '../common/common.js'; 

const baseUrl = publicConf.currentBaseUrl;
export default { 
   data () {
        return {
            isAndroid : false,
            isiOS : false,
            isShowLoading : true,
            isShowAlert : false,
            isTimeout : false,

            menuImg : baseUrl + "menu.png",
            backImg : baseUrl + "back.png",

            activeNum : 0,

            datas : {
                all : [],
                available : [],
                used : [],
                expired : []
            },

            alldata : [
                {
                  id : "available",
                  cover : baseUrl + "pr02.png"
                },
                {
                  id : "available",
                  cover : baseUrl + "pr02.png"
                }, 
                {
                  id : "used",
                  cover : baseUrl + "pr02.png"
                },
                {
                  id : "used",
                  cover : baseUrl + "pr02.png"
                },
                {
                  id : "expired",
                  cover : baseUrl + "pr02.png"
                },
                {
                  id : "expired",
                  cover : baseUrl + "pr02.png"
                }
            ],
            someList:[
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
            sliderinit: {
                currentPage: 0,
                // start: {},
                // end: {},
                // tracking: false,
                thresholdTime: 500,//滑动时间阈值判定距离
                thresholdDistance: 100,//滑动距离阈值
                // direction:'vertical',//垂直滚动
                // loop:true,//无限循环
                // autoplay:1000,//自动播放:时间[ms]
            }
        }
    },
    components: {
        slider,
        TreatsHeader,
        loadingBox,
        Mask1,
        Alert
    },

    mounted () {
      // datas : {
      //     expired : [],
      //     available : [],
      //     used : [],
      //     all : []
      // }
        if ( common.checkClient() === 0 ) this.isAndroid = true;
        if ( common.checkClient() === 1 ) this.isiOS = true;

        let userId = this.userId = common.GET()['userId'];
        let rows = 0;
        let me = this; 

        common.request({ 
            url : API.TREATS.GET_HISTORY_LIST + "/" + userId + "/" + "All" + "/" + "0" + "/" + "1",
            type : 'GET',
            timeoutFn : function () { 
              this.isTimeout = true; 
            }.bind(me)
        },function (data) {
            if ( data.code === 101 ) {
              me.isShowLoading = false;
              me.datas.all = {
                'total_rows' : 0 
              }
              me.datas.available = {
                'total_rows' : 0 
              }
              me.datas.expired = {
                'total_rows' : 0 
              }
              return false; 
            }
            rows = data.data.total_rows;
            //ALL
            common.request({
                url : API.TREATS.GET_HISTORY_LIST + "/" + userId + "/" + "All" + "/" + "0" + "/" + rows,
                type : 'GET',
                timeoutFn : function () { 
                  this.isTimeout = true;  
                }.bind(me)
            },function (data) {   
 
                if ( data.code === 0 ) {
                    me.datas.all = data.data;
                } else {
                    me.datas.all = {
                      'total_rows' : 0 
                    }
                }
                
                //available
                common.request({
                    url : API.TREATS.GET_HISTORY_LIST + "/" + userId + "/" + "2" + "/" + "0" + "/" + rows,
                    type : 'GET',
                    timeoutFn : function () { 
                      this.isTimeout = true;  
                    }.bind(me)
                },function (data) {    
                    if ( data.code === 0 ) {
                        me.datas.available = data.data;
                    } else {
                        me.datas.available = {
                          'total_rows' : 0 
                        }
                    }


                    //expired
                    common.request({
                        url : API.TREATS.GET_HISTORY_LIST + "/" + userId + "/" + "0" + "/" + "0" + "/" + rows,
                        type : 'GET',
                        timeoutFn : function () { 
                          this.isTimeout = true;  
                        }.bind(me)
                    },function (data) { 
                        if ( data.code === 0 ) {
                            me.datas.expired = data.data;
                        } else {
                            me.datas.expired = {
                              'total_rows' : 0 
                            }
                        }
                        
                        setTimeout(function () {
                          me.isShowLoading = false;
                        },200); 
                    }); 
                }); 
            }); 
        }); 

    },

    methods: {
        turnTo (num) {
            // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
            this.$children[0].$emit('slideTo', num);
            console.log(num);
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
        slide(pagenum) {
            this.activeNum = pagenum; 
        },

        showAlert(str) {
            this.isShowAlert = true;

            setTimeout (() => {
                 this.isShowAlert = false;
            },700); 
        }
    },
}
</script>
