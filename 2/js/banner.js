;+function($){
	$.Banner=function(main,options){
		new banner(main,options);
	}
	function banner(main,options){
		this.main=$(main);
		this.animate=options.animate;
		this.autoplay=options.autoplay;
		this.nextbtn=options.nextbtn;
		this.prevbtn=options.prevbtn;
		this.now=0;
		this.oli=this.main.children();
		this.init();
	}
	banner.prototype={
		constructor:banner,
		init(){
//			console.log(this.oli);

//点击下一页
			this.nextbtn.click(function(){
				this.change("next");
//				console.log(this.hidden,this.show)
				this.forshow();
			}.bind(this))
//点击上一页
			this.prevbtn.click(function(){
				this.change("prev");
				this.forshow();
			}.bind(this))
			
//自动轮播
			if(this.autoplay){
				this.loop();
				//移入停止自动轮播
				this.main.hover(function(){
					clearInterval(this.timer);	
				}.bind(this),function(){
					this.loop();
				}.bind(this))
			}
		},
//轮播图方向
		change(direction){
			var turnlist={
				"next":function(){
					this.hidden=this.now;
					if(this.now==this.oli.length-1){
						this.now=0;
						this.show=this.now;
					}
					else{
						this.now++
						this.show=this.now
					}
				}.bind(this),
				"prev":function(){
					this.hidden=this.now;
					if(this.now==0){
						this.now=this.oli.length-1;
						this.show=this.now;
					}
					else{
						this.now--;
						this.show=this.now;
					}
//					console.log(this.hidden,this.show);
				}.bind(this)
			}
			turnlist[direction]();
		},
//轮播图动画
		forshow(){
			var animatelist={
				"fade":function(){
					animatelist.init();
					$(this.oli[this.hidden])
					.css("opacity",1)
					.stop()
					.fadeTo(1000,"0");
					
					$(this.oli[this.show])
					.css("opacity",0)
					.stop()
					.fadeTo(1000,"1")
					
				}.bind(this),
				"slide":function(){
					animatelist.init();
					$(this.oli[this.hidden])
					.css({
						"z-index":0,
						"opacity":1	
					});
					$(this.oli[this.show])
					.css({
						"display":"none",
						"opacity":1	
					})
					.stop()
					.slideDown();
				}.bind(this),
				"init":function(){
					for(var i=0;i<this.oli.length;i++){
						this.oli[i].style.zIndex=1;
						this.oli[i].style.opacity=0;
					}
				}.bind(this)
			}
			animatelist[this.animate]();
		},
//自动轮播
		loop(){
			this.timer=setInterval(function(){
				this.change("next");
				this.forshow();
			}.bind(this),2000)
		}
	}
}(jQuery)
