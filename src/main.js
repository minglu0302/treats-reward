import Vue from 'vue';
import routes from './routes'; 
import './public/css/public.scss';

window.app = new Vue({
  el: '#app', 
  data: {
    currentRoute: 'List?'
  },
  computed: {
    ViewComponent () { 

      let urlHash = window.location.hash.split("#"); 
      this.currentRoute = ( urlHash.length === 1 ) ? 'List?' : urlHash[1] ; 
      const matchingView = routes[this.currentRoute.split("?")[0]]  
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) { 
    return h(this.ViewComponent);
  }
});

window.app.__proto__.go = function(strHash) {
   window.location.href = "#" + strHash;
}

window.app.__proto__.reload = function() {
   window.location.reload();
}

window.app.__proto__.amazonGo = function(asinNumber) {
   if (asinNumber) window.location.href = 'product://asin=' + asinNumber;
}

window.addEventListener('hashchange', () => { 
  app.currentRoute = window.location.hash.split("#")[1]; 
});

window.addEventListener("DOMContentLoaded", function () { 
  if ( window.location.href.split("#").length === 1 ) { 
      window.location.href = "#/List";
      app.currentRoute = '/List';
  }

  if ( window.localStorage ) window.localStorage.itemsCurrentPage = undefined;
  if ( window.localStorage ) window.localStorage.scrollTop = 0; 
  
}, false); 