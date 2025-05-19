

	//ウインドウサイズの横幅によって条件分岐
	var timer = '';
	window.onresize = function () {
		  if (timer) {
		    	clearTimeout(timer);
		  }
		  timer = setTimeout(function(){
		    	var windowSize = window.innerWidth;
			var wrapperIdDiv = document.getElementById("wrapper");
		    	if (windowSize < 768) {
				// スマホ時の処理
		      		wrapperIdDiv.classList.remove("is-wideScreen");
		      		wrapperIdDiv.classList.add("is-smallScreen");
		    	} else {
				// スマホ以外の処理
		      		wrapperIdDiv.classList.add("is-wideScreen");
		      		wrapperIdDiv.classList.remove("is-smallScreen");
		    	}
		  }, 200);
	};



	//最上位置・スクロールで表示・変化させるボタンの処理

	//上部に移動するボタン
	const btnRise_btn = document.querySelector('#btnRise');
	//スマホ用画面固定ボタン
	const btnPageBottom_btn = document.querySelector('#btnPageBottom');
	//スティッキーヘッダー
	var sticky_head = document.querySelector('#pageTopFix');
	var sticky = false;

	//クリックイベントを追加
	btnRise_btn.addEventListener( 'click' , scroll_to_top );
	function scroll_to_top(){
		window.scroll({top: 0, behavior: 'smooth'});
	};

	//スクロール時のイベントを追加
	window.addEventListener( 'scroll' , scroll_event );

	function scroll_event(){
		if(window.pageYOffset > 100){
			btnRise_btn.style.opacity = '1';
			btnPageBottom_btn.style.opacity = '1';
			if ( sticky === false ){
				sticky_head.classList.add("is-scroll");
	                	sticky = true;
	           	}
		}else if(window.pageYOffset < 100){
			btnRise_btn.style.opacity = '0';
			btnPageBottom_btn.style.opacity = '0';
			if ( sticky === true ){
				sticky_head.classList.remove("is-scroll");
		                sticky = false;
			}
		}
	};



// jsへのリンクは、main.jsからの相対パスで記述。
// ファイルを呼び出す時は、拡張子[.js]を削除。

require([
  "smoothScroll",			//スムーズスクロール用JS
  "micromodal.min",			//モーダルウィンドウJS
  "luminous.min",			//画像用モーダルウィンドウJS
],function(){ //[ , ]で区切ってfunction文を追記

	//micromodal.min モーダルウィンドウ用
	MicroModal.init({
	  disableScroll: true,
	  awaitOpenAnimation: true,
	  awaitCloseAnimation: true
	});

	//スマートフォン用ボタン
	var globalNaviSmallIcon = document.querySelector('#globalNaviSmallIcon');
	globalNaviSmallIcon.addEventListener( 'click' , btn_is_open );
	
	function btn_is_open(){
		if( globalNaviSmallIcon.classList.contains("is-open") == true ){
			globalNaviSmallIcon.classList.remove("is-open");
			MicroModal.close('modal-globalNaviSmall', {
				awaitCloseAnimation: true
     			});
		} else {
			globalNaviSmallIcon.classList.add("is-open");
			MicroModal.show('modal-globalNaviSmall', {
			       disableScroll: true, // ページスクロールを無効に
			       awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
			       awaitCloseAnimation: true
			});
	        }
	};

	//スマートフォン用ボタン ページ内リンクをクリックした時にモーダルウィンドウを外す
	var globalNaviSmallMenuMain = document.querySelector('.globalNaviSmall__menu__main');
	var globalNaviSmallIconPagelinks = [].slice.call(globalNaviSmallMenuMain.querySelectorAll('a[href^="#"]'));

	globalNaviSmallIconPagelinks.forEach(function (globalNaviSmallIconPagelink) {

		globalNaviSmallIconPagelink.addEventListener( 'click' , pagelink_btn_is_open );
		function pagelink_btn_is_open(){
			if( globalNaviSmallIcon.classList.contains("is-open") == true ){
				globalNaviSmallIcon.classList.remove("is-open");
				MicroModal.close('modal-globalNaviSmall', {
					awaitCloseAnimation: true
	     			});
			} else {
				globalNaviSmallIcon.classList.add("is-open");
				MicroModal.show('modal-globalNaviSmall', {
				       awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
				       awaitCloseAnimation: true
				});
		        }
		};
	});

	//luminous.min用
	//単数用　.luminous
	var luminousOptions = {
		caption: function (trigger) {
	    		return trigger.getAttribute('title');
	  	},
	}
	var luminousTrigger = document.querySelectorAll('.luminous');
	for (var i = 0; i < luminousTrigger.length; i++) {
	  var elem = luminousTrigger[i];
	  new Luminous(elem, luminousOptions);
	}
	//複数用　.luminousGallery
	var luminousGalleryTrigger = document.querySelectorAll('.luminousGallery');
	var luminousGalleryOptions = {
		caption: function (trigger) {
	    		return trigger.getAttribute('title');
	  	},
	}
	if( luminousGalleryTrigger !== null ) {
		new LuminousGallery(luminousGalleryTrigger,{},luminousGalleryOptions);
	}

	
});//end function文 & require

//画面スクロール・遷移でのアニメ用　ScrollMagic用
require([
  "ScrollMagic",			//特定の位置で発火させるJS
  "debug.addIndicators.min",		//デバッグ用JS
  "gsap.min",				//アニメーションJS
  "CSSRulePlugin.min",			//アニメーションJS
  "ScrollTrigger.min",			//アニメーションJS
],function(){ //[ , ]で区切ってfunction文を追記


	var ScrollMagic = require('ScrollMagic');

	class ScrollFade {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollFadeIn:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],
		        		triggerHook: 'onEnter',
		        		reverse: false,
		        		offset: 200,
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollFade();

	class ScrollLine {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollLine:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollLine();

	class ScrollMainVideo {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollMainVideo:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollMainVideo();

	class ScrollMask {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollMaskIn:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],
		        		triggerHook: 'onEnter',
		        		reverse: false,
		        		offset: 200,
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollMask();

	class ScrollMask2 {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollMaskIn2:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],
		        		triggerHook: 'onEnter',
		        		reverse: false,
		        		offset: 200,
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollMask2();

	class ScrollMove {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollMoveIn:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollMove();


const area = document.querySelector("#wrapper.is-wideScreen");

let typeParallax = gsap.matchMedia();

	typeParallax.add("(min-width: 768px)", () => {
		gsap.fromTo(".--typeParallax01",
		  {
		    yPercent: 10,
		  },
		  {
		    yPercent: -10,
		    ease: "none",
		    scrollTrigger: {
		      trigger: area,
		      start: "top bottom",
		      end: "bottom top",
		      scrub: true, //動作を遅らせない
		    },
		  }
		);
		
		gsap.fromTo(".--typeParallax02",
		  {
		    yPercent: 30,
		  },
		  {
		    yPercent: -30,
		    ease: "none",
		    scrollTrigger: {
		      trigger: area,
		      start: "top bottom",
		      end: "bottom top",
		      scrub: 1, //動作を遅らせる
		    },
		  }
		);
  });




	
});//end function文 & require


//メインイメージスライダー　Swiper用
require([
  "swiper-bundle.min",			//スライダーJS
],function(){ //[ , ]で区切ってfunction文を追記
	var Swiper = require('swiper-bundle.min');

	const mySwiperTypeFullPage01 = new Swiper('.sliderBox--typeFullPage01 .swiper', {
	  	effect: 'fade', //フェードの指定
	  	fadeEffect: {
	    		crossFade: true,// クロスフェードを有効にする（フェードモードの場合 true 推奨）
	  	},
	  	loop: true, // ループの指定
	  	loopAdditionalSlides: 1, // 無限ループさせる場合に複製するスライド数
	  	speed: 2000, //2秒かけてフェードで切り替わる
	  	autoplay: {
	    		delay: 3000, //3秒後に次のスライドへ
	    		disableOnInteraction: false, //ユーザー側で操作してもスライドを止めない
	    		waitForTransition: false, //スライド切り替え中にも自動再生が止まらない
	  	},
	  	followFinger: false,
	  	pagination: {
	    		el: '.sliderBox--typeFullPage01 .swiper-pagination', // ページネーション要素のクラス
	    		clickable: true, //クリックを有効化する
	  	},
	    	navigation: { // 左右のページ送を使うなら書く
	        	nextEl: ".sliderBox--typeFullPage01 .swiper-button-next",
	        	prevEl: ".sliderBox--typeFullPage01 .swiper-button-prev"
	    	}
	});
	
	//Youtubeのスライダー
	const mySwiperTypeBasic = new Swiper('.sliderBox--typeBasic .swiper', {
		slidesPerView: 1,
		spaceBetween: 24,
		grabCursor: true,
		pagination: {
			el: '.sliderBox--typeBasic .swiper-pagination',
			clickable: true,
		},
	    	navigation: {
	      		nextEl: '.sliderBox--typeBasic .swiper-button-next',
	      		prevEl: '.sliderBox--typeBasic .swiper-button-prev',
	    	},
	    	breakpoints: {
	      		600: {
	        		slidesPerView: 2,
	      		},
	      		1025: {
	        		slidesPerView: 3,
	        		spaceBetween: 32,
	      		}
	    	}
	});

	//コンテンツのスライダー
	  let mySwiperTypeChangeSlide = null;
	  const mediaQuery = window.matchMedia('(max-width: 768px)');

	  const checkBreakpoint = (e) => {
	    if (e.matches) {
	      initSwiper();
	    } else if (mySwiperTypeChangeSlide) {
	      mySwiperTypeChangeSlide.destroy(false, true);
	    }
	  }

	  const initSwiper = () => {
	    mySwiperTypeChangeSlide = new Swiper('.sliderBox--typeChangeSlide .swiper', {
	      slidesPerView: 1,
	      spaceBetween: 16,
	      loop: true,
	      loopAdditionalSlides: 1,
	      speed: 1000,
	      grabCursor: true,
	      pagination: {
	        el: '.sliderBox--typeChangeSlide .swiper-pagination', // ページネーション要素のクラス
	        clickable: true, //クリックを有効化する
	      },
	      navigation: {
	        nextEl: '.sliderBox--typeChangeSlide .swiper-button-next',
	        prevEl: '.sliderBox--typeChangeSlide .swiper-button-prev',
	      },
	      breakpoints: {
	        600: {// 画面幅600px以上で適用
	          slidesPerView: 3,
	        }
	      },
	    });
	  };

	  mediaQuery.addListener(checkBreakpoint);
	  checkBreakpoint(mediaQuery);




	//.sliderBox--typeFlow　流れるスライダー

	const slideLengthTypeFlow = document.querySelectorAll('.sliderBox--typeFlow .swiper-slide').length;

	const mySwiperTypeFlow = new Swiper('.sliderBox--typeFlow .swiper', {
	      slidesPerView: 'auto',
	      spaceBetween: 0,
	      loop: true,
	      loopedSlides: slideLengthTypeFlow,
	      speed: 8000,
	      autoplay: {
	        delay: 0,
	        disableOnInteraction: false,
	      },
	      freeMode: {
	        enabled: true,
	        momentum: false,
	      },
	      grabCursor: true,
	      breakpoints: {
	        1025: {
	          spaceBetween: 0,
	        }
	      },
	      on: {
	        touchEnd: (swiper) => {
	          swiper.slideTo(swiper.activeIndex + 1);
	        }
	      }
	});
	
});//end function文 & require




