
const PARAMETER = {
	MAX_DUIRATION : 0.7,
	MAX_MOVE_VAL : 100
}

const STYLE = {
	LOADINGBOX : {
		position : "absolute",
		left : "0px;",
		top : "0px",
		height : "45px",
		width : "100%",
		backgroundColor : "transparent", 
		justifyContent : "center",
		alignItems: "center",
		zIndex : "998",
		display : "none"
	}
}

const IMG = {
	DOWN_ARROW : 'data:image/png;base64,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'
	
}

class Crefresh {
	constructor (option = {}) {
		let target = document.querySelector(option.selector);
		this.isStart = false;
		let mouseDistance = 0; 
		this.target = {
			dom : target,
			height : target.offsetHeight,
			top : target.offsetTop
		} 

		let loadingBox = document.createElement('div');
		for(let key in STYLE.LOADINGBOX ) {
			loadingBox.style[key] = STYLE.LOADINGBOX[key];
		}
		target.parentNode.insertBefore(loadingBox,target);
		this.target.dom.style.transform = "translateZ(0)";
		this.target.dom.addEventListener('touchstart',(event) => { 
			this.firstTouchY = event.touches[0].screenY; 
			if ( window.document.body.scrollTop === 0 ) {
				mouseDistance = event.touches[0].clientY - this.target.dom.offsetTop;  
				this.target.dom.style.position = "absolute"; 
				this.target.dom.style.top = this.target.top + 45 + 'px';
				this.target.dom.style.zIndex = "999";
				loadingBox.style.display = "flex";
				loadingBox.style.top = this.target.top + "px"; 
				this.isStart = true;
			}
		},false); 
		loadingBox.innerHTML = option.loadingHtml;
		this.target.dom.addEventListener('touchmove', (event) => {  
			if ( this.isStart === true ) {
				if ( event.touches[0].screenY > this.firstTouchY  ) {
					event.preventDefault();
					var val = (event.touches[0].screenY - mouseDistance) - ( this.target.dom.offsetTop * 0.9); 
					if ( val > this.target.dom.offsetTop) { 
						event.preventDefault();
						loadingBox.style.display = "flex";
						loadingBox.style.top = this.target.top + "px"; 
					}
					if ( (event.touches[0].screenY - this.firstTouchY  ) >= 45 ) {
						event.preventDefault(); 
					}
				} else {
					this.isStart = false
					this.target.dom.style.transition = "";
					this.target.dom.style.top = "";  
					this.target.dom.style.position = "static"; 
					loadingBox.style.display = "none"; 
				}
			}
		},false);

		this.target.dom.addEventListener('touchend', () => {
			if ( this.isStart === true  ) { 
				if ( this.target.dom.offsetTop > this.target.top ) {
					this.target.dom.style.transition = "all "+ PARAMETER.MAX_DUIRATION +"s ease-out";
					this.target.dom.style.top = this.target.top + 45 + 'px';
					setTimeout(() => {
						this.target.dom.style.transition = "all "+ PARAMETER.MAX_DUIRATION / 2 +"s ease-out";
						console.log( this.target.top );
						this.target.dom.style.top = this.target.top + 'px';
						setTimeout(() => {
							this.target.dom.style.transition = "";
							this.target.dom.style.top = "";  
							this.target.dom.style.position = "static"; 
							loadingBox.style.display = "none"; 
							mouseDistance = 0;
							option.done();
						}, (PARAMETER.MAX_DUIRATION / 3) * 1000);
					},1000); 
					this.isStart = false;
				} 
			}
		},false);

	}

}

export default {   
	Crefresh
};
