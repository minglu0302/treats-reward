function GET() {
	let url = window.document.location.href.toString();
	let u = url.split("?");
	if(typeof(u[1]) == "string"){
	    u = u[1].split("&");
	    let get = {};
	    for(let i in u){
	        let j = u[i].split("=");
	        get[j[0]] = j[1];
	    }
	    return get;
	} else {
	    return {};
	}
}

function format (format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}

function request (option = {}, cb = '') {
      $.ajax({
          url: option.url ,
          type: option.type ,
          data : option.data ,
          error : option.error,
          timeout : 60000,
          dataType: "json",
          async : option.async ? option.async : true, 
          success: function(data) {
              cb(data);
          },
          complete : function(XMLHttpRequest,status) { //请求完成后最终执行参数  
              
      　　　　if(status=='timeout' || status=='error'){ //超时,status还有success,error等值的情况 
      　　　　　  console.log(option.timeoutFn);
                  if ( option.timeoutFn ) { 
                      console.log(status);
                      option.timeoutFn();
                  }
      　　　　}
      　　}
      }); 
}

function checkClient(){
    var u = window.navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
    if ( isAndroid ) return 0; 
    if ( isiOS ) return 1;
    return 1;
}

function formatDate(nDate) { 
    nDate = nDate.replace(" ", "T"); 
    let newDate = new Date(nDate);
    return newDate.toLocaleString();
    //return nDate;
}

export default {  
	GET,
	format,
  request,
  checkClient,
  formatDate
};