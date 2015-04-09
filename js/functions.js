/**
 * Functionality specific to Portfolio.
 **/
(function($) {	
	$(document).ready(function(){
		// get the post images
		var blocks = [];
		
		jQuery('.article-helper.notloaded').each(function(i, block) {
			blocks.push(block);
		});
		
		var add_class = function(block, class_name, delay) {
			setTimeout(function() {
				jQuery(block).addClass(class_name);
			}, delay);
		};
		
		for(var i = 0; i < blocks.length; i++) {
			add_class(blocks[i], 'article-helper animated', i * 200);
		}
		
		jQuery('.article-helper.notloaded').each(function(i, wrapper) {
            wrapper = jQuery(wrapper);
            var img = wrapper.find('header > img')[0];

			var interval = 500;
			
			if(wrapper.hasClass('slow-animation')) {
				interval = 750;
			}
			
			if(wrapper.hasClass('fast-animation')) {
				interval = 250;
			}

            if(img) {
              // wait for the images
              var timer = setInterval(function() {
                // when the image is laoded
                if(img.complete) {
                  // stop periodical calls
                  clearInterval(timer);
                  // generate the image wrapper
                  var src = jQuery(img).attr('src');
                  var url = jQuery(img).parent().attr('data-url');
                  jQuery(img).remove();
                  var img_container = jQuery('<div class="post-image el-transition-long" data-url="'+url+'" style="background-image: url(\''+src+'\')"></div>');
                  img_container.appendTo(wrapper);
                  if(url) {
                  	img_container.css('cursor', 'pointer');
                  	img_container.click(function() {
                  		window.location = img_container.attr('data-url');
                  	});
                  }
                  wrapper.removeClass('notloaded');
                  // add class with delay
                  setTimeout(function() {
                    img_container.addClass('loaded');
                  }, interval);
                }          
              }, 500);
              // add necessary mouse events
              wrapper.mouseenter(function() {
              	if(!wrapper.hasClass('no-anim')) {
                	wrapper.addClass('article-hover');
                }
              });

              wrapper.mouseleave(function() {
                if(!wrapper.hasClass('no-anim')) {
                	wrapper.removeClass('article-hover');
                }
              });
            } else {
              // where there is no image - display the text directly
              wrapper.addClass('article-hover');
            }
          });
		
		// fit videos
		jQuery(".video-wrapper").fitVids();
	    
		var main_menu = jQuery(".main-navigation");
		main_menu.click(function() {
			if(main_menu.hasClass("opened")) {
				main_menu.removeClass("opened");
			} else {
				main_menu.addClass("opened");
			}
		});	
	});
})(jQuery);
