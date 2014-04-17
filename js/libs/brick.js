/**
 *
 * 		title:		Brick Slide Rotator - jQuery plugin
 *
 *		author: 	Ovidiu Stefancu
 *					http:www.wpworks.net
 *
 * 		info:		File available at http://codecanyon.net/user/wickedpixel
 *
 * 		ver:		1.0 : 2011-2-11
 *
 */
var WPW = WPW || {};
(function($) {
	//
	// VIEWER OBJECT - STARTS, READS AND MANAGES THE CONTENT
	//
	//
	// for default settings check the bottom of the script or search "DEFAULT SETTINGS"
    this.dupa = 'dupa';
    var wpwBSrotator = function(theBody, options){
		alert('wpw')
		//	INIT
		var main = this;
		this.cfg = $.extend({},  $.fn.wpwBSrotator.defaults, options);
		this.body = $(theBody); // gallery body : TagBody

        //STATUS VARIABLES
		this.currentIndex = 0;
		this.oldIndex = 0;
		this.currentItem = 0;
		this.oldItem;
		this.items = [];
		this.busy = false;
		this.slideshowTimer;
		this.slideshowPaused;
		this.arrows;

		//PRESET
		main.cfg.cellWidth = Math.floor(main.cfg.width/main.cfg.cols);
		main.cfg.cellHeight = Math.floor(main.cfg.height/main.cfg.rows);

		$('>div', main.body).each(function(){
			var item = $(this);
			var imageBricks = new WPW.Brickator(item, main);
			main.items.push(imageBricks);
			item.detach();
		});

		this.container = $('<div class="bsr_container"></div>');
		this.body.prepend(main.container);
		main.container.css('width', main.cfg.width + 100 + "px");
		main.container.css('height', main.cfg.height + "px");
		main.body.css('width', main.cfg.width + "px");
		main.body.css('height', main.cfg.height + "px");

		if (main.cfg.menuVisible) {
			this.menu = $('<div class="bsr_menu"/>');
			var menuObj = new WPW.BSRmenu(this, main.menu);
		}

		this.showCurrentItem = function(){
			clearInterval(main.slideshowTimer);
			if (main.busy == false) {

				if(main.oldIndex <= main.currentIndex){
					main.cfg.blockOrder = main.cfg.blockOrderNext;
				} else {
					main.cfg.blockOrder = main.cfg.blockOrderPrev;
				}
				main.oldIndex = main.currentIndex;

				main.items[main.currentIndex].show();
				main.body.trigger('item-changed');
			}
		}

		this.animEnd = function(){
			main.busy = false;
			if (main.currentItem) {
				if(main.cfg.brickDistance == 0 )main.currentItem.body.append(main.currentItem.pic);
				WPW.DisplayInfo(main.currentItem, main);
			}
			if(main.oldItem)main.oldItem.body.detach();

			//SLIDESHOW CHECK
			if(main.cfg.slideshowEnabled == true && !this.slideshowPaused){
				clearInterval(main.slideshowTimer);
				main.slideshowTimer = setInterval(slideshow, main.cfg.slideshowSpeed);
			}
		}

		this.animStart = function(){
			main.busy = true;
			if (main.currentItem) {
				main.currentItem.pic.detach();
				clearInterval(main.slideshowTimer);
				if (main.currentItem.infoBox) {
					main.currentItem.infoBox.fadeOut("slow");
				}
			}
		}

		//SLISESHOW
		var slideshow = function(){
			changeSlide(1);
		}

		var changeSlide = function(way){
			if(!way)way = 1;
			clearInterval(main.slideshowTimer);
			if(main.busy == false){
				main.currentIndex +=way;
				if(main.currentIndex > main.items.length-1)main.currentIndex = 0;
				if(main.currentIndex < 0)main.currentIndex = main.items.length-1;
				main.showCurrentItem();
			}
		}

		if (main.cfg.slideshowEnabled == true){
			main.body.mouseover(function(){
				main.slideshowPaused = true;
				clearInterval(main.slideshowTimer);
			});
			main.body.mouseout(function(){
				main.slideshowPaused = false;
				clearInterval(main.slideshowTimer);
				main.slideshowTimer = setInterval(slideshow, main.cfg.slideshowSpeed);
			});
		}

		setTimeout(main.showCurrentItem, 1000);

		if(main.cfg.navigArrowsEnabled == true){
			main.arrows = $('<div class="bsr_arrows"><span class="bsr_btn_prev"></span><span class="bsr_btn_next"></span></div>');
			main.arrows.css("left", main.cfg.navigArrowsX + "px");
			main.arrows.css("top", main.cfg.navigArrowsY + "px");
			main.body.append(main.arrows);
			var btnPrev = $(".bsr_btn_prev", main.body);
			var btnNext = $(".bsr_btn_next", main.body);
			btnNext.click(function(){changeSlide(1);});
			btnPrev.click(function(){changeSlide(-1);});
		}

		main.body.bind("DESTROY", function(){
			$('*', main.body).each(function(){
				var item = $(this);
				item.stop();
				item.unbind();
				item.clearQueue();
			});
			clearInterval(main.slideshowTimer);
		});
    };


	//
	// MENU OBJECT - MANAGES THE VIEWER MENU
	//

	WPW.BSRmenu = function(owner, body){
		var cfg = owner.cfg;
		var nrItems = owner.items.length;
		var buttons = [];

		//SET MENU POSITION
		switch(cfg.menuPosition){
				case "top":
					body.css('width', cfg.width + "px");
					body.css('height', cfg.menuHeight + "px");
					owner.body.css('height', cfg.menuHeight + cfg.height + "px");
					owner.body.prepend(body);
				  break;
				case "bottom":
					body.css('width', cfg.width + "px");
					body.css('height', cfg.menuHeight + "px");
					owner.body.css('height', cfg.menuHeight + cfg.height + "px");
					owner.body.append(body);
				  break;
				case "left":
					body.css('width', cfg.menuWidth + "px");
					body.css('height', cfg.height + "px");
					owner.body.css('width', cfg.menuWidth + cfg.width + "px");
					owner.container.css('position', "absolute");
					owner.container.css('left', cfg.menuWidth + "px");
					owner.body.append(body);
					body.addClass("bsr_vertical_menu");
				  break;
				case "right":
					body.css('width', cfg.menuWidth + "px");
					body.css('height', cfg.height + "px");
					owner.body.css('width', cfg.menuWidth + cfg.width + "px");
					body.css('position', "absolute");
					body.css('left', cfg.width + "px");
					body.css('top', "0px");
					owner.body.append(body);
					body.addClass("bsr_vertical_menu");
				  break;
				default:
			}

		//SET MENU CONTENT
		for(var i = 0; i<nrItems; i++){
			var obj = owner.items[i];
			var btn = $('<span />');
			if (cfg.menuType == "text") {
				if (obj.btn.length > 0) {
					btn.html(obj.btn.html());
				}
				else {
					btn.html((i + 1));
				}
				btn.addClass('bsr_menu_item_text');
			} else {
				btn.addClass('bsr_menu_item_btn');
				btn.attr("title", obj.btn.html());
			}
			btn.data('data', obj);
			btn.data('index', i);
			btn.click(function(){selectItem(this)});
			buttons.push(btn);
			body.append(btn);
			if(cfg.menuPosition == "left" || cfg.menuPosition == "right"){
				body.append($('<br/>'));
			}
		}
		if(cfg.menuAlign == "right")body.addClass('bsr_menu_align_right');

		var highlightItem = function (){
			for (var i = 0; i < buttons.length; i++){
				var btn = buttons[i];
				if(btn.data('data') == owner.currentItem){
					if (btn.hasClass("bsr_menu_item_text")) {
						btn.addClass("bsr_menu_text_item_selected");
					} else {
						btn.addClass("bsr_menu_btn_item_selected");
					}

				} else {
					if (btn.hasClass("bsr_menu_item_text")) {
						btn.removeClass("bsr_menu_text_item_selected");
					} else {
						btn.removeClass("bsr_menu_btn_item_selected");
					}

				}

			}
		}

		var selectItem = function (item){
			//alert($(item).data('index'));
            $(".tech").hide();
            $(document).trigger('folio-menu-click');
            //$(".design").html('---');
			owner.currentIndex = $(item).data('index');
			owner.showCurrentItem();
		}

		owner.body.bind("item-changed", function(){highlightItem()});
	}

	//
	// THE INFO BOX - MANAGES THE CONTENT AND THE POSITION FOR THE CAPTION BOX
	//

	WPW.DisplayInfo = function(item, gallery){
		var info = gallery.currentItem.info;

		if(!info.data('cfg') && info.length > 0){
			var cfgArr = info.attr('class').split('_');
			var infoBox = $('<div/>');
			//info.wrap(infoBox);
			infoBox.append(info);
			//item.body.append(infoBox);
			infoBox.addClass("bsr_info_box");

			info.addClass("bsr_info");
			item.infoBox = infoBox;

			var cfg = {};
			cfg.body = info;
			info.data('cfg', cfg);
			info.data('box', infoBox);

			for(var i = 0; i < cfgArr.length; i++){
				var setting = (cfgArr[i].split("-")[0]);
				if(cfgArr[i].split("-")[1])cfg[setting] = (cfgArr[i].split("-")[1]);
			}

			if(cfg.pos)switch(cfg.pos){
				case "top":
					if(cfg.height)infoBox.css('height', cfg.height + "px");
					infoBox.css('width', gallery.cfg.width + "px");
					infoBox.css('top', "0px");
				  break;
				case "bottom":
					if(cfg.height)infoBox.css('height', cfg.height + "px");
					infoBox.css('width', gallery.cfg.width + "px");
					infoBox.css('bottom', "0px");
				  break;
				case "left":
					if(cfg.width)infoBox.css('width', cfg.width + "px");
					infoBox.css('height',  gallery.cfg.height + "px");
					infoBox.css('top', "0px");
				  break;
				case "right":
					if(cfg.width)infoBox.css('width', cfg.width + "px");
					infoBox.css('height',  gallery.cfg.height + "px");
					infoBox.css('top', "0px");
					infoBox.css('left', (gallery.cfg.width - cfg.width) + "px");
				  break;
				default:
			}
		}

		if(item.infoBox){
            //$(".design span").html()
			item.infoBox.hide();

			item.infoBox.appendTo(gallery.currentItem.body);
//			item.infoBox.fadeIn("slow");
            $(".tech").fadeIn("slow");
            $(".design").html($(info).html())
            //$(".logos").html($(".ddd", info).html())

		}

	}

	//
	// ITEM OBJECT - GENERATES BRICKS AND MANAGE ANIMATIONS
	//
	WPW.Brickator = function(item, gallery){
		var main = this;
		item.addClass("bsr_item");
		item.css('width', gallery.cfg.width + 100 + "px");
		item.css('height', gallery.cfg.height + "px");
		this.pic = $('img:first', item).detach();
		this.info = $('p:first', item).detach();
		this.link = $('a:first', item).detach();
		this.btn = $('.item_btn_name:first', item).detach();
		this.body = item;
		this.blocks = [];
		this.blockHolder = $('<div class="bsr_brick_holder"/>');

		main.body.append(main.blockHolder);


		if(main.link.length == 1){
			main.link.addClass('bsr_target_link');
			main.blockHolder.wrap(main.link);
		}

		var cols = gallery.cfg.cols;
		var rows = gallery.cfg.rows;

		var index = 0;

		var block;
		var i = 0;
		var j = 0;
		for(i = 0; i < cols; i++){
			for(j = 0; j < rows; j++){
				block = {
					body: $('<div class="bsr_brick"><div class="bsr_inner_brick"></div></div>'),
					x:i,
					y:j,
					index:index
				};

				block.width = gallery.cfg.cellWidth - gallery.cfg.brickDistance;
				block.height = gallery.cfg.cellHeight - gallery.cfg.brickDistance;

				if(i == cols-1){
					var difW = gallery.cfg.width - gallery.cfg.cellWidth * cols;
					block.width = gallery.cfg.cellWidth + difW + gallery.cfg.brickDistance;
				}
				if(j == rows-1){
					var difH = gallery.cfg.height - gallery.cfg.cellHeight * rows;
					block.height = gallery.cfg.cellHeight + difH + gallery.cfg.brickDistance;
				}

				block.body.css("width", block.width + "px");
				block.body.css("height", block.height + "px");
				block.inner = $(".bsr_inner_brick:first", block.body);
				block.inner.css("width", block.width + "px");
				block.inner.css("height", block.height + "px");



				block.body.css("left", gallery.cfg.cellWidth * i + "px");
				block.body.css("top", gallery.cfg.cellHeight * j + "px");

				block.updated = false;
				block.index = index;

				block.inner.css({ background: 'url("'+ main.pic.attr('src') +'") no-repeat -'+ ((gallery.cfg.cellWidth + (i * gallery.cfg.cellWidth)) - gallery.cfg.cellWidth) +'px -' +  ((gallery.cfg.cellHeight + (j * gallery.cfg.cellHeight)) - gallery.cfg.cellHeight) + "px"});

				main.blockHolder.append(block.body);
				main.blocks.push(block);
				index++;
			}
		}

		//PUTS THE BRICKS IN INITIAL POSITION
		this.resetBricks = function(){
			main.pic.detach();

			var animType = gallery.cfg.blockOrder.split(".");
			var alternate = false;
			if (animType.length == 3) {
				if (animType[2] == "alternate") {
					alternate = true;
				} else {
					alternate = false;
				}
			}

			if(animType.length >= 1)animType = animType[1];
			else animType = "random";

			var evenRow = false;
			var evenCol = false;

			for (i = 0; i < main.blocks.length; i++) {
				var block = main.blocks[i];

				if (block.x < (gallery.cfg.cols - 1) / 2) {
					evenRow = true;
				} else {
					evenRow = false;
				}
				if (block.y < (gallery.cfg.rows - 1) / 2) {
					evenCol = true;
					} else {
					evenCol = false;
					}

				switch(animType){
					case "left":
						rX = -1;
						rY = 0;
						if(alternate && block.x%2 != 0)rX = 1;
					  break;
					case "right":
						rX = 1;
						rY = 0;
						if(alternate && block.x%2 != 0)rX = -1;
					  break;
	  				case "top":
						rX = 0;
						rY = -1;
						if(alternate && block.y%2 != 0)rY = 1;
					  break;
	  				case "bottom":
						rX = 0;
						rY = 1;
						if(alternate && block.y%2 != 0)rY = -1;
					  break;
					default:
						var rX = Math.random();
						if (rX < 0.3) rX = 1;
						else if (rX < 0.6) rX = -1;
						else rX = 0;

						var rY = Math.random();
						if (rX == 0) {
							if (rY < 0.5) rY = 1;
							else rY = -1;
						} else rY = 0;
				}

				block.rX = rX;
				block.rY = rY;
			}
		}

		//SHOW ITEM
		this.show = function(){
			if(gallery.currentItem != main){
				gallery.animStart();

				gallery.oldItem = gallery.currentItem;
				gallery.currentItem = main;

				main.resetBricks();
				main.body.appendTo(gallery.container);

				var animType = gallery.cfg.blockOrder.split(".");
				var zigzag = false;
				if (animType.length == 3) {
					if (animType[2] == "zigzag") {
						zigzag = true;
					}
					else {
						zigzag = false;
					}
				}
				if(animType.length >= 1)animType = animType[0];
				else animType = "random";

				switch(animType){
					case "left":
						WPW.Mleft(main.blocks, gallery.cfg, zigzag);
						break;
					case "right":
						WPW.Mright(main.blocks, gallery.cfg, zigzag);
					  	break;
					case "top":
					  	WPW.Mtop(main.blocks, gallery.cfg, zigzag);
					 	 break;
					case "bottom":
					  	WPW.Mbottom(main.blocks, gallery.cfg, zigzag);
					 	 break;
					default:
					  	WPW.Mrandom(main.blocks, gallery.cfg);
				}

				var i = 0;
				var theDelay = 0;
				var lastDelayIndex = 0;
				var block;
				for (i = 0; i < index; i++) {
					block = main.blocks[i];
					if ((gallery.cfg.blockDelay*block.d) > theDelay) {
						theDelay = (gallery.cfg.blockDelay*block.d);
						lastDelayIndex = i;
					}

					block.inner.css("left", block.width * block.rX + "px");
					block.inner.css("top", block.height * block.rY + "px");

					block.left = block.width * block.rX;
					block.top = block.height * block.rY;
				}

				for (i = 0; i < index; i++) {
					block = main.blocks[i];
					animateBlock(block, (i == lastDelayIndex));
				}
			}

			function animateBlock($block, $isEnd){
					$block.inner.delay(gallery.cfg.blockDelay*block.d).animate({
						left: 0,
					    top: 0
					}, {
						duration: gallery.cfg.blockSpeed,
						easing: gallery.cfg.ease,
						step: function(){if(gallery.oldItem)gallery.oldItem.updateBlock($block.index, $block)},
						complete: function(){if ($isEnd == true) {
							gallery.animEnd();
						};}
					});
			}

		}

		//UPDATE BLOCK POSITION
		this.updateBlock = function($index, tBlock){
			var myBlock = main.blocks[$index];
			if (tBlock.rX) {
				if (tBlock.rX == -1) {
					myBlock.inner.css('left', (tBlock.inner.position().left + tBlock.width) + "px");
				}
				else {
					myBlock.inner.css('left', (tBlock.inner.position().left - myBlock.width) + "px");
				}
			}
			else {
				if (tBlock.rY == -1) {
					myBlock.inner.css('top', (tBlock.inner.position().top + tBlock.height) + "px");
				}
				else {
					myBlock.inner.css('top', (tBlock.inner.position().top - myBlock.height) + "px");
				}
			}
		}

	}


    $.fn.wpwBSrotator = function(options) {
        return this.each(function(){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('wpwbsrotator')) return;
            // Pass options to plugin constructor
            var wpwbsrotator = new wpwBSrotator(this, options);
            // Store plugin object in this element's data
            element.data('wpwbsrotator', wpwbsrotator);
        });
	};

	//
	//	DEFAULT SETTINGS
	//

	$.fn.wpwBSrotator.defaults = {
        width: 700,
        height: 466,
		rows: 4,
		cols: 5,
		ease: "easeOutExpo", //the entire list of ease formulas check the jquery.easing.1.3.js file
		blockSpeed: 300,
		blockDelay: 200,
		blockOrderNext: "left.left",
		blockOrderPrev: "right.right",
		menuVisible: false,
		menuType: "text", // text or button. If used "text" and no name tag will be found, numbers will be used.
		menuPosition: "top",
		menuAlign: "right", // "right" or "left"
		menuHeight:20,
		menuWidth:20,
		slideshowEnabled:false,
		slideshowSpeed:2000,
		navigArrowsEnabled:false,
		navigArrowsX:0,
		navigArrowsY:0,


		brickDistance:0 //experimental - can be used to add a distance between bricks. small, integer values.
	};


})(jQuery);


/*

MATRIX ORDER

*/

WPW.Mleft = function(arr, cfg, zigzag){
	var block;
	var nr = arr.length;
	for (var i = 0; i < nr; i++) {
		block = arr[i];
		block.d = i;
		if(zigzag && block.x%2 != 0){
			block.d = block.x*cfg.rows + cfg.rows - block.y - 1;
		}
	}
}

WPW.Mright = function(arr, cfg, zigzag){
	var block;
	var index = 0;
	for(var i = cfg.cols - 1; i >= 0; i--){
		for (var j = 0; j < cfg.rows; j++) {
			block = arr[i*cfg.rows + j];
			if(zigzag && block.x%2 != 0){
				block = arr[i*cfg.rows + cfg.rows - j - 1];
			}
			block.d = index;

			index ++;
		}
	}
}

WPW.Mtop = function(arr, cfg, zigzag){
	var block;
	var index = 0;
	var nr = arr.length;
	for(var i = 0; i < cfg.cols; i++){
		for (var j = 0; j < cfg.rows; j++) {
			block = arr[index];
			block.d = j*cfg.cols + i;
			if(zigzag && block.y%2 != 0){
				block.d = j*cfg.cols + cfg.cols - i - 1;
			}
			index++;
		}
	}
}

WPW.Mbottom = function(arr, cfg, zigzag){
	var block;
	var index = 0;
	var nr = arr.length;
	arr = arr.concat().reverse();
	for(var j = cfg.rows - 1; j >= 0; j--){
		for (var i = cfg.cols-1; i >=0; i--) {
			block = arr[i*cfg.rows + j];
			block.d = nr - index - 1;
			if(zigzag && block.y%2 != 0){
				block.d = j*cfg.cols + cfg.cols - i - 1;
			}
			index ++;
		}
	}
}


WPW.Mrandom = function(arr, cfg){
	var oldArr = arr.concat();
	var newArr = [];
	while(oldArr.length > 0){
		var start = Math.floor(Math.random()*oldArr.length);
		var elem = oldArr.splice(start, 1)[0];
		newArr.push(elem);
		elem.d = newArr.length;
	}
}
