;(function($) {
$.fn.sequencer = function() {
	var first_img = this.find('img:first'),
	all_img = this.find('img'),
	img_count = all_img.length;
	if(img_count==0) return;
	var img_width = first_img.width(),
	img_height = first_img.height(),
	chg_width = parseInt(img_width/img_count),
	imgs_left = first_img.offset().left;
	all_img.toggle();
	first_img.toggle();
	this.width(img_width);
	this.height(img_height);
	var mouseX = 0,
	start = false,
	step = 0,
	curr_step = 0,
	curr_img = 0;
	this.mouseover(function(e){
		start = true;
		if(start){
			mouseX = e.screenX;
			
			curr_step=parseInt((mouseX-imgs_left)/chg_width);
			step = curr_step;
		}

	});
	this.mouseout(function(e){
		start = false;
	});
	this.mousemove(function(e){
		if(start){
			curr_step=parseInt((e.screenX-imgs_left)/chg_width);
			if(curr_step!=step){
				$(all_img[curr_img]).toggle();
				if(curr_step>step){
					curr_img = curr_img+1;
					if(curr_img>=img_count) curr_img=0;
				}else{
					curr_img = curr_img-1;
					if(curr_img<0) curr_img=img_count-1;
				}				
				$(all_img[curr_img]).toggle();
				step=curr_step;
			}
		}
	})
};
})(jQuery);

$(document).ready(function(){
/*var el = $("#sequence ul");
var im_array = [];
	for (var img=1; img<= 10; img++)
		//im_array.push("assets/img/coat_" +img + ".jpg");
el.append('<li><img src="assets/img/coat_' +img + '.jpg" /></li>');*/
	//$('#sequence').each(function(){$(this).sequencer()});
$(this).sequencer();
});

//$('#console').append('curr_img'+curr_img+'&nbsp;step'+step+'&nbsp;curr_step'+curr_step+'<br/>');
